import React, { useContext, useMemo, useState } from 'react';

const ThemeContext = React.createContext({ themeMode: 'system', toggle: () => {}, setThemeMode: () => {} });

// Smooth-scroll helper
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Simple wave + spark SVG mark
const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden focusable="false">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stopColor="rgba(37,99,235,0.95)" />
        <stop offset="100%" stopColor="rgba(37,99,235,0.75)" />
      </linearGradient>
    </defs>
    <path d="M4 30c8 0 8-12 16-12s8 12 16 12 8-12 16-12" stroke="url(#g)" strokeWidth="4" fill="none" />
    <circle cx="38" cy="10" r="3" fill="#F59E0B" />
  </svg>
);

// PUBLIC_INTERFACE
export default function Header({ onCreate }) {
  /** Top navigation bar with brand and primary actions. */
  const themeCtx = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const items = useMemo(() => ([
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'about', label: 'About' },
    { id: 'calendar', label: 'Calendar' },
  ]), []);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={handleNav('home')}>
          <div className="brand-badge" aria-hidden>
            <Logo />
          </div>
          <div>
            <div>HackWave</div>
            <div className="kicker">Ride the AI tide. Plan winning hackathons.</div>
          </div>
        </a>

        <button
          className="btn nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} onClick={handleNav(it.id)}>{it.label}</a>
          ))}
          <button className="btn" onClick={themeCtx.toggle} aria-label="Toggle Dark Mode">
            🌓
          </button>
          <button className="primary" onClick={onCreate} aria-label="Create Hackathon Item">
            + Add Hackathon
          </button>
        </nav>
      </div>
    </header>
  );
}
