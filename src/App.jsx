import MobileNavigation from './MobileNavigation.jsx';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, MousePointer2, Sparkles, Github, Linkedin, Facebook, Mail, MapPin } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { portfolioProjects, experience } from './portfolio.js';
import './experience.css';

const emailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=xaviadalid959%40gmail.com&su=Portfolio%20inquiry';
const footerSocialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/xavi.adalid', icon: '/images/socials/facebook.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/junnxavier/' },
  { label: 'WhatsApp', href: 'https://wa.me/639946947889', icon: '/images/socials/whatsapp.svg' },
];

const partners = ['MCars', 'UAA', 'Ala Cino', 'Hipe', 'Melon Lemon', 'Behind The Work'];
const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/xaviworks', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/junnxavier/', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/xavi.adalid', Icon: Facebook },
];
function Button({ children, outline = false, href = '/get-started' }) {
  return <a className={`btn ${outline ? 'btn-secondary' : 'btn-primary'}`} href={href}>{children}</a>;
}

function AutomationWidget() {
  const tools = [
    { name: 'n8n', icon: 'n8n.svg' },
    { name: 'Zapier', icon: 'icons8-zapier-48.png' },
    { name: 'Power Automate', icon: 'icons8-microsoft-power-automate-2020-48.png' },
  ];
  return <div className="automation-widget" aria-label="My automation tools">
    <span className="automation-widget-heading">Automation tools</span>
    <ul>{tools.map((tool) => <li key={tool.name}><span className="automation-widget-icon"><img src={`/images/automation%20icons/${tool.icon}`} width="32" height="32" alt="" /></span><span>{tool.name}</span></li>)}</ul>
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

export function JourneySignal() {
  const rawX = useMotionValue(-40);
  const rawY = useMotionValue(-40);
  const rawScale = useMotionValue(.8);
  const rawRotate = useMotionValue(0);
  const rawStretchX = useMotionValue(1);
  const rawStretchY = useMotionValue(1);
  const rawTailScale = useMotionValue(.35);
  const rawTailOpacity = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 88, damping: 20, mass: .82 });
  const y = useSpring(rawY, { stiffness: 88, damping: 20, mass: .82 });
  const scale = useSpring(rawScale, { stiffness: 180, damping: 18, mass: .55 });
  const rotate = useSpring(rawRotate, { stiffness: 115, damping: 24, mass: .7 });
  const scaleX = useSpring(rawStretchX, { stiffness: 170, damping: 20, mass: .5 });
  const scaleY = useSpring(rawStretchY, { stiffness: 170, damping: 20, mass: .5 });
  const tailScale = useSpring(rawTailScale, { stiffness: 115, damping: 22, mass: .65 });
  const tailOpacity = useSpring(rawTailOpacity, { stiffness: 105, damping: 24, mass: .7 });
  const [visible, setVisible] = useState(false);
  const [docked, setDocked] = useState(false);
  const [atOrigin, setAtOrigin] = useState(true);
  const [greetingKind, setGreetingKind] = useState(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const selectors = [
      '.journey-origin',
      '.work-address',
      '.work-search',
      '.activity-health',
      '.projects .feature-card:nth-child(2)',
      '.gallery-project.is-active',
      '.team .team-member:nth-child(2)',
      '.advantage-aside',
      '.advantage .adv-card:nth-child(3)',
      '.partnership-orb-target',
      '.journey-destination',
    ];
    let frame = 0;
    let lastX = -40;
    let lastY = -40;
    let currentAngle = 0;
    let activeTarget = null;
    let hasPositioned = false;
    let ready = false;
    let cancelled = false;

    const update = () => {
      frame = 0;
      const anchors = selectors.map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          element,
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY + rect.height / 2,
        };
      }).filter(Boolean).sort((a, b) => a.y - b.y);

      if (anchors.length < 2) return;
      const guideY = window.scrollY + window.innerHeight * .58;
      const first = anchors[0];
      const last = anchors[anchors.length - 1];
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 140;
      setVisible(guideY >= first.y - window.innerHeight * .45);

      let start = first;
      let end = anchors[1];
      for (let index = 0; index < anchors.length - 1; index += 1) {
        if (guideY >= anchors[index].y) {
          start = anchors[index];
          end = anchors[index + 1];
        }
      }
      if (guideY >= last.y) start = end = last;

      const distance = Math.max(1, end.y - start.y);
      const progress = Math.min(1, Math.max(0, (guideY - start.y) / distance));
      const eased = progress * progress * (3 - 2 * progress);
      let targetX = start.x + (end.x - start.x) * eased;
      let documentY = start.y + (end.y - start.y) * eased;
      documentY -= Math.sin(Math.PI * eased) * Math.min(30, Math.max(8, distance * .045));
      let nearest = anchors.reduce((best, anchor) => Math.abs(anchor.y - guideY) < Math.abs(best.y - guideY) ? anchor : best, first);
      const magneticDistance = Math.abs(nearest.y - guideY);
      let proximity = 1 - Math.min(1, magneticDistance / 170);
      let attraction = proximity * proximity * (3 - 2 * proximity);
      const hasJourneyOrigin = Boolean(document.querySelector('.journey-origin'));
      const isAtOrigin = hasJourneyOrigin && window.scrollY < 72;
      let isDocked = isAtOrigin || magneticDistance < 40;
      const featureAnchors = Array.from(document.querySelectorAll('.projects .feature-card')).map((element) => {
        const rect = element.getBoundingClientRect();
        return { element, x: rect.left + rect.width / 2, y: rect.top + window.scrollY + 18, centerY: rect.top + window.scrollY + rect.height / 2 };
      });
      const featureCenterY = featureAnchors[0]?.centerY ?? 0;
      const featureTourRange = Math.max(300, window.innerHeight * .38);
      const featureTourStart = featureCenterY - featureTourRange / 2;
      const inFeatureTour = featureAnchors.length === 3 && guideY >= featureTourStart && guideY <= featureTourStart + featureTourRange;
      first.element.classList.toggle('signal-departed', !isAtOrigin);
      if (isAtOrigin) {
        nearest = first;
        targetX = first.x;
        documentY = first.y + 5;
      } else if (atBottom) {
        const destination = anchors.find((anchor) => anchor.element.matches('.journey-destination'));
        if (destination) {
          nearest = destination;
          targetX = destination.x;
          documentY = destination.y;
          isDocked = true;
        }
      } else if (inFeatureTour) {
        const tourProgress = Math.min(1, Math.max(0, (guideY - featureTourStart) / featureTourRange));
        const cardProgress = tourProgress * (featureAnchors.length - 1);
        const fromIndex = Math.min(featureAnchors.length - 1, Math.floor(cardProgress));
        const toIndex = Math.min(featureAnchors.length - 1, fromIndex + 1);
        const localProgress = cardProgress - fromIndex;
        const localEase = localProgress * localProgress * (3 - 2 * localProgress);
        targetX = featureAnchors[fromIndex].x + (featureAnchors[toIndex].x - featureAnchors[fromIndex].x) * localEase;
        const travelArc = Math.sin(Math.PI * localProgress) * 20;
        const rebound = Math.sin(localProgress * Math.PI * 3) * Math.exp(-localProgress * 4.5) * 7;
        documentY = featureAnchors[fromIndex].y - travelArc - rebound;
        const nearestIndex = Math.round(cardProgress);
        nearest = featureAnchors[nearestIndex];
        const contactDistance = Math.abs(cardProgress - nearestIndex);
        proximity = 1 - Math.min(1, contactDistance / .5);
        attraction = proximity * proximity * (3 - 2 * proximity);
        isDocked = contactDistance < .16;
        const revealDistance = nearestIndex === featureAnchors.length - 1 ? .4 : .24;
        if (contactDistance < revealDistance) nearest.element.classList.add('signal-revealed');
      } else {
        targetX += (nearest.x - targetX) * attraction * .82;
        documentY += (nearest.y - documentY) * attraction * .82;
      }

      if (activeTarget !== nearest.element) {
        activeTarget?.classList.remove('signal-active');
        activeTarget?.classList.remove('signal-near');
        activeTarget = nearest.element;
      }
      activeTarget.classList.toggle('signal-near', proximity > .24 && !isAtOrigin);
      activeTarget.classList.toggle('signal-active', isDocked);
      setDocked(isDocked);
      setAtOrigin(isAtOrigin);
      const nextGreeting = nearest.element.matches('.work-address, .work-search')
        ? 'intro'
        : nearest.element.matches('.partnership-orb-target')
          ? 'partnership'
          : null;
      setGreetingKind(isAtOrigin ? null : nextGreeting);
      const isCardImpact = inFeatureTour && isDocked;
      rawScale.set(isCardImpact ? 1.06 : isDocked ? 1.18 : 1);
      const viewportY = documentY - window.scrollY;
      const deltaX = targetX - lastX;
      const deltaY = viewportY - lastY;
      const speed = Math.hypot(deltaX, deltaY);
      if (!isDocked && speed > .5) {
        const nextAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const shortestTurn = ((nextAngle - currentAngle + 540) % 360) - 180;
        currentAngle += shortestTurn;
        rawRotate.set(currentAngle);
      }
      rawStretchX.set(isCardImpact ? 1.18 : isDocked ? 1 : 1 + Math.min(.22, speed / 95));
      rawStretchY.set(isCardImpact ? .84 : isDocked ? 1 : 1 - Math.min(.1, speed / 190));
      rawTailScale.set(isDocked ? .35 : Math.min(1.3, Math.max(.62, speed / 22)));
      rawTailOpacity.set(isDocked ? 0 : Math.min(.84, Math.max(.42, speed / 28)));
      lastX = targetX;
      lastY = viewportY;
      if (!hasPositioned) {
        rawX.set(targetX - 9);
        rawY.set(viewportY - 9);
        x.jump(targetX - 9);
        y.jump(viewportY - 9);
        scale.jump(isDocked ? 1.18 : 1);
        scaleX.jump(1);
        scaleY.jump(1);
        rotate.jump(0);
        hasPositioned = true;
      } else {
        rawX.set(targetX - 9);
        rawY.set(viewportY - 9);
      }
    };

    const schedule = () => {
      if (ready && !frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const initialize = () => {
      if (cancelled) return;
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (cancelled) return;
        ready = true;
        update();
      }));
    };
    if (document.fonts?.ready) document.fonts.ready.then(initialize);
    else initialize();
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      activeTarget?.classList.remove('signal-active');
      activeTarget?.classList.remove('signal-near');
      document.querySelector('.journey-origin')?.classList.remove('signal-departed');
    };
  }, [rawRotate, rawScale, rawStretchX, rawStretchY, rawTailOpacity, rawTailScale, rawX, rawY, rotate, scale, scaleX, scaleY, x, y]);

  return createPortal(<>
    <motion.div className={`journey-signal ${visible ? 'is-visible' : ''} ${docked ? 'is-docked' : ''} ${atOrigin ? 'is-origin' : ''}`} style={{ x, y, scale, scaleX, scaleY, rotate, '--signal-tail-scale': tailScale, '--signal-tail-opacity': tailOpacity }} aria-hidden="true"><span /></motion.div>
    <motion.div className={`signal-greeting ${greetingKind ? 'is-visible' : ''} ${greetingKind === 'partnership' ? 'is-partnership' : ''}`} style={{ x, y }} aria-hidden="true"><span>{greetingKind === 'partnership' ? 'Have a big idea? Let’s build it together.' : 'Hi! I’m Nova.'}</span></motion.div>
  </>, document.body);
}

function Hero() {
  const { scrollY } = useScroll();
  const heroBlur = useTransform(scrollY, [0, 520], ['blur(0px)', 'blur(7px)']);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, .2]);
  const widgetLeftY = useTransform(scrollY, [0, 520], [0, -72]);
  const widgetLeftRotate = useTransform(scrollY, [0, 520], [-5, -9]);
  const widgetDeadlineY = useTransform(scrollY, [0, 520], [0, -30]);
  const widgetFootY = useTransform(scrollY, [0, 520], [0, 42]);
  const widgetFootOpacity = useTransform(scrollY, [0, 520], [1, .35]);
  return <motion.section className="hero" id="home" aria-labelledby="hero-title" aria-describedby="hero-description" style={{ filter: heroBlur, opacity: heroOpacity }}>
    <motion.div className="hero-art hero-art-left" style={{ y: widgetLeftY, rotate: widgetLeftRotate }} initial={{ scale: 0, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: .6 }}><BrowserCard /></motion.div>
    <motion.div className="hero-copy" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, ease: 'easeOut', delay: .2 }}>
      <div className="hero-sparkles"><Sparkles /><Sparkles /></div>
      <div className="hero-identity"><img className="hero-portrait" src="/images/teams/xavier.jpeg" width="176" height="176" alt="Junn Xavier Adalid" fetchPriority="high" /><span className="hero-location"><MapPin size={12} aria-hidden="true" /> Davao City, Philippines</span></div>
      <motion.p
        className="eyebrow eyebrow-reveal"
        aria-label="Full-Stack Developer · Automation · AI"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.32em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
        transition={{ delay: .45, duration: .8, ease: 'easeOut' }}
      >
        <span>FULL-STACK DEVELOPER · AUTOMATION · AI</span>
      </motion.p>
      <h1 id="hero-title">I’m <span className="hero-name">Junn Xavier.</span><br />I Build Software <span className="hero-chip"><ArrowUpRight /></span> That W<span className="journey-origin">o<span className="journey-origin-orb" aria-hidden="true"><i /></span></span>rks.</h1>
      <motion.p id="hero-description" className="hero-text" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .4 }}>I turn ideas into useful web and mobile apps — with thoughtful interfaces, practical automation, and AI that fits the task.</motion.p>
      <div className="hero-actions"><Button href="/#projects">Explore My Work <ArrowUpRight /></Button><Button outline href="/#contact">Let’s Talk <ArrowRight /></Button></div>
      <nav className="hero-profile-links" aria-label="My social profiles">{profileLinks.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon className="profile-link-icon" size={20} aria-hidden="true" /><span>{label}</span><ArrowUpRight className="profile-link-arrow" size={16} aria-hidden="true" /></a>)}</nav>
    </motion.div>
    <motion.div className="hero-art hero-art-deadline" style={{ y: widgetDeadlineY }} initial={{ opacity: 0, x: 46, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: .85, duration: .9, ease: [0.22, 1, 0.36, 1] }}><DeadlineWidget /></motion.div>
    <motion.div className="hero-foot hero-foot-left" style={{ y: widgetFootY, opacity: widgetFootOpacity }} initial={{ opacity: 0, x: -46, scale: .92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.15, duration: .95, ease: [0.22, 1, 0.36, 1] }}><PerformanceWidget /><strong>Full-Stack Development</strong><p>Laravel, React, Flutter, and Python.</p></motion.div>
    <motion.div className="hero-foot hero-foot-right" style={{ y: widgetFootY, opacity: widgetFootOpacity }} initial={{ opacity: 0, x: 46 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.45, duration: .95, ease: [0.22, 1, 0.36, 1] }}><AutomationWidget /><strong>Automation & AI</strong><p>Connected workflows with APIs, n8n, and AI.</p></motion.div>
    </motion.section>;
}

function IntroSection() {
  return <motion.section className="section intro" id="about" aria-labelledby="about-title" aria-describedby="about-description" initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .18 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
    <motion.div className="intro-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .3 }} transition={{ duration: .8, ease: 'easeOut' }}><div><p className="section-label">About me</p><h2 id="about-title">What I <span>do?</span></h2><p className="section-copy" id="about-description">I’m a full-stack software developer specializing in Laravel and Python automation, with experience in secure systems, API integrations, and cross-platform apps.</p></div><aside><strong>My background</strong><p>BS Information Technology, Brokenshire College, 2026. Developer, freelance builder, and part-time IT instructor.</p></aside></motion.div>
    <motion.div className="work-surface" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ delay: .12, duration: 1, ease: [0.22, 1, 0.36, 1] }}><motion.div className="work-toolbar" initial={{ opacity: 0, y: -14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .3, duration: .6 }}><div className="work-year"><button aria-label="Previous year">‹</button><span>2026</span><button aria-label="Next year">›</button></div><div className="work-address">◉ <span className="system-address-typing">github.com/xaviworks</span></div><div className="work-tools"><i>✦</i><i>×</i></div></motion.div><motion.div className="work-status" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .45, duration: .65 }}><b>Building Useful Software</b><span>●</span></motion.div><motion.div className="work-canvas" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .58, duration: .8 }}><motion.div className="work-search" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: .72, duration: .7 }}><span>⌕</span><em>Explore my development toolkit</em></motion.div><motion.div className="work-empty" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: .9, duration: .9 }}><div className="work-activity" aria-label="Illustrative development dashboard"><motion.div className="activity-health" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .12, duration: .8 }}><div><span>Workflow demo</span><strong>82%</strong></div><i className="activity-progress"><b /></i><svg className="activity-line-chart" viewBox="0 0 260 72" preserveAspectRatio="none" aria-label="Automation performance rising over time" role="img"><motion.path className="chart-line" d="M0 62 C24 55 31 44 52 48 S78 36 94 42 S120 24 140 33 S163 17 181 27 S208 8 226 18 S245 5 260 10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ delay: .42, duration: 1.55, ease: 'easeOut' }} /><motion.circle cx="226" cy="18" r="3" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: 1.32, duration: .35 }} /><motion.circle cx="260" cy="10" r="3" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: 1.5, duration: .35 }} /></svg><small>Illustrative automation dashboard</small></motion.div><motion.div className="activity-metrics" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .62, duration: .8 }}><div><span>Web & mobile</span><strong>Full stack</strong><em>Laravel · React · Flutter</em></div><div><span>Automation</span><strong>Python</strong><em>APIs · n8n · AI</em></div><div className="activity-bars" aria-label="Sales growth chart">{Array.from({ length: 8 }, (_, index) => <motion.i key={index} initial={{ scaleY: .15 }} whileInView={{ scaleY: 1 }} viewport={{ once: false }} transition={{ delay: .9 + index * .11, duration: .58, ease: 'easeOut' }} />)}</div></motion.div><motion.div className="activity-feed" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: 1.55, duration: .8 }}><div className="activity-feed-heading"><span>My toolkit</span><small>Live</small></div><div className="activity-row"><i className="activity-dot is-blue" /><span>Laravel & database architecture</span><time>2m</time></div><div className="activity-row"><i className="activity-dot is-green" /><span>Python & workflow automation</span><time>8m</time></div><div className="activity-row"><i className="activity-dot is-violet" /><span>Flutter & AI integrations</span><time>14m</time></div></motion.div></div></motion.div></motion.div></motion.div>
  </motion.section>;
}

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState('');
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackX, setTrackX] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(0);
  const galleryRef = useRef(null);
  const trackInnerRef = useRef(null);
  const loopStart = projects.length * 2;
  const loopEnd = projects.length * 5;
  const loopedProjects = Array.from({ length: 7 }, () => projects).flat();

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(portfolioProjects)
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((error) => {
        if (!cancelled) setProjectsError(error.message);
      })
      .finally(() => {
        if (!cancelled) setProjectsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (projects.length) setActiveIndex(projects.length * 3);
  }, [projects.length]);

  const move = useCallback((direction) => setActiveIndex((current) => {
    if (!projects.length) return current;
    const next = current + direction;
    if (next < loopStart) return loopEnd - 1;
    if (next >= loopEnd) return loopStart;
    return next;
  }), [loopEnd, loopStart, projects.length]);
  const noteInteraction = () => setLastInteraction(Date.now());
  useEffect(() => {
    if (!projects.length || galleryPaused) return undefined;
    const remainingPause = Math.max(0, 8000 - (Date.now() - lastInteraction));
    const timer = window.setTimeout(() => move(1), Math.max(5000, remainingPause));
    return () => window.clearTimeout(timer);
  }, [activeIndex, galleryPaused, lastInteraction, move, projects.length]);
  useLayoutEffect(() => {
    let frame;
    const updateTrackPosition = () => {
      const viewport = galleryRef.current;
      const track = trackInnerRef.current;
      const activeProject = track?.querySelector(`[data-carousel-index="${activeIndex}"]`);
      if (!viewport || !track || !activeProject) return;

      // offsetLeft is measured in the un-transformed track coordinate system.
      // That keeps the target stable while Motion animates the track itself.
      const activeCenter = activeProject.offsetLeft + activeProject.offsetWidth / 2;
      setTrackX(viewport.clientWidth / 2 - activeCenter);
    };
    frame = window.requestAnimationFrame(updateTrackPosition);
    const observer = new ResizeObserver(updateTrackPosition);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (trackInnerRef.current) observer.observe(trackInnerRef.current);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeIndex]);

  return <motion.section className="section projects" id="projects" initial={{ opacity: 0, y: 64 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .12 }} transition={{ duration: .7, ease: 'easeOut' }}>
    <p className="section-label">Accomplishments</p>
    <h2 id="projects-title">Projects I’ve Built and Helped Deliver</h2>
    <p className="section-copy">Web, mobile, and desktop applications I’ve built, with the technologies behind each project.</p>
    <div className="feature-grid">{['Custom-Built From Scratch', 'Business-First Thinking', 'Scalable Architecture'].map((title, index) => <motion.article className="feature-card" key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .5, delay: index * .1 }}><h3>{title}</h3><p>{title === 'Custom-Built From Scratch' ? 'No off-the-shelf systems.' : title === 'Business-First Thinking' ? 'I design logic before code.' : 'Built to grow with you.'}</p></motion.article>)}</div>
    {projectsError ? <p className="api-status is-error" role="alert">Unable to load projects right now.</p> : projectsLoading ? <p className="api-status">Loading projects…</p> : !projects.length ? <p className="api-status">No projects published yet.</p> : <div className="project-gallery" aria-label="Junn Xavier Adalid project gallery" onMouseEnter={() => setGalleryPaused(true)} onMouseLeave={() => { setGalleryPaused(false); noteInteraction(); }} onFocusCapture={() => setGalleryPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setGalleryPaused(false); noteInteraction(); } }}>
      <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous project" onClick={() => { noteInteraction(); move(-1); }}>‹</button>
      <div className="gallery-track" ref={galleryRef} aria-live="polite"><motion.div ref={trackInnerRef} className="gallery-track-inner" initial={false} animate={{ x: trackX }} transition={{ type: 'spring', stiffness: 110, damping: 24, mass: 1.1 }}>{loopedProjects.map((project, index) => {
        const leftIndex = activeIndex - 1;
        const rightIndex = activeIndex + 1;
        const projectHref = { kavio: '/kavio', attendly: '/attendly', 'namadacwad umis': '/namadacwad' }[project.title.trim().toLowerCase()] || null;
        return <motion.article data-carousel-index={index} initial={false} className={`gallery-project ${index === activeIndex ? 'is-active' : ''} ${index === leftIndex ? 'is-left' : ''} ${index === rightIndex ? 'is-right' : ''}`} key={`${project.number}-${index}`}>
          <div className="gallery-project-art" aria-hidden="true"><span className="gallery-window-dots"><i></i><i></i><i></i></span><span className="gallery-art-line line-one"></span><span className="gallery-art-line line-two"></span><span className="gallery-art-block block-one"></span><span className="gallery-art-block block-two"></span><span className="gallery-art-block block-three"></span></div>
          <div className="gallery-project-content"><div className="gallery-project-meta"><span>{project.number}</span><small>Accomplishment</small><ArrowUpRight size={17} strokeWidth={2.2} /></div><h3>{project.title}</h3><p>{project.body}</p><div className="project-tech-stack"><h4>Tech stack</h4><ul aria-label={`${project.title} tech stack`}>{project.techStack.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></div>
          {index === activeIndex ? projectHref ? <a className="gallery-project-hitarea" href={projectHref} aria-label={`View ${project.title} project`} /> : null : <button className="gallery-project-hitarea" type="button" aria-label={`Select ${project.title} project`} tabIndex={Math.abs(index - activeIndex) === 1 ? 0 : -1} onClick={() => { noteInteraction(); setActiveIndex(index); }} />}
        </motion.article>;
      })}</motion.div></div>
      <button className="gallery-arrow gallery-next" type="button" aria-label="Next project" onClick={() => { noteInteraction(); move(1); }}>›</button>
    </div>}
    {projects.length > 0 && <div className="gallery-dots" aria-label="Choose a project" onMouseEnter={() => setGalleryPaused(true)} onMouseLeave={() => { setGalleryPaused(false); noteInteraction(); }} onFocusCapture={() => setGalleryPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setGalleryPaused(false); noteInteraction(); } }}>{projects.map((project, index) => <button key={project.number} className={index === activeIndex % projects.length ? 'is-active' : ''} type="button" aria-label={`Show project ${project.number}`} aria-current={index === activeIndex % projects.length ? 'true' : undefined} onClick={() => { noteInteraction(); setActiveIndex(loopStart + index); }} />)}</div>}
  </motion.section>;
}

export function Advantage() {
  const advantageHeadline = 'I build software around real-world problems.';
  const advantageRef = useRef(null);
  const wasAdvantageVisible = useRef(false);
  const [typingRun, setTypingRun] = useState(0);
  const [typedHeadline, setTypedHeadline] = useState('');

  useEffect(() => {
    const node = advantageRef.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setTypingRun(1);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasAdvantageVisible.current) {
        setTypingRun((run) => run + 1);
      }
      wasAdvantageVisible.current = entry.isIntersecting;
    }, { threshold: 0.2 });
    observer.observe(node);
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      wasAdvantageVisible.current = true;
      setTypingRun(1);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typingRun) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTypedHeadline(advantageHeadline);
      return undefined;
    }

    let character = 0;
    setTypedHeadline('');
    const timer = window.setInterval(() => {
      character += 1;
      setTypedHeadline(advantageHeadline.slice(0, character));
      if (character >= advantageHeadline.length) window.clearInterval(timer);
    }, 34);

    return () => window.clearInterval(timer);
  }, [typingRun]);

  const principles = [
    ['Results-Focused Execution', 'Solve real operational problems.'],
    ['End-to-End Ownership', 'From idea to deployment.'],
    ['Long-Term Partner Mindset', 'Documentation, handoff, and ongoing support.'],
    ['Scalable Growth', 'Future-proof systems built to scale with you.'],
  ];

  return <motion.section ref={advantageRef} className="section advantage" id="services" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: .12 }} transition={{ duration: .8 }}>
    <div className="advantage-inner">
      <motion.div className="advantage-heading-row" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .25 }} transition={{ duration: .7, ease: 'easeOut' }}>
        <div>
          <p className="section-label">My approach</p>
          <h2 className={`advantage-typing ${typedHeadline.length < advantageHeadline.length ? 'is-typing' : 'is-complete'}`} aria-label={advantageHeadline}>
            <span className="sr-only">{advantageHeadline}</span>
            <span className="advantage-typing-text" aria-hidden="true">{typedHeadline || ' '}</span>
          </h2>
          <p className="section-copy">I plan the logic before the code, connecting architecture, data, and integrations to the problem at hand.</p>
        </div>
        <aside className="advantage-aside" aria-label="My development approach">
          <span>01 / 04</span>
          <strong>Business logic first</strong>
          <p>I start with the outcome you need, then choose the tools and architecture that fit.</p>
        </aside>
      </motion.div>
      <motion.span className="advantage-scanline" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: false, amount: .2 }} transition={{ delay: .35, duration: 1.1, ease: 'easeInOut' }} aria-hidden="true" />
      <div className="advantage-grid">
        {principles.map(([title, body], index) => <motion.article className="adv-card" key={title} initial={{ opacity: 0, x: index % 2 === 0 ? -90 : 90, y: 18, rotateX: 4 }} whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0 }} viewport={{ once: false, amount: .22 }} transition={{ duration: 1.15, delay: .18 + index * .16, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
          <div className="adv-card-top"><span className="adv-card-index">0{index + 1}</span><span className="adv-card-rule" /></div>
          <div className="adv-card-content"><h3>{title}</h3><p>{body}</p></div>
        </motion.article>)}
      </div>
      <div className="advantage-footer"><span>From system design to deployment</span><span className="advantage-footer-arrow">↗</span></div>
    </div>
  </motion.section>;
}

export function Team() {
  const reducedMotion = useReducedMotion();
  const roles = [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
  return <section className="section team experience-section" id="team" aria-labelledby="team-title">
    <div className="team-heading">
      <div>
        <p className="section-label">Experience</p>
        <h1 id="team-title">My work. My journey.</h1>
      </div>
      <p className="section-copy">A journey through software development, automation, and teaching.</p>
    </div>
    <ol className="experience-timeline" aria-label="My career timeline">
      {roles.map((entry) => <motion.li className={`experience-entry ${entry.ongoing ? 'is-ongoing' : ''}`} key={entry.number} initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5, ease: 'easeOut' }}>
        <div className="experience-date"><time dateTime={entry.startDate}>{entry.period}</time><span>{entry.type}</span>{entry.ongoing && <span className="experience-current">Ongoing</span>}</div>
        <span className="experience-node" aria-hidden="true"><i /></span>
        <article className="experience-card"><header><div><p className="experience-mobile-date">{entry.period} · {entry.type}</p><h2>{entry.name}</h2><p className="experience-role">{entry.role}</p></div><div className={`experience-company-logo logo-${entry.number}`}><img src={`/images/company%20logo/${encodeURIComponent(entry.logo)}`} alt={`${entry.name} logo`} width="160" height="56" loading="lazy" /></div></header><div className="experience-meta"><MapPin size={13} aria-hidden="true" /><span>{entry.location}</span>{entry.ongoing && <span className="experience-card-status">Ongoing</span>}</div><p className="experience-description">{entry.bio}</p><ul className="experience-skills" aria-label={`${entry.name} focus areas`}>{entry.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>
      </motion.li>)}
    </ol>
    <div className="experience-timeline-end"><span aria-hidden="true">✦</span><p>Still learning. Still building.</p><a href="/#projects">Explore my projects <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>;
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    setError('');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
      window.location.href = `mailto:xaviadalid959@gmail.com?subject=${subject}&body=${body}`;
      setStatus('Email draft opened. Send it from your email app to contact me.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit} onInput={(event) => setFormValid(event.currentTarget.checkValidity())}>
    <div className="contact-form-row"><label><span className="contact-form-label">Name <i aria-hidden="true">*</i></span><input name="name" type="text" autoComplete="name" minLength="2" maxLength="120" required aria-required="true" /></label><label><span className="contact-form-label">Email <i aria-hidden="true">*</i></span><input name="email" type="email" autoComplete="email" maxLength="254" required aria-required="true" /></label></div>
    <label><span className="contact-form-label">How can I help? <i aria-hidden="true">*</i></span><textarea name="message" rows="3" minLength="10" maxLength="4000" required aria-required="true" /></label>
    <label className="contact-form-honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex="-1" autoComplete="off" /></label>
    <div className="contact-form-actions"><button className="btn btn-primary" type="submit" disabled={submitting || !formValid}>{submitting ? 'Opening…' : 'Draft email'} <ArrowRight /></button><span aria-live="polite">{status || error}</span></div>
  </form>;
}

export function Footer() {
  return <>
    <motion.section className="section partners" id="partners" aria-labelledby="partners-title" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .16 }} transition={{ duration: .7, ease: 'easeOut' }}>
      <motion.div className="partnership-invite" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .3 }} transition={{ duration: .75, ease: 'easeOut' }}>
        <p className="section-label">Opportunities</p>
        <h2 id="partners-title">Let’s work together.<span className="partnership-orb-target" aria-hidden="true" /></h2>
        <p className="section-copy">I’m open to software development roles, freelance projects, and teaching opportunities. If my experience fits what you’re building, let’s connect.</p>
        <a className="btn btn-primary partnership-button" href="/#contact">Contact Me <ArrowRight /></a>
      </motion.div>
    </motion.section>
    <motion.section className="cta cta-blueprint" id="contact" aria-labelledby="cta-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, ease: 'easeOut' }}>
      <div className="cta-blueprint-copy">
        <motion.p className="section-label cta-label" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .16, duration: .7, ease: 'easeOut' }}>Get in touch</motion.p>
        <motion.h2 id="cta-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .22, duration: .9, ease: [0.22, 1, 0.36, 1] }}>Have a project or <span><span className="journey-destination">o</span>pportunity in mind?</span></motion.h2>
        <motion.p className="cta-copy" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .32, duration: .8, ease: 'easeOut' }}>Tell me what you’re working on and how I can help.</motion.p>
        <motion.div className="cta-actions" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .42, duration: .8, ease: 'easeOut' }}>
          <a className="btn btn-primary cta-button" href={emailComposeUrl} target="_blank" rel="noopener noreferrer">Send Me an Email <Mail size={18} aria-hidden="true" /></a><a className="contact-email-fallback" href="mailto:xaviadalid959@gmail.com?subject=Portfolio%20inquiry">Use my email app instead <ArrowUpRight size={13} aria-hidden="true" /></a>
        </motion.div>
      </div>
      <motion.div className="cta-blueprint-panel portfolio-contact-panel" aria-label="My contact details" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, ease: 'easeOut' }}>
        <div className="cta-panel-header"><div><span className="cta-panel-kicker">Let’s connect</span><strong>Find me here.</strong></div></div>
        <dl className="portfolio-contact-details">
          <div><dt><Mail size={16} aria-hidden="true" /> Email</dt><dd><a href="mailto:xaviadalid959@gmail.com">xaviadalid959@gmail.com</a></dd></div>
          <div><dt><MapPin size={16} aria-hidden="true" /> Location</dt><dd>Davao City, Philippines</dd></div>
          <div><dt><Github size={16} aria-hidden="true" /> GitHub</dt><dd><a href="https://github.com/xaviworks" target="_blank" rel="noopener noreferrer">xaviworks <ArrowUpRight size={14} aria-hidden="true" /></a></dd></div>
          <div><dt><Linkedin size={16} aria-hidden="true" /> LinkedIn</dt><dd><a href="https://www.linkedin.com/in/junnxavier/" target="_blank" rel="noopener noreferrer">Junn Xavier Adalid <ArrowUpRight size={14} aria-hidden="true" /></a></dd></div>
        </dl>
      </motion.div>
    </motion.section>
    <motion.footer className="footer" aria-label="Junn Xavier Adalid site footer" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .7, ease: 'easeOut', delay: .12 }}>
      <div className="footer-brand"><div className="footer-logo"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></div><p>Full-stack development, Python automation, and AI integrations. Based in Davao City, Philippines.</p><h4>Connect with me</h4><div className="socials">{footerSocialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Connect with me on ${link.label}`} title={link.label}>{link.icon ? <img src={link.icon} width="22" height="22" alt="" /> : <Linkedin size={22} aria-hidden="true" />}</a>)}</div></div><div className="footer-column"><h4>About Me</h4><a href="/about">My Background</a><a href="/services">My Approach</a><a href="/#services">Business Solutions</a><a href="/#contact">Opportunities</a></div><div className="footer-column"><h4>Skills</h4><a href="/#services">Python & Automation</a><a href="/#services">APIs & AI Integration</a><a href="/#services">Flutter & Mobile Apps</a><a href="/#services">Laravel & React</a><a href="/#services">Databases & Cloud</a></div><div className="footer-column"><h4>Projects</h4><a href="/kavio">Kavio</a><a href="/attendly">Attendly</a><a href="/namadacwad">NAMADACWAD UMIS</a><a href="/#projects">Xendra Workspace</a><a href="/#projects">View All Projects</a></div><div className="footer-bottom"><span>© 2026 Junn Xavier Adalid. All rights reserved.</span><span><a href="/#contact">Contact Me</a><a href="https://github.com/xaviworks">GitHub</a></span></div><div className="footer-watermark">XAVI</div>
    </motion.footer>
  </>;
}

export default function App() {
  const { scrollY } = useScroll();
  const shadow = useSpring(useTransform(scrollY, [0, 80], [0, 1]), { stiffness: 200, damping: 30 });
  const headerOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const headerVisibility = useTransform(scrollY, [0, 380, 420], ['visible', 'visible', 'hidden']);
  useLayoutEffect(() => {
    const isGetStarted = window.location.pathname.replace(/\/+$/, '') === '/get-started';
    if ((!window.location.hash || window.location.hash === '#home') && !isGetStarted) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);
  useEffect(() => {
    const isGetStarted = window.location.pathname.replace(/\/+$/, '') === '/get-started';
    const targetId = isGetStarted ? 'contact' : window.location.hash.slice(1);
    if (!targetId || targetId === 'home') return;

    const scrollToTarget = () => document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    requestAnimationFrame(() => requestAnimationFrame(scrollToTarget));
  }, []);
  useEffect(() => {
    const anchoredRoutes = { '/get-started': '/#contact' };
    const useSectionAnchor = (event) => {
      const link = event.target.closest('a');
      const destination = link && anchoredRoutes[link.getAttribute('href')];
      if (!destination || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.location.assign(destination);
    };
    document.addEventListener('click', useSectionAnchor);
    return () => document.removeEventListener('click', useSectionAnchor);
  }, []);
  return <div className="page-shell"><motion.header className="topbar" style={{ opacity: headerOpacity, visibility: headerVisibility, boxShadow: useTransform(shadow, [0, 1], ['0 0 0 rgba(0,0,0,0)', '0 8px 24px rgba(0,0,0,.05)']) }}><div className="topbar-inner"><MobileNavigation /><div className="header-spacer" /><div className="header-main"><a className="logo" href="/" aria-label="Junn Xavier Adalid home"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="/services">Skills</a><a href="/projects">Projects</a><a href="/about">About Me</a></nav></div><div className="header-fill" /><div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Me</a><a className="btn btn-primary" href="/get-started">Let’s Talk <ArrowRight /></a></div><div className="header-spacer" /></div></motion.header><main id="main-content"><Hero /><IntroSection /><Projects /><Advantage /><Footer /></main></div>;
}
