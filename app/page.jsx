"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = ["Home", "Experience", "Projects", "Skills", "Contact"];

const EXPERIENCE = [
  {
    id: 1,
    company: "Cybrid",
    role: "Engineering Intern — B2B Team",
    period: "May 2026 – Sept 2026",
    color: "#73D4FC",
    icon: "💸",
    bullets: [
      "Enabled 5 new payout corridors across 4 payment rails (Hong Kong, the Netherlands, Germany, Pakistan, and Bangladesh), and generalized the SEPA integration so onboarding the next Eurozone country is a one-line change.",
      "Diagnosed and resolved a crypto-to-fiat conversion regression, and shipped account and wallet creation on the Accounts page.",
      "Built the Playwright end-to-end test suite for the portal-payments product from the ground up — 10 hermetic test cases covering recipients, payments, conversions, transaction details, and insufficient-balance guards — making it the last of the company's portals to gain E2E coverage in CI.",
      "Integrated the suite into CircleCI and the Makefile with a non-interactive auth flow that keeps CI sessions authenticated without manual OAuth login; every merge now runs through these tests.",
      "Authored the onboarding documentation for new engineers, consolidating setup info previously scattered across the codebase and internal tools.",
    ],
  },
  {
    id: 2,
    company: "Interac Corp.",
    role: "e-Transfer AppOps Intern",
    period: "May 2025 – Sept 2025",
    color: "#FFB92A",
    icon: "/images/Interac_logo.png",
    bullets: [
      "Investigated and drove resolution of production incidents in live e-Transfer environments, using Splunk for log analysis, system health monitoring, and root-cause investigation.",
      "Maintained ServiceNow runbooks and incident-response documentation, and prioritized incoming tickets alongside development and infrastructure teams — reducing resolution time for recurring issues.",
    ],
  },
  {
    id: 3,
    company: "Eden's Box",
    role: "Co-Founder & Product Lead",
    period: "Mar 2023 – Sept 2025",
    color: "#FC7373",
    icon: "📦",
    bullets: [
      "Co-founded an impact-driven startup centered on sustainable living, wellness, and environmental education, growing it from concept to a funded, school board-recognized venture.",
      "Secured $4,000 in seed funding through competitive pitching to business owners, investors, and community stakeholders, validating the product's market potential.",
      "Built educational STEAM kit prototypes and led iterative testing, user research, and product improvements.",
    ],
  },
  {
    id: 4,
    company: "SAP Inc.",
    role: "Software Internship",
    period: "Sept 2023 – Jan 2024",
    color: "#006BB8",
    icon: "/images/Sap_logo.png",
    bullets: [
      "Built CultureConnect from the ground up on SAP Build — a low-code/no-code app designed to bridge cultural literacy gaps.",
      "Trained in AI Ethics and Generative AI with a focus on building responsible, human-centered AI systems.",
      "Experimented with VR and RAUM technologies to find new ways to streamline team workflows.",
      "Conducted user research and testing to iterate on the CultureConnect experience, integrating feedback to enhance usability and engagement.",
      "Presented project demos and findings, translating technical work into clear business value.",
      "Recognized by SAP's D-Shop team for driving innovation and delivering meaningful social impact.",
    ],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Treasure Run",
    period: "C · Python · ctypes · curses",
    color: "#E8FC73",
    icon: "🗝️",
    link: "https://github.com/talinehenin/Treasure-Runner",
    description: [
      "Sokoban-style terminal dungeon game: push obstacles and collect treasure across interconnected rooms linked by portals, with run progress and profile stats persisted to JSON between sessions.",
      "Built as a two-language system — room, player, and pushable-object state live in a C core exposed to a Python runtime through ctypes bindings, with an explicit boundary for struct layout and memory ownership.",
      "Structured the Python side as MVC (a model wrapping the C engine, a controller owning game flow, and a curses view handling rendering) so engine and game logic are covered by an assertion-based test suite without starting the UI.",
    ],
    tags: ["C", "Python", "ctypes", "curses", "MVC", "Testing"],
  },
  {
    id: 2,
    title: "CultureConnect",
    period: "Sept 2023 – Jan 2024",
    color: "#C473FC",
    icon: "🌍",
    description:
      "Developed an interactive cultural literacy application using SAP Build low-code tools. Integrated UX design with AI-driven insights learned during D-Shop training.",
    tags: ["SAP Build", "Low-Code", "UX Design", "AI"],
  },
];

const SKILLS = {
  languages: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  web: ["Next.js", "React", "Tailwind CSS", "HTML/CSS"],
  tools: ["Git", "GitHub", "Vercel", "Docker"],
  testing: [
    "Playwright", "End-to-End Test Design", "CI/CD Integration (CircleCI)",
    "Regression Testing", "Test Plan Authoring",
  ],
  operations: ["Splunk", "ServiceNow", "Jira", "Confluence"],
  knowledge: [
    "AI Ethics", "Algorithms & Data Structures", "System Monitoring",
    "Incident Response", "Payments Infrastructure", "Agile Workflows",
    "LLMs", "Operating Systems",
  ],
};

const SKILL_TABS = [
  { key: "languages", label: "Languages" },
  { key: "web", label: "Web & Backend" },
  { key: "tools", label: "Tools & Platforms" },
  { key: "testing", label: "Testing & CI" },
  { key: "operations", label: "Monitoring & Ops" },
  { key: "knowledge", label: "Knowledge" },
  { key: "courses", label: "Courses" },
];

const TAG_COLORS = ["#E8FC73", "#73D4FC", "#FC7373", "#C473FC"];

const COURSES = [
  "Data Structures & Algorithms",
  "Analysis & Design of Algorithms",
  "Operating Systems",
  "Software System Dev & Integration",
  "Web Design",
  "AI Ethics",
  "Statistics",
  "Discrete I & II",
  "Linear Algebra",
];

function useSpring(target, stiffness = 0.08, damping = 0.82) {
  const ref = useRef({ value: target, velocity: 0 });
  const [val, setVal] = useState(target);
  useEffect(() => {
    let raf;
    const tick = () => {
      const s = ref.current;
      const force = (target - s.value) * stiffness;
      s.velocity = (s.velocity + force) * damping;
      s.value += s.velocity;
      if (Math.abs(s.velocity) > 0.01 || Math.abs(target - s.value) > 0.01) {
        setVal(s.value);
        raf = requestAnimationFrame(tick);
      } else {
        s.value = target;
        setVal(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, stiffness, damping]);
  return val;
}

function CursorBlob() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const sx = useSpring(pos.x, 0.05, 0.76);
  const sy = useSpring(pos.y, 0.05, 0.76);
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        left: sx - 140,
        top: sy - 140,
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "radial-gradient(circle, #73d3fc6c 0%, #00025d0f 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(30px)",
      }}
    />
  );
}

function MagneticButton({ children, onClick, style }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ox = useSpring(offset.x, 0.15, 0.7);
  const oy = useSpring(offset.y, 0.15, 0.7);
  const handleMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  }, []);
  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onClick={onClick}
      style={{ ...style, transform: `translate(${ox}px, ${oy}px)`, transition: "background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s" }}
    >
      {children}
    </button>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function ExpandableCard({ item, isExpanded, onToggle, type }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      style={{ cursor: "pointer", borderBottom: "1px solid #1a1a1a", padding: "24px 0", transition: "background 0.3s", background: hovered ? "rgba(255,255,255,0.015)" : "transparent" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 26, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, background: `${item.color}14`, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "rotate(8deg) scale(1.08)" : "none", flexShrink: 0 }}>
            {item.icon.startsWith("/") ? <img src={item.icon} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} /> : item.icon}
          </span>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: "#f0f0f0", margin: 0 }}>
              {type === "experience" ? item.company : item.title}
            </h3>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#666", letterSpacing: 0.6 }}>
              {type === "experience" ? item.role : item.period}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#444" }}>
            {type === "experience" ? item.period : ""}
          </span>
          <span style={{ fontSize: 18, color: item.color, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", fontWeight: 300 }}>
            +
          </span>
        </div>
      </div>
      <div style={{ maxHeight: isExpanded ? 1200 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s", opacity: isExpanded ? 1 : 0 }}>
        <div style={{ paddingTop: 18, paddingLeft: 62 }}>
          {type === "experience" ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {item.bullets.map((b, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#888", marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, top: 10, width: 4, height: 4, borderRadius: "50%", background: item.color, opacity: 0.6 }} />
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <>
              {(Array.isArray(item.description) ? item.description : [item.description]).map((d, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#888", maxWidth: 640, margin: "0 0 14px 0" }}>
                  {d}
                </p>
              ))}
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1, color: item.color, textDecoration: "none", marginBottom: 14 }}>
                  VIEW ON GITHUB →
                </a>
              )}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {item.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 0.6, padding: "4px 10px", borderRadius: 20, border: `1px solid ${item.color}40`, color: item.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TagCloud({ items, colors }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {items.map((item, i) => (
        <span
          key={item}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 0.5, padding: "6px 14px", borderRadius: 24,
            border: `1px solid ${hoveredIdx === i ? colors[i % colors.length] : "#222"}`,
            color: hoveredIdx === i ? "#f0f0f0" : "#666",
            background: hoveredIdx === i ? `${colors[i % colors.length]}18` : "transparent",
            cursor: "default", transition: "all 0.3s ease", transform: hoveredIdx === i ? "scale(1.08)" : "scale(1)",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const inputStyle = (field) => ({
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1px solid ${focused === field ? "#E8FC73" : "#282828"}`,
    padding: "12px 0", color: "#eee", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", transition: "border-color 0.3s", marginBottom: 24,
  });
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
    }
  };
  return sent ? (
    <div style={{ textAlign: "center", padding: 40, fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#591d7e" }}>
      Message sent ✦
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", marginTop: 8 }}>I'll get back to you soon.</p>
    </div>
  ) : (
    <div style={{ maxWidth: 460 }}>
      <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={inputStyle("name")} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={inputStyle("email")} />
      <textarea placeholder="Tell me about your project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} rows={4} style={{ ...inputStyle("message"), resize: "vertical" }} />
      <MagneticButton onClick={handleSubmit} style={{ background: "#854ecd", color: "#0a0a0a", border: "none", padding: "13px 36px", borderRadius: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, cursor: "pointer", fontWeight: 500 }}>
        SEND MESSAGE →
      </MagneticButton>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#444" }}>
      {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })} — Local Time
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedExp, setExpandedExp] = useState(null);
  const [expandedProj, setExpandedProj] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("languages");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { const idx = sectionRefs.current.indexOf(e.target); if (idx !== -1) setActiveSection(idx); } }); },
      { threshold: 0.35 }
    );
    sectionRefs.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  const headerOpacity = Math.min(scrollY / 200, 0.92);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#0b0b0b;color:#f0f0f0;overflow-x:hidden}
        ::selection{background:#E8FC73;color:#0a0a0a}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#282828;border-radius:3px}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(3deg)}}
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}30%{transform:translate(3%,-15%)}50%{transform:translate(-10%,5%)}70%{transform:translate(8%,10%)}90%{transform:translate(-3%,-5%)}}
      `}</style>

      <div style={{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none",opacity:0.025,background:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",animation:"grain 0.5s steps(1) infinite"}} />
      <CursorBlob />

      {/* HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", background: `rgba(11,11,11,${headerOpacity})`, backdropFilter: headerOpacity > 0.1 ? "blur(20px)" : "none", borderBottom: headerOpacity > 0.3 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
        <span onClick={() => scrollTo(0)} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, cursor: "pointer", fontStyle: "italic", color: "#89e0e6", fontWeight: 500 }}>
          T.H.
        </span>
        <nav style={{ display: "flex", gap: 28 }}>
          {SECTIONS.map((s, i) => (
            <span key={s} onClick={() => scrollTo(i)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", color: activeSection === i ? "#89e0e6" : "#555", transition: "color 0.3s", position: "relative" }}>
              {s}
              {activeSection === i && <span style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 3, height: 3, borderRadius: "50%", background: "#89e0e6" }} />}
            </span>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section ref={(el) => (sectionRefs.current[0] = el)} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b45da", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, color: "#8b45da" }}>RECENTLY ENGINEERING INTERN @ CYBRID</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7.5vw, 88px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 850 }}>
            Taline <span style={{ fontStyle: "italic", color: "#89e0e6" }}>Henin</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.75, color: "#777", maxWidth: 520, marginTop: 24 }}>
            AI-focused Computer Science student at the University of Guelph. I’ve shipped payout corridors and end-to-end test infrastructure for a payments platform at Cybrid, and kept Interac e-Transfer running smoothly in production.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <MagneticButton onClick={() => scrollTo(1)} style={{ background: "#89e0e6", color: "#0a0a0a", border: "none", padding: "13px 34px", borderRadius: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, cursor: "pointer", fontWeight: 500 }}>
              VIEW EXPERIENCE
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo(4)} style={{ background: "transparent", color: "#f0f0f0", border: "1px solid #2a2a2a", padding: "13px 34px", borderRadius: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, cursor: "pointer", fontWeight: 500 }}>
              GET IN TOUCH
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <div style={{ display: "flex", gap: 28, marginTop: 56, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#444", flexWrap: "wrap" }}>
            <span>B.Comp — CS / AI Specialization</span><span>·</span><span>Class of 2028</span><span>·</span><span>University of Guelph</span>
          </div>
        </Reveal>
        <div style={{ position: "absolute", right: 60, top: "35%", animation: "float 7s ease-in-out infinite", opacity: 0.08, fontSize: 200, fontFamily: "'Playfair Display', serif", color: "#8b45da", pointerEvents: "none", userSelect: "none" }}>✦</div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: "#333" }}>SCROLL</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #333, transparent)" }} />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section ref={(el) => (sectionRefs.current[1] = el)} style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#444" }}>01</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 500, marginTop: 6, marginBottom: 40 }}>Experience</h2>
        </Reveal>
        <div style={{ borderTop: "1px solid #1a1a1a" }}>
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.08}>
              <ExpandableCard item={exp} isExpanded={expandedExp === exp.id} onToggle={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)} type="experience" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={(el) => (sectionRefs.current[2] = el)} style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#444" }}>02</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 500, marginTop: 6, marginBottom: 40 }}>Projects</h2>
        </Reveal>
        <div style={{ borderTop: "1px solid #1a1a1a" }}>
          {PROJECTS.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 0.08}>
              <ExpandableCard item={proj} isExpanded={expandedProj === proj.id} onToggle={() => setExpandedProj(expandedProj === proj.id ? null : proj.id)} type="project" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section ref={(el) => (sectionRefs.current[3] = el)} style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#444" }}>03</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 500, marginTop: 6, marginBottom: 40 }}>Skills & Education</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ display: "flex", gap: 4, marginBottom: 36, flexWrap: "wrap" }}>
            {SKILL_TABS.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", padding: "10px 20px", borderRadius: 24, border: `1px solid ${activeTab === tab.key ? "#E8FC73" : "#1a1a1a"}`, background: activeTab === tab.key ? "#E8FC7315" : "transparent", color: activeTab === tab.key ? "#E8FC73" : "#555", cursor: "pointer", transition: "all 0.3s ease" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div style={{ minHeight: 220 }}>
          {activeTab !== "courses" && (
            <div key={activeTab} style={{ animation: "slideIn 0.4s ease" }}>
              <TagCloud items={SKILLS[activeTab]} colors={TAG_COLORS} />
            </div>
          )}
          {activeTab === "courses" && (
            <div style={{ animation: "slideIn 0.4s ease" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                {COURSES.map((c, i) => (
                  <div key={c} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#777", padding: "12px 16px", borderRadius: 10, border: "1px solid #181818", background: "rgba(255,255,255,0.01)", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#444", minWidth: 20 }}>{String(i + 1).padStart(2, "0")}</span>{c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section ref={(el) => (sectionRefs.current[4] = el)} style={{ padding: "100px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <Reveal>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#444" }}>04</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 500, marginTop: 6, marginBottom: 16 }}>Let's connect</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#777", marginBottom: 28 }}>
                Interested in collaborating, have a project idea, or just want to say hello? I'd love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#555" }}>
                <a href="mailto:taline.henin@gmail.com" style={{ color: "#888", textDecoration: "none" }}>taline.henin@gmail.com</a>
                <a href="https://linkedin.com/in/taline-henin/" target="_blank" rel="noreferrer" style={{ color: "#666", textDecoration: "none" }}>linkedin.com/in/taline-henin</a>
                <a href="https://github.com/talinehenin" target="_blank" rel="noreferrer" style={{ color: "#666", textDecoration: "none" }}>github.com/talinehenin</a>
                <span style={{ color: "#555" }}>Greater Toronto Area, Ontario</span>
                <div style={{ marginTop: 8 }}><LiveClock /></div>
              </div>
            </Reveal>
          </div>
          <div style={{ paddingTop: 56 }}>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px 48px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid #141414", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", letterSpacing: 1 }}>© {new Date().getFullYear()} TALINE HENIN — BUILT WITH ✦</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#282828", letterSpacing: 1 }}>NEXT.JS + TAILWIND CSS + VERCEL</span>
      </footer>
    </>
  );
}
