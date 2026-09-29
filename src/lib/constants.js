import { getAllSppuSubjects } from '../data/sppuSubjects.js';

export const subjectCatalog = getAllSppuSubjects();

export const semesters = ['All', 'Semester 3', 'Semester 4'];
export const priceFilters = ['All Prices', 'Free', 'Paid'];
export const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Most Downloaded', value: 'downloads' },
  { label: 'Highest Rated', value: 'rating' },
];
export const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
export const notesPerPage = 10;
export const accents = ['primary', 'cyan', 'violet'];
export const accentClass = {
  primary: 'border-brand-primary/35 bg-brand-primary/10 text-brand-primary',
  cyan: 'border-brand-cyan/35 bg-brand-cyan/10 text-brand-cyan',
  violet: 'border-brand-violet/35 bg-brand-violet/10 text-brand-violet',
};
