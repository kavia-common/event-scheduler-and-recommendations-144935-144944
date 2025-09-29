import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const ThemeContext = React.createContext({ themeMode: 'system', toggle: () => {}, setThemeMode: () => {} });

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
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" to="/">
          <div className="brand-badge" aria-hidden>
            <Logo />
          </div>
          <div>
            <div>HackWave</div>
            <div className="kicker">Ride the AI tide. Plan winning hackathons.</div>
          </div>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : undefined}>Calendar</NavLink>
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
