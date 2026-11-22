import { SITE } from '../config/site';
import { SOCIALS } from '../config/socials';
import { GROUPS, PROJECTS, type Project } from '../data/projects';
import { Mark } from './Nav';

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
              I like building things, and I spend most of my time doing it. Sometimes that is a piece of software.
              Sometimes it is a product a person can use while they work, or while they apply for work. Sometimes it is
              material for someone who is studying.
            </p>
            <p>
              I work on my own. I care more about whether a thing is useful than about whether it looks ambitious. If it
              can be free, I would rather it were free. If it cannot, it should stay as affordable as it can.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="column">
          <h2>Projects</h2>
          <p className="lede">Five public things, in three kinds of work.</p>
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
              People should be literate about their rights. A useful tool, and useful knowledge, should be something a
              person can actually reach. I make products free whenever that is possible, and as affordable as I can when
              it is not.
            </p>
            <p>
              I am not interested in technology that exists only so it can be sold. It should solve a real problem.
              Something useful to a very large number of people matters more to me than something that is impressive to
              a small one.
            </p>
            <p>
              Orbis is free, and ApplyReady is free, because access is the point. GATE CS Mastery keeps its notes, past
              questions and mock tests free for the same reason. The paid sheets are there for people who want them.
              The basics are not held back.
            </p>
            <p>
              Technology and human values ought to work together. Used that way, they can lift people up. That is the
              standard I want the work to meet.
            </p>
          </div>
        </div>
      </section>

      <section id="vision" className="section">
        <div className="column column-narrow">
          <h2>Looking ahead</h2>
          <div className="prose">
            <p>These are hopes. None of them exist yet.</p>
            <p>
              I want to establish an organisation that can help as many people as possible, and I want more people to
              know their rights. I want resources and opportunities to be easier to reach. In time, I want to build a
              space company. Under all of that is a question I keep returning to: how technology, science and human
              values can work together for people.
            </p>
            <p>That is a direction, not a claim about the present.</p>
          </div>
        </div>
      </section>

      <section id="connect" className="section">
        <div className="column column-narrow">
          <h2>Connect</h2>
          <div className="prose">
            <p>
              Write to me about a collaboration, a product, an idea, a professional connection, or a project that
              matters to you. Ordinary conversation is welcome too. Mail comes to me directly.
            </p>
          </div>
          <p className="email-line">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <ul className="socials">
            {SOCIALS.map((social) => (
              <li key={social.id}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.name}
                  <span className="handle">{social.handle}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
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
        <ul className="foot-socials">
          {SOCIALS.map((social) => (
            <li key={social.id}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="foot-mail" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        <p className="copy">&copy; {year} Sumit</p>
      </div>
    </footer>
  );
}
