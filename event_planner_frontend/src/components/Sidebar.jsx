import React, { useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { formatDate } from '../utils/dateUtils';

// PUBLIC_INTERFACE
export default function Sidebar({ onCreate }) {
  /** Sidebar with Upcoming Hackathons, Recommended, and Resources. */
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
        <div className="card-title">Hackathon Hub</div>
        <button className="btn" onClick={onCreate}>+ New</button>
      </div>
      <div className="card-body">
        <div id="upcoming" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Upcoming Hackathons</div>
          <div className="list">
            {upcoming.length === 0 && <div className="empty">No upcoming hackathons. Create one!</div>}
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
        <div id="recommended" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Recommended Hackathons</div>
          <div className="list">
            {loadingRecommended && <div className="empty">Loading AI recommendations…</div>}
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
        <div id="resources">
          <div className="kicker" style={{ marginBottom: 8 }}>Resources</div>
          <div className="list">
            <a className="list-item" href="https://guide.mlh.io/" target="_blank" rel="noreferrer">
              <div className="badge" aria-hidden>📘</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Hackathon Guides</div>
                <div className="kicker">Best practices from organizers and mentors</div>
              </div>
            </a>
            <a className="list-item" href="https://github.com/f/awesome-chatgpt-prompts" target="_blank" rel="noreferrer">
              <div className="badge" aria-hidden>🧰</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>AI Toolkits</div>
                <div className="kicker">Prompts, models, and ML resources</div>
              </div>
            </a>
            <a className="list-item" href="https://opensource.guide/how-to-contribute/" target="_blank" rel="noreferrer">
              <div className="badge" aria-hidden>🤝</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Mentorship</div>
                <div className="kicker">Tips for contributors and mentors</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
