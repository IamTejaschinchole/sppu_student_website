import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, Download, Eye, Filter, Grid2X2, Heart, Search, SlidersHorizontal, Star, Upload, X } from 'lucide-react';
import dsaNotes from '../assets/stitch/dsa-notes.jpg';
import dbmsPapers from '../assets/stitch/dbms-papers.jpg';
import browseBackground from '../assets/stitch/browse-background.jpg';
import networkLab from '../assets/stitch/network-lab.jpg';
import osNotes from '../assets/stitch/os-notes.jpg';
import oopGuide from '../assets/stitch/oop-guide.jpg';
import { semesters, priceFilters, sortOptions } from '../lib/constants.js';
import { filterAndSortNotes, getNotePriceAmount, getSemesterCounts, getSubjectCounts, getSubjectOptions, isFreeNote } from '../lib/utils.js';
import { useNotes } from '../hooks/useNotes.js';
import { ErrorMessage } from '../components/ui.jsx';

const pageSize = 6;
const thumbnails = [dsaNotes, dbmsPapers, networkLab, osNotes, oopGuide];

function formatDownloads(value) {
  const count = Number(value || 0);
  return count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k` : count;
}

function getUploadedImage(note) {
  return [note.thumbnailUrl, note.imageUrl, note.coverImageUrl, note.coverUrl].find(
    (value) => typeof value === 'string' && value.trim(),
  );
}

function imageForNote(note, index) {
  const uploadedImage = getUploadedImage(note);

  if (uploadedImage) {
    return uploadedImage;
  }

  const text = `${note.subject || ''} ${note.title || ''}`.toLowerCase();
  if (text.includes('database') || text.includes('dbms')) return dbmsPapers;
  if (text.includes('network')) return networkLab;
  if (text.includes('operating')) return osNotes;
  if (text.includes('object') || text.includes('java')) return oopGuide;
  return thumbnails[index % thumbnails.length];
}

function ResourceCard({ note, index }) {
  const free = isFreeNote(note);
  const price = getNotePriceAmount(note);
  const title = note.title || 'Untitled study resource';
  const subject = note.subject || 'SPPU Resource';
  const hasUploadedImage = Boolean(getUploadedImage(note));

  return (
    <article className="categories-resource-card group overflow-hidden rounded-2xl border border-white/10 bg-[rgba(17,24,39,.38)] shadow-[0_8px_32px_-4px_rgba(0,0,0,.45)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-[rgba(26,38,64,.52)] hover:shadow-[0_12px_36px_-6px_rgba(77,142,255,.3)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img src={imageForNote(note, index)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-transparent" />
        {!hasUploadedImage && <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/65 px-2 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-md">Faltu Notes preview</span>}
        <span className="absolute left-3 top-3 max-w-[70%] truncate rounded-full border border-cyan-200/25 bg-cyan-400/85 px-3 py-1 text-xs font-semibold text-slate-950">{subject}</span>
        <Link to={`/note/${note.id}`} aria-label={`Open ${title}`} className="absolute right-3 top-3 rounded-full border border-white/15 bg-slate-950/75 p-2 text-slate-200 backdrop-blur-md transition hover:text-cyan-300"><Heart size={16} /></Link>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-slate-200"><span className="max-w-[70%] truncate rounded-md bg-slate-950/75 px-2 py-1">Semester {note.semester || 'N/A'}</span><span className="flex items-center gap-1 rounded-md bg-slate-950/75 px-2 py-1"><Download size={14} className="text-cyan-300" /> {formatDownloads(note.downloads)}</span></div>
      </div>
      <div className="flex min-h-[250px] flex-col p-5">
        <div className="flex items-center gap-2 text-sm"><Star size={17} fill="currentColor" className="text-amber-400" /><span className="font-semibold text-amber-300">{Number(note.rating || 0).toFixed(1)}</span><span className="text-slate-500">({note.ratingCount || 0} reviews)</span></div>
        <h2 className="mt-3 line-clamp-2 font-headline-sm text-lg font-semibold leading-snug text-slate-100 group-hover:text-cyan-300">{title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{note.description || `Study material for ${subject}.`}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5"><div className="flex min-w-0 items-center gap-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/25 text-xs font-bold text-blue-200">{(note.uploaderName || 'S').slice(0, 2).toUpperCase()}</span><span className="truncate text-xs font-semibold text-slate-400">{note.uploaderName || 'SPPU Student'}</span></div><span className="shrink-0 font-headline-sm text-lg font-bold text-cyan-300">{free ? 'FREE' : `₹${price}`}</span></div>
        <div className="mt-4 grid grid-cols-2 gap-2"><Link to={`/note/${note.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/15"><Eye size={17} /> Preview</Link><Link to={`/note/${note.id}`} className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${free ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-blue-500 text-slate-950 hover:bg-blue-400'}`}><Download size={17} /> {free ? 'Download' : 'Unlock'}</Link></div>
      </div>
    </article>
  );
}

export default function CategoriesPage() {
  const { notes, loading, error } = useNotes();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [sortBy, setSortBy] = useState('downloads');
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = useMemo(() => getSubjectCounts(notes), [notes]);
  const semestersCount = useMemo(() => getSemesterCounts(notes), [notes]);
  const subjectOptions = useMemo(() => getSubjectOptions(notes), [notes]);
  const filteredNotes = useMemo(() => filterAndSortNotes(notes, { search, subjectFilter, semesterFilter, priceFilter, sortBy }), [notes, search, subjectFilter, semesterFilter, priceFilter, sortBy]);
  const pageCount = Math.max(1, Math.ceil(filteredNotes.length / pageSize));
  const visibleNotes = filteredNotes.slice((page - 1) * pageSize, page * pageSize);
  const totalSubjects = categories.filter((category) => category.count > 0).length;

  function updateFilter(setter, value) { setter(value); setPage(1); }

  return (
    <main className="stitch-page relative min-h-screen overflow-hidden bg-[#0b0f18] text-slate-200">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 19, 28, 0.7) 0%, rgba(15, 19, 28, 0.42) 260px, rgba(15, 19, 28, 0.92) 540px, rgba(15, 19, 28, 1) 720px), linear-gradient(90deg, rgba(15, 19, 28, 0.96) 0%, rgba(15, 19, 28, 0.75) 45%, rgba(15, 19, 28, 0.35) 100%), url(${browseBackground})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center top',
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="absolute -left-40 top-32 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" /><div className="absolute -right-40 top-[420px] h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[140px]" /><div className="absolute left-[18%] top-[420px] h-[720px] w-px rotate-[42deg] bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent" /><div className="absolute right-[22%] top-[260px] h-[900px] w-px -rotate-[38deg] bg-gradient-to-b from-transparent via-blue-400/25 to-transparent" /><div className="absolute left-[12%] top-[620px] h-32 w-32 rotate-45 border border-cyan-300/20" /><div className="absolute right-[12%] top-[900px] h-48 w-48 rotate-12 border border-violet-300/15" /></div>
      <div className="relative mx-auto w-full max-w-[1380px] px-5 pb-20 pt-8 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400"><Link to="/" className="transition hover:text-cyan-300">Home</Link><ArrowRight size={16} /><span>Pune University</span><ArrowRight size={16} /><span className="text-cyan-300">SPPU Student Notes</span></div>
        <section className="categories-hero relative grid min-h-[350px] items-center gap-10 overflow-hidden rounded-2xl py-14 lg:grid-cols-[1fr_360px]"><div className="absolute inset-0 -z-10"><img src={browseBackground} alt="" className="h-full w-full object-cover object-center opacity-45 mix-blend-screen" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,24,.92),rgba(11,15,24,.48),rgba(11,15,24,.72)),linear-gradient(0deg,rgba(11,15,24,.84),transparent_55%)]" /></div><div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_40%_35%,rgba(76,215,246,.12),transparent_58%)]" /><div><span className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-cyan-300">Built for SPPU engineers</span><h1 className="mt-5 max-w-3xl font-headline-lg text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-100 sm:text-5xl">Pass your semester exams without the <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">last-night panic</span></h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Handwritten class notes, solved InSem/EndSem papers, and viva-ready lab codes from SPPU students.</p></div><div className="categories-hero-card rounded-2xl border border-cyan-300/25 bg-[rgba(15,20,32,.34)] p-5 shadow-[0_0_34px_rgba(76,215,246,.12)] backdrop-blur-2xl"><div className="flex items-center gap-4"><div className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 p-3 text-cyan-300"><BookOpen size={28} /></div><div><p className="font-headline-sm text-base font-bold text-slate-100">SAVITRIBAI PHULE</p><p className="text-sm font-bold text-cyan-300">PUNE UNIVERSITY (SPPU)</p><p className="mt-1 text-xs text-slate-400">SPPU student resource collection</p></div></div></div></section>
        <section className="rounded-2xl border border-white/15 bg-[rgba(15,20,32,.42)] p-3 shadow-[0_8px_32px_-4px_rgba(0,0,0,.45)] backdrop-blur-2xl"><div className="flex flex-col gap-3 lg:flex-row lg:items-center"><label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[rgba(0,0,0,.16)] px-4 py-3"><Search size={21} className="shrink-0 text-cyan-300" /><input value={search} onChange={(event) => updateFilter(setSearch, event.target.value)} placeholder="Try searching notes, subjects, or tags" className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500" /></label><select value={semesterFilter} onChange={(event) => updateFilter(setSemesterFilter, event.target.value)} className="rounded-xl border border-white/10 bg-[rgba(15,23,42,.6)] px-4 py-3 text-sm font-semibold text-slate-200 outline-none"><option value="All">All semesters</option>{semesters.filter((semester) => semester !== 'All').map((semester) => <option key={semester} value={semester}>{semester}</option>)}</select><button type="button" onClick={() => updateFilter(setSortBy, sortBy === 'downloads' ? 'rating' : 'downloads')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40"><SlidersHorizontal size={17} /> Sort: {sortOptions.find((option) => option.value === sortBy)?.label}<ChevronDown size={16} /></button><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(77,142,255,.3)] transition hover:bg-blue-400"><Search size={18} /> Search Notes</button></div></section>
        {error && <div className="mt-6"><ErrorMessage>{error}</ErrorMessage></div>}
        <button type="button" onClick={() => setIsFilterOpen(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 lg:hidden"><Filter size={17} /> Filters</button>
        {loading ? <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-12 text-center text-slate-400 backdrop-blur-xl">Loading real Faltu Notes notes...</div> : <section className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className={isFilterOpen ? 'fixed inset-x-4 bottom-4 z-[60] max-h-[82vh] overflow-y-auto shadow-2xl h-fit rounded-2xl border border-white/10 bg-[rgba(17,24,39,.96)] p-6 backdrop-blur-2xl' : 'hidden h-fit rounded-2xl border border-white/10 bg-[rgba(17,24,39,.34)] p-6 backdrop-blur-2xl lg:sticky lg:top-6 lg:block'}><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-headline-sm text-lg font-semibold text-slate-100"><Filter size={19} className="text-cyan-300" /> Filter Notes</h2><button type="button" onClick={() => { setSearch(''); setSubjectFilter('All Subjects'); setSemesterFilter('All'); setPriceFilter('All Prices'); setPage(1); }} className="text-xs font-bold text-cyan-300 hover:text-cyan-200">Clear all</button><button type="button" onClick={() => setIsFilterOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close filters"><X size={18} /></button></div><div className="mt-7"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">University</p><div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-[rgba(2,6,23,.28)] px-3 py-3 text-sm font-semibold"><span className="flex items-center gap-2"><Check size={16} className="text-cyan-300" /> SPPU</span><span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-200">{notes.length}</span></div></div><div className="mt-7"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Semester</p><span className="text-xs font-bold text-cyan-300">{semesterFilter === 'All' ? 'All' : semesterFilter}</span></div><div className="mt-3 grid grid-cols-2 gap-2">{semesters.map((semester) => <button key={semester} type="button" onClick={() => updateFilter(setSemesterFilter, semester)} className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${semesterFilter === semester ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{semester === 'All' ? 'All' : semester.replace('Semester ', 'Sem ')}</button>)}</div></div><div className="mt-7"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Subjects</p><div className="mt-3 max-h-64 space-y-2 overflow-auto pr-1">{subjectOptions.filter((subject) => subject !== 'All Subjects').map((subject) => { const count = categories.find((category) => category.subject === subject)?.count || 0; return <button key={subject} type="button" onClick={() => updateFilter(setSubjectFilter, subject)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${subjectFilter === subject ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}><span className="truncate">{subject}</span><span>{count}</span></button>; })}</div></div><div className="mt-7"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pricing</p><div className="mt-3 flex gap-1 rounded-xl bg-slate-950/50 p-1">{priceFilters.map((price) => <button key={price} type="button" onClick={() => updateFilter(setPriceFilter, price)} className={`flex-1 rounded-lg px-2 py-2 text-[11px] font-bold ${priceFilter === price ? 'bg-white/15 text-slate-100' : 'text-slate-500'}`}>{price === 'All Prices' ? 'All' : price}</button>)}</div></div><div className="mt-7 space-y-3 border-t border-white/10 pt-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live catalogue</p><div className="flex justify-between text-sm"><span className="text-slate-400">Subjects</span><span className="font-bold text-cyan-300">{totalSubjects}</span></div><div className="flex justify-between text-sm"><span className="text-slate-400">Semester 3</span><span>{semestersCount[3] || 0}</span></div><div className="flex justify-between text-sm"><span className="text-slate-400">Semester 4</span><span>{semestersCount[4] || 0}</span></div></div></aside>
          <div className="min-w-0"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-slate-400">Active: <span className="font-bold text-cyan-300">{filteredNotes.length} real notes</span></p><div className="mt-2 flex flex-wrap gap-2">{subjectFilter !== 'All Subjects' && <button type="button" onClick={() => updateFilter(setSubjectFilter, 'All Subjects')} className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-300">{subjectFilter} ×</button>}{semesterFilter !== 'All' && <button type="button" onClick={() => updateFilter(setSemesterFilter, 'All')} className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-200">{semesterFilter} ×</button>}{priceFilter !== 'All Prices' && <button type="button" onClick={() => updateFilter(setPriceFilter, 'All Prices')} className="rounded-full bg-blue-400/15 px-3 py-1 text-xs text-blue-200">{priceFilter} ×</button>}</div></div><div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1"><button type="button" className="rounded-md bg-blue-500 p-2 text-slate-950" aria-label="Grid view"><Grid2X2 size={17} /></button><button type="button" className="p-2 text-slate-500" aria-label="List view"><SlidersHorizontal size={17} /></button></div></div>{visibleNotes.length > 0 ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleNotes.map((note, index) => <ResourceCard key={note.id} note={note} index={index} />)}</div> : <div className="rounded-2xl border border-white/10 bg-white/[.03] p-12 text-center text-slate-400">No real notes match these filters.</div>}<div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[rgba(15,20,32,.42)] px-5 py-4 backdrop-blur-xl"><p className="text-sm text-slate-400">Showing <span className="font-bold text-slate-100">{filteredNotes.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filteredNotes.length)}</span> of <span className="font-bold text-cyan-300">{filteredNotes.length}</span> real notes</p><div className="flex items-center gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-lg border border-white/10 p-2 disabled:opacity-30"><ArrowLeft size={17} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 5).map((value) => <button key={value} type="button" onClick={() => setPage(value)} className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold ${page === value ? 'bg-blue-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{value}</button>)}<button type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-lg border border-white/10 p-2 disabled:opacity-30"><ArrowRight size={17} /></button></div></div></div>
        </section>}
        <section className="mt-10 max-w-[360px] rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-400/20 to-slate-900/60 p-6 shadow-xl backdrop-blur-2xl"><p className="text-xs font-bold uppercase tracking-wider text-violet-200">Earn with Faltu Notes</p><h2 className="mt-3 font-headline-sm text-xl font-bold text-slate-100">Got your own class notes?</h2><p className="mt-2 text-sm leading-6 text-slate-300">Help juniors clear exams and earn some quick UPI cash whenever someone unlocks your notes.</p><Link to="/upload" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"><Upload size={16} /> Upload Notes & Earn <ArrowRight size={16} /></Link></section>
      </div>
      <footer className="relative border-t border-white/10 bg-[#090d15]/80 px-5 py-12 backdrop-blur-2xl sm:px-8 lg:px-14"><div className="mx-auto grid max-w-[1380px] gap-10 md:grid-cols-4"><div><div className="flex items-center gap-2 text-xl font-bold text-slate-100"><span className="rounded-lg border border-cyan-300/30 p-2 text-cyan-300"><BookOpen size={18} /></span> Faltu Notes</div><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Made with care by SPPU students, for SPPU students. Passing exams together since 2024.</p></div><div><h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Curricula & Branches</h3><ul className="mt-4 space-y-2 text-sm text-slate-400"><li>Computer Engineering</li><li>Information Technology</li><li>AI & Data Science</li><li>Electronics & Telecom</li><li>Mechanical Engineering</li></ul></div><div><h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Study Resources</h3><ul className="mt-4 space-y-2 text-sm text-slate-400"><li>InSem Decoders</li><li>EndSem Solved Papers</li><li>Lab Practical Files</li><li>Viva Cheat Sheets</li><li>Topper Class Notes</li></ul></div><div><h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Student Community</h3><ul className="mt-4 space-y-2 text-sm text-slate-400"><li>Become a Contributor</li><li>Student Honor Code</li><li>UPI Payout Guidelines</li><li>Report Wrong Solution</li><li>Join Pune WhatsApp Community</li></ul></div></div><div className="mx-auto mt-10 flex max-w-[1380px] flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500"><span>© 2025 Faltu Notes Pune Chapter. An independent student-led open study initiative.</span><span>Syllabus Status&nbsp;&nbsp;&nbsp; Privacy&nbsp;&nbsp;&nbsp; Terms</span></div></footer>
    </main>
  );
}
