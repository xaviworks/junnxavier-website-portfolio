import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { apiFetch } from './lib/api.js';

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    document.title = 'Insights | XNR IT Solutions';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Insights from XNR IT Solutions on custom software, business systems, and workflow automation.');
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
      <div className="topbar-inner">
        <div className="header-spacer" />
        <div className="header-main">
          <a className="logo" href="/" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="/services">Services</a>
            <a href="/projects">Projects</a>
            <a href="/team">Team</a>
            <a className="is-current" href="/insights" aria-current="page">Insights</a>
          </nav>
        </div>
        <div className="header-fill" />
        <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call">Contact Sales</a><a className="btn btn-primary" href="/get-started">Get Started <ArrowRight /></a></div>
        <div className="header-spacer" />
      </div>
    </header>
    <main id="main-content">
      <section className="section insights" aria-labelledby="insights-title">
        <div className="insights-heading">
          <p className="section-label">Insights</p>
          <h1 id="insights-title">Ideas for better systems.</h1>
          <p className="section-copy">Practical notes on custom software, connected business systems, and workflow automation.</p>
          <a className="btn btn-primary" href="/get-started">Talk to our team <ArrowRight /></a>
        </div>
        {error ? <p className="api-status is-error" role="alert">Unable to load insights right now.</p> : loading ? <p className="api-status">Loading insights…</p> : !insights.length ? <p className="api-status">No insights published yet.</p> : <div className="insights-grid">{insights.map((insight) => <article className="insight-card" key={insight.slug}><p className="section-label">{insight.date || 'Insight'}</p><h2>{insight.title}</h2><p>{insight.excerpt}</p></article>)}</div>}
      </section>
    </main>
  </div>;
}
