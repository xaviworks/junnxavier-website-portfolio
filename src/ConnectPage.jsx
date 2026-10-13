import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Download, Globe, MessageCircle, Phone, Share2 } from 'lucide-react';
import './connect.css';

export default function ConnectPage() {
  const [status, setStatus] = useState('');
  const [showLink, setShowLink] = useState(false);
  const cardUrl = `${window.location.origin}/connect`;

  useEffect(() => {
    document.title = 'Let’s connect | Junn Xavier Adalid';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Connect with Junn Xavier Adalid for custom software development, business systems, and workflow automation. Save my contact or book a consultation.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', cardUrl);
  }, [cardUrl]);

  async function shareCard() {
    setStatus('');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Junn Xavier Adalid', text: 'Contact Junn Xavier Adalid', url: cardUrl });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cardUrl);
        setStatus('Link copied.');
        return;
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
    setShowLink(true);
    setStatus('Copy the link below to share my card.');
  }

  return <main id="main-content" className="connect-page">
    <div className="connect-wrap">
      <header className="connect-topline"><a href="/" aria-label="Visit Junn Xavier Adalid website"><img src="/assets/junn-xavier.svg" alt="Junn Xavier Adalid" /></a><button type="button" onClick={shareCard} aria-label="Share Junn Xavier contact card"><Share2 size={18} aria-hidden="true" /></button></header>
      <article className="connect-card" aria-labelledby="connect-title">
        <div className="connect-cover"><span className="connect-kicker"><i /> GOOD CONNECTIONS. BETTER SYSTEMS.</span><div className="connect-orbit" aria-hidden="true"><span /><span /><b /></div><p>Built around<br /><strong>your next big idea.</strong></p><span className="connect-cover-mark" aria-hidden="true">↗</span></div>
        <div className="connect-body">
          <div className="connect-identity"><div className="connect-logo"><img src="/assets/junn-xavier.svg" alt="" /></div><span className="connect-badge"><Check size={12} aria-hidden="true" /> Let’s connect</span></div>
          <h1 id="connect-title">Junn Xavier Adalid</h1>
          <p className="connect-intro">Full-stack software developer specializing in Laravel, Python automation, APIs, and cross-platform applications.</p>
          <a className="connect-save" href="/junn-xavier.vcf" download="Junn-Xavier-Adalid.vcf"><Download size={19} aria-hidden="true" /> Save Contact <ArrowRight size={18} aria-hidden="true" /></a>
          <p className="connect-save-note">Keep my details handy for your next big idea.</p>
          <div className="connect-quick" aria-label="Contact Junn Xavier"><a href="tel:+639946947889"><Phone aria-hidden="true" /><span>Call me</span></a><a href="https://wa.me/639946947889"><MessageCircle aria-hidden="true" /><span>WhatsApp</span></a><a href="/#contact"><MessageCircle aria-hidden="true" /><span>Send inquiry</span></a></div>
          <div className="connect-links">
            <a href="/book-a-call"><span className="connect-link-icon"><CalendarDays aria-hidden="true" /></span><span><strong>Let’s talk about your goals</strong><small>Book a quick consultation</small></span><ArrowUpRight aria-hidden="true" /></a>
            <a href="/"><span className="connect-link-icon"><Globe aria-hidden="true" /></span><span><strong>Discover my work</strong><small>Meet your next technology partner</small></span><ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="connect-explore"><a href="/services">My skills <ArrowUpRight size={14} aria-hidden="true" /></a><span /><a href="/projects">My projects <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>
      </article>
      <div className="connect-share-status" role="status">{status}</div>
      {showLink && <label className="connect-copy-label">Card link<input readOnly value={cardUrl} onFocus={(event) => event.target.select()} /></label>}
      <footer className="connect-footer"><span>One connection. More possibilities.</span><a href="/">Junn Xavier Adalid <ArrowUpRight size={12} aria-hidden="true" /></a></footer>
    </div>
  </main>;
}
