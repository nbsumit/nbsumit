/**
 * Canvas space engine: a 3D starfield flying toward the viewer over a seeded
 * deep field with a faint galactic band and a few bright stars, plus shooting
 * stars and pointer stardust. Speed is eased so the page can open at
 * lightspeed, settle into a slow cruise, and jump again on demand.
 */

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  tint: number;
  phase: number;
  rate: number;
};

type Hero = {
  x: number;
  y: number;
  sprite: HTMLCanvasElement;
  phase: number;
  rate: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  tint: number;
};

export type FrameInfo = {
  /** Smoothed look offset in [-1, 1]. */
  px: number;
  py: number;
  /** 0 at cruise, 1 at lightspeed. */
  warp: number;
  /** 0 to 1 while the mark is held. */
  charge: number;
  /** Smoothed pointer proximity to the mark, 0 far to 1 on it. */
  near: number;
};

export type SpaceEngine = {
  /** Leave lightspeed and settle into cruise. */
  arrive: () => void;
  /** Jump to lightspeed for a while. Power above 1 goes past lightspeed. */
  jump: (ms?: number, power?: number) => void;
  /** Hold the mark to charge a jump; releasing jumps and returns the charge. */
  hold: (active: boolean) => number;
  /** Throttle: positive amounts accelerate, decaying back to cruise. */
  nudge: (amount: number) => void;
  /** Normalised look target in [-1, 1]. */
  look: (x: number, y: number) => void;
  /** Pointer proximity to the mark, 0 far to 1 on it. */
  focus: (near: number) => void;
  /** Leave a little stardust at a screen point. */
  trail: (x: number, y: number) => void;
  /** Scatter sparks at a screen point. Touch sparks are bigger. */
  burst: (x: number, y: number, touch?: boolean) => void;
  destroy: () => void;
};

type Options = {
  reducedMotion: boolean;
  onFrame?: (info: FrameInfo) => void;
  /** Called when the engine steps quality down: 0 full, 1 lighter, 2 lightest. */
  onQuality?: (level: number) => void;
};

const CRUISE = 0.03;
const LIGHTSPEED = 1.7;
const SKY_SEED = 0x5eed;
/** The deep sky is generated on a fixed field around the viewport centre, so
 *  the same stars sit in the same places whatever the window size. */
const FIELD = 2400;
const TINTS = [
  [236, 240, 246],
  [176, 198, 255],
  [255, 228, 200],
] as const;
const ICE = TINTS[1];
const EMBER = [255, 196, 160] as const;

/** Small deterministic PRNG so the deep sky is the same on every visit and resize. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
const rgb = (r: number, g: number, b: number, a: number) =>
  `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a.toFixed(3)})`;

/** A bright star with a soft glow and diffraction spikes, pre-rendered once. */
function makeHeroSprite(size: number, tint: readonly number[], diagonals: boolean, dpr: number) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(size * dpr);
  c.height = Math.ceil(size * dpr);
  const g = c.getContext('2d');
  if (!g) return c;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const m = size / 2;
  const glow = g.createRadialGradient(m, m, 0, m, m, m);
  glow.addColorStop(0, rgba(tint, 0.95));
  glow.addColorStop(0.08, rgba(tint, 0.42));
  glow.addColorStop(0.3, rgba(tint, 0.08));
  glow.addColorStop(1, rgba(tint, 0));
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);

  const spike = (angle: number, len: number, alpha: number, width: number) => {
    const ex = m + Math.cos(angle) * len;
    const ey = m + Math.sin(angle) * len;
    const grad = g.createLinearGradient(m, m, ex, ey);
    grad.addColorStop(0, rgba(tint, alpha));
    grad.addColorStop(1, rgba(tint, 0));
    g.strokeStyle = grad;
    g.lineWidth = width;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(m, m);
    g.lineTo(ex, ey);
    g.stroke();
  };
  for (let i = 0; i < 4; i++) spike((i * Math.PI) / 2, m * 0.96, 0.6, 0.9);
  if (diagonals) for (let i = 0; i < 4; i++) spike((i * Math.PI) / 2 + Math.PI / 4, m * 0.5, 0.3, 0.7);

  g.fillStyle = '#ffffff';
  g.beginPath();
  g.arc(m, m, 1.3, 0, Math.PI * 2);
  g.fill();
  return c;
}

export function createSpace(canvas: HTMLCanvasElement, opts: Options): SpaceEngine {
  const context = canvas.getContext('2d');
  if (!context) {
    return {
      arrive() {},
      jump() {},
      hold() {
        return 0;
      },
      nudge() {},
      look() {},
      focus() {},
      trail() {},
      burst() {},
      destroy() {},
    };
  }
  const ctx = context;
  const deep = document.createElement('canvas');
  const deepCtx = deep.getContext('2d');
  const PAD = 12;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let focal = 1;
  let stars: Star[] = [];
  let heroes: Hero[] = [];
  const meteors: Meteor[] = [];
  const motes: Mote[] = [];

  let speed = opts.reducedMotion ? 0 : LIGHTSPEED;
  let target = speed;
  let warpUntil = opts.reducedMotion ? 0 : Number.POSITIVE_INFINITY;
  let arrived = opts.reducedMotion;
  let holding = false;
  let holdStart = 0;
  let charge = 0;
  let boost = 0;
  let nextMeteor = 0;
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  let near = 0;
  let nearTarget = 0;
  let last = performance.now();
  let raf = 0;
  let alive = true;
  let dprQuery: MediaQueryList | null = null;

  // Adaptive quality: step down if frames are consistently slow at cruise.
  // The caller drops its expensive layers; we also thin the field a little.
  let baseCount = 0;
  let level = 0;
  let frameEma = 16;
  let probe = 0;
  const applyQuality = () => {
    const factor = [1, 0.75, 0.5][level];
    const count = Math.max(110, Math.round(baseCount * factor));
    if (stars.length > count) stars.length = count;
    while (stars.length < count) {
      const star = {} as Star;
      spawn(star, true);
      stars.push(star);
    }
  };

  const spawn = (star: Star, fresh: boolean) => {
    star.x = (Math.random() * 2 - 1) * 1.25;
    star.y = (Math.random() * 2 - 1) * 1.25;
    star.z = fresh ? 0.05 + Math.random() * 0.95 : 1;
    const roll = Math.random();
    star.tint = roll < 0.12 ? 1 : roll < 0.18 ? 2 : 0;
    star.size = Math.random() < 0.05 ? 1.25 + Math.random() * 0.6 : 0.45 + Math.random() * 0.6;
    star.phase = Math.random() * Math.PI * 2;
    star.rate = 0.6 + Math.random() * 2.2;
  };

  const paintDeep = () => {
    if (!deepCtx) return;
    const rand = mulberry32(SKY_SEED);
    const dw = w + PAD * 2;
    const dh = h + PAD * 2;
    deep.width = Math.floor(dw * dpr);
    deep.height = Math.floor(dh * dpr);
    deepCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    deepCtx.clearRect(0, 0, dw, dh);

    // A faint galactic band running diagonally behind everything.
    const diag = Math.hypot(dw, dh);
    const angle = -0.42;
    const sigma = Math.max(dw, dh) * 0.14;
    const bandAt = (x: number, y: number) =>
      -(x - dw / 2) * Math.sin(angle) + (y - dh / 2) * Math.cos(angle);
    deepCtx.save();
    deepCtx.translate(dw / 2, dh / 2);
    deepCtx.rotate(angle);
    const band = deepCtx.createLinearGradient(0, -sigma * 2.2, 0, sigma * 2.2);
    band.addColorStop(0, rgba(ICE, 0));
    band.addColorStop(0.5, rgba(ICE, 0.05));
    band.addColorStop(1, rgba(ICE, 0));
    deepCtx.fillStyle = band;
    deepCtx.fillRect(-diag, -sigma * 2.2, diag * 2, sigma * 4.4);
    deepCtx.restore();

    // Dust tier: positions on the fixed field, drawn where they land on screen.
    const field = Math.max(FIELD, dw, dh);
    const count = Math.round((field * field) / 2200);
    const minDot = dpr >= 2 ? 0.6 : 1;
    for (let i = 0; i < count; i++) {
      const x = dw / 2 + (rand() - 0.5) * field;
      const y = dh / 2 + (rand() - 0.5) * field;
      const roll = rand();
      const tintRoll = rand();
      const bright = rand();
      const big = rand();
      if (x < 0 || y < 0 || x > dw || y > dh) continue;
      const inBand = Math.exp(-((bandAt(x, y) / sigma) ** 2));
      if (roll > 0.28 + 0.72 * inBand) continue;
      const tint = TINTS[tintRoll < 0.15 ? 1 : tintRoll < 0.23 ? 2 : 0];
      const a = 0.07 + bright ** 3 * (0.45 + inBand * 0.2);
      deepCtx.fillStyle = rgba(tint, a);
      const s = big < 0.96 ? minDot : 1.3;
      deepCtx.fillRect(x, y, s, s);
    }

    // Hero stars: a handful of bright ones, kept clear of the mark. Candidates
    // come in a fixed order so a resize keeps the same stars where they were.
    heroes = [];
    const clear = Math.min(w, h) * 0.46;
    for (let i = 0; i < 160 && heroes.length < 9; i++) {
      const x = dw / 2 + (rand() - 0.5) * field;
      const y = dh / 2 + (rand() - 0.5) * field;
      const sizeRoll = rand();
      const roll = rand();
      const phase = rand() * Math.PI * 2;
      const rate = 0.25 + rand() * 0.5;
      if (x < PAD + 20 || y < PAD + 20 || x > dw - PAD - 20 || y > dh - PAD - 20) continue;
      if (Math.hypot(x - dw / 2, y - dh / 2) < clear) continue;
      if (heroes.some((o) => Math.hypot(o.x - x, o.y - y) < Math.min(w, h) * 0.18)) continue;
      const big = heroes.length < 2;
      const size = big ? 46 + sizeRoll * 18 : 22 + sizeRoll * 16;
      const tint = roll < 0.45 ? TINTS[0] : roll < 0.85 ? ICE : TINTS[2];
      heroes.push({ x, y, sprite: makeHeroSprite(size, tint, big, dpr), phase, rate });
    }
  };

  const resize = () => {
    const nextW = window.innerWidth;
    const nextH = window.innerHeight;
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    if (nextW === w && nextH === h && nextDpr === dpr) return;
    w = nextW;
    h = nextH;
    dpr = nextDpr;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    focal = Math.max(w, h) * 0.5;
    baseCount = Math.max(170, Math.min(640, Math.round((w * h) / 3300)));
    applyQuality();
    paintDeep();
    // Catch a move to a screen with a different pixel ratio.
    dprQuery?.removeEventListener('change', resize);
    dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    dprQuery.addEventListener('change', resize);
    if (opts.reducedMotion) wake();
  };

  const launchMeteor = () => {
    const fromLeft = Math.random() < 0.5;
    const angle = (fromLeft ? 0.18 : Math.PI - 0.18) + (Math.random() - 0.5) * 0.35;
    const v = 700 + Math.random() * 500;
    meteors.push({
      x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
      y: Math.random() * h * 0.45,
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v * 0.9 + 140,
      life: 0,
      max: 0.7 + Math.random() * 0.5,
      len: 90 + Math.random() * 120,
    });
  };

  const frame = (now: number) => {
    const dtMs = now - last;
    const dt = Math.min(0.05, Math.max(0, dtMs / 1000));
    last = now;
    const t = now / 1000;

    if (!opts.reducedMotion) {
      if (holding) {
        const k = Math.min(1, (now - holdStart) / 1700);
        charge = 1 - (1 - k) ** 2;
      } else {
        charge *= Math.exp(-dt * 7);
      }
      boost *= Math.exp(-dt * 1.4);
      if (now > warpUntil) target = CRUISE;
      let goal = target;
      if (holding) goal = Math.max(goal, CRUISE + charge * 0.4 * (LIGHTSPEED - CRUISE));
      goal = Math.max(goal, CRUISE + Math.max(0, boost) * 0.85 * (LIGHTSPEED - CRUISE));
      const ease = goal > speed ? 5 : arrived ? 1.6 : 2.4;
      speed += (goal - speed) * (1 - Math.exp(-dt * ease));
    }
    px += (tx - px) * (1 - Math.exp(-dt * 3));
    py += (ty - py) * (1 - Math.exp(-dt * 3));
    near += (nearTarget - near) * (1 - Math.exp(-dt * 5));
    const intensity = Math.max(0, (speed - CRUISE) / (LIGHTSPEED - CRUISE));
    const warp = Math.min(1, intensity);
    opts.onFrame?.({ px, py, warp, charge, near });

    // Measure only while cruising, and only step down.
    if (arrived && warp < 0.05 && !holding && level < 2 && dtMs < 100) {
      frameEma += (dtMs - frameEma) * 0.04;
      probe += dt;
      if (probe > 3 && frameEma > 26) {
        level++;
        probe = 0;
        frameEma = 16;
        applyQuality();
        opts.onQuality?.(level);
      }
    }

    ctx.clearRect(0, 0, w, h);

    // Deep field and hero stars: barely move, give the sky its density.
    const deepAlpha = 1 - warp * 0.7;
    ctx.globalAlpha = deepAlpha;
    ctx.drawImage(deep, -PAD + px * -6, -PAD + py * -6, w + PAD * 2, h + PAD * 2);
    for (const hero of heroes) {
      const s = hero.sprite.width / dpr;
      ctx.globalAlpha = deepAlpha * (0.7 + 0.3 * Math.sin(t * hero.rate + hero.phase));
      ctx.drawImage(hero.sprite, hero.x - PAD + px * -8 - s / 2, hero.y - PAD + py * -8 - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    const cx = w / 2;
    const cy = h / 2;
    const f = focal * (1 - 0.1 * Math.min(1.4, intensity));
    const trail = 0.012 + warp * 0.05;
    const shift = warp * 0.55;
    const steady = Math.min(1, warp / 0.2);
    const edgeScale = 1 / (0.5 * Math.max(w, h));
    ctx.lineCap = 'round';

    for (const s of stars) {
      s.z -= speed * dt;
      let sx = cx + (s.x / s.z) * f;
      let sy = cy + (s.y / s.z) * f;
      if (s.z <= 0.035 || sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) {
        spawn(s, false);
        continue;
      }
      const depth = 1 - s.z;
      sx -= px * 26 * depth;
      sy -= py * 26 * depth;
      const base = TINTS[s.tint];
      let cr = base[0];
      let cg = base[1];
      let cb = base[2];
      if (shift > 0.02) {
        // Doppler: the centre blue-shifts, the edges warm, as we approach lightspeed.
        const edge = Math.min(1, Math.hypot(sx - cx, sy - cy) * edgeScale);
        const to = edge < 0.4 ? ICE : EMBER;
        cr += (to[0] - cr) * shift;
        cg += (to[1] - cg) * shift;
        cb += (to[2] - cb) * shift;
      }
      // Twinkle fades out smoothly as the streaks take over.
      const twinkle = 0.72 + 0.28 * Math.sin(t * s.rate + s.phase);
      const alpha = Math.min(1, 0.1 + depth * depth * 1.4) * (twinkle + (1 - twinkle) * steady);
      const r = s.size * (0.35 + depth * 1.5);

      const bz = s.z + speed * trail;
      const bx = cx + (s.x / bz) * f - px * 26 * (1 - bz);
      const by = cy + (s.y / bz) * f - py * 26 * (1 - bz);
      const dx = sx - bx;
      const dy = sy - by;

      if (dx * dx + dy * dy > r * r * 4) {
        ctx.strokeStyle = rgb(cr, cg, cb, alpha * 0.45);
        ctx.lineWidth = Math.max(0.6, r * 1.3);
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.fillStyle = rgb(cr, cg, cb, alpha);
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.5, r * 0.8), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = rgb(cr, cg, cb, alpha);
        if (r < 0.9) {
          ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Shooting stars, only once we are cruising.
    if (!opts.reducedMotion && arrived && warp < 0.05) {
      if (nextMeteor === 0) nextMeteor = t + 3 + Math.random() * 3;
      if (t > nextMeteor) {
        launchMeteor();
        nextMeteor = t + 5 + Math.random() * 7;
      }
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.life += dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      const k = m.life / m.max;
      if (k >= 1) {
        meteors.splice(i, 1);
        continue;
      }
      const fade = Math.sin(Math.PI * k);
      const mag = Math.hypot(m.vx, m.vy);
      const ex = m.x - (m.vx / mag) * m.len;
      const ey = m.y - (m.vy / mag) * m.len;
      const grad = ctx.createLinearGradient(ex, ey, m.x, m.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, `rgba(235,242,255,${(0.75 * fade).toFixed(3)})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${(0.9 * fade).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stardust left by the pointer.
    if (motes.length) {
      ctx.globalCompositeOperation = 'lighter';
      for (let i = motes.length - 1; i >= 0; i--) {
        const p = motes[i];
        p.life += dt;
        const k = p.life / p.max;
        if (k >= 1) {
          motes.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 1 - dt * 1.8;
        p.vy *= 1 - dt * 1.8;
        ctx.fillStyle = rgba(TINTS[p.tint], (1 - k) * 0.85);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - k * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    if (alive && !document.hidden && (!opts.reducedMotion || motes.length || meteors.length)) {
      raf = requestAnimationFrame(frame);
    } else {
      raf = 0;
    }
  };

  const wake = () => {
    if (!raf && alive && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      wake();
    }
  };

  const addMote = (x: number, y: number, spread: number, size: number, offset = 0) => {
    if (motes.length > 260) motes.shift();
    const a = Math.random() * Math.PI * 2;
    const v = (0.3 + Math.random() * 0.7) * spread;
    motes.push({
      x: x + Math.cos(a) * offset,
      y: y + Math.sin(a) * offset,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: 0,
      max: 0.6 + Math.random() * 0.8,
      r: size * (0.6 + Math.random() * 0.8),
      tint: Math.random() < 0.4 ? 1 : 0,
    });
  };

  const jump = (ms = 1100, power = 1) => {
    if (opts.reducedMotion) return;
    target = LIGHTSPEED * power;
    warpUntil = performance.now() + ms;
  };

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  wake();

  return {
    arrive() {
      arrived = true;
      warpUntil = performance.now();
    },
    jump,
    hold(active) {
      if (opts.reducedMotion) return 0;
      if (active) {
        if (!holding) {
          holding = true;
          holdStart = performance.now();
        }
        return charge;
      }
      if (!holding) return 0;
      holding = false;
      const c = charge;
      jump(900 + c * 1500, 1 + c * 0.45);
      return c;
    },
    nudge(amount) {
      if (opts.reducedMotion) return;
      boost = Math.max(-0.2, Math.min(1, boost + amount));
    },
    look(x, y) {
      tx = x;
      ty = y;
    },
    focus(value) {
      nearTarget = Math.max(0, Math.min(1, value));
    },
    trail(x, y) {
      if (opts.reducedMotion) return;
      addMote(x, y, 36, 1.4);
      if (Math.random() < 0.5) addMote(x, y, 60, 1.1);
      wake();
    },
    burst(x, y, touch = false) {
      if (opts.reducedMotion) return;
      const n = touch ? 28 : 16;
      for (let i = 0; i < n; i++) addMote(x, y, touch ? 220 : 150, touch ? 2 : 1.5, touch ? 14 : 4);
      wake();
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      dprQuery?.removeEventListener('change', resize);
    },
  };
}
