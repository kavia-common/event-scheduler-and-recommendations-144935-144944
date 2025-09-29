import React, { useMemo } from 'react';
import { getMonthMatrix, isSameDay, isSameMonth, formatDate } from '../utils/dateUtils';
import { useEvents } from '../context/EventContext';

// PUBLIC_INTERFACE
export default function Calendar({ onCreateForDate }) {
  /** Month calendar showing events. Click a day to select or create new event. */
  const { events, selectedDate, setSelectedDate } = useEvents();

  const current = useMemo(() => new Date(selectedDate), [selectedDate]);
  const year = current.getFullYear();
  const monthIndex = current.getMonth();
  const monthMatrix = useMemo(() => getMonthMatrix(year, monthIndex), [year, monthIndex]);

  const eventsByDay = useMemo(() => {
    const map = {};
    for (const e of events) {
      map[e.date] = map[e.date] ? [...map[e.date], e] : [e];
    }
    return map;
  }, [events]);

  const handlePrev = () => {
    const d = new Date(year, monthIndex - 1, 1);
    setSelectedDate(formatDate(d));
  };

  const handleNext = () => {
    const d = new Date(year, monthIndex + 1, 1);
    setSelectedDate(formatDate(d));
  };

  const handleToday = () => {
    setSelectedDate(formatDate(new Date()));
  };

  return (
    <section className="card calendar" id="calendar" aria-label="Hackathon Calendar">
      <div className="calendar-header">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn" onClick={handlePrev} aria-label="Previous month">‹</button>
          <button className="btn" onClick={handleToday} aria-label="Go to today">Today</button>
          <button className="btn" onClick={handleNext} aria-label="Next month">›</button>
        </div>
        <div className="card-title" aria-live="polite">
          {current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </div>
        <button className="btn primary" onClick={() => onCreateForDate(formatDate(current))}>+ Add</button>
      </div>

      <div className="calendar-grid" role="grid" aria-label="Month view">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
          <div key={d} className="calendar-day-label" role="columnheader" aria-label={d}>{d}</div>
        ))}
        {monthMatrix.flat().map((d, idx) => {
          const dateStr = formatDate(d);
          const today = isSameDay(d, new Date());
          const inMonth = isSameMonth(d, current);
          const dayEvents = eventsByDay[dateStr] || [];
          return (
            <div
              key={`${dateStr}-${idx}`}
              className={`calendar-cell ${inMonth ? '' : 'muted'}`}
              role="gridcell"
              aria-selected={isSameDay(d, current)}
              onClick={() => setSelectedDate(dateStr)}
              style={{
                outline: isSameDay(d, current) ? '2px solid rgba(37,99,235,0.5)' : 'none',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="calendar-date">{d.getDate()}</div>
                {today && <span className="badge" aria-label="Today">Today</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {dayEvents.slice(0, 3).map((ev) => (
                  <div key={ev.id} className="event-chip" title={ev.title}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</span>
                    <span className="time">{ev.time}</span>
                  </div>
                ))}
                {dayEvents.length === 0 && (
                  <button
                    className="btn"
                    onClick={(e) => { e.stopPropagation(); onCreateForDate(dateStr); }}
                    aria-label={`Create event on ${dateStr}`}
                  >
                    + Add
                  </button>
                )}
                {dayEvents.length > 3 && (
                  <div className="kicker">{dayEvents.length - 3} more…</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
