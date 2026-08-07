import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, MousePointer2, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const partners = ['MCars', 'UAA', 'Ala Cino', 'Hipe', 'Melon Lemon', 'Behind The Work'];
const projects = [
  ['01', 'E-commerce platforms', 'Product, order, and customer flow built around your operation.'],
  ['02', 'Internal dashboards', 'A single source of truth that keeps your team aligned.'],
  ['03', 'Client portals', 'Sales systems that shorten response time and remove friction.'],
  ['04', 'Workflow automation', 'Connected processes that reduce manual work and keep teams moving.'],
  ['05', 'CRM & sales systems', 'Better lead management, faster follow-up, and clearer customer journeys.'],
];
// Keep several copies in the track so the gallery can travel in either
// direction for a long time before it has to normalize its index.
const loopedProjects = Array.from({ length: 7 }, () => projects).flat();

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

function JourneySignal() {
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
      '.cta-button',
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
      const isAtOrigin = window.scrollY < 72;
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
      if (isAtOrigin && !hasPositioned) {
        rawX.set(targetX - 9);
        rawY.set(viewportY - 9);
        x.jump(targetX - 9);
        y.jump(viewportY - 9);
        scale.jump(1.18);
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
  const widgetRightY = useTransform(scrollY, [0, 520], [0, -48]);
  const widgetDeadlineY = useTransform(scrollY, [0, 520], [0, -30]);
  const widgetFootY = useTransform(scrollY, [0, 520], [0, 42]);
  const widgetFootOpacity = useTransform(scrollY, [0, 520], [1, .35]);
  return <motion.section className="hero" id="home" aria-labelledby="hero-title" aria-describedby="hero-description" style={{ filter: heroBlur, opacity: heroOpacity }}>
    <JourneySignal />
    <motion.div className="hero-art hero-art-left" style={{ y: widgetLeftY, rotate: widgetLeftRotate }} initial={{ scale: 0, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: .6 }}><BrowserCard /></motion.div>
    <motion.div className="hero-copy" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, ease: 'easeOut', delay: .2 }}>
      <div className="hero-sparkles"><Sparkles /><Sparkles /></div>
      <motion.p
        className="eyebrow eyebrow-reveal"
        aria-label="For Business Owners, Founders, and Entrepreneurs"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.32em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
        transition={{ delay: .45, duration: .8, ease: 'easeOut' }}
      >
        <span>FOR BUSINESS OWNERS, FOUNDERS, AND ENTREPRENEURS</span>
      </motion.p>
      <h1 id="hero-title">We Build Systems That<br />Run Businesses <span className="hero-chip"><ArrowUpRight /></span> Aut<span className="journey-origin">o<span className="journey-origin-orb" aria-hidden="true"><i /></span></span>matically</h1>
      <motion.p id="hero-description" className="hero-text" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .4 }}>Custom software and automation that cut manual work, speed up sales, and scale as you grow.</motion.p>
      <div className="hero-actions"><Button>Get Started <ArrowRight /></Button><Button outline>Explore Our Insights</Button></div>
    </motion.div>
    <motion.div className="hero-art hero-art-deadline" style={{ y: widgetDeadlineY }} initial={{ opacity: 0, x: 46, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: .85, duration: .9, ease: [0.22, 1, 0.36, 1] }}><DeadlineWidget /></motion.div>
    <motion.div className="hero-art hero-art-right" style={{ y: widgetRightY }} initial={{ opacity: 0, scale: .72, rotate: -7 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}><div className="hero-widget-stack"><CalculatorWidget /></div></motion.div>
    <motion.div className="hero-foot hero-foot-left" style={{ y: widgetFootY, opacity: widgetFootOpacity }} initial={{ opacity: 0, x: -46, scale: .92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.15, duration: .95, ease: [0.22, 1, 0.36, 1] }}><PerformanceWidget /><strong>Scalable Growth</strong><p>Future-proof systems built to scale with you.</p></motion.div>
    <motion.div className="hero-foot hero-foot-center" style={{ y: widgetFootY, opacity: widgetFootOpacity }} initial={{ opacity: 0, y: 42, rotateX: 18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}><BrowserCard type="focus" /></motion.div>
    <motion.div className="hero-foot hero-foot-right" style={{ y: widgetFootY, opacity: widgetFootOpacity }} initial={{ opacity: 0, x: 46 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.45, duration: .95, ease: [0.22, 1, 0.36, 1] }}><strong>Infinite Flow</strong><p>One connected workflow across every tool you use.</p></motion.div>
    </motion.section>;
}

function IntroSection() {
  return <motion.section className="section intro" id="about" aria-labelledby="about-title" aria-describedby="about-description" initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .18 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
    <motion.div className="intro-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .3 }} transition={{ duration: .8, ease: 'easeOut' }}><div><p className="section-label">Build</p><h2 id="about-title">What we <span>do?</span></h2><p className="section-copy" id="about-description">We design and build custom systems that replace manual work, disconnected tools, and slow operations.</p></div><aside><strong>The Problem</strong><p>Disconnected tools and manual tasks create friction that slows your business down.</p></aside></motion.div>
    <motion.div className="work-surface" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ delay: .12, duration: 1, ease: [0.22, 1, 0.36, 1] }}><motion.div className="work-toolbar" initial={{ opacity: 0, y: -14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .3, duration: .6 }}><div className="work-year"><button aria-label="Previous year">‹</button><span>2026</span><button aria-label="Next year">›</button></div><div className="work-address">◉ <span className="system-address-typing">https://xnr-it-solutions.com/</span></div><div className="work-tools"><i>✦</i><i>×</i></div></motion.div><motion.div className="work-status" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .45, duration: .65 }}><b>Building Success</b><span>●</span></motion.div><motion.div className="work-canvas" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .58, duration: .8 }}><motion.div className="work-search" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: .72, duration: .7 }}><span>⌕</span><em>Search your next improvement</em></motion.div><motion.div className="work-empty" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: .9, duration: .9 }}><div className="work-activity" aria-label="Live workflow activity"><motion.div className="activity-health" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .12, duration: .8 }}><div><span>Automation meter</span><strong>82%</strong></div><i className="activity-progress"><b /></i><svg className="activity-line-chart" viewBox="0 0 260 72" preserveAspectRatio="none" aria-label="Automation performance rising over time" role="img"><motion.path className="chart-line" d="M0 62 C24 55 31 44 52 48 S78 36 94 42 S120 24 140 33 S163 17 181 27 S208 8 226 18 S245 5 260 10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ delay: .42, duration: 1.55, ease: 'easeOut' }} /><motion.circle cx="226" cy="18" r="3" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: 1.32, duration: .35 }} /><motion.circle cx="260" cy="10" r="3" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: 1.5, duration: .35 }} /></svg><small>+12% business efficiency</small></motion.div><motion.div className="activity-metrics" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .62, duration: .8 }}><div><span>Sales pipeline</span><strong>$48.2k</strong><em>+24.6% this month</em></div><div><span>ROI forecast</span><strong>3.8x</strong><em>next quarter</em></div><div className="activity-bars" aria-label="Sales growth chart">{Array.from({ length: 8 }, (_, index) => <motion.i key={index} initial={{ scaleY: .15 }} whileInView={{ scaleY: 1 }} viewport={{ once: false }} transition={{ delay: .9 + index * .11, duration: .58, ease: 'easeOut' }} />)}</div></motion.div><motion.div className="activity-feed" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: 1.55, duration: .8 }}><div className="activity-feed-heading"><span>Business activity</span><small>Live</small></div><div className="activity-row"><i className="activity-dot is-blue" /><span>Revenue calculation completed</span><time>2m</time></div><div className="activity-row"><i className="activity-dot is-green" /><span>Sales workflow automated</span><time>8m</time></div><div className="activity-row"><i className="activity-dot is-violet" /><span>Investment forecast updated</span><time>14m</time></div></motion.div></div></motion.div></motion.div></motion.div>
  </motion.section>;
}

function Projects() {
  const loopStart = projects.length * 2;
  const loopEnd = projects.length * 5;
  const [activeIndex, setActiveIndex] = useState(projects.length * 3);
  const [trackX, setTrackX] = useState(0);
  const galleryRef = useRef(null);
  const trackInnerRef = useRef(null);
  const move = useCallback((direction) => setActiveIndex((current) => {
    const next = current + direction;
    if (next < loopStart) return loopEnd - 1;
    if (next >= loopEnd) return loopStart;
    return next;
  }), []);
  useEffect(() => {
    const timer = window.setInterval(() => move(1), 3000);
    return () => window.clearInterval(timer);
  }, [move]);
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
    <p className="section-label">Projects</p>
    <h2>Let’s Build a System That Powers Your Growth</h2>
    <p className="section-copy">Custom software and automation, engineered around how your business runs.</p>
    <div className="feature-grid">{['Custom-Built From Scratch', 'Business-First Thinking', 'Scalable Architecture'].map((title, index) => <motion.article className="feature-card" key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .5, delay: index * .1 }}><h3>{title}</h3><p>{title === 'Custom-Built From Scratch' ? 'No off-the-shelf systems.' : title === 'Business-First Thinking' ? 'We design logic before code.' : 'Built to grow with you.'}</p></motion.article>)}</div>
    <div className="project-gallery" aria-label="XNR IT Solutions project gallery">
      <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous project" onClick={() => move(-1)}>‹</button>
      <div className="gallery-track" ref={galleryRef} aria-live="polite"><motion.div ref={trackInnerRef} className="gallery-track-inner" initial={false} animate={{ x: trackX }} transition={{ type: 'spring', stiffness: 110, damping: 24, mass: 1.1 }}>{loopedProjects.map(([number, title, body], index) => {
        const leftIndex = activeIndex - 1;
        const rightIndex = activeIndex + 1;
        return <motion.article data-carousel-index={index} initial={false} className={`gallery-project ${index === activeIndex ? 'is-active' : ''} ${index === leftIndex ? 'is-left' : ''} ${index === rightIndex ? 'is-right' : ''}`} key={`${number}-${index}`}>
          <div className="gallery-project-art" aria-hidden="true"><span className="gallery-window-dots"><i></i><i></i><i></i></span><span className="gallery-art-line line-one"></span><span className="gallery-art-line line-two"></span><span className="gallery-art-block block-one"></span><span className="gallery-art-block block-two"></span><span className="gallery-art-block block-three"></span></div>
          <div className="gallery-project-content"><div className="gallery-project-meta"><span>{number}</span><small>Case study</small><ArrowUpRight size={17} strokeWidth={2.2} /></div><h3>{title}</h3><p>{body}</p></div>
        </motion.article>;
      })}</motion.div></div>
      <button className="gallery-arrow gallery-next" type="button" aria-label="Next project" onClick={() => move(1)}>›</button>
    </div>
    <div className="gallery-dots" aria-label="Choose a project">{projects.map(([number], index) => <button key={number} className={index === activeIndex % projects.length ? 'is-active' : ''} type="button" aria-label={`Show project ${number}`} aria-current={index === activeIndex % projects.length ? 'true' : undefined} onClick={() => setActiveIndex(loopStart + index)} />)}</div>
  </motion.section>;
}

function Advantage() {
  const advantageHeadline = 'Not just developers. We think like business owners.';
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
    ['Long-Term Partner Mindset', 'Not a one-off dev shop.'],
    ['Scalable Growth', 'Future-proof systems built to scale with you.'],
  ];

  return <motion.section ref={advantageRef} className="section advantage" id="services" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: .12 }} transition={{ duration: .8 }}>
    <div className="advantage-inner">
      <motion.div className="advantage-heading-row" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .25 }} transition={{ duration: .7, ease: 'easeOut' }}>
        <div>
          <p className="section-label">XNR Advantage</p>
          <h2 className={`advantage-typing ${typedHeadline.length < advantageHeadline.length ? 'is-typing' : 'is-complete'}`} aria-label={advantageHeadline}>
            <span className="sr-only">{advantageHeadline}</span>
            <span className="advantage-typing-text" aria-hidden="true">{typedHeadline || ' '}</span>
          </h2>
          <p className="section-copy">We design the logic before the code — so every system we build solves a real business problem.</p>
        </div>
        <aside className="advantage-aside" aria-label="XNR operating principle">
          <span>01 / 04</span>
          <strong>Business logic first</strong>
          <p>Every build starts with the outcome your team needs, not the technology we want to use.</p>
        </aside>
      </motion.div>
      <motion.span className="advantage-scanline" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: false, amount: .2 }} transition={{ delay: .35, duration: 1.1, ease: 'easeInOut' }} aria-hidden="true" />
      <div className="advantage-grid">
        {principles.map(([title, body], index) => <motion.article className="adv-card" key={title} initial={{ opacity: 0, x: index % 2 === 0 ? -90 : 90, y: 18, rotateX: 4 }} whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0 }} viewport={{ once: false, amount: .22 }} transition={{ duration: 1.15, delay: .18 + index * .16, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
          <div className="adv-card-top"><span className="adv-card-index">0{index + 1}</span><span className="adv-card-rule" /></div>
          <div className="adv-card-content"><h3>{title}</h3><p>{body}</p></div>
        </motion.article>)}
      </div>
      <div className="advantage-footer"><span>One partner from strategy to scale</span><span className="advantage-footer-arrow">↗</span></div>
    </div>
  </motion.section>;
}

export function Team() {
  const members = [
    ['01', 'Rumel B. Eumague Jr.', 'Sole Proprietor / CEO / Founder', 'Company leadership and direction.', 'RE', 'rumel.jpeg'],
    ['02', 'Junn Xavier T. Adalid', 'CPTO / Co-Founder', 'Product, technology, and long-term vision.', 'JXA', 'xavier.jpeg'],
    ['03', 'Niel Jehush I. Palicte', 'CTO / Co-Founder', 'Technology strategy and technical delivery.', 'NIP', 'niel.jpeg'],
    ['04', 'Patrick Jhun T. Adalid', 'Software Developer / Marketing Manager', 'Software development and market growth.', 'PTA', 'patrick1.jpeg'],
    ['05', 'Leo J Bande', 'QA Specialist', 'Quality, reliability, and release confidence.', 'LJB', 'leo.jpeg'],
  ];

  return <section className="section team" id="team" aria-labelledby="team-title">
    <div className="team-heading">
      <div>
        <p className="section-label">The team</p>
        <h1 id="team-title">Small team. Serious momentum.</h1>
      </div>
      <p className="section-copy">Meet the XNR IT Solutions team building custom software, connected business systems, and workflow automation with you from the first question to the final handoff.</p>
    </div>
    <div className="team-grid">
      {members.map(([number, name, designation, body, initials, photo], index) => <motion.article className="team-member" key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: false, amount: .18 }} transition={{ delay: index * .1, duration: .65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="team-member-photo"><img src={`/images/teams/${photo}`} alt={`${name}, ${designation}`} /></div>
        <div className="team-member-copy"><h3>{name}</h3><p>{designation}</p></div>
      </motion.article>)}
    </div>
  </section>;
}

export function Footer() {
  return <>
    <motion.section className="section partners" id="partners" aria-labelledby="partners-title" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .16 }} transition={{ duration: .7, ease: 'easeOut' }}>
      <motion.div className="partnership-invite" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .3 }} transition={{ duration: .75, ease: 'easeOut' }}>
        <p className="section-label">Partnerships</p>
        <h2 id="partners-title">Open to Partnerships<span className="partnership-orb-target" aria-hidden="true" /></h2>
        <p className="section-copy">XNR IT Solutions welcomes partnerships with businesses, government agencies, educational institutions, and technology providers. Let’s work together to build secure, reliable, and impactful digital solutions.</p>
        <a className="btn btn-primary partnership-button" href="#contact">Start a Conversation <ArrowRight /></a>
      </motion.div>
    </motion.section>
    <motion.section className="cta cta-blueprint" id="contact" aria-labelledby="cta-title" initial={{ opacity: 0, y: 64, scale: .96, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false, amount: .2 }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>
      <div className="cta-blueprint-copy">
        <motion.p className="section-label cta-label" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .16, duration: .7, ease: 'easeOut' }}>Ready to move faster?</motion.p>
        <motion.h2 id="cta-title" initial={{ opacity: 0, x: -42, rotateY: -8 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: false }} transition={{ delay: .22, duration: .9, ease: [0.22, 1, 0.36, 1] }}>Let’s build a system that <span>powers your gr<span className="journey-destination">o</span>wth.</span></motion.h2>
        <motion.p className="cta-copy" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .32, duration: .8, ease: 'easeOut' }}>Get custom software, business systems, and workflow automation engineered around how your business runs.</motion.p>
        <motion.div className="cta-actions" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: .42, duration: .8, ease: 'easeOut' }}>
          <a className="btn btn-primary cta-button" href="#contact" aria-label="Start a custom software and automation project with XNR IT Solutions">Build Better Together <ArrowRight /></a>
          <span>Strategy <i /> Systems <i /> Automation</span>
        </motion.div>
      </div>
      <motion.div className="cta-blueprint-panel" aria-label="How XNR IT Solutions turns business friction into working systems" initial={{ opacity: 0, x: 72, rotateY: 6 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: false, amount: .35 }} transition={{ delay: .28, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="cta-panel-header"><div><span className="cta-panel-kicker">The XNR workflow</span><strong>From friction to flow</strong></div><span className="cta-panel-status"><b /> Ready to start</span></div>
        <ol className="cta-steps">
          <motion.li className="cta-step" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .52, duration: .75, ease: 'easeOut' }}><span className="cta-step-number">01</span><div><h3>Find the friction</h3><p>Identify the work slowing your team down.</p></div><span className="cta-step-mark">↗</span></motion.li>
          <motion.li className="cta-step" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .64, duration: .75, ease: 'easeOut' }}><span className="cta-step-number">02</span><div><h3>Design the system</h3><p>Connect the right workflow, data, and automation.</p></div><span className="cta-step-mark">↗</span></motion.li>
          <motion.li className="cta-step" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: .76, duration: .75, ease: 'easeOut' }}><span className="cta-step-number">03</span><div><h3>Build for growth</h3><p>Ship a system your team can improve over time.</p></div><span className="cta-step-mark">✓</span></motion.li>
        </ol>
        <div className="cta-panel-footer"><span>One partner from strategy to scale</span><span className="cta-panel-line" aria-hidden="true"><i /></span></div>
      </motion.div>
    </motion.section>
    <motion.footer className="footer" aria-label="XNR IT Solutions site footer" initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .14 }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: .12 }}>
      <div className="footer-brand"><div className="footer-logo"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></div><p>Custom software, business systems, and workflow automation for growing businesses.</p><h4>Follow XNR IT Solutions</h4><div className="socials"><a href="https://www.facebook.com" aria-label="XNR IT Solutions on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8z" /></svg></a><a href="https://www.instagram.com" aria-label="XNR IT Solutions on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#F58529" /><stop offset=".45" stopColor="#DD2A7B" /><stop offset="1" stopColor="#5E3BEA" /></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" fill="url(#instagram-gradient)" /><rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="white" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1.7" /><circle cx="17.2" cy="6.8" r="1" fill="white" /></svg></a><a href="https://www.tiktok.com" aria-label="XNR IT Solutions on TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25F4EE" d="M14.6 3v10.3a3.7 3.7 0 1 1-3-3.6v3.2a1.3 1.3 0 1 0 1.7 1.2V3h3.1c.3 1.5 1.2 2.5 2.6 3v3a6 6 0 0 1-2.6-1V13a5 5 0 1 1-5-5c.4 0 .8 0 1.2.1V5.6A8 8 0 0 0 12 5a8 8 0 1 0 8 8V7.6c-2-.5-3.3-1.9-3.8-4.6z" /><path fill="#FE2C55" d="M13.6 3v10.3a3.7 3.7 0 1 1-3-3.6v3.2a1.3 1.3 0 1 0 1.7 1.2V3h3.1c.3 1.5 1.2 2.5 2.6 3v3a6 6 0 0 1-2.6-1V13a5 5 0 1 1-5-5c.4 0 .8 0 1.2.1V5.6A8 8 0 0 0 11 5a8 8 0 1 0 8 8V7.6C17 7.1 15.7 5.7 15.2 3z" /><path fill="white" d="M14.1 3v10.3a3.7 3.7 0 1 1-3-3.6v3.2a1.3 1.3 0 1 0 1.7 1.2V3h3.1c.3 1.5 1.2 2.5 2.6 3v3a6 6 0 0 1-2.6-1V13a5 5 0 1 1-5-5c.4 0 .8 0 1.2.1V5.6A8 8 0 0 0 11.5 5a8 8 0 1 0 8 8V7.6c-2-.5-3.3-1.9-3.8-4.6z" /></svg></a><a href="https://api.whatsapp.com/send?phone=639667964414" aria-label="Contact XNR IT Solutions on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.1A8.5 8.5 0 1 1 20.5 11.5Z" fill="#25D366" /><path d="M8.5 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .4-.1.6l-.6.7c.7 1.3 1.7 2.3 3 3l.7-.6c.2-.2.4-.2.6-.1l1.9.8c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.5.3-1.2.4-1.8.2-2.1-.6-4.2-2.5-5.6-4.3-1-.9-1.8-2-2.2-3.1-.2-.7-.1-1.3.1-1.8Z" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div></div><div className="footer-column"><h4>Company</h4><a href="#about">About XNR</a><a href="#about">Our Approach</a><a href="#services">Business Solutions</a><a href="#contact">Careers</a></div><div className="footer-column"><h4>Services</h4><a href="#services">Business Process Automation</a><a href="#services">CRM & Sales Automation</a><a href="#services">Inventory Systems</a><a href="#services">Custom Software Development</a><a href="#services">Internal Dashboards</a></div><div className="footer-column"><h4>Industries & Projects</h4><a href="#projects">E-commerce Systems</a><a href="#projects">Client Portals</a><a href="#projects">Operations Dashboards</a><a href="#projects">Enterprise Resource Planning</a><a href="#partners">Partners & Clients</a></div><div className="footer-bottom"><span>© 2026 XNR IT Solutions. All rights reserved.</span><span><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Service</a></span></div><div className="footer-watermark">XNR</div>
    </motion.footer>
  </>;
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
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId === 'home') return;

    const scrollToTarget = () => document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    requestAnimationFrame(() => requestAnimationFrame(scrollToTarget));
  }, []);
  return <div className="page-shell"><motion.header className="topbar" style={{ opacity: headerOpacity, visibility: headerVisibility, boxShadow: useTransform(shadow, [0, 1], ['0 0 0 rgba(0,0,0,0)', '0 8px 24px rgba(0,0,0,.05)']) }}><div className="topbar-inner"><div className="header-spacer" /><div className="header-main"><a className="logo" href="#home" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="#services">Services</a><a href="#projects">Projects</a><a href="/team">Team</a><a href="#contact">Contact</a></nav></div><div className="header-fill" /><div className="topbar-actions"><a className="btn btn-secondary" href="#contact">Contact Sales</a><a className="btn btn-primary" href="#contact">Get Started <ArrowRight /></a></div><div className="header-spacer" /></div></motion.header><main id="main-content"><Hero /><IntroSection /><Projects /><Advantage /><Footer /></main></div>;
}
