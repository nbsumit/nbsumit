import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  drift: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let seededW = 0;
    let seededH = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const count = Math.max(36, Math.min(72, Math.round((width * height) / 48000)));
      stars = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.06;
        return {
          x: Math.random(),
          y: Math.random(),
          r: bright ? 0.9 + Math.random() * 0.25 : 0.25 + Math.random() * 0.45,
          a: bright ? 0.42 + Math.random() * 0.22 : 0.08 + Math.random() * 0.2,
          drift: 0.35 + Math.random() * 0.8,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const driftT = motion.matches ? 0 : time * 0.00000085;

      for (const star of stars) {
        const x = ((star.x + driftT * star.drift * 0.15) % 1) * width;
        const y = ((star.y + driftT * star.drift) % 1) * height;
        ctx.fillStyle = `rgba(236, 240, 244, ${star.a})`;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!motion.matches && running) {
        raf = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      const reshuffle = stars.length === 0 || Math.abs(nextW - seededW) > 80 || Math.abs(nextH - seededH) > 160;
      resize();
      if (reshuffle) {
        seed();
        seededW = nextW;
        seededH = nextH;
      }
      if (prefersReducedMotion()) {
        draw(0);
        return;
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden || prefersReducedMotion()) {
        running = false;
        cancelAnimationFrame(raf);
        return;
      }
      running = true;
      raf = requestAnimationFrame(draw);
    };

    start();
    window.addEventListener('resize', start);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', start);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', start);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
