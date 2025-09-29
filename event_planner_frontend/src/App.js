import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.css';
import { EventProvider, useEvents } from './context/EventContext';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';
import { theme } from './theme';

// Simple hash-router helper
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const route = useMemo(() => {
    const h = hash.replace(/^#/, '');
    // Normalize: '/', '/about', '/calendar'
    if (h.startsWith('/about')) return '/about';
    if (h.startsWith('/calendar')) return '/calendar';
    return '/';
  }, [hash]);
  return route;
}

function HomeHero({ onCreate }) {
  return (
    <section className="card" style={{ overflow: 'hidden' }} aria-label="Hero">
      <div className="card-header">
        <div className="card-title">Welcome to HackWave</div>
        <button className="btn primary" onClick={onCreate}>+ Plan a Hackathon</button>
      </div>
      <div className="card-body" style={{ display: 'grid', gap: 16 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 16,
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ margin: '8px 0 6px', fontSize: 28 }}>AI-powered Hackathon Planning</h1>
            <p className="kicker" style={{ fontSize: 14 }}>
              Forecast schedules, recommend challenges, and streamline team collaboration with Ocean Professional polish.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <a className="btn primary" href="#/calendar">Open Calendar</a>
              <a className="btn" href="#/about">Learn More</a>
            </div>
          </div>
          <div style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
              alt="Developers collaborating at a hackathon"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
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
    <section className="card">
      <div className="card-header">
        <div className="card-title">About HackWave</div>
      </div>
      <div className="card-body" style={{ display: 'grid', gap: 14 }}>
        <p>
          HackWave is a hackathon-centric event planner that helps organizers and participants plan, schedule, and
          execute winning projects. With AI-powered recommendations, you can discover upcoming hackathons, optimize
          your sprint schedule, and align team resources with judging criteria.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
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
        <div style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
            alt="Team collaboration during hackathon"
            style={{ width: '100%', display: 'block' }}
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

// PUBLIC_INTERFACE
function AppShell() {
  /** Main app shell rendering header, routing views, sidebar, and modal. */
  const { addEvent, setSelectedDate } = useEvents();
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const route = useHashRoute();

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

  const renderMain = () => {
    if (route === '/about') {
      return (
        <main className="content">
          <AboutSection />
          <Sidebar onCreate={() => openCreate()} />
        </main>
      );
    }
    if (route === '/calendar') {
      return (
        <main className="content">
          <Calendar onCreateForDate={openForDate} />
          <Sidebar onCreate={() => openCreate()} />
        </main>
      );
    }
    // default Home
    return (
      <main className="content">
        <HomeHero onCreate={() => openCreate()} />
        <Sidebar onCreate={() => openCreate()} />
      </main>
    );
  };

  return (
    <div className="app-shell" style={{ '--transition': theme.transitions.base }}>
      <Header onCreate={() => openCreate()} />
      {renderMain()}
      <EventModal open={open} onClose={close} onSubmit={submit} defaultValues={prefill || {}} />
      <Footer />
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root app with context provider. */
  return (
    <EventProvider>
      <AppShell />
    </EventProvider>
  );
}
