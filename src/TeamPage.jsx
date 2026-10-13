import MobileNavigation from './MobileNavigation.jsx';
import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';
import { Team } from './App.jsx';

export default function TeamPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    document.title = 'About Me | Junn Xavier Adalid';
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    description?.setAttribute('content', 'The background and experience of Junn Xavier Adalid, full-stack developer and IT instructor in Davao City.');
    canonical?.setAttribute('href', `${window.location.origin}/about`);
  }, []);

  return <div className="page-shell team-page">
    <header className="topbar team-page-topbar">
      <div className="topbar-inner"><MobileNavigation />
        <div className="header-spacer" />
        <div className="header-main">
          <a className="logo" href="/" aria-label="Junn Xavier Adalid home"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="/services">Skills</a>
            <a href="/projects">Projects</a>
            <a className="is-current" href="/about" aria-current="page">About Me</a>
          </nav>
        </div>
        <div className="header-fill" />
        <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Me</a><a className="btn btn-primary" href="/#contact">Let’s Talk <ArrowRight /></a></div>
        <div className="header-spacer" />
      </div>
    </header>
    <main id="main-content"><Team /></main>
  </div>;
}
