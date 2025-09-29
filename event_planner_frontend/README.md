# Event Planner Frontend (React)

Modern "Ocean Professional" themed frontend for scheduling events, viewing upcoming items, and browsing recommended events.

## Features
- True SPA with React Router (Home, About, Calendar) and smooth client-side transitions
- Dark/Light Mode with system preference detection and toggle
- Calendar month view with quick add
- Sidebar with Upcoming and Recommended lists
- Create Event modal (title, date, time, location, category, description)
- Subtle animated backgrounds: ocean waves, dotted robotic grid, floating orbs
- Mocked REST API layer for easy backend integration

## Quick Start
- npm install
- npm start
- npm test
- npm run build

## Structure
- src/components: Header, Calendar, Sidebar, EventModal
- src/context: EventProvider with events state and actions
- src/api: Mock REST API (replace with real endpoints later)
- src/utils: Date helpers
- src/styles.css: Theme and component styles and background animations
- src/App.js: SPA routes, ThemeProvider, and BackgroundFX

## SPA Routing
This app uses `react-router-dom@6`. Main routes:
- `/` Home
- `/about` About
- `/calendar` Calendar

## Dark/Light Theme
- System preference respected (prefers-color-scheme).
- User toggle persists selection in `localStorage` (`hackwave-theme`).
- Tokens are CSS variables; dark mode is enabled via `:root.theme-dark`.

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

## Visual and Asset Credits (Demo Use)
- Unsplash photos used under Unsplash License for demo purposes:
  - Developers collaborating: https://unsplash.com/photos/photo-1551836022-d5d88e9218df
  - Team collaboration: https://unsplash.com/photos/photo-1519389950473-47ba0277781c
  - AI/robotics vibe: https://unsplash.com/photos/photo-1555255707-c07966088b7b
- Animated background shapes (waves, dotted grids, orbs) are implemented via inline SVG and CSS animations inspired by open examples from:
  - CSS-Tricks (SVG wave backgrounds)
  - Undraw/Free SVG inspiration for robotic motifs (no direct assets embedded)
  - No third-party runtime libraries are required for animations.

If you replace visuals with stock animations (e.g., Lottie), ensure you comply with the asset license and add proper attribution here.
