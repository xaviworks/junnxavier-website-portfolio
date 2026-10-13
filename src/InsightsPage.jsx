import MobileNavigation from './MobileNavigation.jsx';
import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { apiFetch } from './lib/api.js';

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => document.getElementById('insights-title')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.title = 'Insights | Junn Xavier Adalid';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Insights from Junn Xavier Adalid on custom software, business systems, and workflow automation.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}/insights`);
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiFetch('/api/insights')
      .then((data) => {
        if (!cancelled) setInsights(data);
      })
      .catch((fetchError) => {
        if (!cancelled) setError(fetchError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return <div className="page-shell team-page insights-page">
    <header className="topbar team-page-topbar">
      <div className="topbar-inner"><MobileNavigation />
        <div className="header-spacer" />
        <div className="header-main">
          <a className="logo" href="/" aria-label="Junn Xavier Adalid home"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="/services">Skills</a>
            <a href="/projects">Projects</a>
            <a href="/about">About Me</a>
            <a className="is-current" href="/insights" aria-current="page">Insights</a>
          </nav>
        </div>
        <div className="header-fill" />
        <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Me</a><a className="btn btn-primary" href="/#contact">Let’s Talk <ArrowRight /></a></div>
        <div className="header-spacer" />
      </div>
    </header>
    <main id="main-content">
      <section className="section insights" aria-labelledby="insights-title">
        <div className="insights-heading">
          <p className="section-label">Insights</p>
          <h1 id="insights-title">Ideas for better systems.</h1>
          <p className="section-copy">Notes on software development, automation, and lessons from building real applications.</p>
          <a className="btn btn-primary" href="/#contact">Talk to me <ArrowRight /></a>
        </div>
        {error ? <p className="api-status is-error" role="alert">Unable to load insights right now.</p> : loading ? <p className="api-status">Loading insights…</p> : !insights.length ? <p className="api-status">No insights published yet.</p> : <div className="insights-grid">{insights.map((insight) => <article className="insight-card" key={insight.slug}><p className="section-label">{insight.date || 'Insight'}</p><h2>{insight.title}</h2><p>{insight.excerpt}</p></article>)}</div>}
      </section>
    </main>
  </div>;
}
