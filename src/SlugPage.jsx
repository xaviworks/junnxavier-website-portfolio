import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';
import { Advantage, Footer, Projects } from './App.jsx';

function PageHeader() {
  return <header className="topbar team-page-topbar">
    <div className="topbar-inner">
      <div className="header-spacer" />
      <div className="header-main">
        <a className="logo" href="/" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/services">Services</a><a href="/projects">Projects</a><a href="/team">Team</a><a href="/insights">Insights</a>
        </nav>
      </div>
      <div className="header-fill" />
      <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Sales</a><a className="btn btn-primary" href="/get-started">Get Started <ArrowRight /></a></div>
      <div className="header-spacer" />
    </div>
  </header>;
}

export default function SlugPage({ type }) {
  const titles = { services: 'Services', projects: 'Projects' };
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, [type]);
  useEffect(() => {
    document.title = `${titles[type]} | XNR IT Solutions`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', type === 'services' ? 'Custom software, business systems, and workflow automation services from XNR IT Solutions.' : 'Explore systems and automation projects built by XNR IT Solutions.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}/${type}`);
  }, [type]);

  return <div className="page-shell team-page slug-page"><PageHeader /><main id="main-content">{type === 'services' ? <Advantage /> : <Projects />}<Footer /></main></div>;
}
