import { useEffect, useRef } from 'react';
import { Starfield } from './components/Starfield';
import { SITE_CONFIG } from './config/site';

function Horizon() {
  return (
    <div className="limb">
      <p className="domain">{SITE_CONFIG.domain}</p>
      <svg className="horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="limb-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="18%" stopColor="#d5e2f2" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="82%" stopColor="#d5e2f2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="limb-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10161e" />
            <stop offset="22%" stopColor="#07090c" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <filter id="limb-glow" x="-8%" y="-80%" width="116%" height="260%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <path
          d="M-120 168 C 240 18, 1200 18, 1560 168 L 1560 260 L -120 260 Z"
          fill="url(#limb-body)"
        />
        <path
          d="M-120 168 C 240 18, 1200 18, 1560 168"
          fill="none"
          stroke="#a9c0dc"
          strokeWidth="5"
          filter="url(#limb-glow)"
          opacity="0.7"
        />
        <path
          d="M-120 168 C 240 18, 1200 18, 1560 168"
          fill="none"
          stroke="url(#limb-stroke)"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

export function App() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    if (reduce.matches || !fine.matches) return;

    let frame = 0;
    let running = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.065;
      cy += (ty - cy) * 0.065;
      root.style.setProperty('--px', cx.toFixed(4));
      root.style.setProperty('--py', cy.toFixed(4));
      if (Math.abs(tx - cx) < 0.0006 && Math.abs(ty - cy) < 0.0006) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX / window.innerWidth - 0.5;
      ty = event.clientY / window.innerHeight - 0.5;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <main ref={rootRef} className="void">
      <div className="atmosphere" aria-hidden="true" />
      <Starfield />
      <div className="vignette" aria-hidden="true" />
      <div className="hero-lockup">
        <div className="mark">
          <div className="halo" aria-hidden="true" />
          <div className="orbit-slot" aria-hidden="true">
            <svg className="orbit" viewBox="0 0 400 400">
              <ellipse className="orbit-path" cx="200" cy="200" rx="168" ry="72" pathLength="100" />
              <ellipse className="orbit-tail" cx="200" cy="200" rx="168" ry="72" pathLength="100" />
              <ellipse className="orbit-glint" cx="200" cy="200" rx="168" ry="72" pathLength="100" />
            </svg>
          </div>
          <div className="flare" aria-hidden="true" />
          <img className="logo logo-n" src="/nb-mark.png" alt="nb" width={192} height={192} draggable={false} decoding="async" />
          <img className="logo logo-b" src="/nb-mark.png" alt="" width={192} height={192} draggable={false} decoding="async" aria-hidden="true" />
        </div>
        <h1 className="soon">Coming soon</h1>
      </div>
      <Horizon />
    </main>
  );
};

export default App;
