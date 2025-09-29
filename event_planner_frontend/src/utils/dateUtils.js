function pad(n) {
  return n.toString().padStart(2, '0');
}

// PUBLIC_INTERFACE
export function formatDate(date) {
  /** Format Date to YYYY-MM-DD string. */
  const d = new Date(date);
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  return `${y}-${m}-${day}`;
}

// PUBLIC_INTERFACE
export function getMonthMatrix(year, monthIndex) {
  /** Return 6x7 matrix of Date objects for the given month view (Sun-Sat). */
  const firstDay = new Date(year, monthIndex, 1);
  const startDayOfWeek = firstDay.getDay(); // 0=Sun
  const startDate = new Date(year, monthIndex, 1 - startDayOfWeek);

  const matrix = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i * 7 + j);
      row.push(cellDate);
    }
    matrix.push(row);
  }
  return matrix;
}

// PUBLIC_INTERFACE
export function isSameDay(a, b) {
  /** Check if two dates are same day (YYYY-MM-DD). */
  return formatDate(a) === formatDate(b);
}

// PUBLIC_INTERFACE
export function isSameMonth(a, b) {
  /** Check if two dates are in the same month. */
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth();
}
