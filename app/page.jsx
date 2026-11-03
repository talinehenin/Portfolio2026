"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const EMAIL = "taline.henin@gmail.com";

// Identity colors rotate in this order so each appears about as often.
const ROTATION = ["is-cyan", "is-magenta", "is-phosphor", "is-brand", "is-sunset"];
const rot = (i) => ROTATION[i % ROTATION.length];
// Sparkles skip sunset: it's too pale on the Plastic Day background.
const SPARKLE_ROTATION = ["is-cyan", "is-magenta", "is-phosphor", "is-brand"];

const NAV = [
  { id: "experience", label: "EXPERIENCE", color: "is-cyan" },
  { id: "projects", label: "PROJECTS", color: "is-magenta" },
  { id: "skills", label: "SKILLS", color: "is-phosphor" },
  { id: "contact", label: "CONTACT", color: "is-brand" },
];

const THEMES = [
  { id: "dark", label: "NIGHT" },
  { id: "light", label: "DAY" },
  { id: "phosphor", label: "PHOSPHOR" },
];

const EXPERIENCE = [
  {
    company: "CYBRID",
    role: "Engineering Intern",
    team: "B2B Team",
    period: "MAY 2026 — SEPT 2026",
    summary: "I shipped new payout corridors and built end-to-end test coverage for a payments platform.",
    bullets: [
      "Enabled 5 new payout corridors across 4 payment rails (Hong Kong, the Netherlands, Germany, Pakistan, and Bangladesh), and generalized the SEPA integration so onboarding the next Eurozone country is a one-line change.",
      "Diagnosed and resolved a crypto-to-fiat conversion regression, and shipped account and wallet creation on the Accounts page.",
      "Built the Playwright end-to-end test suite for the portal-payments product from the ground up: 10 hermetic test cases covering recipients, payments, conversions, transaction details, and insufficient-balance guards. It was the last of the company's portals to gain E2E coverage in CI.",
      "Integrated the suite into CircleCI and the Makefile with a non-interactive auth flow that keeps CI sessions authenticated without manual OAuth login. Every merge now runs through these tests.",
      "Wrote the onboarding documentation for new engineers, pulling together setup info that had been scattered across the codebase and internal tools.",
    ],
  },
  {
    company: "INTERAC CORP.",
    role: "e-Transfer AppOps Intern",
    period: "MAY 2025 — SEPT 2025",
    summary: "I kept live e-Transfer environments healthy, from incident triage to root cause.",
    bullets: [
      "Investigated and drove resolution of production incidents in live e-Transfer environments, using Splunk for log analysis, system health monitoring, and root-cause investigation.",
      "Maintained ServiceNow runbooks and incident-response documentation, and prioritized incoming tickets alongside development and infrastructure teams, reducing resolution time for recurring issues.",
    ],
  },
  {
    company: "EDEN'S BOX",
    role: "Co-Founder & Product Lead",
    period: "MAR 2023 — SEPT 2025",
    summary: "I co-founded a startup for sustainable living, wellness, and environmental education.",
    bullets: [
      "Grew the initiative from concept to a funded, school board-recognized venture.",
      "Secured $4,000 in seed funding by pitching to business owners, investors, and community stakeholders.",
      "Built educational STEAM kit prototypes and led iterative testing, user research, and product improvements.",
    ],
  },
  {
    company: "SAP",
    role: "Software Intern",
    period: "SEPT 2023 — JAN 2024",
    summary: "I built CultureConnect, a low-code app for cultural literacy, on SAP Build.",
    bullets: [
      "Trained in AI ethics and generative AI, with a focus on responsible, human-centered systems.",
      "Ran user research and testing to iterate on CultureConnect's usability.",
      "Presented demos and findings, translating technical work into business value.",
      "Recognized by SAP's D-Shop team for innovation and social impact.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Syllaboard",
    meta: "WEB APP",
    description:
      "Turns a course-load spreadsheet into a Kanban board and a day-by-day study plan, so deadlines get spread out instead of piling up. The scheduler fills lighter days first and flags deadlines that can't fit, all in the browser.",
    tags: ["JAVASCRIPT", "SHEETJS", "HTML/CSS"],
    link: "https://syllaboard.ca",
    linkLabel: "SYLLABOARD.CA",
  },
  {
    title: "Treasure Run",
    meta: "TERMINAL GAME",
    description:
      "A Sokoban-style dungeon game: push obstacles and collect treasure across rooms linked by portals. A C engine runs under a Python MVC layer through ctypes, so the game logic is tested without the UI.",
    tags: ["C", "PYTHON", "CTYPES", "CURSES"],
    link: "https://github.com/talinehenin/Treasure-Runner",
    linkLabel: "GITHUB",
  },
  {
    title: "CultureConnect",
    meta: "2023 · LOW-CODE APP",
    description:
      "An interactive cultural-literacy app I built at SAP with SAP Build, shaped by user research and the AI ethics training from SAP's D-Shop.",
    tags: ["SAP BUILD", "UX DESIGN", "AI"],
  },
];

const SKILLS = [
  { title: "LANGUAGES", items: ["C", "C++", "PYTHON", "JAVASCRIPT", "TYPESCRIPT"] },
  { title: "WEB & BACKEND", items: ["NEXT.JS", "REACT", "TAILWIND CSS", "HTML/CSS"] },
  { title: "TOOLS & PLATFORMS", items: ["GIT", "GITHUB", "VERCEL", "DOCKER"] },
  { title: "TESTING & CI", items: ["PLAYWRIGHT", "E2E TEST DESIGN", "CIRCLECI", "REGRESSION TESTING", "TEST PLANS"] },
  { title: "MONITORING & OPS", items: ["SPLUNK", "SERVICENOW", "JIRA", "CONFLUENCE"] },
];

const COURSES = [
  "Data Structures & Algorithms",
  "Analysis & Design of Algorithms",
  "Operating Systems",
  "Software System Development & Integration",
  "Web Design",
  "AI Ethics",
  "Statistics",
  "Discrete Mathematics I & II",
  "Linear Algebra",
];

function Sparkle({ size, color, twinkle, style, className = "" }) {
  const classes = ["th-sparkle", size && `th-sparkle--${size}`, color, twinkle && "th-sparkle--twinkle", className];
  return <span className={classes.filter(Boolean).join(" ")} style={style} aria-hidden="true" />;
}

function Heading({ children, i }) {
  return (
    <h2 className="th-heading">
      <Sparkle size="xl" color={SPARKLE_ROTATION[i % 4]} />
      {children}
      <Sparkle size="sm" color={SPARKLE_ROTATION[(i + 1) % 4]} />
    </h2>
  );
}

function Pixelscape({ color, className = "" }) {
  return (
    <div className={`th-pixelscape ${color} ${className}`.trim()} aria-hidden="true">
      <span className="band" />
      <span className="ground" />
    </div>
  );
}

function Window({ title, color, raised, children }) {
  return (
    <div className={`th-window ${color}${raised ? " th-window--raised" : ""}`}>
      <div className="th-window__bar">
        <span>{title}</span>
        <span className="th-window__ctrls" aria-hidden="true"><i /><i /></span>
      </div>
      <div className="th-window__body">{children}</div>
    </div>
  );
}

function PixelRow({ count = 30 }) {
  return (
    <div className="th-pixels" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <i key={i} />)}
    </div>
  );
}

function Nav() {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const pickTheme = (t) => {
    document.documentElement.dataset.theme = t;
    setTheme(t);
    try { localStorage.setItem("theme", t); } catch {}
  };

  return (
    <nav className="th-nav site-nav" aria-label="Main">
      <a className="th-nav__logo" href="#top" aria-label="Taline Henin, back to top">
        <Wordmark width={120} height={32} />
      </a>
      <div className="th-nav__links">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={n.color} aria-current={active === n.id ? "location" : undefined}>
            {n.label}
          </a>
        ))}
      </div>
      <div className="th-theme is-brand" role="group" aria-label="Theme">
        {THEMES.map((t) => (
          <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => pickTheme(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: open the visitor's mail app with the message filled in.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Hello from ${form.name}`;
    const body = `${form.message}\n\n${form.name}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="th-field">
        <label htmlFor="c-name">NAME</label>
        <input className="th-input" id="c-name" required value={form.name} onChange={update("name")} placeholder="Your name" />
      </div>
      <div className="th-field">
        <label htmlFor="c-email">EMAIL</label>
        <input className="th-input" id="c-email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
      </div>
      <div className="th-field">
        <label htmlFor="c-message">MESSAGE</label>
        <textarea className="th-input" id="c-message" rows={4} required value={form.message} onChange={update("message")} placeholder="Hi Taline…" />
        <span className="th-field__hint">Sending opens your email app with this message ready to go.</span>
      </div>
      <div>
        <button className="th-btn is-phosphor" type="submit">&gt; SEND</button>
      </div>
    </form>
  );
}

export default function Portfolio() {
  let tagIndex = 0;

  return (
    <>
      <Nav />

      <main className="site-main" id="top">
        {/* HERO */}
        <section className="th-hero">
          <div>
            <div className="th-hero__prompt">&gt; whoami<span className="th-cursor" aria-hidden="true" /></div>
            <h1 className="th-hero__name">
              <Sparkle size="xl" color="is-cyan" twinkle className="th-hero__spark" style={{ right: -30, top: 0 }} />
              <Sparkle size="sm" color="is-magenta" className="th-hero__spark" style={{ left: "46%", bottom: -14 }} />
              <Sparkle size="lg" color="is-phosphor" twinkle className="th-hero__spark" style={{ left: -4, bottom: -20 }} />
              <Wordmark width={420} height={112} />
            </h1>
            <p className="th-hero__intro">
              I&apos;m a computer science student at the University of Guelph, specializing in AI. This past summer I shipped payout
              corridors and end-to-end tests for a payments platform at Cybrid.
            </p>
            <div className="th-hero__actions">
              <a className="th-btn is-brand" href="#projects">&gt; VIEW WORK</a>
              <a className="th-btn is-magenta" href="#contact">&gt; SAY HI</a>
            </div>
            <div className="hero-meta">
              <span className="th-tag th-tag--outline">B.COMP · CS / AI</span>
              <span className="th-tag th-tag--outline">UNIVERSITY OF GUELPH</span>
              <span className="th-tag th-tag--outline">CLASS OF 2028</span>
            </div>
          </div>
          <div className="th-hero__art" aria-hidden="true">
            <Pixelscape color="is-brand" />
            <Pixelscape color="is-cyan" />
            <Pixelscape color="is-magenta" />
            <Pixelscape color="is-phosphor" />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="site-section" id="experience">
          <Heading i={0}>Experience</Heading>
          <ol className="th-timeline">
            {EXPERIENCE.map((exp, i) => (
              <li key={exp.company} className={SPARKLE_ROTATION[i % 4]}>
                <div className="th-timeline__date">{exp.period}</div>
                <div className="th-timeline__role">{exp.role}</div>
                <div className="exp-company">{exp.company}{exp.team ? ` · ${exp.team.toUpperCase()}` : ""}</div>
                <p className="th-timeline__desc">{exp.summary}</p>
                <details className="exp-more">
                  <summary>
                    <span className="exp-more__show">MORE</span>
                    <span className="exp-more__hide">LESS</span>
                  </summary>
                  <ul className="th-sparkle-list">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>
                        <Sparkle size="sm" color={SPARKLE_ROTATION[(i + j) % 4]} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </section>

        {/* PROJECTS */}
        <section className="site-section" id="projects">
          <Heading i={1}>Projects</Heading>
          <div className="project-grid">
            {PROJECTS.map((p, i) => {
              const body = (
                <>
                  <Pixelscape color={rot(i + 3)} className="th-card__thumb" />
                  <div className="th-card__body">
                    <span className="th-card__meta">{p.meta}{p.linkLabel ? ` · ${p.linkLabel}` : ""}</span>
                    <h3 className="th-card__title">{p.title}</h3>
                    <p className="th-card__desc">{p.description}</p>
                    <div className="th-card__tags">
                      {p.tags.map((t) => <span key={t} className={`th-tag ${rot(tagIndex++)}`}>{t}</span>)}
                    </div>
                  </div>
                </>
              );
              return p.link ? (
                <a key={p.title} className="th-card" href={p.link} target="_blank" rel="noreferrer">{body}</a>
              ) : (
                <div key={p.title} className="th-card th-card--static">{body}</div>
              );
            })}
          </div>
        </section>

        {/* SKILLS & EDUCATION */}
        <section className="site-section" id="skills">
          <Heading i={2}>Skills</Heading>
          <div className="window-grid">
            {SKILLS.map((group, i) => (
              <Window key={group.title} title={group.title} color={SPARKLE_ROTATION[i % 4]}>
                <div className="tag-row">
                  {group.items.map((item, j) => <span key={item} className={`th-tag ${rot(i + j)}`}>{item}</span>)}
                </div>
              </Window>
            ))}
            <Window title="EDUCATION.TXT" color="is-sunset" raised>
              <h3 className="edu-title">University of Guelph</h3>
              <p className="edu-meta">B.COMP HONOURS CS · AI SPECIALIZATION · SEPT 2024 — APR 2028</p>
              <ul className="th-sparkle-list">
                {COURSES.map((c, i) => (
                  <li key={c}>
                    <Sparkle size="sm" color={SPARKLE_ROTATION[i % 4]} />
                    {c}
                  </li>
                ))}
              </ul>
            </Window>
          </div>
        </section>

        {/* CONTACT */}
        <section className="site-section" id="contact">
          <Heading i={3}>Say hi</Heading>
          <div className="contact-grid">
            <Window title="CONTACT.TXT" color="is-cyan">
              <p style={{ margin: 0 }}>
                Want to work together, talk about a project, or just say hello? I&apos;d love to hear from you.
              </p>
              <ul className="contact-links">
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><a href="https://linkedin.com/in/taline-henin" target="_blank" rel="noreferrer">LINKEDIN.COM/IN/TALINE-HENIN</a></li>
                <li><a href="https://github.com/talinehenin" target="_blank" rel="noreferrer">GITHUB.COM/TALINEHENIN</a></li>
                <li><span>● GREATER TORONTO AREA, ONTARIO</span></li>
              </ul>
            </Window>
            <Window title="MESSAGE" color="is-magenta">
              <ContactForm />
            </Window>
          </div>
        </section>
      </main>

      <footer className="th-footer site-footer">
        <div className="th-footer__row">
          <PixelRow count={40} />
        </div>
        <div className="th-footer__row">
          <span>© {new Date().getFullYear()} TALINE HENIN · BUILT BY HAND</span>
          <span className="th-footer__links">
            <a href="https://github.com/talinehenin" target="_blank" rel="noreferrer">GITHUB</a>
            <a href="https://linkedin.com/in/taline-henin" target="_blank" rel="noreferrer">LINKEDIN</a>
            <a href={`mailto:${EMAIL}`}>EMAIL</a>
          </span>
        </div>
      </footer>
    </>
  );
}
