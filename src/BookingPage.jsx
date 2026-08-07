import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';

const bookingUrl = import.meta.env.VITE_CAL_BOOKING_URL || '';
const isValidBookingUrl = /^https:\/\/cal\.com\/[A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~%+-]+)?(?:[?#].*)?$/.test(bookingUrl);

function PageHeader() {
  return <header className="topbar team-page-topbar">
    <div className="topbar-inner">
      <div className="header-spacer" />
      <div className="header-main">
        <a className="logo" href="/" aria-label="XNR IT Solutions home"><img src="/assets/xnr-logo.png" alt="XNR IT Solutions" /></a>
        <nav className="nav-links" aria-label="Primary navigation"><a href="/services">Services</a><a href="/projects">Projects</a><a href="/team">Team</a><a href="/insights">Insights</a></nav>
      </div>
      <div className="header-fill" />
      <div className="topbar-actions"><a className="btn btn-secondary" href="/book-a-call" aria-current="page">Contact Sales</a><a className="btn btn-primary" href="/get-started">Get Started <ArrowRight /></a></div>
      <div className="header-spacer" />
    </div>
  </header>;
}

export default function BookingPage() {
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);
  useEffect(() => {
    document.title = 'Book a 15-Minute Consultation | XNR IT Solutions';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Book a 15-minute consultation with XNR IT Solutions to discuss custom software development, business process automation, CRM systems, internal dashboards, and connected workflows.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}/book-a-call`);
  }, []);

  return <div className="page-shell team-page booking-page">
    <PageHeader />
    <main id="main-content">
      <section className="booking-section" aria-labelledby="booking-title">
        <div className="booking-intro"><p className="section-label">Book a quick consultation</p><h1 id="booking-title">Choose a time to talk about your goals.</h1><p>Book a 15-minute consultation with XNR IT Solutions to discuss custom software, business process automation, CRM systems, internal dashboards, or connected workflows. We’ll learn what you need, answer your questions, and recommend the best next step.</p></div>
        <div className="booking-card">
          {isValidBookingUrl ? <div className="booking-embed-wrap"><iframe title="Schedule a consultation with XNR IT Solutions" src={bookingUrl} loading="lazy" /></div> : <div className="booking-setup"><h3>Our calendar is being connected.</h3><p>For now, send us your project details and we’ll get back to you with available times.</p><a className="btn btn-primary" href="/get-started">Tell us about your project <ArrowRight /></a></div>}
        </div>
      </section>
    </main>
  </div>;
}
