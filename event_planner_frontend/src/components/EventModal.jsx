import React, { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../utils/dateUtils';

// PUBLIC_INTERFACE
export default function EventModal({ open, onClose, onSubmit, defaultValues }) {
  /** Modal to create a new hackathon item. Provides validation and submission. */
  const initial = useMemo(() => ({
    title: '',
    description: '',
    date: formatDate(new Date()),
    time: '09:00',
    location: '',
    category: 'Hackathon',
    ...defaultValues,
  }), [defaultValues]);

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initial);
    setErrors({});
  }, [initial, open]);

  if (!open) return null;

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const err = {};
    if (!values.title.trim()) err.title = 'Title is required';
    if (!values.date) err.date = 'Date is required';
    if (!values.time) err.time = 'Time is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Create Hackathon Item">
      <div className="modal">
        <div className="modal-header">
          <div className="card-title">Create Hackathon Item</div>
          <button className="btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <label className="label" htmlFor="title">Title</label>
              <input id="title" className="input" value={values.title} onChange={update('title')} placeholder="e.g., Team Formation, AI Briefing" />
              {errors.title && <div className="helper" style={{ color: 'var(--error)' }}>{errors.title}</div>}
            </div>
            <div className="form-row">
              <label className="label" htmlFor="description">Description</label>
              <textarea id="description" className="textarea" value={values.description} onChange={update('description')} placeholder="Optional details" />
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="label" htmlFor="date">Date</label>
                <input id="date" type="date" className="input" value={values.date} onChange={update('date')} />
                {errors.date && <div className="helper" style={{ color: 'var(--error)' }}>{errors.date}</div>}
              </div>
              <div>
                <label className="label" htmlFor="time">Time</label>
                <input id="time" type="time" className="input" value={values.time} onChange={update('time')} />
                {errors.time && <div className="helper" style={{ color: 'var(--error)' }}>{errors.time}</div>}
              </div>
            </div>
            <div className="form-row">
              <label className="label" htmlFor="location">Location</label>
              <input id="location" className="input" value={values.location} onChange={update('location')} placeholder="e.g., Main Hall / Zoom" />
            </div>
            <div className="form-row">
              <label className="label" htmlFor="category">Category</label>
              <select id="category" className="select" value={values.category} onChange={update('category')}>
                <option>Hackathon</option>
                <option>Workshop</option>
                <option>Sprint</option>
                <option>Mentorship</option>
                <option>Judging</option>
                <option>AI</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <div className="kicker">Ocean Professional</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
