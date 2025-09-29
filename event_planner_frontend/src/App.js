import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react';
import './styles.css';
import { EventProvider, useEvents } from './context/EventContext';
import Calendar from './components/Calendar';
import SidebarWidgets from './components/Sidebar';
import EventModal from './components/EventModal';
import { theme } from './theme';

/** BackgroundFX renders animated ocean waves and robotic dotted grid for subtle depth across pages. */
function BackgroundFX() {
  return (
    <div className="bgfx" aria-hidden>
      <div className="bgfx-gradient" />
      <svg className="bgfx-waves" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,181.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L0,320Z" fill="url(#waveGradient)" fillOpacity="0.25"></path>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary-soft)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="bgfx-grid" />
      <div className="bgfx-robot-orbs">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>
    </div>
  );
}

// Smooth-scroll helper for links in the left sidebar
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Simple wave + spark SVG mark for brand */
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

const ThemeContext = React.createContext({ themeMode: 'system', toggle: () => {}, setThemeMode: () => {} });

/** LeftSidebar: persistent navigation + merged widgets, collapsible on mobile */
function LeftSidebar({ onCreate }) {
  const themeCtx = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const navItems = useMemo(() => ([
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
    <>
      <button
        className="leftbar-toggle btn"
        aria-label="Toggle sidebar"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ☰
      </button>
      <aside className={`leftbar ${open ? 'open' : ''}`} aria-label="App Navigation">
        <div className="leftbar-header">
          <a className="brand" href="#home" onClick={handleNav('home')}>
            <div className="brand-badge" aria-hidden>
              <Logo />
            </div>
            <div>
              <div>HackWave</div>
              <div className="kicker">Ocean Professional</div>
            </div>
          </a>
          <button className="btn" onClick={themeCtx.toggle} aria-label="Toggle Dark Mode">🌓</button>
        </div>

        <nav className="leftbar-nav">
          {navItems.map((it) => (
            <a key={it.id} href={`#${it.id}`} onClick={handleNav(it.id)}>{it.label}</a>
          ))}
          <button className="btn primary" onClick={onCreate} aria-label="Create Hackathon Item">+ Add Hackathon</button>
        </nav>

        <div className="leftbar-widgets">
          {/* Merge right sidebar widgets here; reuse SidebarWidgets for lists */}
          <SidebarWidgets onCreate={onCreate} />
        </div>
      </aside>
    </>
  );
}

function HomeHero({ onCreate }) {
  return (
    <section className="card section" id="home" style={{ overflow: 'hidden' }} aria-label="Hero">
      <div className="card-header">
        <div className="card-title">Welcome to HackWave</div>
        <button className="btn primary" onClick={onCreate}>+ Plan a Hackathon</button>
      </div>
      <div className="card-body" style={{ display: 'grid', gap: 16 }}>
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">AI-powered Hackathon Planning</h1>
            <p className="kicker hero-subtitle">
              Forecast schedules, recommend challenges, and streamline team collaboration with Ocean Professional polish.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#calendar">Open Calendar</a>
              <a className="btn" href="#about">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
              alt="Developers collaborating at a hackathon"
            />
          </div>
        </div>
        <div id="features" className="features-grid">
          <FeatureCard
            title="AI Recommendations"
            desc="Get suggested hackathons, timelines, and resources based on your interests."
            icon="🤖"
            image="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop"
          />
          <FeatureCard
            title="Team Collaboration"
            desc="Coordinate team sprints, mentor sessions, and judging slots with ease."
            icon="👥"
            image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
          />
          <FeatureCard
            title="Hackathon Calendar"
            desc="Stay on top of upcoming hackathons and deadlines in a single view."
            icon="📅"
            image="https://images.unsplash.com/photo-1520367745676-56196632073f?q=80&w=800&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, icon, image }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ height: 120, overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <img src={image} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover', height: '100%' }} />
      </div>
      <div className="card-body">
        <div className="kicker" style={{ marginBottom: 4 }}>{icon} Feature</div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
        <div className="kicker">{desc}</div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="card section" id="about" aria-label="About HackWave">
      <div className="card-header">
        <div className="card-title">About HackWave</div>
      </div>
      <div className="card-body" style={{ display: 'grid', gap: 14 }}>
        <p>
          HackWave is a hackathon-centric event planner that helps organizers and participants plan, schedule, and
          execute winning projects. With AI-powered recommendations, you can discover upcoming hackathons, optimize
          your sprint schedule, and align team resources with judging criteria.
        </p>
        <div className="about-grid">
          <AboutTile
            title="AI Insights"
            desc="Personalized recommendations for hackathons, challenges, and learning paths."
            icon="🧠"
          />
          <AboutTile
            title="Team Tools"
            desc="Coordination for mentorship sessions, checkpoints, and demo slots."
            icon="🛠️"
          />
          <AboutTile
            title="Innovation First"
            desc="Focus on building — we handle scheduling, reminders, and logistics."
            icon="🚀"
          />
          <AboutTile
            title="Ocean Professional"
            desc="A modern, calming interface that lets your creativity flow."
            icon="🌊"
          />
        </div>
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
            alt="Team collaboration during hackathon"
          />
        </div>
      </div>
    </section>
  );
}

function AboutTile({ title, desc, icon }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="kicker" style={{ marginBottom: 4 }}>{icon} {title}</div>
        <div className="kicker">{desc}</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)'
    }}>
      <div className="header-inner" style={{ padding: '16px 20px' }}>
        <div className="kicker">© {new Date().getFullYear()} HackWave — Where AI meets Hackathons.</div>
        <div className="kicker" style={{ marginLeft: 'auto' }}>
          Ocean Professional • Blue & Amber accents
        </div>
      </div>
    </footer>
  );
}

/** ThemeProvider: manages light/dark theme with system preference and persistence. */
function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    const stored = localStorage.getItem('hackwave-theme');
    if (stored) setThemeMode(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveDark = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);
    if (effectiveDark) {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  }, [themeMode]);

  const toggle = useCallback(() => {
    setThemeMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark';
      localStorage.setItem('hackwave-theme', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ themeMode, toggle, setThemeMode }), [themeMode, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Smooth scroll on hash load
function useHashScroll() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
    }
  }, []);
}

// PUBLIC_INTERFACE
function AppShell() {
  /** Main app shell rendering left sidebar, landing sections, and modal. */
  const { addEvent, setSelectedDate } = useEvents();
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);
  useHashScroll();

  const openCreate = useCallback((defaults) => {
    setPrefill(defaults || null);
    setOpen(true);
    if (defaults?.date) setSelectedDate(defaults.date);
  }, [setSelectedDate]);

  const openForDate = useCallback((dateStr) => {
    openCreate({ date: dateStr });
  }, [openCreate]);

  const close = () => setOpen(false);

  const submit = async (values) => {
    await addEvent(values);
  };

  return (
    <div className="app-shell" style={{ '--transition': theme.transitions.base }}>
      <BackgroundFX />
      {/* Persistent left sidebar with nav + merged widgets */}
      <LeftSidebar onCreate={() => openCreate()} />

      {/* Main content area (full-width content; right sidebar removed) */}
      <main className="content content-with-leftbar">
        <div className="main-stack">
          <HomeHero onCreate={() => openCreate()} />
          <AboutSection />
          <div className="card section-cta">
            <div className="card-body">
              <div className="kicker">Ready to plan?</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn primary" href="#calendar">Open Calendar</a>
                <button className="btn" onClick={() => openCreate()}>Quick Add</button>
              </div>
            </div>
          </div>
          <Calendar onCreateForDate={openForDate} />
        </div>
      </main>

      <EventModal open={open} onClose={close} onSubmit={submit} defaultValues={prefill || {}} />
      <Footer />
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root single-page app with context provider. */
  return (
    <EventProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </EventProvider>
  );
}
