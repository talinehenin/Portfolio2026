"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";

const PRINT_MS = 2400;

function Section({ title, color, children }) {
  return (
    <section className="printout__section">
      <h3 className="printout__heading">
        <span className={`th-sparkle th-sparkle--sm ${color}`} aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  );
}

// The resume as a dot-matrix printout that feeds out of a printer when scrolled into view.
export default function Resume({ email, experience, projects, skills }) {
  const ref = useRef(null);
  const [status, setStatus] = useState("ready"); // ready | armed | printing | done
  const timer = useRef(null);

  const print = () => {
    clearTimeout(timer.current);
    setStatus("armed");
    // Restart the feed animation on the next frame so a reprint replays it.
    requestAnimationFrame(() => {
      setStatus("printing");
      timer.current = setTimeout(() => setStatus("done"), PRINT_MS);
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already on screen: just show it
    setStatus("armed");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect();
          print();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  const busy = status === "printing" || status === "armed";

  return (
    <div className="printer" ref={ref}>
      <div className="printer__head">
        <span className="printer__cmd">&gt; lpr resume.txt</span>
        <span className="printer__status" role="status">
          <span className={`printer__led${busy ? " is-busy" : ""}`} aria-hidden="true" />
          {busy ? "PRINTING…" : "READY"}
        </span>
      </div>
      <div className="printer__slot" aria-hidden="true" />

      <article className={`printout is-${status}`} aria-label="Resume">
        <div className="printout__paper">
          <header className="printout__header">
            <Wordmark width={180} height={48} />
            <p className="printout__name">Taline Henin</p>
            <p className="printout__contact">
              <a href={`mailto:${email}`}>{email}</a>
              <span>Greater Toronto Area, ON</span>
              <a href="https://linkedin.com/in/taline-henin" target="_blank" rel="noreferrer">linkedin.com/in/taline-henin</a>
              <a href="https://github.com/talinehenin" target="_blank" rel="noreferrer">github.com/talinehenin</a>
            </p>
          </header>

          <Section title="EDUCATION" color="is-cyan">
            <div className="printout__entry">
              <div className="printout__row">
                <strong>University of Guelph</strong>
                <span className="printout__date">SEPT 2024 — APR 2028</span>
              </div>
              <div className="printout__sub">Bachelor of Computing, Honours Computer Science, Specialization in AI</div>
            </div>
          </Section>

          <Section title="EXPERIENCE" color="is-magenta">
            {experience.map((exp) => (
              <div className="printout__entry" key={exp.company}>
                <div className="printout__row">
                  <strong>{exp.company}</strong>
                  <span className="printout__date">{exp.period}</span>
                </div>
                <div className="printout__sub">{exp.role}{exp.team ? `, ${exp.team}` : ""}</div>
                {exp.bullets.length > 0 ? (
                  <ul className="printout__list">
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                ) : (
                  <ul className="printout__list"><li>{exp.summary}</li></ul>
                )}
              </div>
            ))}
          </Section>

          <Section title="PROJECTS" color="is-phosphor">
            {projects.map((p) => (
              <div className="printout__entry" key={p.title}>
                <div className="printout__row">
                  <strong>{p.title}</strong>
                  <span className="printout__date">{p.tags.join(" · ")}</span>
                </div>
                <ul className="printout__list"><li>{p.description}</li></ul>
              </div>
            ))}
          </Section>

          <Section title="TECHNICAL SKILLS" color="is-brand">
            <dl className="printout__skills">
              {skills.map((g) => (
                <div key={g.title}>
                  <dt>{g.title}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <p className="printout__eof" aria-hidden="true">-- END OF FILE --</p>
        </div>
      </article>

      <div className="printer__actions">
        <button type="button" className="th-btn is-cyan" onClick={print} disabled={busy}>&gt; REPRINT</button>
        <a className="th-btn is-magenta" href="/Taline-Henin-Resume.pdf" download>&gt; DOWNLOAD PDF</a>
      </div>
    </div>
  );
}
