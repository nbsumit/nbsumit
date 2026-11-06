/**
 * Canvas space engine: a 3D starfield flying toward the viewer, a static deep
 * field, shooting stars and pointer stardust. Speed is eased so the page can
 * open at lightspeed and settle into a slow cruise.
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

export type SpaceEngine = {
  /** Leave lightspeed and settle into cruise. */
  arrive: () => void;
  /** Short jump to lightspeed and back. */
  jump: (ms?: number) => void;
  /** Normalised pointer target in [-1, 1]. */
  look: (x: number, y: number) => void;
  /** Leave a little stardust at a screen point. */
  trail: (x: number, y: number) => void;
  /** Scatter a handful of sparks at a screen point. */
  burst: (x: number, y: number, count?: number) => void;
  destroy: () => void;
};

type Options = {
  reducedMotion: boolean;
  /** Called every frame with the smoothed pointer offset. */
  onFrame?: (px: number, py: number, warp: number) => void;
};

const CRUISE = 0.03;
const LIGHTSPEED = 1.7;
const TINTS = [
  [236, 240, 246],
  [176, 198, 255],
  [255, 228, 200],
] as const;

export function createSpace(canvas: HTMLCanvasElement, opts: Options): SpaceEngine {
  const context = canvas.getContext('2d');
  if (!context) {
    return { arrive() {}, jump() {}, look() {}, trail() {}, burst() {}, destroy() {} };
  }
  const ctx = context;
  const deep = document.createElement('canvas');
  const deepCtx = deep.getContext('2d');

  let w = 0;
  let h = 0;
  let dpr = 1;
  let focal = 1;
  let stars: Star[] = [];
  const meteors: Meteor[] = [];
  const motes: Mote[] = [];

  let speed = opts.reducedMotion ? 0 : LIGHTSPEED;
  let target = speed;
  let warpUntil = opts.reducedMotion ? 0 : Number.POSITIVE_INFINITY;
  let arrived = opts.reducedMotion;
  let nextMeteor = 0;
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  let last = performance.now();
  let raf = 0;
  let alive = true;

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
    deep.width = Math.floor(w * dpr);
    deep.height = Math.floor(h * dpr);
    deepCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    deepCtx.clearRect(0, 0, w, h);
    const count = Math.round((w * h) / 2600);
    for (let i = 0; i < count; i++) {
      const tint = TINTS[Math.random() < 0.15 ? 1 : 0];
      const a = 0.07 + Math.random() ** 3 * 0.5;
      deepCtx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${a.toFixed(3)})`;
      const s = Math.random() < 0.97 ? 0.6 : 1.1;
      deepCtx.fillRect(Math.random() * w, Math.random() * h, s, s);
    }
  };

  const resize = () => {
    const nextW = window.innerWidth;
    const nextH = window.innerHeight;
    if (nextW === w && nextH === h) return;
    w = nextW;
    h = nextH;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    focal = Math.max(w, h) * 0.5;

    const count = Math.max(170, Math.min(640, Math.round((w * h) / 3300)));
    if (stars.length > count) stars.length = count;
    while (stars.length < count) {
      const star = {} as Star;
      spawn(star, true);
      stars.push(star);
    }
    paintDeep();
    if (opts.reducedMotion) frame(last);
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
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    const t = now / 1000;

    if (!opts.reducedMotion) {
      if (now > warpUntil) target = CRUISE;
      const ease = target > speed ? 5 : arrived ? 1.6 : 2.4;
      speed += (target - speed) * (1 - Math.exp(-dt * ease));
    }
    px += (tx - px) * (1 - Math.exp(-dt * 3));
    py += (ty - py) * (1 - Math.exp(-dt * 3));
    const warp = Math.min(1, Math.max(0, (speed - CRUISE) / (LIGHTSPEED - CRUISE)));
    opts.onFrame?.(px, py, warp);

    ctx.clearRect(0, 0, w, h);

    // Deep field: barely moves, gives the sky its density.
    ctx.globalAlpha = 1 - warp * 0.7;
    ctx.drawImage(deep, px * -6, py * -6, w, h);
    ctx.globalAlpha = 1;

    const cx = w / 2;
    const cy = h / 2;
    const trail = 0.012 + warp * 0.05;

    for (const s of stars) {
      s.z -= speed * dt;
      let sx = cx + (s.x / s.z) * focal;
      let sy = cy + (s.y / s.z) * focal;
      if (s.z <= 0.035 || sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) {
        spawn(s, false);
        continue;
      }
      const near = 1 - s.z;
      sx -= px * 26 * near;
      sy -= py * 26 * near;
      const tint = TINTS[s.tint];
      const twinkle = 0.72 + 0.28 * Math.sin(t * s.rate + s.phase);
      const alpha = Math.min(1, 0.1 + near * near * 1.4) * (warp > 0.2 ? 1 : twinkle);
      const r = s.size * (0.35 + near * 1.5);

      const bz = s.z + speed * trail;
      const bx = cx + (s.x / bz) * focal - px * 26 * (1 - bz);
      const by = cy + (s.y / bz) * focal - py * 26 * (1 - bz);
      const dx = sx - bx;
      const dy = sy - by;

      if (dx * dx + dy * dy > r * r * 4) {
        const grad = ctx.createLinearGradient(bx, by, sx, sy);
        grad.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
        grad.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},${alpha.toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.6, r * 1.4);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${alpha.toFixed(3)})`;
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
      ctx.lineCap = 'round';
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
        const tint = TINTS[p.tint];
        ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${((1 - k) * 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - k * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    if (alive && (!opts.reducedMotion || motes.length || meteors.length)) {
      raf = requestAnimationFrame(frame);
    } else {
      raf = 0;
    }
  };

  const wake = () => {
    if (!raf && alive) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const addMote = (x: number, y: number, spread: number) => {
    if (motes.length > 220) motes.shift();
    const a = Math.random() * Math.PI * 2;
    const v = Math.random() * spread;
    motes.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: 0,
      max: 0.6 + Math.random() * 0.8,
      r: 0.5 + Math.random() * 1.1,
      tint: Math.random() < 0.4 ? 1 : 0,
    });
  };

  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(frame);

  return {
    arrive() {
      arrived = true;
      warpUntil = performance.now();
    },
    jump(ms = 1100) {
      if (opts.reducedMotion) return;
      target = LIGHTSPEED;
      warpUntil = performance.now() + ms;
    },
    look(x, y) {
      tx = x;
      ty = y;
    },
    trail(x, y) {
      if (opts.reducedMotion) return;
      addMote(x, y, 24);
      if (Math.random() < 0.5) addMote(x, y, 40);
      wake();
    },
    burst(x, y, count = 18) {
      if (opts.reducedMotion) return;
      for (let i = 0; i < count; i++) addMote(x, y, 90 + Math.random() * 120);
      wake();
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    },
  };
}
