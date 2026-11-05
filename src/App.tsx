import { Starfield } from './components/Starfield';
import { SITE_CONFIG } from './config/site';

function Horizon() {
  return (
    <div className="limb">
      <p className="domain">{SITE_CONFIG.domain}</p>
      <div className="arc" aria-hidden="true" />
    </div>
  );
}

export function App() {
  return (
    <main className="void">
      <Starfield />
      <div className="vignette" aria-hidden="true" />
      <div className="hero">
        <div className="mark">
          <div className="halo" aria-hidden="true" />
          <div className="orbit-slot" aria-hidden="true">
            <svg className="orbit" viewBox="0 0 400 400">
              <ellipse className="orbit-path" cx="200" cy="200" rx="172" ry="86" pathLength="100" />
              <ellipse className="orbit-tail" cx="200" cy="200" rx="172" ry="86" pathLength="100" />
              <ellipse className="orbit-glint" cx="200" cy="200" rx="172" ry="86" pathLength="100" />
            </svg>
          </div>
          <div className="flare" aria-hidden="true" />
          <img
            className="logo"
            src="/nb-mark.png"
            alt="nb"
            width={192}
            height={192}
            draggable={false}
            decoding="async"
          />
        </div>
        <h1 className="soon">Coming soon</h1>
      </div>
      <Horizon />
    </main>
  );
}

export default App;
