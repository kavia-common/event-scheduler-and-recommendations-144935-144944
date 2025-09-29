# Event Planner Frontend (React)

Modern "Ocean Professional" themed frontend for scheduling events, viewing upcoming items, and browsing recommended events.

## Features
- Calendar month view with quick add
- Sidebar with Upcoming and Recommended lists
- Create Event modal (title, date, time, location, category, description)
- Smooth transitions, rounded corners, subtle gradients
- Mocked REST API layer for easy backend integration

## Quick Start
- npm start
- npm test
- npm run build

## Structure
- src/components: Header, Calendar, Sidebar, EventModal
- src/context: EventProvider with events state and actions
- src/api: Mock REST API (replace with real endpoints later)
- src/utils: Date helpers
- src/styles.css: Theme and component styles

## Integrating a real backend
Replace functions in `src/api/eventsApi.js` with real `fetch`/`axios` calls to your backend. Keep interfaces:
- fetchEvents()
- fetchRecommendedEvents()
- createEvent(event)
- updateEvent(id, updates)
- deleteEvent(id)

These are used by the EventProvider and UI.

## Theming
Primary: #2563EB, Secondary: #F59E0B. Update theme in `src/theme.js` and CSS vars in `src/styles.css`.
