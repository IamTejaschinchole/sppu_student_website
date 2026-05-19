import { accents, subjectCatalog } from './constants.js';

export function filterAndSortNotes(notes, { search, subjectFilter, semesterFilter, priceFilter, sortBy }) {
  const queryText = search.trim().toLowerCase();

  return notes
    .filter((note) => {
      const tags = Array.isArray(note.tags) ? note.tags : [];
      const matchesSearch =
        !queryText ||
        note.title?.toLowerCase().includes(queryText) ||
        note.subject?.toLowerCase().includes(queryText) ||
        note.description?.toLowerCase().includes(queryText) ||
        tags.some((tag) => tag.toLowerCase().includes(queryText));
      const matchesSubject = subjectFilter === 'All Subjects' || note.subject === subjectFilter;
      const matchesSemester =
        semesterFilter === 'All' || Number(note.semester) === Number(semesterFilter.replace('Semester ', ''));
      const matchesPrice =
        priceFilter === 'All Prices' ||
        (priceFilter === 'Free' && isFreeNote(note)) ||
        (priceFilter === 'Paid' && !isFreeNote(note));

      return matchesSearch && matchesSubject && matchesSemester && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') {
        return Number(b.downloads || 0) - Number(a.downloads || 0);
      }

      if (sortBy === 'rating') {
        return Number(b.rating || 0) - Number(a.rating || 0) || Number(b.ratingCount || 0) - Number(a.ratingCount || 0);
      }

      return getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt);
    });
}

export function getSubjectOptions(notes) {
  const uploadedSubjects = notes.map((note) => note.subject).filter(Boolean);
  return ['All Subjects', ...Array.from(new Set([...subjectCatalog, ...uploadedSubjects]))];
}

export function getSubjectCounts(notes) {
  const counts = new Map(subjectCatalog.map((subject) => [subject, 0]));

  notes.forEach((note) => {
    if (!note.subject) {
      return;
    }

    counts.set(note.subject, (counts.get(note.subject) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count || a.subject.localeCompare(b.subject));
}

export function getSemesterCounts(notes) {
  return notes.reduce(
    (counts, note) => ({
      ...counts,
      [Number(note.semester)]: (counts[Number(note.semester)] || 0) + 1,
    }),
    { 3: 0, 4: 0 },
  );
}

export function getSubjectFromUrl(search) {
  const subject = new URLSearchParams(search).get('subject');
  return subject || 'All Subjects';
}

export function isFreeNote(note) {
  if (note.priceType) {
    return note.priceType === 'free';
  }

  return String(note.price || 'Free').toLowerCase() === 'free';
}

export function getNotePriceAmount(note) {
  if (Number(note.priceAmount || 0) > 0) {
    return Number(note.priceAmount);
  }

  const match = String(note.price || '').match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function getTimestampMillis(value) {
  if (!value) {
    return 0;
  }

  if (typeof value.toMillis === 'function') {
    return value.toMillis();
  }

  if (value.seconds) {
    return value.seconds * 1000;
  }

  return new Date(value).getTime() || 0;
}

export function formatDate(value) {
  const millis = getTimestampMillis(value);

  if (!millis) {
    return 'Recently';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(millis));
}

export function getUserName(user) {
  return user?.displayName || user?.email?.split('@')[0] || 'SPPU Student';
}

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getAccent(value = '') {
  const sum = String(value)
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return accents[sum % accents.length];
}

export function parseTags(value) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
}

export function formatBytes(bytes) {
  if (!bytes) {
    return '0 KB';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}
