import MobileNavigation from './MobileNavigation.jsx';
import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const bookingUrl = import.meta.env.VITE_PORTFOLIO_BOOKING_URL || '';
const isValidBookingUrl = /^https:\/\/cal\.com\/[A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~%+-]+)?(?:[?#].*)?$/.test(bookingUrl);

function PageHeader() {
  return <header className="topbar team-page-topbar">
    <div className="topbar-inner"><MobileNavigation />
      <div className="header-spacer" />
      <div className="header-main">
        <a className="logo" href="/" aria-label="Junn Xavier Adalid home"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a>
        <nav className="nav-links" aria-label="Primary navigation"><a href="/services">Skills</a><a href="/projects">Projects</a><a href="/about">About Me</a></nav>
      </div>
      <div className="header-fill" />
      <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call" aria-current="page">Contact Me</a><a className="btn btn-primary" href="/#contact">Let’s Talk <ArrowRight /></a></div>
      <div className="header-spacer" />
    </div>
  </header>;
}

function BookingEmbed() {
  const embedRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const embed = embedRef.current;
    if (!embed || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: '300px 0px' });

    observer.observe(embed);
    return () => observer.disconnect();
  }, []);

  return <div className="booking-embed-wrap" ref={embedRef} aria-busy={!hasLoaded && !hasError}>
    {!hasLoaded && !hasError && <div className="booking-loader" role="status">
      <span className="booking-loader-spinner" aria-hidden="true" />
      <span>Loading calendar…</span>
    </div>}
    {hasError ? <div className="booking-load-error">
      <p>I couldn’t load the calendar here.</p>
      <a className="btn btn-primary" href={bookingUrl}>Open the calendar <ArrowRight /></a>
    </div> : shouldLoad && <iframe
      title="Schedule a consultation with Junn Xavier Adalid"
      src={bookingUrl}
      loading="lazy"
      onLoad={() => setHasLoaded(true)}
      onError={() => setHasError(true)}
    />}
  </div>;
}

export default function BookingPage() {
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);
  useEffect(() => {
    document.title = 'Book a 15-Minute Consultation | Junn Xavier Adalid';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Book a 15-minute consultation with Junn Xavier Adalid to discuss custom software development, business process automation, CRM systems, internal dashboards, and connected workflows.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}/book-a-call`);
  }, []);

  return <div className="page-shell team-page booking-page">
    <PageHeader />
    <main id="main-content">
      <section className="booking-section" aria-labelledby="booking-title">
        <div className="booking-intro"><p className="section-label">Book a quick consultation</p><h1 id="booking-title">Choose a time to talk about your goals.</h1><p>Book a 15-minute consultation with Junn Xavier Adalid to discuss custom software, business process automation, CRM systems, internal dashboards, or connected workflows. I’ll learn what you need and discuss how my experience fits your project.</p></div>
        <div className="booking-card">
          {isValidBookingUrl ? <BookingEmbed /> : <div className="booking-setup"><h3>Let’s arrange a time to talk.</h3><p>For now, send me your project details or opportunity and I’ll reply with available times.</p><a className="btn btn-primary" href="/#contact">Tell me about your project <ArrowRight /></a></div>}
        </div>
      </section>
    </main>
  </div>;
}
