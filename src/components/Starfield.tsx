import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  phase: number;
  drift: number;
  cool: boolean;
  glow: boolean;
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
      const count = Math.max(56, Math.min(150, Math.round((width * height) / 22000)));
      stars = Array.from({ length: count }, () => {
        const glow = Math.random() < 0.045;
        const bright = glow || Math.random() < 0.06;
        return {
          x: Math.random(),
          y: Math.random(),
          r: glow ? 1.15 + Math.random() * 0.45 : bright ? 0.9 : 0.3 + Math.random() * 0.65,
          a: bright ? 0.72 + Math.random() * 0.28 : 0.16 + Math.random() * 0.38,
          phase: Math.random() * Math.PI * 2,
          drift: 0.45 + Math.random() * 1.15,
          cool: Math.random() < 0.18,
          glow,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const reduce = motion.matches;
      const driftT = reduce ? 0 : time * 0.0000032;

      for (const star of stars) {
        const x = ((star.x + driftT * star.drift * 0.22) % 1) * width;
        const y = ((star.y + driftT * star.drift) % 1) * height;
        const twinkle = reduce || !star.glow ? 1 : 0.78 + 0.22 * Math.sin(time * 0.00045 + star.phase);
        const alpha = star.a * twinkle;
        const color = star.cool ? '198, 216, 234' : '238, 243, 248';

        if (star.glow) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, star.r * 7);
          glow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          glow.addColorStop(0.35, `rgba(${color}, ${alpha * 0.35})`);
          glow.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, star.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce && running) {
        raf = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      const reshuffle = stars.length === 0 || Math.abs(nextW - seededW) > 64 || Math.abs(nextH - seededH) > 140;
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
