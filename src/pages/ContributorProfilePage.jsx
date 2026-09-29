import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Download, ExternalLink, FileText, Medal, MessageCircle, ShieldCheck, Star, UserRound } from 'lucide-react';
import contributorBackground from '../assets/stitch/contributor-background.jpg';
import { usePublicProfile } from '../hooks/usePublicProfile.js';
import { useContributorNotes } from '../hooks/useContributorNotes.js';
import { ErrorMessage, LoadingScreen } from '../components/ui.jsx';
import { formatDate, getNotePriceAmount, isFreeNote } from '../lib/utils.js';

function compactNumber(value) {
  const number = Number(value || 0);
  return number >= 1000 ? `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}K` : number;
}

function initials(value) {
  return String(value || 'Student')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function NoteCard({ note }) {
  const free = isFreeNote(note);
  const price = getNotePriceAmount(note);

  return (
    <article className="group rounded-xl border border-white/10 bg-[rgba(15,23,42,.48)] p-4 shadow-[0_8px_28px_-8px_rgba(0,0,0,.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-[rgba(26,38,64,.62)]">
      <div className="flex items-start justify-between gap-3">
        <span className="max-w-[75%] truncate rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold text-cyan-300">{note.subject || 'SPPU Resource'}</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-amber-300"><Star size={13} fill="currentColor" /> {Number(note.rating || 0).toFixed(1)}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 font-headline-sm text-base font-semibold leading-snug text-slate-100 group-hover:text-cyan-300">{note.title || 'Untitled resource'}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{note.description || `Study resource for Semester ${note.semester || 'SPPU'}.`}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400"><span className="flex items-center gap-1"><Download size={13} /> {compactNumber(note.downloads)} downloads</span><span className="font-bold text-cyan-300">{free ? 'Free' : `₹${price}`}</span></div>
      <Link to={`/note/${note.id}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-blue-500 hover:text-slate-950"><ExternalLink size={14} /> View resource</Link>
    </article>
  );
}

export default function ContributorProfilePage() {
  const { uid } = useParams();
  const { profile, loading: profileLoading, error: profileError } = usePublicProfile(uid);
  const { notes, loading: notesLoading, error: notesError } = useContributorNotes(uid);

  if (profileLoading || notesLoading) return <LoadingScreen />;

  if (!profile) {
    return <main className="grid min-h-[calc(100vh-80px)] place-items-center px-5"><ErrorMessage>Contributor profile not found.</ErrorMessage></main>;
  }

  const totalDownloads = notes.reduce((sum, note) => sum + Number(note.downloads || 0), 0);
  const totalRatings = notes.reduce((sum, note) => sum + Number(note.ratingCount || 0), 0);
  const ratingWeight = notes.reduce((sum, note) => sum + Number(note.ratingCount || 0), 0);
  const averageRating = ratingWeight > 0 ? (notes.reduce((sum, note) => sum + Number(note.rating || 0) * Number(note.ratingCount || 0), 0) / ratingWeight).toFixed(1) : '0.0';
  const displayName = profile.displayName || 'SPPU Student';
  const department = profile.department || profile.branch || 'SPPU contributor';
  const badges = Array.isArray(profile.badges) ? profile.badges.filter(Boolean) : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090e1b] text-slate-200">
      <div className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(15,19,28,.62),rgba(10,14,23,.9) 60%,rgba(9,14,27,.98)), url(${contributorBackground})`, backgroundAttachment: 'fixed', backgroundPosition: 'center top' }} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_22%,rgba(76,215,246,.14),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(160,120,255,.14),transparent_30%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 pb-20 pt-8 sm:px-8 lg:px-14">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-400"><Link to="/" className="transition hover:text-cyan-300">Home</Link><ArrowRight size={15} /><span className="text-cyan-300">Contributor Profile</span></div>

        {profileError && <div className="mb-4"><ErrorMessage>{profileError}</ErrorMessage></div>}
        {notesError && <div className="mb-4"><ErrorMessage>{notesError}</ErrorMessage></div>}

        <section className="overflow-hidden rounded-xl border border-white/20 bg-[rgba(15,20,32,.56)] shadow-[0_16px_48px_-12px_rgba(0,0,0,.7)] backdrop-blur-2xl">
          <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:p-9"><div className="flex shrink-0 justify-center lg:w-32"><div className="relative grid h-28 w-28 place-items-center rounded-full border border-cyan-300/40 bg-slate-900/70 text-3xl font-bold text-cyan-200 shadow-[0_0_34px_rgba(76,215,246,.35)]">{profile.photoURL ? <img src={profile.photoURL} alt={`${displayName} profile`} className="h-full w-full rounded-full object-cover" /> : initials(displayName)}<span className="absolute bottom-0 right-0 rounded-full border border-slate-900 bg-cyan-400 p-1.5 text-slate-950"><ShieldCheck size={14} /></span></div></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2">{badges.map((badge) => <span key={badge} className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">{badge}</span>)}<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300">Contributor</span></div><h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">{displayName}</h1><p className="mt-2 text-sm font-medium text-slate-300">{department} <span className="text-slate-500">•</span> Savitribai Phule Pune University (SPPU)</p>{profile.bio && <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{profile.bio}</p>}<p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={14} /> Joined {formatDate(profile.createdAt)}</p></div><div className="flex flex-wrap gap-2 lg:max-w-[250px] lg:justify-end"><Link to="/upload" className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(77,142,255,.3)] transition hover:bg-blue-400"><FileText size={14} /> Share notes</Link><button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/40"><MessageCircle size={14} /> Share profile</button></div></div>
          <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4"><div className="flex items-center gap-3 p-5"><BookOpen size={21} className="text-cyan-300" /><div><p className="text-2xl font-bold text-slate-100">{notes.length}</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Notes uploaded</p></div></div><div className="flex items-center gap-3 border-white/10 p-5 sm:border-l"><Download size={21} className="text-blue-300" /><div><p className="text-2xl font-bold text-slate-100">{compactNumber(totalDownloads)}</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Downloads</p></div></div><div className="flex items-center gap-3 border-white/10 p-5 sm:border-l"><Star size={21} className="text-amber-300" fill="currentColor" /><div><p className="text-2xl font-bold text-slate-100">{averageRating}<span className="text-xs text-slate-500"> / 5</span></p><p className="text-[10px] uppercase tracking-wider text-slate-500">Average rating</p></div></div><div className="flex items-center gap-3 border-white/10 p-5 sm:border-l"><Medal size={21} className="text-violet-300" /><div><p className="text-2xl font-bold text-slate-100">{totalRatings}</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Ratings received</p></div></div></div>
        </section>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_320px]">
          <section><div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-3"><div className="flex items-center gap-2"><span className="rounded-lg bg-blue-500 px-3 py-2 text-xs font-bold text-slate-950">Published resources ({notes.length})</span><span className="hidden text-xs text-slate-400 sm:inline">Public contributor library</span></div><Link to="/categories" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200">Browse all <ArrowRight size={14} /></Link></div>{notes.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{notes.map((note) => <NoteCard key={note.id} note={note} />)}</div> : <div className="rounded-xl border border-white/10 bg-white/[.03] p-12 text-center text-sm text-slate-400">No resources uploaded yet.</div>}</section>
          <aside className="space-y-5"><section className="rounded-xl border border-white/10 bg-[rgba(15,23,42,.48)] p-5 backdrop-blur-xl"><h2 className="flex items-center gap-2 font-headline-sm text-lg font-semibold text-slate-100"><ShieldCheck size={18} className="text-cyan-300" /> Contributor summary</h2><div className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-3"><span className="text-slate-400">Published resources</span><span className="font-semibold text-slate-100">{notes.length}</span></div><div className="flex justify-between gap-3"><span className="text-slate-400">Student downloads</span><span className="font-semibold text-slate-100">{compactNumber(totalDownloads)}</span></div><div className="flex justify-between gap-3"><span className="text-slate-400">Ratings received</span><span className="font-semibold text-slate-100">{totalRatings}</span></div><div className="flex justify-between gap-3"><span className="text-slate-400">Profile joined</span><span className="font-semibold text-slate-100">{formatDate(profile.createdAt)}</span></div></div></section><section className="rounded-xl border border-white/10 bg-[rgba(15,23,42,.48)] p-5 backdrop-blur-xl"><h2 className="flex items-center gap-2 font-headline-sm text-lg font-semibold text-slate-100"><UserRound size={18} className="text-violet-300" /> Profile details</h2><p className="mt-4 text-sm leading-6 text-slate-400">This profile is powered by the contributor record and published StudyVault resources.</p><Link to="/upload" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200"><FileText size={14} /> Share your own notes <ArrowRight size={14} /></Link></section></aside>
        </div>
      </div>
      <footer className="relative z-10 border-t border-white/10 bg-[rgba(9,14,27,.72)] px-5 py-10 backdrop-blur-2xl sm:px-8 lg:px-14"><div className="mx-auto grid max-w-[1380px] gap-8 md:grid-cols-4"><div><div className="flex items-center gap-2 font-headline-sm text-lg font-semibold text-slate-100"><span className="rounded-lg border border-cyan-300/30 p-2 text-cyan-300"><BookOpen size={16} /></span> StudyVault</div><p className="mt-4 text-xs leading-5 text-slate-400">A student-powered academic resource library for SPPU learners.</p></div><div><h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Curricula & Branches</h3><p className="mt-3 text-xs leading-6 text-slate-400">Computer Engineering<br />Information Technology<br />AI & Data Science<br />Electronics & Telecomm</p></div><div><h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h3><p className="mt-3 text-xs leading-6 text-slate-400">EndSem InSem Papers<br />Faculty Lecture Notes<br />Lab Manuals & Code<br />SPPU Decoders & Solutions</p></div><div><h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Community</h3><p className="mt-3 text-xs leading-6 text-slate-400">Become a Contributor<br />Academic Honor Code<br />Contributor Rewards<br />Contact Pune Chapter</p></div></div><div className="mx-auto mt-8 max-w-[1380px] border-t border-white/10 pt-5 text-xs text-slate-500">© 2025 StudyVault SPPU Chapter.</div></footer>
    </main>
  );
}
