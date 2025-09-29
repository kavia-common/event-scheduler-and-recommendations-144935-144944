const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Internal in-memory store for mock data
let _events = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily sync with the engineering team.',
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    location: 'Zoom',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Client Demo',
    description: 'Showcase new features to ACME Corp.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '14:00',
    location: 'Office',
    category: 'Work',
  },
  {
    id: '3',
    title: 'Yoga Session',
    description: 'Relax and stretch.',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    time: '07:00',
    location: 'Gym',
    category: 'Health',
  },
];

let _recommended = [
  {
    id: 'r1',
    title: 'Local Tech Meetup',
    description: 'Network with tech professionals in your area.',
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    time: '18:00',
    location: 'Community Hall',
    category: 'Networking',
  },
  {
    id: 'r2',
    title: 'Product Webinar',
    description: 'Learn about the latest product management trends.',
    date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    time: '12:00',
    location: 'Online',
    category: 'Learning',
  },
];

// PUBLIC_INTERFACE
export async function fetchEvents() {
  /** Fetch all scheduled events (mocked REST). */
  await delay(350);
  return JSON.parse(JSON.stringify(_events));
}

// PUBLIC_INTERFACE
export async function fetchRecommendedEvents() {
  /** Fetch recommended events list (mocked REST). */
  await delay(300);
  return JSON.parse(JSON.stringify(_recommended));
}

// PUBLIC_INTERFACE
export async function createEvent(event) {
  /** Create a new event (mocked REST). */
  await delay(250);
  const newEvent = { ...event, id: String(Date.now()) };
  _events.push(newEvent);
  return JSON.parse(JSON.stringify(newEvent));
}

// PUBLIC_INTERFACE
export async function updateEvent(eventId, updates) {
  /** Update an existing event by id (mocked REST). */
  await delay(250);
  _events = _events.map((e) => (e.id === eventId ? { ...e, ...updates } : e));
  return JSON.parse(JSON.stringify(_events.find((e) => e.id === eventId)));
}

// PUBLIC_INTERFACE
export async function deleteEvent(eventId) {
  /** Delete an event by id (mocked REST). */
  await delay(200);
  _events = _events.filter((e) => e.id !== eventId);
  return { success: true };
}
