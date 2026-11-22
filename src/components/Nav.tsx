import { useEffect, useId, useState } from 'react';
import { SITE } from '../config/site';

const MARK =
  'M1020 984 c0 -415 0 -415 48 -437 56 -25 214 -35 278 -18 53 14 117 57 149 101 76 103 77 345 1 460 -53 80 -198 112 -293 64 -23 -12 -45 -19 -48 -16 -3 3 -5 63 -5 134 0 128 0 128 -65 128 l-65 0 0 -416z M1360 1032 c78 -58 78 -282 0 -357 -35 -33 -146 -48 -189 -26 -33 18 -32 265 2 331 38 77 122 100 187 52z M583 1166 c-22 -7 -54 -23 -71 -34 -31 -23 -42 -20 -42 10 0 15 -8 18 -50 18 -50 0 -50 0 -50 -315 l0 -315 65 0 65 0 0 220 c0 219 0 219 31 255 57 65 149 71 193 12 20 -27 21 -43 24 -258 3 -229 3 -229 68 -229 l64 0 0 239 c0 294 -12 340 -103 387 -40 21 -144 27 -194 10z';

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 192 192" aria-hidden="true">
      <g transform="translate(0 192) scale(0.1 -0.1)">
        <path fill="currentColor" fillRule="evenodd" d={MARK} />
      </g>
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${solid || open ? ' is-solid' : ''}`}>
      <a className="nav-mark" href="#top" onClick={close}>
        <Mark />
        <span className="sr-only">Sumit, back to top</span>
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id={panelId} className={open ? 'nav-panel is-open' : 'nav-panel'} aria-label="Primary">
        {SITE.nav.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
