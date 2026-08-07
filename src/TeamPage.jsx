import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';
import { Team } from './App.jsx';

export default function TeamPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    document.title = 'Our Team | XNR IT Solutions';
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    description?.setAttribute('content', 'Meet the people behind XNR IT Solutions: a focused team building custom software, connected business systems, and workflow automation.');
    canonical?.setAttribute('href', `${window.location.origin}/team`);
  }, []);

  return <div className="page-shell team-page">
    <header className="topbar team-page-topbar">
      <div className="topbar-inner">
        <div className="header-spacer" />
        <div className="header-main">
          <a className="logo" href="/" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="/services">Services</a>
            <a href="/projects">Projects</a>
            <a className="is-current" href="/team" aria-current="page">Team</a>
            <a href="/insights">Insights</a>
          </nav>
        </div>
        <div className="header-fill" />
        <div className="topbar-actions"><a className="btn btn-secondary" href="/contact">Contact Sales</a><a className="btn btn-primary" href="/contact">Get Started <ArrowRight /></a></div>
        <div className="header-spacer" />
      </div>
    </header>
    <main id="main-content"><Team /></main>
  </div>;
}
