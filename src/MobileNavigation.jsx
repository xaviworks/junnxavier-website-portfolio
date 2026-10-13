import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const links = [['Skills', '/services'], ['Projects', '/projects'], ['About Me', '/about'], ['Insights', '/insights']];

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    if (!open) return undefined;
    const dismissOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const dismissEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const dismissDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissEscape);
    desktop.addEventListener('change', dismissDesktop);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissEscape);
      desktop.removeEventListener('change', dismissDesktop);
    };
  }, [open]);

  return <div className="mobile-navigation" ref={rootRef} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button ref={buttonRef} className="mobile-menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <nav id={panelId} className="mobile-menu-panel" aria-label="Mobile navigation" hidden={!open} onClick={(event) => {
      if (event.target.closest('a')) setOpen(false);
    }}>
      <div className="mobile-menu-links">{links.map(([label, href]) => <a key={href} href={href} aria-current={currentPath === href ? 'page' : undefined}>{label}<ArrowRight aria-hidden="true" /></a>)}</div>
      <div className="mobile-menu-actions">
        <a className="btn btn-secondary" href="/book-a-call" aria-current={currentPath === '/book-a-call' ? 'page' : undefined}>Contact Me</a>
        <a className="btn btn-primary" href="/#contact">Let’s Talk <ArrowRight aria-hidden="true" /></a>
      </div>
    </nav>
  </div>;
}
