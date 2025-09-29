import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchEvents, fetchRecommendedEvents, createEvent, updateEvent, deleteEvent } from '../api/eventsApi';
import { formatDate } from '../utils/dateUtils';

const EventContext = createContext(null);

// PUBLIC_INTERFACE
export function useEvents() {
  /** Hook to access events state and actions. */
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvents must be used within EventProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function EventProvider({ children }) {
  /** Provides events data and actions via context. */
  const [events, setEvents] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [evts] = await Promise.all([fetchEvents()]);
      setEvents(evts);
      setError(null);
    } catch (e) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRecommended = useCallback(async () => {
    setLoadingRecommended(true);
    try {
      const rec = await fetchRecommendedEvents();
      setRecommended(rec);
    } catch (e) {
      // ignore for now
    } finally {
      setLoadingRecommended(false);
    }
  }, []);

  useEffect(() => {
    load();
    loadRecommended();
  }, [load, loadRecommended]);

  const addEvent = useCallback(async (payload) => {
    const created = await createEvent(payload);
    setEvents((prev) => [...prev, created]);
    return created;
  }, []);

  const editEvent = useCallback(async (id, updates) => {
    const updated = await updateEvent(id, updates);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  }, []);

  const removeEvent = useCallback(async (id) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      events,
      recommended,
      loading,
      loadingRecommended,
      error,
      selectedDate,
      setSelectedDate,
      reload: load,
      reloadRecommended: loadRecommended,
      addEvent,
      editEvent,
      removeEvent,
    }),
    [events, recommended, loading, loadingRecommended, error, selectedDate, load, loadRecommended, addEvent, editEvent, removeEvent]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
