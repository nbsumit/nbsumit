const NB =
  'M1020 984 c0 -415 0 -415 48 -437 56 -25 214 -35 278 -18 53 14 117 57 149 101 76 103 77 345 1 460 -53 80 -198 112 -293 64 -23 -12 -45 -19 -48 -16 -3 3 -5 63 -5 134 0 128 0 128 -65 128 l-65 0 0 -416z m340 48 c78 -58 78 -282 0 -357 -35 -33 -146 -48 -189 -26 -33 18 -32 265 2 331 38 77 122 100 187 52z M583 1166 c-22 -7 -54 -23 -71 -34 -31 -23 -42 -20 -42 10 0 15 -8 18 -50 18 -50 0 -50 0 -50 -315 l0 -315 65 0 65 0 0 220 c0 219 0 219 31 255 57 65 149 71 193 12 20 -27 21 -43 24 -258 3 -229 3 -229 68 -229 l64 0 0 239 c0 294 -12 340 -103 387 -40 21 -144 27 -194 10z';

export function App() {
  return (
    <main className="void">
      <div className="logo" role="img" aria-label="nb" tabIndex={0}>
        <div className="halo" aria-hidden="true" />
        <svg className="mark" viewBox="0 0 192 192" aria-hidden="true">
          <g transform="translate(0 192) scale(0.1 -0.1)" fill="#ffffff">
            <path fillRule="evenodd" d={NB} />
          </g>
          <rect className="sweep" x="0" y="0" width="192" height="192" fill="url(#sheen)" mask="url(#nb)" />
          <defs>
            <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.42" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="0.58" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <mask id="nb">
              <g transform="translate(0 192) scale(0.1 -0.1)">
                <path fill="white" fillRule="evenodd" d={NB} />
              </g>
            </mask>
          </defs>
        </svg>
      </div>
    </main>
  );
}

export default App;
