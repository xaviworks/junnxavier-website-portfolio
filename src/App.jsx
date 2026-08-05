import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, MousePointer2, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const partners = ['MCars', 'UAA', 'Ala Cino', 'Hipe', 'Melon Lemon', 'Behind The Work'];
const projects = [
  ['01', 'E-commerce platforms', 'Product, order, and customer flow built around your operation.'],
  ['02', 'Internal dashboards', 'A single source of truth that keeps your team aligned.'],
  ['03', 'Client portals', 'Sales systems that shorten response time and remove friction.'],
  ['04', 'Workflow automation', 'Connected processes that reduce manual work and keep teams moving.'],
  ['05', 'CRM & sales systems', 'Better lead management, faster follow-up, and clearer customer journeys.'],
];
const loopedProjects = [...projects, ...projects, ...projects];

function Button({ children, outline = false, href = '#contact' }) {
  return <a className={`btn ${outline ? 'btn-secondary' : 'btn-primary'}`} href={href}>{children}</a>;
}

function CalculatorWidget() {
  const values = ['12,480', '12,760', '13,240', '14,020'];
  const [valueIndex, setValueIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setValueIndex((current) => (current + 1) % values.length), 2200);
    return () => window.clearInterval(timer);
  }, [values.length]);
  return <div className="calculator-widget" aria-label="Animated business calculation widget">
    <div className="calculator-top"><span>Growth calculator</span><i>×</i></div>
    <div className="calculator-display"><small>Projected output</small><strong>{values[valueIndex]}</strong><em>+12.8%</em></div>
    <div className="calculator-keys" aria-hidden="true">
      <b>7</b><b>8</b><b>9</b><b className="operator">÷</b>
      <b>4</b><b>5</b><b>6</b><b className="operator">×</b>
      <b>1</b><b>2</b><b>3</b><b className="operator">+</b>
    </div>
  </div>;
}

function DeadlineWidget() {
  const milestones = [
    { month: 'AUG', day: '18', title: 'Automation', detail: 'Ahead of schedule', footer: '2 days saved' },
    { month: 'AUG', day: '21', title: 'Workflow', detail: 'Before deadline', footer: '3 days left' },
    { month: 'AUG', day: '24', title: 'Launch ready', detail: 'Work completed', footer: 'On track' },
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setStep((current) => (current + 1) % milestones.length), 2600);
    return () => window.clearInterval(timer);
  }, [milestones.length]);
  const milestone = milestones[step];
  return <div className="deadline-widget" aria-label={`${milestone.title}, ${milestone.detail}`}>
    <div className="deadline-calendar deadline-swap" key={`date-${step}`}><small>{milestone.month}</small><strong>{milestone.day}</strong></div>
    <div className="deadline-copy deadline-swap" key={`copy-${step}`}><b>{milestone.title}</b><span>{milestone.detail}</span></div>
    <em className="deadline-swap" key={`footer-${step}`}>{milestone.footer}</em>
  </div>;
}

function PerformanceWidget() {
  const scores = [92, 95, 97, 94];
  const [scoreIndex, setScoreIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setScoreIndex((current) => (current + 1) % scores.length), 2400);
    return () => window.clearInterval(timer);
  }, [scores.length]);
  const score = scores[scoreIndex];
  return <div className="performance-widget" aria-label={`System performance ${score} percent`}>
    <div className="performance-meter">
      <svg viewBox="0 0 120 72" aria-hidden="true"><path className="meter-track" d="M12 60 A48 48 0 1 1 108 60" /><path className="meter-value" d="M12 60 A48 48 0 1 1 108 60" pathLength="100" style={{ strokeDasharray: `${score} 100` }} /></svg>
      <strong>{score}<small>%</small></strong>
    </div>
    <div className="performance-foot"><span>Performance</span><b>Excellent</b></div>
  </div>;
}

function BrowserCard({ type = 'achieve' }) {
  const achieveLayouts = [
    { button: { top: '43%', left: '26%' } },
    { button: { top: '48%', left: '35%' } },
    { button: { top: '68%', left: '8%' } },
    { button: { top: '47%', left: '24%' } },
  ];
  const focusLayouts = [
    { button: { top: '24%', left: '24%' } },
    { button: { top: '50%', left: '31%' } },
    { button: { top: '69%', left: '8%' } },
    { button: { top: '46%', left: '23%' } },
  ];
  const layouts = type === 'achieve' ? achieveLayouts : focusLayouts;
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const clickLock = useRef(false);
  const timeoutRef = useRef(null);
  const loopRef = useRef(null);
  const layout = layouts[layoutIndex % layouts.length];
  const advance = useCallback(() => {
    if (clickLock.current) return;
    clickLock.current = true;
    setClicked(true);
    timeoutRef.current = window.setTimeout(() => {
      setLayoutIndex((current) => {
        let next = Math.floor(Math.random() * layouts.length);
        if (layouts.length > 1 && next === current) next = (next + 1) % layouts.length;
        return next;
      });
      setClicked(false);
      clickLock.current = false;
    }, 360);
  }, [layouts.length]);
  useEffect(() => {
    const schedule = () => {
      loopRef.current = window.setTimeout(() => {
        advance();
        schedule();
      }, 2500 + Math.random() * 2200);
    };
    schedule();
    return () => {
      window.clearTimeout(loopRef.current);
      window.clearTimeout(timeoutRef.current);
    };
  }, [advance]);
  const cursorStyle = type === 'achieve'
    ? { top: `calc(${layout.button.top} + 4%)`, left: `calc(${layout.button.left} + 20%)` }
    : { top: `calc(${layout.button.top} + 4%)`, left: `calc(${layout.button.left} + 28%)` };
  const cursor = <span className={`browser-cursor ${type === 'focus' ? 'coral' : ''} ${clicked ? 'is-clicked' : ''}`} style={cursorStyle}><span className={`cursor-halo ${clicked ? 'is-active' : ''}`} /><MousePointer2 /></span>;
  return <motion.div className={`browser-card browser-card-${type}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: .6 }}>
    <div className="browser-dots"><i /><i /><i /></div>
    <div className="browser-surface">
      <div className={`browser-dashboard dashboard-${layoutIndex % layouts.length}`} aria-hidden="true"><div className="dashboard-grid"><div className="dashboard-copy"><i /><i /><i /></div><i className="dashboard-card" /><i className="dashboard-card" /><i className="dashboard-wide"><b /><b /><b /><b /></i></div></div>
      {type === 'achieve' ? <><button aria-label="Achieve task" className={`browser-action ${clicked ? 'is-clicked' : ''}`} style={{ ...layout.button, right: 'auto', bottom: 'auto' }} onClick={advance}>Achieve</button>{cursor}</> : <><button aria-label="Focus task" className={`focus-label ${clicked ? 'is-clicked' : ''}`} style={{ ...layout.button, right: 'auto', bottom: 'auto' }} onClick={advance}>Focus</button>{cursor}</>}
    </div>
  </motion.div>;
}

function Hero() {
  const { scrollY } = useScroll();
  const heroBlur = useTransform(scrollY, [0, 520], ['blur(0px)', 'blur(7px)']);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, .2]);
  return <motion.section className="hero" id="home" style={{ filter: heroBlur, opacity: heroOpacity }}>
    <motion.div className="hero-art hero-art-left" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: .6 }}><BrowserCard /></motion.div>
    <motion.div className="hero-copy" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, ease: 'easeOut', delay: .2 }}>
      <div className="hero-sparkles"><Sparkles /><Sparkles /></div>
      <p className="eyebrow">FOR BUSINESS OWNERS, FOUNDERS, AND ENTREPRENEURS</p>
      <h1>We Build Systems That<br />Run Businesses <span className="hero-chip"><ArrowUpRight /></span> Automatically</h1>
      <motion.p className="hero-text" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .4 }}>Custom software and automation that cut manual work, speed up sales, and scale as you grow.</motion.p>
      <div className="hero-actions"><Button>Get Started <ArrowRight /></Button><Button outline>Explore Our Insights</Button></div>
    </motion.div>
    <div className="hero-art hero-art-deadline"><DeadlineWidget /></div>
    <div className="hero-art hero-art-right"><div className="hero-widget-stack"><CalculatorWidget /></div></div>
    <div className="hero-foot hero-foot-left"><PerformanceWidget /><strong>Scalable Growth</strong><p>Future-proof systems built to scale with you.</p></div>
    <div className="hero-foot hero-foot-center"><BrowserCard type="focus" /></div>
    <div className="hero-foot hero-foot-right"><strong>Infinite Flow</strong><p>One connected workflow across every tool you use.</p></div>
    </motion.section>;
}

function IntroSection() {
  return <motion.section className="section intro" id="about" initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65, ease: 'easeOut' }}><div className="intro-heading"><div><p className="section-label">Build</p><h2>What we <span>do?</span></h2><p className="section-copy">We design and build custom systems that replace manual work, disconnected tools, and slow operations.</p></div><aside><strong>The Problem</strong><p>Disconnected tools and manual tasks create friction that slows your business down.</p></aside></div><div className="work-surface"><div className="work-toolbar"><div className="work-year"><button aria-label="Previous year">‹</button><span>2026</span><button aria-label="Next year">›</button></div><div className="work-address">◉ <span>https://xnr-it-solutions.com/</span></div><div className="work-tools"><i>✦</i><i>×</i></div></div><div className="work-status"><b>Building Success</b><span>●</span></div><div className="work-canvas"><div className="work-search"><span>⌕</span><em>Search your next improvement</em></div><div className="work-empty"><span>Every workflow starts with a clearer system.</span></div></div></div><div className="detail-copy"><div><h3>Connected business systems</h3><p>Streamline sales, inventory, CRM, and internal workflows with custom software built around your operation.</p></div><div><h3>Workflow automation</h3><p>Reduce repetitive administrative work with connected automations that keep your team moving efficiently.</p></div></div></motion.section>;
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(projects.length);
  const [trackX, setTrackX] = useState(0);
  const galleryRef = useRef(null);
  const firstProjectRef = useRef(null);
  const move = useCallback((direction) => setActiveIndex((current) => current + direction), []);
  useEffect(() => {
    const timer = window.setInterval(() => move(1), 3000);
    return () => window.clearInterval(timer);
  }, [move]);
  useLayoutEffect(() => {
    const updateTrackPosition = () => {
      const viewport = galleryRef.current;
      const firstProject = firstProjectRef.current;
      if (!viewport || !firstProject) return;
      setTrackX(viewport.clientWidth / 2 - (firstProject.offsetLeft + firstProject.offsetWidth / 2));
    };
    updateTrackPosition();
    const observer = new ResizeObserver(updateTrackPosition);
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  return <motion.section className="section projects" id="projects" initial={{ opacity: 0, y: 64 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, ease: 'easeOut' }}>
    <p className="section-label">Projects</p>
    <h2>Let’s Build a System That Powers Your Growth</h2>
    <p className="section-copy">Custom software and automation, engineered around how your business runs.</p>
    <div className="feature-grid">{['Custom-Built From Scratch', 'Business-First Thinking', 'Scalable Architecture'].map((title, index) => <motion.article className="feature-card" key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .1 }}><h3>{title}</h3><p>{title === 'Custom-Built From Scratch' ? 'No off-the-shelf systems.' : title === 'Business-First Thinking' ? 'We design logic before code.' : 'Built to grow with you.'}</p></motion.article>)}</div>
    <div className="project-gallery" aria-label="XNR IT Solutions project gallery">
      <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous project" onClick={() => move(-1)}>‹</button>
      <div className="gallery-track" ref={galleryRef} aria-live="polite"><motion.div className="gallery-track-inner" initial={false} animate={{ x: trackX }} onAnimationComplete={() => { if (activeIndex >= projects.length * 2) setActiveIndex(projects.length); }} transition={{ type: 'spring', stiffness: 110, damping: 24, mass: 1.1 }}>{loopedProjects.map(([number, title, body], index) => {
        const leftIndex = activeIndex - 1;
        const rightIndex = activeIndex + 1;
        return <motion.article ref={index === activeIndex ? firstProjectRef : undefined} initial={false} className={`gallery-project ${index === activeIndex ? 'is-active' : ''} ${index === leftIndex ? 'is-left' : ''} ${index === rightIndex ? 'is-right' : ''}`} key={number}>
          <div className="gallery-project-art" aria-hidden="true"><span className="gallery-window-dots"><i></i><i></i><i></i></span><span className="gallery-art-line line-one"></span><span className="gallery-art-line line-two"></span><span className="gallery-art-block block-one"></span><span className="gallery-art-block block-two"></span><span className="gallery-art-block block-three"></span></div>
          <div className="gallery-project-content"><div className="gallery-project-meta"><span>{number}</span><small>Case study</small><ArrowUpRight size={17} strokeWidth={2.2} /></div><h3>{title}</h3><p>{body}</p></div>
        </motion.article>;
      })}</motion.div></div>
      <button className="gallery-arrow gallery-next" type="button" aria-label="Next project" onClick={() => move(1)}>›</button>
    </div>
    <div className="gallery-dots" aria-label="Choose a project">{projects.map(([number], index) => <button key={number} className={index === activeIndex % projects.length ? 'is-active' : ''} type="button" aria-label={`Show project ${number}`} aria-current={index === activeIndex % projects.length ? 'true' : undefined} onClick={() => setActiveIndex(projects.length + index)} />)}</div>
  </motion.section>;
}

function Advantage() {
  return <motion.section className="section advantage" id="services" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8 }}><p className="section-label">XNR Advantage</p><h2>Not just developers. We think like business owners.</h2><p className="section-copy">We design the logic before the code — so every system we build solves a real business problem.</p><div className="advantage-grid">{[['Results-Focused Execution', 'Solve real operational problems.'], ['End-to-End Ownership', 'From idea to deployment.'], ['Long-Term Partner Mindset', 'Not a one-off dev shop.'], ['Scalable Growth', 'Future-proof systems built to scale with you.']].map(([title, body], index) => <motion.article className="adv-card" key={title} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .1 }}><h3>{title}</h3><p>{body}</p></motion.article>)}</div></motion.section>;
}

function Footer() {
  return <><motion.section className="section partners" id="partners" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .7, ease: 'easeOut' }}><p className="section-label">Partners</p><h2>Our Partners & Clients</h2><p className="section-copy">Trusted by forward-thinking businesses across industries.</p><div className="partner-marquee"><div className="partner-track">{[...partners, ...partners].map((partner, index) => <span key={`${partner}-${index}`}>{partner}</span>)}</div></div></motion.section><motion.section className="cta" id="contact" initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, ease: 'easeOut' }}><h2>Let’s build a system that powers your growth.</h2><p>Custom software and automation engineered around how your business runs.</p><Button>Build Better Together</Button></motion.section><footer className="footer" aria-label="XNR IT Solutions site footer"><div className="footer-brand"><div className="footer-logo"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></div><p> XNR IT Solutions builds custom software, business systems, and workflow automation that help growing companies operate more efficiently.</p><h4>Follow XNR IT Solutions</h4><div className="socials"><a href="https://www.facebook.com" aria-label="XNR IT Solutions on Facebook">f</a><a href="https://www.instagram.com" aria-label="XNR IT Solutions on Instagram">ig</a><a href="https://www.tiktok.com" aria-label="XNR IT Solutions on TikTok">♪</a><a href="https://api.whatsapp.com/send?phone=639667964414" aria-label="Contact XNR IT Solutions on WhatsApp">wa</a></div></div><div className="footer-column"><h4>Company</h4><a href="#about">About XNR</a><a href="#about">Our Approach</a><a href="#services">Business Solutions</a><a href="#contact">Careers</a></div><div className="footer-column"><h4>Services</h4><a href="#services">Business Process Automation</a><a href="#services">CRM & Sales Automation</a><a href="#services">Inventory Systems</a><a href="#services">Custom Software Development</a><a href="#services">Internal Dashboards</a></div><div className="footer-column"><h4>Industries & Projects</h4><a href="#projects">E-commerce Systems</a><a href="#projects">Client Portals</a><a href="#projects">Operations Dashboards</a><a href="#projects">Enterprise Resource Planning</a><a href="#partners">Partners & Clients</a></div><div className="footer-bottom"><span>© 2026 XNR IT Solutions. All rights reserved.</span><span><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Service</a></span></div><div className="footer-watermark">XNR</div></footer></>;
}

export default function App() {
  const { scrollY } = useScroll();
  const shadow = useSpring(useTransform(scrollY, [0, 80], [0, 1]), { stiffness: 200, damping: 30 });
  const headerOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const headerVisibility = useTransform(scrollY, [0, 380, 420], ['visible', 'visible', 'hidden']);
  useLayoutEffect(() => {
    if (!window.location.hash || window.location.hash === '#home') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);
  return <div className="page-shell"><motion.header className="topbar" style={{ opacity: headerOpacity, visibility: headerVisibility, boxShadow: useTransform(shadow, [0, 1], ['0 0 0 rgba(0,0,0,0)', '0 8px 24px rgba(0,0,0,.05)']) }}><div className="topbar-inner"><div className="header-spacer" /><div className="header-main"><a className="logo" href="#home" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="#services">Services</a><a href="#projects">Projects</a><a href="#partners">Blogs</a><a href="#contact">Careers</a></nav></div><div className="header-fill" /><div className="topbar-actions"><a className="btn btn-secondary" href="#contact">Contact Sales</a><a className="btn btn-primary" href="#contact">Get Started <ArrowRight /></a></div><div className="header-spacer" /></div></motion.header><main><Hero /><IntroSection /><Projects /><Advantage /><Footer /></main></div>;
}
