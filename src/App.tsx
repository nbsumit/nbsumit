import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { createSpace, type SpaceEngine } from './space/engine';

const NB =
  'M1020 984 c0 -415 0 -415 48 -437 56 -25 214 -35 278 -18 53 14 117 57 149 101 76 103 77 345 1 460 -53 80 -198 112 -293 64 -23 -12 -45 -19 -48 -16 -3 3 -5 63 -5 134 0 128 0 128 -65 128 l-65 0 0 -416z m340 48 c78 -58 78 -282 0 -357 -35 -33 -146 -48 -189 -26 -33 18 -32 265 2 331 38 77 122 100 187 52z M583 1166 c-22 -7 -54 -23 -71 -34 -31 -23 -42 -20 -42 10 0 15 -8 18 -50 18 -50 0 -50 0 -50 -315 l0 -315 65 0 65 0 0 220 c0 219 0 219 31 255 57 65 149 71 193 12 20 -27 21 -43 24 -258 3 -229 3 -229 68 -229 l64 0 0 239 c0 294 -12 340 -103 387 -40 21 -144 27 -194 10z';

type Phase = 'load' | 'reveal' | 'idle';
type Jump = { n: number; power: number };

const SEEN_KEY = 'nb:arrived';

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function seenBefore(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable: the full intro simply plays again */
  }
}

const RAD = Math.PI / 180;
const MOON_PERIOD = 18;
const PERSPECTIVE = 1100;

/**
 * Project the moon onto the tilted ring. Mirrors the CSS pipeline exactly:
 * the orbit (rotateZ(-14deg) rotateX(72deg)) is flattened by the rig's own
 * perspective, then the rig tilt and the scene perspective are applied. The
 * moon passes behind the mark on the far side of the ring.
 */
function placeMoon(el: HTMLElement, r: number, seconds: number, px: number, py: number) {
  const a = (seconds / MOON_PERIOD) * Math.PI * 2 + Math.PI / 2;
  let x = r * Math.cos(a);
  let y = r * Math.sin(a);
  let z = 0;
  // orbit: rotateX(72deg)
  const cx = Math.cos(72 * RAD);
  const sx = Math.sin(72 * RAD);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  // orbit: rotateZ(-14deg)
  const cz = Math.cos(-14 * RAD);
  const sz = Math.sin(-14 * RAD);
  [x, y] = [x * cz - y * sz, x * sz + y * cz];
  const behind = z < 0;
  // rig perspective flattens the orbit onto the rig plane
  const k1 = PERSPECTIVE / (PERSPECTIVE - z);
  x *= k1;
  y *= k1;
  z = 0;
  // rig: rotateY(px * 10deg), then rotateX(py * -8deg)
  const ay = px * 10 * RAD;
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  const ax = py * -8 * RAD;
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  // scene perspective
  const k2 = PERSPECTIVE / (PERSPECTIVE - z);
  el.style.transform = `translate3d(${(x * k2).toFixed(2)}px, ${(y * k2).toFixed(2)}px, 0) scale(${(k1 * k2).toFixed(3)})`;
  el.classList.toggle('is-behind', behind);
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

const isActionKey = (key: string) => key === ' ' || key === 'Enter';

export function App() {
  const [still] = useState(reducedMotion);
  const [phase, setPhase] = useState<Phase>(still ? 'idle' : 'load');
  const [jump, setJump] = useState<Jump>({ n: 0, power: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const faceRef = useRef<SVGRadialGradientElement>(null);
  const engine = useRef<SpaceEngine | null>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Space engine, pointer parallax, stardust, throttle.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const root = document.documentElement.style;
    const moon = moonRef.current;
    const face = faceRef.current;
    let radius = 0;
    let markSize = 1;
    const measure = () => {
      const rig = rigRef.current;
      if (rig) {
        radius = (rig.querySelector<HTMLElement>('.orbit')?.offsetWidth ?? 0) / 2;
        markSize = rig.offsetWidth || 1;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    const born = performance.now();

    const space = createSpace(canvas, {
      reducedMotion: still,
      onFrame({ px, py, warp, charge, near }) {
        root.setProperty('--px', px.toFixed(4));
        root.setProperty('--py', py.toFixed(4));
        root.setProperty('--warp', warp.toFixed(3));
        root.setProperty('--charge', charge.toFixed(3));
        root.setProperty('--near', near.toFixed(3));
        if (face) {
          // The mark is lit from wherever the pointer is.
          face.setAttribute('cx', (960 + px * 920).toFixed(0));
          face.setAttribute('cy', (960 - py * 920).toFixed(0));
        }
        if (moon) placeMoon(moon, radius, still ? 0.6 : (performance.now() - born) / 1000, px, py);
      },
    });
    engine.current = space;

    let lastX = -1;
    let lastY = -1;
    let dragY = -1;
    const onMove = (e: globalThis.PointerEvent) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      space.look((e.clientX / W) * 2 - 1, (e.clientY / H) * 2 - 1);
      const dist = Math.hypot(e.clientX - W / 2, e.clientY - H / 2);
      space.focus(1 - dist / (markSize * 1.1));
      if (e.pointerType === 'mouse') {
        if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 7) {
          space.trail(e.clientX, e.clientY);
          lastX = e.clientX;
          lastY = e.clientY;
        }
      } else if (e.pointerType === 'touch' && dragY >= 0 && phaseRef.current !== 'load') {
        // Dragging a finger up the sky is the throttle.
        space.nudge((dragY - e.clientY) / 420);
        dragY = e.clientY;
      }
    };
    const onLeave = () => {
      space.look(0, 0);
      space.focus(0);
    };
    const onDown = (e: globalThis.PointerEvent) => {
      if (logoRef.current?.contains(e.target as Node)) return;
      if (e.pointerType === 'touch') dragY = e.clientY;
      space.burst(e.clientX, e.clientY, e.pointerType === 'mouse' ? 14 : 20);
    };
    const onUp = () => {
      dragY = -1;
    };
    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current === 'load') return;
      space.nudge(e.deltaY / 900);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const x = Math.max(-1, Math.min(1, e.gamma / 28));
      const y = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
      space.look(x, y);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('deviceorientation', onTilt, { passive: true });

    return () => {
      space.destroy();
      engine.current = null;
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('wheel', onWheel);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, [still]);

  // Loading sequence: count to 100 at lightspeed, then arrive.
  useEffect(() => {
    if (still) return;
    const minimum = seenBefore() ? 1100 : 2600;
    let ready = false;
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
    Promise.all([fonts, loaded]).then(() => {
      ready = true;
    });

    const start = performance.now();
    let raf = 0;
    let shown = -1;
    const tick = (now: number) => {
      const linear = Math.min(1, (now - start) / minimum);
      const p = Math.min(ready ? 1 : 0.94, easeInOut(linear));
      const value = Math.round(p * 100);
      if (value !== shown) {
        shown = value;
        if (countRef.current) countRef.current.textContent = String(value).padStart(3, '0');
        arcRef.current?.style.setProperty('stroke-dashoffset', String(1 - p));
      }
      if (p >= 1) {
        engine.current?.arrive();
        markSeen();
        setPhase('reveal');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [still]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const id = window.setTimeout(() => setPhase('idle'), 3400);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Hold the mark to charge, release to jump. Works for pointer and keyboard.
  const holdingRef = useRef(false);
  const press = () => {
    if (phaseRef.current !== 'idle' || holdingRef.current) return;
    holdingRef.current = true;
    engine.current?.hold(true);
  };
  const release = () => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    const power = engine.current?.hold(false) ?? 0;
    if (still) return;
    setJump((j) => ({ n: j.n + 1, power }));
    try {
      navigator.vibrate?.(power > 0.5 ? [14, 40, 26] : 10);
    } catch {
      /* no haptics */
    }
  };

  useEffect(() => {
    window.addEventListener('blur', release);
    return () => window.removeEventListener('blur', release);
    // release only touches refs and stable setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer already gone */
    }
    press();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isActionKey(e.key)) return;
    e.preventDefault();
    if (!e.repeat) press();
  };
  const onKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isActionKey(e.key)) return;
    e.preventDefault();
    release();
  };

  const kicked = jump.n > 0;
  const shockStyle = { '--power': jump.power.toFixed(3) } as CSSProperties;

  return (
    <main className={`stage is-${phase}${still ? ' is-still' : ''}`}>
      <h1 className="sr-only">nbsumit</h1>

      <div className="nebula" aria-hidden="true">
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
      </div>
      <canvas ref={canvasRef} className="sky" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="scene">
        <span ref={moonRef} className="moon" aria-hidden="true" />
        <span className="halo" aria-hidden="true" />
        <div className="flash" aria-hidden="true" />
        {kicked && <div key={jump.n} className="shock" style={shockStyle} aria-hidden="true" />}

        <div ref={rigRef} className="rig">
          <div className="orbit" aria-hidden="true">
            <svg className="ring" viewBox="0 0 200 200">
              <circle className="ring-base" cx="100" cy="100" r="98" />
              <circle ref={arcRef} className="ring-arc" cx="100" cy="100" r="98" pathLength={1} />
              <circle className="ring-charge" cx="100" cy="100" r="98" pathLength={1} />
            </svg>
          </div>

          <div className="counter" aria-hidden="true">
            <span ref={countRef}>000</span>
          </div>

          <button
            ref={logoRef}
            type="button"
            className="logo"
            onPointerDown={onPointerDown}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={release}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="nb. Hold and release to jump to lightspeed"
            tabIndex={phase === 'load' ? -1 : 0}
          >
            <svg className="mark" viewBox="0 0 192 192" aria-hidden="true">
              <defs>
                <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="0.42" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="0.58" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <radialGradient ref={faceRef} id="face" gradientUnits="userSpaceOnUse" cx="960" cy="960" r="1500">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="0.45" stopColor="#eef2fa" />
                  <stop offset="1" stopColor="#aab8d2" />
                </radialGradient>
                <mask id="nb">
                  <g transform="translate(0 192) scale(0.1 -0.1)">
                    <path fill="white" fillRule="evenodd" d={NB} />
                  </g>
                </mask>
              </defs>
              {kicked && (
                <g key={`f${jump.n}`} className="fringes" aria-hidden="true">
                  <g className="fringe fringe-r">
                    <g transform="translate(0 192) scale(0.1 -0.1)">
                      <path fill="#ff6a8a" fillRule="evenodd" d={NB} />
                    </g>
                  </g>
                  <g className="fringe fringe-b">
                    <g transform="translate(0 192) scale(0.1 -0.1)">
                      <path fill="#62a8ff" fillRule="evenodd" d={NB} />
                    </g>
                  </g>
                </g>
              )}
              <g key={`g${jump.n}`} className={kicked ? 'glyphs kicked' : 'glyphs'}>
                <g transform="translate(0 192) scale(0.1 -0.1)">
                  <path className="glyph-fill" fill="url(#face)" fillRule="evenodd" d={NB} />
                  <path className="glyph-line" fill="none" d={NB} pathLength={1} />
                </g>
              </g>
              <g mask="url(#nb)">
                <rect className="sweep" x="0" y="0" width="192" height="192" fill="url(#sheen)" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
