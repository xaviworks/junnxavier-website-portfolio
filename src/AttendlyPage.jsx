import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ClipboardCheck, QrCode, ShieldCheck, Users } from 'lucide-react';
import './kavio.css';
import './attendly.css';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.xnrsolutions.bcattendly&hl=en';
const asset = (name) => `/assets/attendly/${name}.webp`;
const journeys = {
  attendee: { label: 'For attendees', title: 'Join. Scan. Take part.', description: 'Join an event with its invitation code, generate your QR code, and show it to the organizer. Complete the event evaluation from the same app.', image: 'attendee', steps: ['Join an event', 'Generate your QR code', 'Show your QR to the organizer', 'Answer the evaluation'] },
  organizer: { label: 'For organizers', title: 'Run the event. Keep the record.', description: 'Create an event, scan attendee QR codes, and keep check-in and check-out records together. Export attendance and review evaluations when the event is over.', image: 'organizer', steps: ['Create an event', 'Scan attendee QR codes', 'View and export attendance', 'Review evaluations'] },
};
const screens = [
  { image: 'screen-4', title: 'Your events, in one place.', description: 'Create events, find active sessions, and access your form library from the organizer dashboard.', alt: 'Attendly organizer dashboard with an active event, event search, and form library' },
  { image: 'screen-3', title: 'A familiar way to sign in.', description: 'Authorized Brokenshire College users can access their account with their school credentials.', alt: 'BC Attendly sign-in screen with school username and password fields' },
];

function DownloadButton() {
  return <a className="btn btn-primary" href={playStoreUrl} target="_blank" rel="noopener noreferrer"><img className="attendly-playstore-logo" src="/assets/attendly/playstore.png" width="24" height="24" alt="" /> Get it on Google Play <ArrowUpRight size={16} aria-hidden="true" /></a>;
}

export default function AttendlyPage() {
  const [role, setRole] = useState('organizer');
  const [screenIndex, setScreenIndex] = useState(0);
  const journey = journeys[role];
  const screen = screens[screenIndex];
  const move = (direction) => setScreenIndex((current) => (current + direction + screens.length) % screens.length);

  useEffect(() => {
    document.title = 'BC Attendly — Event Attendance Management | Junn Xavier Adalid';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore BC Attendly, an event and QR attendance app for Brokenshire College. Built with Flutter and Firebase. Available on Google Play.');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <div className="page-shell kavio-page attendly-page">
    <header className="kavio-nav">
      <a className="kavio-nav-brand" href="/attendly" aria-label="Attendly home"><img src={asset('logo')} width="48" height="48" alt="" /><span>BC Attendly<small>by Junn Xavier Adalid</small></span></a>
      <nav aria-label="Attendly navigation"><a href="#attendly-features">Features</a><a href="#attendly-gallery">App preview</a><a className="btn btn-primary" href={playStoreUrl} target="_blank" rel="noopener noreferrer"><img className="attendly-playstore-logo" src="/assets/attendly/playstore.png" width="24" height="24" alt="" /> Google Play <ArrowUpRight size={16} /></a></nav>
    </header>
    <main id="main-content">
      <section className="kavio-hero kavio-wrap">
        <div><p className="section-label">ATTENDLY · AVAILABLE ON GOOGLE PLAY</p><h1>Smarter events.<br /><em>Simpler attendance.</em></h1><p className="kavio-lead">An event and attendance companion for Brokenshire College. Create or join events, record attendance with QR codes, and complete evaluations in one place.</p><div className="kavio-actions"><DownloadButton /><span><QrCode size={17} aria-hidden="true" /> Built for campus events</span></div><a className="attendly-back" href="/#projects"><ArrowLeft size={15} /> Back to my projects</a></div>
        <div className="kavio-preview-stage"><img className="kavio-dashboard-screenshot attendly-phone" src={asset('screen-4')} width="600" height="1326" alt={screens[0].alt} fetchPriority="high" /><div className="kavio-preview-caption"><CalendarDays size={15} /> Your next event, organized.</div></div>
      </section>

      <section className="kavio-business-section kavio-wrap" id="attendly-features">
        <div className="kavio-business-heading"><div><p className="section-label">TWO ROLES. ONE CONNECTED EVENT.</p><h2>From the first invite<br /><em>to the final evaluation.</em></h2></div><p>Attendees and organizers have their own tools, with a shared attendance record at the center of the event.</p></div>
        <div className="kavio-business-switch" role="group" aria-label="Choose an Attendly role">{Object.entries(journeys).map(([key, view]) => <button key={key} type="button" aria-pressed={role === key} onClick={() => setRole(key)}>{view.label}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
        <div className="attendly-journey" aria-live="polite"><div className="kavio-business-story"><span className="kavio-example-label">{journey.label}</span><h3>{journey.title}</h3><p>{journey.description}</p><ol className="attendly-steps">{journey.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></div><img className="attendly-phone attendly-journey-image" src={asset(journey.image)} width="926" height="2046" alt={`Attendly ${role} onboarding screen showing the event attendance journey`} loading="lazy" /></div>
      </section>

      <section className="kavio-plans kavio-wrap"><p className="section-label">BUILT FOR THE WHOLE EVENT</p><h2>Less admin.<br />More time to participate.</h2><div className="kavio-plan-grid attendly-feature-grid">
        <article><QrCode size={30} aria-hidden="true" /><h3>QR attendance</h3><p>Generate and scan QR codes to record check-in and check-out attendance.</p></article>
        <article className="kavio-pro"><CalendarDays size={30} aria-hidden="true" /><h3>Events & schedules</h3><p>Create events, share invitation codes, and find event details and schedules in one app.</p></article>
        <article><ClipboardCheck size={30} aria-hidden="true" /><h3>Forms & reports</h3><p>Collect evaluations, manage attendee participation, and export attendance records for reporting.</p></article>
      </div></section>

      <section className="kavio-wrap attendly-gallery" id="attendly-gallery" aria-label="Attendly app screenshots">
        <div className="kavio-business-heading"><div><p className="section-label">A CLOSER LOOK</p><h2>See Attendly<br /><em>on screen.</em></h2></div><p>A selected look at the real application. Browse the screens to explore the experience.</p></div>
        <div className="attendly-gallery-layout"><div className="attendly-gallery-copy"><div aria-live="polite" aria-atomic="true"><span className="kavio-example-label">{String(screenIndex + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</span><h3>{screen.title}</h3><p>{screen.description}</p></div><div className="attendly-gallery-controls"><button type="button" aria-label="Previous screenshot" onClick={() => move(-1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Next screenshot" onClick={() => move(1)}><ArrowRight size={20} /></button></div><div className="attendly-gallery-tabs" role="group" aria-label="Choose a screenshot">{screens.map((item, index) => <button key={item.image} type="button" aria-pressed={index === screenIndex} onClick={() => setScreenIndex(index)}>{index === 0 ? 'Dashboard' : 'Sign in'}</button>)}</div></div><img className="attendly-phone" src={asset(screen.image)} width="600" height="1326" alt={screen.alt} loading="lazy" /></div>
      </section>

      <section className="kavio-ai kavio-wrap attendly-build"><div><p className="section-label">BEHIND THE BUILD</p><h2>Built with Flutter.<br /><em>Connected by Firebase.</em></h2><p>I developed Attendly as a mobile attendance system with separate organizer and attendee workflows, QR-based attendance, and exportable records.</p><ul className="attendly-tech" aria-label="Attendly tech stack">{['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'QR Code Generation'].map((technology) => <li key={technology}>{technology}</li>)}</ul></div><div className="kavio-ai-steps"><p><Users aria-hidden="true" /> Organizer and attendee accounts</p><p><ShieldCheck aria-hidden="true" /> Firebase authentication and account access</p><p><ClipboardCheck aria-hidden="true" /> Attendance records and evaluations</p></div></section>
      <section className="kavio-cta kavio-wrap"><p className="section-label">NOW ON GOOGLE PLAY</p><h2>Make your next event<br />easier to manage.</h2><p>Download BC Attendly for Android. Account access is intended for authorized Brokenshire College users and may require a valid school email or an organizer account.</p><DownloadButton /></section>
    </main>
    <footer className="kavio-footer"><a href="/attendly" className="kavio-footer-brand"><img src={asset('logo')} alt="" />BC Attendly</a><p>Smarter events. Simpler attendance.</p><nav aria-label="Attendly footer navigation"><a href="/">My portfolio</a><a href={playStoreUrl} target="_blank" rel="noopener noreferrer">Google Play</a><a href="mailto:xaviadalid959@gmail.com">Contact me</a></nav><small>© {new Date().getFullYear()} Junn Xavier Adalid.</small></footer>
  </div>;
}
