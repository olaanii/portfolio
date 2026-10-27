import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollDog from '@/components/ScrollDog';
import styles from './page.module.css';

const projects = [
  {
    number: '01',
    name: 'Veyra',
    href: 'https://github.com/olaanii/veyra',
    description: 'An AI-assisted workbench that turns a project brief into architecture, technology options, and actionable implementation tasks.',
    tags: ['TypeScript', 'AI', 'Productivity'],
  },
  {
    number: '02',
    name: 'Afan Oromo Programming Language',
    href: 'https://github.com/olaanii/afan-oromo-PL',
    description: 'A team-built beginner language that translates Afan Oromo source files into Python through a lexer, parser, type checker, and code generator.',
    tags: ['Python', 'Compiler', 'Afan Oromo'],
  },
  {
    number: '03',
    name: 'FLUXX NFT Marketplace',
    href: 'https://github.com/olaanii/Fluxx---NFT-Minting-and-Marketplace',
    description: 'A Sepolia testnet NFT minting and marketplace project with tiered rarity, wallet connection, and IPFS-hosted metadata.',
    tags: ['Next.js', 'Solidity', 'IPFS'],
  },
  {
    number: '04',
    name: 'BIRR Blockchain',
    href: 'https://github.com/olaanii/birr',
    description: 'A Go blockchain prototype with delegated authority consensus, peer-to-peer networking, a custom VM, and a JSON-RPC API.',
    tags: ['Go', 'Dart', 'Blockchain'],
  },
];

const stack: [string, string[]][] = [
  ['Languages', ['Dart', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Solidity']],
  ['Mobile', ['Flutter', 'Dart']],
  ['Web', ['Next.js', 'React', 'TypeScript', 'CSS']],
  ['Blockchain', ['Solidity', 'Hardhat', 'Wagmi', 'IPFS']],
  ['Systems', ['Go', 'P2P networking', 'JSON-RPC', 'Docker']],
];

function VerifiedBadge() {
  return (
    <svg className={styles.verified} viewBox="0 0 20 20" role="img" aria-label="Verified">
      <path d="M10 0.8 12.2 2.1 14.8 1.8 16.1 4.1 18.4 5.2 18.1 7.8 19.2 10 18.1 12.2 18.4 14.8 16.1 15.9 14.8 18.2 12.2 17.9 10 19.2 7.8 17.9 5.2 18.2 3.9 15.9 1.6 14.8 1.9 12.2 0.8 10 1.9 7.8 1.6 5.2 3.9 4.1 5.2 1.8 7.8 2.1Z" fill="currentColor" />
      <path d="m6.1 10.2 2.5 2.5 5.3-5.4" fill="none" stroke="var(--background)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hatch({ dog = false }: { dog?: boolean }) {
  return <div className={styles.hatch}>{dog && <span className={styles.peekDog} aria-hidden="true" />}</div>;
}

export default function Home() {
  return (
    <main className={styles.site} id="top">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="Olani Shambel home"><span>O</span></a>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="#work">Work</a><a href="#stack">Stack</a><a href="#about">About</a><a href="#contact">Contact</a>
          </nav>
          <div className={styles.headerActions}>
            <a className={styles.headerIcon} href="https://github.com/olaanii" aria-label="GitHub" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2.1v3.1c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Image className={styles.avatar} src="/olani-shambel.jpg" alt="Portrait of Olani Shambel" width={112} height={112} priority />
            <h1 className={styles.name} id="hero-title">Olani Shambel <VerifiedBadge /></h1>
            <p className={styles.tagline}>Flutter developer · Web3 and AI</p>
            <div className={styles.socials} aria-label="Social links">
              <a href="https://x.com/OlaaniiS" aria-label="X" title="X" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.5l7.3-8.4L1.9 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z" /></svg></a>
              <a href="https://github.com/olaanii" aria-label="GitHub" title="GitHub" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2.1v3.1c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg></a>
              <a href="https://t.me/c_O_d_e_r" aria-label="Telegram (@c_O_d_e_r)" title="Telegram (@c_O_d_e_r)" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 4.2 18.6 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6 13.5l-4.9-1.6c-1.1-.3-1.1-1.1.2-1.6L20.4 2.8c.9-.3 1.7.2 1.4 1.4Z" /></svg></a>
              <span className={styles.socialDivider} aria-hidden="true" />
              <a className={styles.resume} href="#contact" aria-label="Résumé — request a copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.8h8l4 4v5M14 2.8v4h4M6 2.8v18.4h7M4 21.2h11.5M8.5 11h5M8.5 14.5h5M8.5 18h3M19 14v8m-3-3 3 3 3-3" /></svg><span>Résumé</span></a>
            </div>
          </div>
          <figure className={styles.figure} aria-label="Responsive app layout illustration">
            <div className={styles.device}><div className={styles.deviceInside}><div className={styles.phoneContent}><i /><b /><div><span /><span /></div><em /></div></div></div>
            <figcaption>Fig. 1 · one codebase · <span>phone / tablet / desktop</span></figcaption>
          </figure>
        </div>
      </section>

      <Hatch dog />

      <section className={styles.intro} id="about">
        <div className={styles.sectionGrid}>
          <div className={styles.sectionLabel}><span>Akkam,</span><p>A little about me</p></div>
          <div className={styles.introBody}>
            <ul>
              <li>I’m Olani Shambel, a Flutter developer based in Adama, Ethiopia. I build cross-platform mobile and web applications.</li>
              <li>My work spans Flutter and Dart, TypeScript web projects, and experiments in Web3 and AI.</li>
              <li>I enjoy taking an idea from interface and data model through to a usable product.</li>
              <li>Open to freelance projects and thoughtful collaborations.</li>
            </ul>
            <div className={styles.metaLine}><span>Freelance Flutter developer</span><span>Adama, Ethiopia</span><span>Remote collaborations</span></div>
          </div>
        </div>
      </section>

      <Hatch />

      <section className={styles.section} id="work">
        <div className={styles.sectionGrid}>
          <div className={styles.sectionLabel}><h2>Work <sup>(04)</sup></h2><p>Selected projects from my public repositories.</p></div>
          <div className={styles.rows}>{projects.map((project) => <article className={styles.row} key={project.number}>
            <span className={styles.number}>{project.number}</span>
            <div className={styles.rowContent}><div className={styles.rowHeading}><h3>{project.name}</h3><a href={project.href} target="_blank" rel="noreferrer">GitHub ↗</a></div><p>{project.description}</p><div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          </article>)}</div>
        </div>
      </section>

      <Hatch />

      <section className={styles.section} id="stack">
        <div className={styles.sectionGrid}>
          <div className={styles.sectionLabel}><h2>Stack</h2><p>Grouped by what it does.</p></div>
          <div className={styles.rows}>{stack.map(([category, skills]) => <div className={styles.stackRow} key={category}><h3>{category}</h3><div className={styles.tags}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
        </div>
      </section>

      <Hatch />

      <section className={styles.section}>
        <div className={styles.sectionGrid}>
          <div className={styles.sectionLabel}><h2>Focus</h2><p>What I’m exploring through projects.</p></div>
          <div className={styles.rows}>
            <article className={styles.row}><span className={styles.number}>01</span><div className={styles.rowContent}><h3>Cross-platform apps</h3><p>Flutter and Dart for mobile and web experiences, with attention to usable interfaces and practical delivery.</p><div className={styles.tags}><span>Flutter</span><span>Dart</span></div></div></article>
            <article className={styles.row}><span className={styles.number}>02</span><div className={styles.rowContent}><h3>AI-assisted development</h3><p>Veyra explores turning a project brief into architecture, technology choices, and clear implementation tasks.</p><div className={styles.tags}><span>Veyra</span><span>TypeScript</span><span>AI</span></div></div></article>
            <article className={styles.row}><span className={styles.number}>03</span><div className={styles.rowContent}><h3>Web3 experiments</h3><p>FLUXX and BIRR explore blockchain, wallet integration, and decentralized application concepts.</p><div className={styles.tags}><span>Solidity</span><span>Go</span><span>Web3</span></div></div></article>
          </div>
        </div>
      </section>

      <Hatch />

      <footer className={styles.contact} id="contact">
        <div className={styles.contactInner}>
          <p className={styles.eyebrow}>akkam is hello in Afan Oromo.</p>
          <h2>Have an app in mind? Say akkam.</h2>
          <p className={styles.contactLead}>Tell me what you want to build and I’ll reply with a plan and a quote.</p>
          <div className={styles.contactLinks}>
            <a href="https://github.com/olaanii" target="_blank" rel="noreferrer"><span>GITHUB</span><b>@olaanii ↗</b></a>
            <a href="https://x.com/OlaaniiS" target="_blank" rel="noreferrer"><span>X</span><b>@OlaaniiS ↗</b></a>
            <a href="https://t.me/c_O_d_e_r" target="_blank" rel="noreferrer"><span>TELEGRAM</span><b>@c_O_d_e_r ↗</b></a>
          </div>
          <div className={styles.copyright}><span>Olani Shambel · Freelance Flutter developer</span><span>© {new Date().getFullYear()}</span></div>
        </div>
      </footer>
      <ScrollDog />
    </main>
  );
}
