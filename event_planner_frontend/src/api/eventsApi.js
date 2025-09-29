const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Internal in-memory store for mock hackathon data
let _events = [
  {
    id: '1',
    title: 'HackWave Kickoff',
    description: 'Opening ceremony and team formation for the weekend hackathon.',
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    location: 'Main Hall / Zoom',
    category: 'Hackathon',
  },
  {
    id: '2',
    title: 'AI Challenge Briefing',
    description: 'Problem statements overview and Q&A with mentors.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '14:00',
    location: 'Auditorium',
    category: 'Workshop',
  },
  {
    id: '3',
    title: 'Midnight Coding Sprint',
    description: 'Late night sprint with snacks and ambient playlist.',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    time: '00:00',
    location: 'Collab Space',
    category: 'Sprint',
  },
];

let _recommended = [
  {
    id: 'r1',
    title: 'Open Source Sustainability Hack',
    description: 'Build tools to support maintainers and greener infra.',
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    time: '18:00',
    location: 'Online',
    category: 'Hackathon',
  },
  {
    id: 'r2',
    title: 'AI for Good Hackathon',
    description: 'Tackle healthcare and education challenges with ML.',
    date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    time: '12:00',
    location: 'Hybrid',
    category: 'AI',
  },
];

// PUBLIC_INTERFACE
export async function fetchEvents() {
  /** Fetch all scheduled hackathons/sessions (mocked REST). */
  await delay(350);
  return JSON.parse(JSON.stringify(_events));
}

// PUBLIC_INTERFACE
export async function fetchRecommendedEvents() {
  /** Fetch recommended hackathons list (mocked REST). */
  await delay(300);
  return JSON.parse(JSON.stringify(_recommended));
}

// PUBLIC_INTERFACE
export async function createEvent(event) {
  /** Create a new hackathon item (mocked REST). */
  await delay(250);
  const newEvent = { ...event, id: String(Date.now()) };
  _events.push(newEvent);
  return JSON.parse(JSON.stringify(newEvent));
}

// PUBLIC_INTERFACE
export async function updateEvent(eventId, updates) {
  /** Update an existing hackathon item by id (mocked REST). */
  await delay(250);
  _events = _events.map((e) => (e.id === eventId ? { ...e, ...updates } : e));
  return JSON.parse(JSON.stringify(_events.find((e) => e.id === eventId)));
}

// PUBLIC_INTERFACE
export async function deleteEvent(eventId) {
  /** Delete a hackathon item by id (mocked REST). */
  await delay(200);
  _events = _events.filter((e) => e.id !== eventId);
  return { success: true };
}
