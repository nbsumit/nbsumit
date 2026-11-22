import type { SVGProps } from 'react';
import { SITE } from '../config/site';
import { SOCIALS, type SocialLink } from '../config/socials';
import { GROUPS, PROJECTS, type Project } from '../data/projects';
import { Mark } from './Nav';

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

function SocialIcon({ id }: { id: SocialLink['id'] }) {
  if (id === 'github') {
    return (
      <Icon fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </Icon>
    );
  }
  if (id === 'linkedin') {
    return (
      <Icon fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </Icon>
    );
  }
  if (id === 'instagram') {
    return (
      <Icon fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
      </Icon>
    );
  }
  if (id === 'x') {
    return (
      <Icon fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </Icon>
    );
  }
  return (
    <Icon fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </Icon>
  );
}

function SocialList({ showHandle = false }: { showHandle?: boolean }) {
  return (
    <ul className={showHandle ? 'socials' : 'socials socials-names'}>
      {SOCIALS.map((social) => (
        <li key={social.id}>
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            <SocialIcon id={social.id} />
            <span className="social-name">{social.name}</span>
            {showHandle ? <span className="handle">{social.handle}</span> : null}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function External({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className="project" id={project.id}>
      {project.image && (
        <figure className="shot">
          <img
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
      )}
      <div className="project-copy">
        <h4>{project.name}</h4>
        <p className="summary">{project.summary}</p>
        <p>{project.body}</p>
        <p className="status">{project.status}</p>
        <p className="actions">
          <External href={project.url}>{project.action}</External>
          {project.links?.map((link) => (
            <External key={link.href} href={link.href}>
              {link.label}
            </External>
          ))}
        </p>
      </div>
    </article>
  );
}

export function Site() {
  return (
    <>
      <section id="about" className="section" tabIndex={-1}>
        <div className="column">
          <h2>About</h2>
          <div className="prose">
            <p>
              Most of what I make starts as an idea I want to try. The part I care about is whether it becomes something
              a person can use.
            </p>
            <p>
              I work on my own. Useful matters more to me than impressive. When a product can be free, I keep it free.
              When it cannot, I keep it as affordable as the work allows.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="column">
          <h2>Projects</h2>
          <p className="lede">Software, one venture, and an educational project.</p>
          {GROUPS.map((group) => {
            const items = PROJECTS.filter((project) => project.group === group.id);
            return (
              <div className="group" key={group.id}>
                <h3 className="group-title">{group.title}</h3>
                {group.intro && <p className="group-intro">{group.intro}</p>}
                <div className={group.id === 'software' ? 'pair' : 'stack'}>
                  {items.map((project) => (
                    <ProjectBlock key={project.id} project={project} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="philosophy" className="section">
        <div className="column column-narrow">
          <h2>Philosophy</h2>
          <p className="belief">
            I believe technology should make life easier, knowledge more accessible, and opportunities less dependent
            on someone's financial circumstances.
          </p>
          <div className="prose">
            <p>
              People should know their rights, and they should be able to reach useful knowledge, useful tools and real
              opportunities.
            </p>
            <p>
              I keep what I build free when I can, and as affordable as I can when I cannot. Orbis is meant to make
              geospatial tools easier to reach. ApplyReady is free. GATE CS Mastery keeps a substantial share of its
              study material free. Bittyfy is meant to put practical digital tools within reach of small businesses.
            </p>
            <p>
              I am not interested in technology that exists only to be sold. It should solve a real problem. Something
              useful to many people matters more to me than something that only looks impressive.
            </p>
            <p>Technology and human values should work together. That is the standard I want the work to meet.</p>
          </div>
          <p className="motto">
            <span className="sr-only">Personal motto. </span>
            Be kind
          </p>
        </div>
      </section>

      <section id="vision" className="section">
        <div className="column column-narrow">
          <h2>Looking ahead</h2>
          <div className="prose">
            <p>None of this exists yet.</p>
            <p>
              I want to establish an NGO that can help as many people as possible, and I want more people to understand
              their rights. I want knowledge and opportunities to be easier to reach. Further out, I want to build a
              space company. Through all of it, I want technology and human values to work together for people.
            </p>
          </div>
        </div>
      </section>

      <section id="connect" className="section">
        <div className="column column-narrow">
          <h2>Connect</h2>
          <div className="prose">
            <p>
              Write to me about a collaboration, a product, an idea, or a professional connection. Ordinary conversation
              is welcome too.
            </p>
          </div>
          <p className="email-line">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <SocialList showHandle />
        </div>
      </section>

    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="column foot-grid">
        <a className="foot-brand" href="#top">
          <Mark />
          <span>Sumit</span>
          <span className="handle">nbsumit</span>
        </a>
        <nav aria-label="Footer">
          {SITE.nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <SocialList />
        <a className="foot-mail" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        <p className="foot-motto">Be kind</p>
        <p className="copy">&copy; {year} Sumit</p>
      </div>
    </footer>
  );
}
