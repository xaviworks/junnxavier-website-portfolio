import MobileNavigation from './MobileNavigation.jsx';
import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';
import { Advantage, Footer, Projects } from './App.jsx';

function PageHeader({ activePage }) {
  return <header className="topbar team-page-topbar">
    <div className="topbar-inner"><MobileNavigation />
      <div className="header-spacer" />
      <div className="header-main">
        <a className="logo" href="/" aria-label="Junn Xavier Adalid home"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a className={activePage === 'services' ? 'is-current' : undefined} href="/services" aria-current={activePage === 'services' ? 'page' : undefined}>Skills</a><a className={activePage === 'projects' ? 'is-current' : undefined} href="/projects" aria-current={activePage === 'projects' ? 'page' : undefined}>Projects</a><a href="/about">About Me</a><a href="/insights">Insights</a>
        </nav>
      </div>
      <div className="header-fill" />
      <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Me</a><a className="btn btn-primary" href="/#contact">Let’s Talk <ArrowRight /></a></div>
      <div className="header-spacer" />
    </div>
  </header>;
}

export default function SlugPage({ type }) {
  const titles = { services: 'Skills', projects: 'Projects' };
  useLayoutEffect(() => {
    const target = document.getElementById(type === 'projects' ? 'projects' : 'services');
    const frame = window.requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [type]);
  useEffect(() => {
    document.title = `${titles[type]} | Junn Xavier Adalid`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', type === 'services' ? 'Full-stack development, Python automation, API integration, and AI capabilities of Junn Xavier Adalid.' : 'Explore systems and automation projects built by Junn Xavier Adalid.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}/${type}`);
  }, [type]);

  useEffect(() => {
    if (type !== 'projects') return undefined;

    const cards = Array.from(document.querySelectorAll('.projects .feature-card'));
    const timers = cards.map((card, index) => window.setTimeout(() => {
      card.classList.add('signal-revealed');
    }, 260 + index * 180));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [type]);

  return <div className="page-shell team-page slug-page"><PageHeader activePage={type} /><main id="main-content">{type === 'services' ? <Advantage /> : <Projects />}<Footer /></main></div>;
}
