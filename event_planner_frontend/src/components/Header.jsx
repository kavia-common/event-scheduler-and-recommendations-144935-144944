import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onCreate }) {
  /** Top navigation bar with brand and primary actions. */
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" aria-label="Event Planner">
          <div className="brand-badge" aria-hidden>EP</div>
          <div>
            <div>Event Planner</div>
            <div className="kicker">Plan. Organize. Attend.</div>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="#calendar" className="active">Calendar</a>
          <a href="#upcoming">Upcoming</a>
          <a href="#recommended">Recommended</a>
          <button className="primary" onClick={onCreate} aria-label="Create Event">
            + Create Event
          </button>
        </nav>
      </div>
    </header>
  );
}
