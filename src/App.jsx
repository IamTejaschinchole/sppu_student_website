import { lazy, Suspense, useState, useMemo } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import {
  BookOpen,
  Bell,
  CheckCircle2,
  ChevronDown,
  CloudUpload,
  FileText,
  GraduationCap,
  Library,
  Menu,
  NotebookTabs,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from './AuthContext.jsx';
import { useNotes } from './hooks/useNotes.js';
import RouteSpinner from './components/RouteSpinner.jsx';
import { LoadingScreen } from './components/ui.jsx';
import { BookmarkButton } from './components/BookmarkButton.jsx';
import heroCampus from './assets/stitch/hero-campus.jpg';
import dsaNotesImage from './assets/stitch/dsa-notes.jpg';
import dbmsPapersImage from './assets/stitch/dbms-papers.jpg';
import networkLabImage from './assets/stitch/network-lab.jpg';
import osNotesImage from './assets/stitch/os-notes.jpg';
import oopGuideImage from './assets/stitch/oop-guide.jpg';

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const UploadPage = lazy(() => import('./pages/UploadPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const LibraryPage = lazy(() => import('./pages/LibraryPage.jsx'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'));
const SppuBranchesPage = lazy(() => import('./pages/SppuBranchesPage.jsx'));
const SemesterSelectionPage = lazy(() => import('./pages/SemesterSelectionPage.jsx'));
const SubjectMarketplacePage = lazy(() => import('./pages/SubjectMarketplacePage.jsx'));
const SubjectPlaceholderPage = lazy(() => import('./pages/SubjectPlaceholderPage.jsx'));
const CatalogueDetailPage = lazy(() => import('./pages/CatalogueDetailPage.jsx'));
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage.jsx'));
const ContributorProfilePage = lazy(() => import('./pages/ContributorProfilePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

const categoryCards = [
  {
    label: 'JEE',
    icon: NotebookTabs,
    to: '/categories',
  },
  {
    label: 'NEET',
    icon: FileText,
    to: '/categories',
  },
  {
    label: 'Engineering',
    icon: GraduationCap,
    to: '/categories',
  },
  {
    label: 'SPPU',
    icon: BookOpen,
    to: '/sppu',
  },
];

const materialCards = [
  {
    title: 'Lecture Notes',
    description: 'Crisp handwritten and typed summaries for fast unit revision.',
    countLabel: 'Notes from students',
    icon: FileText,
    tone: 'cyan',
  },
  {
    title: 'Past PYQs',
    description: 'Previous-year papers and solved answers for exam-focused prep.',
    countLabel: 'Solved papers',
    icon: NotebookTabs,
    tone: 'blue',
  },
  {
    title: 'Lab Practicals',
    description: 'Clean source code, circuit connections, and viva Q&As.',
    countLabel: 'Practical resources',
    icon: GraduationCap,
    tone: 'green',
  },
  {
    title: 'Assignments',
    description: 'Weekly tutorial sets and sample answers for submissions.',
    countLabel: 'Assignment sets',
    icon: FileText,
    tone: 'pink',
  },
  {
    title: 'Question Banks',
    description: 'Repeated questions ranked by university weightage.',
    countLabel: 'Question collections',
    icon: Search,
    tone: 'violet',
  },
  {
    title: 'Decoders & Guides',
    description: 'Last-night crash notes to pass and score high.',
    countLabel: 'Revision guides',
    icon: BookOpen,
    tone: 'amber',
  },
];

const resourceImages = [dsaNotesImage, dbmsPapersImage, networkLabImage, osNotesImage, oopGuideImage];

function PageSuspense({ label, children }) {
  return <Suspense fallback={<RouteSpinner label={label} />}>{children}</Suspense>;
}

function App() {
  return (
    <div className="min-h-screen text-text-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/categories"
          element={
            <PageSuspense label="Loading categories...">
              <CategoriesPage />
            </PageSuspense>
          }
        />
        <Route
          path="/sppu"
          element={
            <PageSuspense label="Loading SPPU branches...">
              <SppuBranchesPage />
            </PageSuspense>
          }
        />
        <Route
          path="/sppu/:branchSlug/:semesterSlug/:subjectSlug"
          element={
            <PageSuspense label="Loading subject...">
              <SubjectPlaceholderPage />
            </PageSuspense>
          }
        />
        <Route
          path="/sppu/:branchSlug/:semesterSlug"
          element={
            <PageSuspense label="Loading subjects...">
              <SubjectMarketplacePage />
            </PageSuspense>
          }
        />
        <Route
          path="/sppu/:branchSlug"
          element={
            <PageSuspense label="Loading semesters...">
              <SemesterSelectionPage />
            </PageSuspense>
          }
        />
        <Route
          path="/note/:id"
          element={
            <PageSuspense label="Loading note...">
              <NoteDetailPage />
            </PageSuspense>
          }
        />
        <Route
          path="/contributor/:uid"
          element={
            <PageSuspense label="Loading contributor profile...">
              <ContributorProfilePage />
            </PageSuspense>
          }
        />
        <Route
          path="/sppu/:branchSlug/:semesterSlug/:subjectSlug/:catalogueId"
          element={
            <PageSuspense label="Loading catalogue...">
              <CatalogueDetailPage />
            </PageSuspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageSuspense label="Loading dashboard...">
                <DashboardPage />
              </PageSuspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <PageSuspense label="Loading library...">
                <LibraryPage />
              </PageSuspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PageSuspense label="Loading login...">
              <LoginPage />
            </PageSuspense>
          }
        />
        <Route
          path="/register"
          element={
            <PageSuspense label="Loading register...">
              <RegisterPage />
            </PageSuspense>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <PageSuspense label="Loading upload...">
                <UploadPage />
              </PageSuspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageSuspense label="Loading...">
              <NotFoundPage />
            </PageSuspense>
          }
        />
      </Routes>
    </div>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Browse', to: '/sppu' },
    { label: 'Upload', to: '/upload' },
    ...(user ? [{ label: 'My Library', to: '/library' }, { label: 'Dashboard', to: '/dashboard' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080d1a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1380px] items-center justify-between gap-4 px-5 md:px-8 lg:px-14">
        <div className="flex min-w-0 items-center gap-5">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="StudyVault home">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-brand-cyan/40 bg-brand-primary/15 text-brand-cyan shadow-cyan-glow">
              <GraduationCap size={20} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-text-primary transition-colors group-hover:text-brand-cyan">StudyVault</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-cyan">SPPU Edition</span>
            </span>
          </Link>
          <label className="hidden w-64 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 xl:flex">
            <Search size={17} className="text-text-muted" aria-hidden="true" />
            <span className="sr-only">Search the marketplace</span>
            <input className="min-w-0 flex-1 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-muted" placeholder="Search papers, notes, units..." />
            <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-text-muted">⌘K</kbd>
          </label>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return <Link key={item.to} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active ? 'bg-brand-primary text-white shadow-brand-glow' : 'text-text-secondary hover:bg-white/[0.06] hover:text-text-primary'}`} to={item.to}>{item.label}</Link>;
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/upload" className="hidden items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-brand-glow transition hover:bg-brand-primary/90 sm:inline-flex">
            <CloudUpload size={17} aria-hidden="true" />
            Share Vault
          </Link>
          <button type="button" aria-label="Notifications" className="relative rounded-full p-2 text-text-secondary transition hover:bg-white/[0.06] hover:text-white">
            <Bell size={21} aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-cyan ring-2 ring-[#080d1a]" />
          </button>
          {user ? <Link to="/dashboard" aria-label="Open your dashboard" className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/20 bg-brand-primary/20 text-xs font-bold text-white">{user.photoURL ? <img src={user.photoURL} alt="" className="h-full w-full object-cover" /> : (user.displayName || user.email || 'S').slice(0, 1).toUpperCase()}</Link> : <Link to="/login" className="hidden text-sm font-semibold text-text-secondary transition hover:text-white sm:inline">Login</Link>}
          <button className="text-text-secondary transition hover:text-white lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#080d1a]/95 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-2 text-text-secondary">
            {navItems.map((item) => <Link key={item.to} className="rounded-lg px-3 py-2 transition hover:bg-white/[0.06] hover:text-white" to={item.to} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>)}
            {!user && <Link className="rounded-lg px-3 py-2 transition hover:bg-white/[0.06] hover:text-white" to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>}
            {user && <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="rounded-lg px-3 py-2 text-left transition hover:bg-white/[0.06] hover:text-white">Logout</button>}
          </nav>
        </div>
      )}
    </header>
  );
}

function HomePage() {
  const [search, setSearch] = useState('');
  const { notes, loading } = useNotes();
  const [searchParams] = useSearchParams();
  const subjectFromUrl = searchParams.get('subject') || '';

  const effectiveSearch = search || subjectFromUrl;
  const filteredNotes = notes.filter((note) => {
    const query = effectiveSearch.trim().toLowerCase();
    if (!query) return false;
    const tags = Array.isArray(note.tags) ? note.tags : [];
    return (
      note.title?.toLowerCase().includes(query) ||
      note.subject?.toLowerCase().includes(query) ||
      note.description?.toLowerCase().includes(query) ||
      tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const topNotes = useMemo(() => {
    return [...notes]
      .filter((n) => Number(n.rating || 0) > 0)
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 3);
  }, [notes]);

  const topContributors = useMemo(() => {
    const map = new Map();
    notes.forEach((note) => {
      const uid = note.uploadedBy;
      if (!uid) return;
      const existing = map.get(uid) || {
        uid,
        name: note.uploaderName || 'SPPU Student',
        avatar: note.uploaderAvatar || '',
        ratingSum: 0,
        ratingCount: 0,
        noteCount: 0,
        downloadSum: 0,
      };
      existing.noteCount += 1;
      existing.downloadSum += Number(note.downloads || 0);
      existing.ratingSum += Number(note.rating || 0) * Number(note.ratingCount || 0);
      existing.ratingCount += Number(note.ratingCount || 0);
      map.set(uid, existing);
    });
    return Array.from(map.values())
      .map((c) => ({
        ...c,
        rating: c.ratingCount ? (c.ratingSum / c.ratingCount).toFixed(1) : '0.0',
      }))
      .sort((a, b) => b.noteCount - a.noteCount)
      .slice(0, 3);
  }, [notes]);

  const stats = useMemo(() => {
    const contributors = new Set(notes.map((note) => note.uploadedBy).filter(Boolean)).size;
    const downloads = notes.reduce((sum, note) => sum + Number(note.downloads || 0), 0);
    const rated = notes.filter((note) => Number(note.ratingCount || 0) > 0);
    const rating = rated.length ? rated.reduce((sum, note) => sum + Number(note.rating || 0), 0) / rated.length : 0;
    return { contributors, downloads, rating };
  }, [notes]);

  function runSearch(value = search) {
    setSearch(value);
    document.getElementById('notes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="stitch-home min-h-screen overflow-hidden">
      <section className="stitch-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${heroCampus})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a13] via-[#060a13]/85 to-[#060a13]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a13]/70 via-transparent to-[#060a13]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-10 px-5 pb-20 pt-10 md:px-8 lg:grid-cols-12 lg:px-14">
          <div className="flex flex-col justify-center gap-6 lg:col-span-7">
            <div className="stitch-pill self-start"><span className="h-2 w-2 animate-pulse rounded-full bg-brand-cyan" /> SPPU Engineering Vault - Verified Sem 1-8 Prep</div>
            <div>
              <h1 className="stitch-display text-4xl font-extrabold leading-[1.08] text-text-primary sm:text-5xl lg:text-6xl">Everything you need to clear your SPPU exams,<br /><span className="stitch-gradient-text">In one place.</span></h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">Class notes that actually make sense, solved previous year papers, and faculty-stamped lab codes. Shared by students who topped the unit tests.</p>
            </div>
            <div className="stitch-search max-w-3xl">
              <Search size={24} className="shrink-0 text-brand-cyan" aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && runSearch()} className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" placeholder="Search subjects, question papers, topic names..." type="search" />
              <button type="button" onClick={() => runSearch()} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-brand-glow transition hover:bg-brand-primary/90">Find Notes <span aria-hidden="true">-&gt;</span></button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary"><span className="mr-1 font-bold uppercase tracking-widest text-text-muted">Quick Search:</span>{['DBMS Insem', 'DSA Decoders', 'Computer Networks Labs', 'OS 2019 Pattern'].map((query) => <button key={query} type="button" onClick={() => runSearch(query)} className="stitch-chip">{query}</button>)}</div>
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {[
                [Users, `${stats.contributors || 0}+`, 'Contributors', 'cyan'],
                [Library, `${notes.length || 0}+`, 'Verified Uploads', 'blue'],
                [CheckCircle2, `${stats.downloads || 0}+`, 'Downloads', 'violet'],
                [Star, stats.rating ? stats.rating.toFixed(1) : '0.0', 'Average Rating', 'amber'],
              ].map(([Icon, value, label, tone]) => <div key={label} className="stitch-stat"><Icon size={19} className={`text-brand-${tone === 'amber' ? 'cyan' : tone}`} aria-hidden="true" /><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
          <div className="relative flex min-h-[420px] items-end justify-center lg:col-span-5">
            <div className="stitch-vault-card w-full max-w-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-brand-cyan"><CheckCircle2 size={18} /><span className="text-xs font-bold uppercase tracking-widest">What's inside the Vault</span></div>
              {['Handwritten Class Notes', 'Solved Insem & Endsem Papers', 'Tested Lab Codes & Write-ups', 'Assignment Solutions', 'Important Question Banks'].map((item, index) => <div key={item} className="flex items-start gap-3 py-2 text-sm"><span className={`mt-0.5 text-${['cyan','blue','green','pink','amber'][index]}-400`}><FileText size={18} /></span><div><p className="font-semibold text-text-primary">{item}</p><p className="text-xs text-text-muted">Real resources from the student community</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1380px] px-5 py-14 md:px-8 lg:px-14">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-cyan">Study by material type</p><h2 className="stitch-display text-3xl font-bold text-text-primary">Pick What You Need Today</h2><p className="mt-2 text-sm text-text-secondary">Whether you are cramming before Insem or completing lab files at 2 AM.</p></div><Link to="/categories" className="hidden items-center gap-2 text-sm font-semibold text-brand-cyan sm:inline-flex">View all directories <span aria-hidden="true">-&gt;</span></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {materialCards.map(({ title, description, countLabel, icon: Icon, tone }) => <Link key={title} to={title === 'Lecture Notes' ? '/categories' : '/sppu'} className="stitch-material-card group"><span className={`stitch-icon-${tone}`}><Icon size={21} aria-hidden="true" /></span><h3 className="stitch-display mt-6 text-lg font-bold text-text-primary">{title}</h3><p className="mt-2 min-h-16 text-sm leading-6 text-text-secondary">{description}</p><span className="mt-5 flex items-center justify-between text-xs font-semibold text-text-muted"><span>{countLabel}</span><span className="text-lg transition group-hover:translate-x-1 group-hover:text-brand-cyan">-&gt;</span></span></Link>)}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1380px] px-5 pb-14 md:px-8 lg:px-14">
        <div className="stitch-filter-panel"><div className="flex items-center gap-3"><span className="stitch-icon-cyan"><ChevronDown size={20} /></span><div><h2 className="stitch-display text-xl font-bold text-text-primary">Filter by Your Branch &amp; Semester</h2><p className="text-sm text-text-secondary">Jump straight to your syllabus without digging through endless folders.</p></div><Link to="/sppu" className="ml-auto hidden text-sm font-bold text-brand-cyan sm:block">Browse all branches -&gt;</Link></div><div className="mt-5 grid gap-3 md:grid-cols-3"><Link to="/sppu" className="stitch-select"><span><small>University Board</small><strong>SPPU (Pune University)</strong></span><ChevronDown size={18} /></Link><Link to="/sppu/information-technology" className="stitch-select"><span><small>Discipline / Branch</small><strong>Information Technology</strong></span><ChevronDown size={18} /></Link><Link to="/sppu/information-technology/semester-3" className="stitch-select"><span><small>Academic Term</small><strong>Semester 3</strong></span><ChevronDown size={18} /></Link></div></div>
      </section>

      {search.trim() && (
        <section id="notes" className="mx-auto w-full max-w-[1380px] px-5 pb-12 md:px-8 lg:px-14">
          <div className="mb-6">
            <h2 className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">
              Search Results
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {filteredNotes.length} result(s) for &ldquo;{search}&rdquo;
            </p>
          </div>

          {loading ? (
            <LoadingState label="Searching notes..." />
          ) : filteredNotes.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="flex flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-brand-primary/50 hover:shadow-brand-glow hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-text-muted">
                        {note.uploaderName || 'SPPU Student'}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-text-primary">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary">
                        {note.subject} &middot; Semester {note.semester}
                      </p>
                    </div>
                    <BookmarkButton noteId={note.id} className="border-glass bg-bg-deep/40" />
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="text-brand-cyan" size={16} fill="currentColor" aria-hidden="true" />
                      {Number(note.rating || 0).toFixed(1)}
                    </span>
                    <span>{note.downloads || 0} downloads</span>
                  </div>
                  <Link
                    to={`/note/${note.id}`}
                    className="mt-auto inline-flex h-11 items-center justify-center rounded-lg border border-glass-strong bg-brand-primary/10 px-4 text-sm font-medium text-brand-primary transition-all duration-200 hover:bg-brand-primary/20"
                  >
                    View Resource
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-10 text-center backdrop-blur-sm">
              <p className="text-text-secondary">
                No resources found matching &ldquo;{search}&rdquo;.
              </p>
            </div>
          )}
        </section>
      )}

      <section className="mx-auto w-full max-w-[1380px] px-5 pb-16 md:px-8 lg:px-14">
        <div className="mb-6">
          <h2 className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">Top Resources</h2>
          <p className="mt-2 text-sm text-text-muted">Highest-rated notes uploaded by the student community.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topNotes.length > 0 ? (
            topNotes.map((note, index) => (
              <article
                key={note.id}
                className="stitch-resource-card group flex min-h-[320px] flex-col"
              >
                <div className="relative mb-4 h-28 overflow-hidden rounded-xl border border-white/10 bg-bg-deep/60">
                  <img src={resourceImages[index % resourceImages.length]} alt="" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#0a0e17]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan backdrop-blur-md">Verified SPPU</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-text-muted">{note.uploaderName || 'SPPU Student'}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-text-primary">{note.title}</h3>
                  </div>
                  <BookmarkButton noteId={note.id} className="border-glass bg-bg-deep/40" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 text-sm text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="text-brand-cyan" size={16} fill="currentColor" aria-hidden="true" />
                    {Number(note.rating || 0).toFixed(1)}
                  </span>
                  <span>{note.downloads || 0} downloads</span>
                </div>

                <Link
                  to={`/note/${note.id}`}
                  className="mt-auto inline-flex h-11 items-center justify-center rounded-lg border border-glass-strong bg-brand-primary/10 px-4 text-sm font-medium text-brand-primary transition-all duration-200 hover:bg-brand-primary/20"
                >
                  View Resource
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
              <p className="text-text-secondary">No resources uploaded yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1380px] px-5 pb-16 md:px-8 lg:px-14">
        <div className="mb-6">
          <h2 className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">Top Contributors</h2>
          <p className="mt-2 text-sm text-text-muted">Most active student uploaders on the platform.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topContributors.length > 0 ? (
            topContributors.map((creator) => (
              <article
                key={creator.uid}
                className="stitch-resource-card flex min-h-[180px] flex-col"
              >
                <h3 className="text-lg font-semibold text-text-primary">{creator.name}</h3>

                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-secondary">
                  <Star className="text-brand-violet" size={16} fill="currentColor" aria-hidden="true" />
                  {creator.rating}
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-5 text-sm text-text-muted">
                  <span>{creator.noteCount} resources</span>
                  <span>{creator.downloadSum} total downloads</span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-glass bg-bg-surface/40 p-10 text-center backdrop-blur-sm">
              <p className="text-text-secondary">No contributors yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
