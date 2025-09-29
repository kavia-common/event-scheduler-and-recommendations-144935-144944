import React, { useCallback, useState } from 'react';
import './styles.css';
import { EventProvider, useEvents } from './context/EventContext';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';
import { theme } from './theme';

// PUBLIC_INTERFACE
function AppShell() {
  /** Main app shell rendering header, calendar, sidebar, and modal. */
  const { addEvent, setSelectedDate } = useEvents();
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);

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
      <Header onCreate={() => openCreate()} />
      <main className="content">
        <Calendar onCreateForDate={openForDate} />
        <Sidebar onCreate={() => openCreate()} />
      </main>
      <EventModal open={open} onClose={close} onSubmit={submit} defaultValues={prefill || {}} />
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
