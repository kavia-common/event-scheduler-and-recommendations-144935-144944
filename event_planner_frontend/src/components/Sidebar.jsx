import React, { useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { formatDate } from '../utils/dateUtils';

// PUBLIC_INTERFACE
export default function Sidebar({ onCreate }) {
  /** Sidebar with Upcoming and Recommended event lists. */
  const { events, recommended, loadingRecommended, setSelectedDate } = useEvents();

  const upcoming = useMemo(() => {
    const todayStr = formatDate(new Date());
    return [...events]
      .filter((e) => e.date >= todayStr)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      .slice(0, 8);
  }, [events]);

  return (
    <aside className="card" aria-label="Sidebar">
      <div className="card-header">
        <div className="card-title">Your Agenda</div>
        <button className="btn" onClick={onCreate}>+ New</button>
      </div>
      <div className="card-body">
        <div id="upcoming" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Upcoming</div>
          <div className="list">
            {upcoming.length === 0 && <div className="empty">No upcoming events. Create one!</div>}
            {upcoming.map((e) => (
              <div key={e.id} className="list-item">
                <div className="badge" aria-hidden>{e.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{e.title}</div>
                  <div className="kicker">{e.date} • {e.location}</div>
                </div>
                <button
                  className="btn"
                  onClick={() => setSelectedDate(e.date)}
                  aria-label={`Go to ${e.date}`}
                >
                  Go
                </button>
              </div>
            ))}
          </div>
        </div>
        <div id="recommended">
          <div className="kicker" style={{ marginBottom: 8 }}>Recommended</div>
          <div className="list">
            {loadingRecommended && <div className="empty">Loading recommendations…</div>}
            {!loadingRecommended && recommended.length === 0 && (
              <div className="empty">No recommendations right now.</div>
            )}
            {recommended.map((e) => (
              <div key={e.id} className="list-item">
                <div className="badge" style={{ background: '#fff7ed', borderColor: '#fed7aa', color: '#9a3412' }}>
                  {e.category}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{e.title}</div>
                  <div className="kicker">{e.date} • {e.time} • {e.location}</div>
                </div>
                <button
                  className="btn secondary"
                  onClick={() => onCreate({
                    title: e.title,
                    description: e.description,
                    date: e.date,
                    time: e.time,
                    location: e.location,
                    category: e.category
                  })}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
