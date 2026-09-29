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
import MaterialIcon from './components/MaterialIcon.jsx';
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
      .slice(0, 5);
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

  function setQuery(term) {
    setSearch(term);
  }

  return (
    <main className="min-h-screen font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Dynamic Ambient Mesh Flares */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-container/20 blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-[25%] -right-32 w-[550px] h-[550px] rounded-full bg-secondary/15 blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute top-[60%] left-1/3 w-[700px] h-[500px] rounded-full bg-tertiary-container/15 blur-[160px] pointer-events-none -z-10"></div>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-8 pb-20">
        {/* Full Bleed Hero Background Image & Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <img src={heroCampus} alt="SPPU University Campus Holographic Study Vista" className="w-full h-full object-cover object-center lg:object-right opacity-85 select-none" />
          {/* Heavy Left & Top-to-Bottom Multi-stop Dark Vignette Gradients for Crystal Clear Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/85 md:via-[#0a0e17]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/90 via-transparent to-[#0a0e17]"></div>
          <div className="absolute inset-0 bg-[#0a0e17]/35 mix-blend-multiply"></div>
        </div>

        <div className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col space-y-space-lg">
              {/* Curricular Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-glass-high backdrop-blur-md shadow-sm border border-border-glass-subtle">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-secondary tracking-wide uppercase">SPPU Engineering Vault • Verified Sem 1–8 Prep</span>
              </div>
              {/* Headline */}
              <div className="space-y-space-xs">
                <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-[1.08]">
                  Everything you need to clear your SPPU exams, <br />
                  <span className="bg-gradient-to-r from-secondary via-primary to-tertiary bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(76,215,246,0.35)]">
                    In one place.
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl pt-2">
                  Class notes that actually make sense, solved previous year papers, and faculty-stamped lab codes. Shared by students who topped the unit tests.
                </p>
              </div>
              {/* Glass Search Capsule */}
              <div className="w-full max-w-2xl bg-surface-glass-base/60 backdrop-blur-2xl p-2 rounded-2xl shadow-xl border border-border-glass-specular/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 flex-grow min-w-0">
                    <MaterialIcon name="search" className="text-secondary" size={24} />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && runSearch()}
                      className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline w-full min-w-0 focus:ring-0"
                      placeholder="Search subjects, question papers, topic names (e.g. Insem PYQs, Microprocessors)..."
                      type="text"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => runSearch()}
                    className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md transition-all shadow-[0_0_24px_rgba(77,142,255,0.45)] active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span>Find Notes</span>
                    <MaterialIcon name="arrow_forward" size={20} />
                  </button>
                </div>
              </div>
              {/* Popular Tags Pills */}
              <div className="flex flex-wrap items-center gap-2 text-on-surface-variant">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Quick Search:</span>
                {['DBMS Insem', 'DSA Decoders', 'Computer Networks Labs', 'OS 2019 Pattern'].map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => setQuery(query)}
                    className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all backdrop-blur-md cursor-pointer border border-border-glass-subtle"
                  >
                    {query}
                  </button>
                ))}
              </div>
              {/* Key Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="bg-surface-glass-low/50 backdrop-blur-xl p-3.5 rounded-xl shadow-md border border-border-glass-specular/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-secondary mb-1">
                      <MaterialIcon name="group" size={20} />
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{stats.contributors || 0}+</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-outline">Active Engineers</p>
                  </div>
                </div>
                <div className="bg-surface-glass-low/50 backdrop-blur-xl p-3.5 rounded-xl shadow-md border border-border-glass-specular/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <MaterialIcon name="menu_book" size={20} />
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{notes.length || 0}+</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-outline">Verified Uploads</p>
                  </div>
                </div>
                <div className="bg-surface-glass-low/50 backdrop-blur-xl p-3.5 rounded-xl shadow-md border border-border-glass-specular/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-tertiary mb-1">
                      <MaterialIcon name="verified_user" size={20} />
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{stats.contributors || 0}+</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-outline">Student Contributors</p>
                  </div>
                </div>
                <div className="bg-surface-glass-low/50 backdrop-blur-xl p-3.5 rounded-xl shadow-md border border-border-glass-specular/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-alert-amber mb-1">
                      <MaterialIcon name="star" size={20} filled={true} />
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{stats.rating ? stats.rating.toFixed(1) : '0.0'}</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-outline">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column: Subtle Translucent Hologram Badges Seamlessly Floating Over Background Scene */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px]">
              {/* Floating Translucent Resource Directory Card */}
              <div className="absolute bottom-4 right-0 z-20 bg-surface-container-lowest/70 backdrop-blur-xl border border-border-glass-specular/60 p-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-72 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-glass-subtle text-secondary">
                  <MaterialIcon name="verified" size={18} />
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">What's Inside the Vault</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-on-surface hover:text-secondary transition-colors cursor-pointer">
                    <MaterialIcon name="sticky_note_2" size={18} className="text-secondary" />
                    <div>
                      <span className="font-label-sm text-label-sm font-medium block">Handwritten Class Notes</span>
                      <span className="font-body-sm text-[10px] text-outline block">Toppers' ink notes with neat diagrams</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-on-surface hover:text-secondary transition-colors cursor-pointer">
                    <MaterialIcon name="description" size={18} className="text-primary" />
                    <div>
                      <span className="font-label-sm text-label-sm font-medium block">Solved Insem & Endsem Papers</span>
                      <span className="font-body-sm text-[10px] text-outline block">Step-by-step marking scheme answers</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-on-surface hover:text-secondary transition-colors cursor-pointer">
                    <MaterialIcon name="science" size={18} className="text-success-emerald" />
                    <div>
                      <span className="font-label-sm text-label-sm font-medium block">Tested Lab Codes & Write-ups</span>
                      <span className="font-body-sm text-[10px] text-outline block">Verified outputs for practical vivas</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-on-surface hover:text-secondary transition-colors cursor-pointer">
                    <MaterialIcon name="assignment" size={18} className="text-alert-coral" />
                    <div>
                      <span className="font-label-sm text-label-sm font-medium block">Assignment Solutions</span>
                      <span className="font-body-sm text-[10px] text-outline block">Weekly tutorial sets and answers</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-on-surface hover:text-secondary transition-colors cursor-pointer">
                    <MaterialIcon name="quiz" size={18} className="text-tertiary" />
                    <div>
                      <span className="font-label-sm text-label-sm font-medium block">Important Question Banks</span>
                      <span className="font-body-sm text-[10px] text-outline block">Repeated questions ranked by weightage</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              {/* Top Right University Portal Pill */}
              <div className="absolute top-2 right-4 z-20 px-4 py-2 rounded-full bg-surface-container-lowest/70 backdrop-blur-xl border border-border-glass-specular/60 shadow-lg flex items-center gap-2.5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="relative flex items-center gap-2.5">
                <MaterialIcon name="account_balance" size={20} className="text-secondary" />
                <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide">Savitribai Phule Pune University</span>
              </div>
              </div>
              {/* Floating 'Learn • Share • Grow' Script Accent */}
              <div className="absolute top-20 right-8 z-10 hidden sm:flex flex-col text-right opacity-90 pointer-events-none select-none">
                <span className="font-display-hero text-3xl text-primary/80 italic drop-shadow-[0_0_15px_rgba(173,198,255,0.5)]">Learn</span>
                <span className="font-display-hero text-3xl text-secondary/80 italic drop-shadow-[0_0_15px_rgba(76,215,246,0.5)] -mt-1.5">Share</span>
                <span className="font-display-hero text-3xl text-tertiary/80 italic drop-shadow-[0_0_15px_rgba(208,188,255,0.5)] -mt-1.5">Grow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      {/* Electric Lightning & Luminous Celestial Energy Waves Background Layer for Lower Sections */}
      <div className="absolute top-[680px] left-0 right-0 bottom-0 pointer-events-none -z-10 overflow-hidden select-none">
        <style>{`
          @keyframes lightning-flash {
            0%, 92%, 96%, 100% { opacity: 0.25; filter: drop-shadow(0 0 15px rgba(76, 215, 246, 0.3)); }
            93% { opacity: 0.85; filter: drop-shadow(0 0 35px rgba(173, 198, 255, 0.9)) drop-shadow(0 0 70px rgba(76, 215, 246, 0.8)); }
            94% { opacity: 0.35; }
            95% { opacity: 0.95; filter: drop-shadow(0 0 45px rgba(208, 188, 255, 0.95)) drop-shadow(0 0 85px rgba(0, 242, 254, 0.9)); }
          }
          @keyframes lightning-strike-secondary {
            0%, 87%, 91%, 100% { opacity: 0.18; }
            88% { opacity: 0.75; filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.85)); }
            89% { opacity: 0.25; }
            90% { opacity: 0.9; filter: drop-shadow(0 0 40px rgba(129, 140, 248, 0.9)); }
          }
          @keyframes wave-float-1 {
            0% { transform: translateY(0) scaleY(1) rotate(0deg); }
            50% { transform: translateY(-28px) scaleY(1.08) rotate(1deg); }
            100% { transform: translateY(0) scaleY(1) rotate(0deg); }
          }
          @keyframes wave-float-2 {
            0% { transform: translateY(0) scaleX(1) rotate(0deg); }
            50% { transform: translateY(32px) scaleX(1.06) rotate(-1.5deg); }
            100% { transform: translateY(0) scaleX(1) rotate(0deg); }
          }
          @keyframes pulse-orb {
            0%, 100% { opacity: 0.45; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.15); }
          }
          @keyframes glass-shatter-1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
            50% { transform: translate(10px, -15px) rotate(5deg); opacity: 0.5; }
          }
          @keyframes glass-shatter-2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.25; }
            50% { transform: translate(-12px, 8px) rotate(-3deg); opacity: 0.45; }
          }
          @keyframes float-fragment {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}</style>
        {/* Glass-Shatter Geometric Fragments */}
        <div className="absolute top-[100px] left-[10%] w-24 h-24 border border-secondary/30 rotate-45" style={{ animation: 'glass-shatter-1 12s ease-in-out infinite', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute top-[300px] right-[15%] w-16 h-16 border border-primary/30 rotate-12" style={{ animation: 'glass-shatter-2 15s ease-in-out infinite 2s', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
        <div className="absolute top-[500px] left-[20%] w-20 h-20 border border-tertiary/25 rotate-30" style={{ animation: 'float-fragment 18s ease-in-out infinite 4s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute top-[700px] right-[25%] w-12 h-12 border border-secondary/20 rotate-45" style={{ animation: 'glass-shatter-1 20s ease-in-out infinite 6s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute top-[900px] left-[30%] w-32 h-32 border border-primary/20 rotate-15" style={{ animation: 'glass-shatter-2 14s ease-in-out infinite 8s', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
        <div className="absolute top-[1100px] right-[10%] w-14 h-14 border border-tertiary/30 rotate-30" style={{ animation: 'float-fragment 16s ease-in-out infinite 10s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        {/* Ambient Plasma Glow Orbs */}
        <div className="absolute top-10 left-[5%] w-[650px] h-[650px] rounded-full bg-secondary/15 blur-[140px] mix-blend-screen animate-pulse"></div>
        <div className="absolute top-[750px] right-[8%] w-[700px] h-[700px] rounded-full bg-primary-container/20 blur-[160px] mix-blend-screen" style={{ animation: 'pulse-orb 8s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[200px] left-[15%] w-[800px] h-[600px] rounded-full bg-tertiary-container/20 blur-[170px] mix-blend-screen" style={{ animation: 'pulse-orb 10s ease-in-out infinite 3s' }}></div>
        {/* Flowing Electric Energy Ribbons & Waves */}
        <svg className="absolute top-0 left-0 w-full h-[1800px] opacity-40 mix-blend-screen" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="electric-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1"></feGaussianBlur>
              <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur2"></feGaussianBlur>
              <feMerge><feMergeNode in="blur2"></feMergeNode><feMergeNode in="blur1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
            </filter>
            <filter id="electric-glow-blue" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"></feGaussianBlur>
              <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
            </filter>
            <linearGradient id="lightning-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.1"></stop>
              <stop offset="30%" stopColor="#4cd7f6" stopOpacity="0.85"></stop>
              <stop offset="70%" stopColor="#4d8eff" stopOpacity="0.9"></stop>
              <stop offset="100%" stopColor="#a078ff" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="lightning-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.75"></stop>
              <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.15"></stop>
            </linearGradient>
          </defs>
          <path d="M-40 120 L210 240 L280 220 L420 380 L490 350 L640 520 L610 590 L790 710 L880 680 L1040 890 L1180 870 L1360 1100 L1490 1060" stroke="url(#lightning-grad-1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#electric-glow-cyan)" style={{ animation: 'lightning-flash 8s ease-in-out infinite' }}></path>
          <path d="M420 380 L380 440 L430 490 L390 560" stroke="#4cd7f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" filter="url(#electric-glow-cyan)"></path>
          <path d="M640 520 L600 580 L650 630 L610 700" stroke="#4d8eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" filter="url(#electric-glow-blue)"></path>
          <path d="M1040 890 L1000 950 L1050 1000 L1010 1070" stroke="#a078ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" filter="url(#electric-glow-blue)"></path>
          <path d="M200 400 L500 600 L800 400 L1100 600" stroke="url(#lightning-grad-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#electric-glow-cyan)" style={{ animation: 'lightning-strike-secondary 12s ease-in-out infinite' }}></path>
          <path d="M300 500 L600 700 L900 500 L1200 700" stroke="url(#lightning-grad-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#electric-glow-blue)" style={{ animation: 'lightning-strike-secondary 15s ease-in-out infinite 5s' }}></path>
        </svg>
      </div>

      <section className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">Study by Material Type</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Pick What You Need Today</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Whether you are cramming 12 hours before Insem or completing lab files at 2 AM.</p>
          </div>
          <Link to="/categories" className="hidden sm:inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors">
            <span>View all directories</span>
            <MaterialIcon name="arrow_forward" size={20} />
          </Link>
        </div>
        {/* Category Glass Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="/categories" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-sm mb-4">
                <FileText size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-primary transition-colors">Lecture Notes</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Crisp handwritten and typed summaries for fast unit revision.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">1,240 files</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-primary text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link to="/sppu" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300 shadow-sm mb-4">
                <NotebookTabs size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-secondary transition-colors">Past PYQs</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">2015 & 2019 pattern papers solved with working steps.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">680 solved</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-secondary text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link to="/sppu" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-success-emerald/15 flex items-center justify-center text-success-emerald group-hover:bg-success-emerald group-hover:text-surface-container-lowest transition-all duration-300 shadow-sm mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-success-emerald transition-colors">Lab Practicals</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Clean source code, circuit connections, and viva Q&As.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">430 repos</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-success-emerald text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link to="/sppu" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-alert-coral/15 flex items-center justify-center text-alert-coral group-hover:bg-alert-coral group-hover:text-surface-container-lowest transition-all duration-300 shadow-sm mb-4">
                <FileText size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-alert-coral transition-colors">Assignments</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Weekly tutorial sets and sample answers.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">510 sets</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-alert-coral text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link to="/sppu" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-300 shadow-sm mb-4">
                <Search size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-tertiary transition-colors">Question Banks</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Repeated questions ranked by university weightage.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">320 banks</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-tertiary text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link to="/sppu" className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-alert-amber/15 flex items-center justify-center text-alert-amber group-hover:bg-alert-amber group-hover:text-surface-container-lowest transition-all duration-300 shadow-sm mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-alert-amber transition-colors">Decoders & Guides</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Last-night crash notes to pass and score high.</p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-label-sm text-label-sm text-outline">190 guides</span>
              <MaterialIcon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-alert-amber text-base transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* SPPU CURRICULAR EXPLORER SELECTOR BAR */}
      <section className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-8">
        <div className="bg-surface-glass-base/60 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl shadow-xl border border-border-glass-specular/50 space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="relative">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-glass-subtle/50">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shadow-sm border border-secondary/20 flex-shrink-0">
                <MaterialIcon name="tune" size={22} />
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Filter by Your Branch & Semester</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Jump straight to your syllabus without digging through endless folders.</p>
              </div>
            </div>
            <button className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-md text-label-md text-secondary hover:text-primary hover:bg-surface-glass-high transition-all cursor-pointer border border-transparent hover:border-border-glass-subtle active:scale-95" type="button">
              <MaterialIcon name="restart_alt" size={18} />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* 4 Filter Dropdown Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {/* Dropdown 1: University */}
            <div className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 px-4 py-3 rounded-xl border border-border-glass-specular/30 hover:border-secondary/40 transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
                  <MaterialIcon name="account_balance" size={18} />
                </div>
                <div className="min-w-0 truncate">
                  <span className="block text-[11px] font-label-sm uppercase tracking-wider text-outline group-hover:text-secondary/80 transition-colors leading-tight">University Board</span>
                  <span className="block text-sm font-semibold text-on-surface truncate mt-0.5">SPPU (Pune University)</span>
                </div>
              </div>
              <MaterialIcon name="expand_more" size={20} className="text-outline group-hover:text-secondary group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            </div>

            {/* Dropdown 2: Branch */}
            <div className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 px-4 py-3 rounded-xl border border-border-glass-specular/30 hover:border-primary/40 transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <MaterialIcon name="memory" size={18} />
                </div>
                <div className="min-w-0 truncate">
                  <span className="block text-[11px] font-label-sm uppercase tracking-wider text-outline group-hover:text-primary/80 transition-colors leading-tight">Discipline / Branch</span>
                  <span className="block text-sm font-semibold text-on-surface truncate mt-0.5">Information Technology</span>
                </div>
              </div>
              <MaterialIcon name="expand_more" size={20} className="text-outline group-hover:text-primary group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            </div>

            {/* Dropdown 3: Semester */}
            <div className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 px-4 py-3 rounded-xl border border-border-glass-specular/30 hover:border-tertiary/40 transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center flex-shrink-0">
                  <MaterialIcon name="calendar_month" size={18} />
                </div>
                <div className="min-w-0 truncate">
                  <span className="block text-[11px] font-label-sm uppercase tracking-wider text-outline group-hover:text-tertiary/80 transition-colors leading-tight">Academic Term</span>
                  <span className="block text-sm font-semibold text-on-surface truncate mt-0.5">Semester 5 (TE Sem 1)</span>
                </div>
              </div>
              <MaterialIcon name="expand_more" size={20} className="text-outline group-hover:text-tertiary group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            </div>

            {/* Dropdown 4: Subject Track */}
            <div className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 px-4 py-3 rounded-xl border border-border-glass-specular/30 hover:border-success-emerald/40 transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-success-emerald/15 text-success-emerald flex items-center justify-center flex-shrink-0">
                  <MaterialIcon name="data_object" size={18} />
                </div>
                <div className="min-w-0 truncate">
                  <span className="block text-[11px] font-label-sm uppercase tracking-wider text-outline group-hover:text-success-emerald/80 transition-colors leading-tight">Subject Track</span>
                  <span className="block text-sm font-semibold text-on-surface truncate mt-0.5">Data Structures & Algo</span>
                </div>
              </div>
              <MaterialIcon name="expand_more" size={20} className="text-outline group-hover:text-success-emerald group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            </div>
          </div>

          {/* Quick Filter Tags Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-on-surface-variant">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Quick Filters:
            </span>
            <button className="px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 font-label-sm text-label-sm transition-all hover:bg-secondary hover:text-on-secondary cursor-pointer shadow-sm" type="button">All SPPU</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">Comp Engg</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">IT</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">AI & DS</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">Sem 3 (SE)</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">Sem 5 (TE)</button>
            <button className="px-3 py-1 rounded-full bg-surface-glass-low hover:bg-surface-glass-high text-on-surface-variant hover:text-secondary font-label-sm text-label-sm transition-all border border-border-glass-subtle cursor-pointer" type="button">Sem 7 (BE)</button>
          </div>
        </div>
        </div>
      </section>

      {/* TRENDING SPPU RESOURCES (CARD GRID) */}
      <section className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-2">
              <MaterialIcon name="local_fire_department" size={18} />
              <span className="font-label-sm text-label-sm font-semibold uppercase">Trending on Campus</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Most Downloaded Notes This Week</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">The exact files students are studying right now for the upcoming exams.</p>
          </div>
          <Link to="/sppu" className="hidden sm:inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors">
            <span>Explore all {notes.length} resources</span>
            <MaterialIcon name="arrow_forward" size={20} />
          </Link>
        </div>
        {/* 5 Card Glass Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topNotes.length > 0 ? (
            topNotes.map((note, index) => (
              <div key={note.id} className="group bg-surface-glass-low/50 hover:bg-surface-glass-high/60 backdrop-blur-2xl rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 border border-border-glass-specular/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative">
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-surface-container-high">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${resourceImages[index % resourceImages.length]})` }}></div>
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-secondary-container/90 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Notes
                    </div>
                    <button aria-label="Bookmark" className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-on-surface flex items-center justify-center backdrop-blur-md transition-colors" type="button">
                      <BookmarkButton noteId={note.id} />
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-secondary transition-colors line-clamp-1">{note.title}</h3>
                  <p className="font-body-sm text-body-sm text-outline truncate mt-0.5">SPPU • {note.subject} • Semester {note.semester}</p>
                  {/* Metrics Row */}
                  <div className="flex items-center gap-3 mt-3 pt-2 text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-1 text-alert-amber">
                      <MaterialIcon name="star" size={16} filled={true} />
                      <span className="font-bold text-on-surface">{Number(note.rating || 0).toFixed(1)}</span>
                      <span className="text-outline">({note.ratingCount || 0})</span>
                    </div>
                    <div className="flex items-center gap-1 text-outline">
                      <MaterialIcon name="download" size={16} />
                      <span>{note.downloads || 0}</span>
                    </div>
                  </div>
                  {/* Contributor Row */}
                  <div className="flex items-center gap-2 mt-3 pt-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-label-sm text-label-sm font-bold">
                      {(note.uploaderName || 'S').slice(0, 1).toUpperCase()}
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{note.uploaderName || 'SPPU Student'}</span>
                  </div>
                </div>
                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 mt-3">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">{note.price ? `₹${note.price}` : 'FREE'}</span>
                  <Link to={`/note/${note.id}`} className="bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm transition-all shadow-sm cursor-pointer">
                    Get Vault
                  </Link>
                </div>
              </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
              <p className="text-on-surface-variant">No resources uploaded yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </section>

      {/* TOP CONTRIBUTORS & UPLOAD PROMO BENTO */}
      <section className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
          {/* Top Contributors Deck (7 cols) */}
          <div className="lg:col-span-7 bg-surface-glass-base/60 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-border-glass-specular/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-secondary mb-1">
                    <MaterialIcon name="military_tech" size={18} />
                    <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Student Voices</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface">Top Contributors on StudyVault</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Rank holders recognized for university-wide academic impact</p>
                </div>
                <Link to="/sppu" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors">Leaderboard</Link>
              </div>
              {/* Contributors Row Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topContributors.length > 0 ? (
                  topContributors.map((creator, index) => (
                    <div key={creator.uid} className="bg-surface-glass-low/50 p-4 rounded-2xl flex flex-col items-center text-center shadow-md relative overflow-hidden group hover:bg-surface-glass-high/60 transition-all border border-border-glass-specular/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                      <div className="relative">
                      <div className={`absolute -top-6 -right-6 w-16 h-16 bg-${index === 0 ? 'secondary' : index === 1 ? 'primary' : 'tertiary'}/15 rounded-full blur-xl`}></div>
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 relative">
                        {creator.avatar ? (
                          <img className="w-full h-full object-cover" src={creator.avatar} alt={creator.name} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-on-surface font-headline-lg font-bold">
                            {(creator.name || 'S').slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full bg-${index === 0 ? 'secondary' : index === 1 ? 'primary' : 'tertiary'} flex items-center justify-center text-[10px] text-on-${index === 0 ? 'secondary' : index === 1 ? 'primary' : 'tertiary'} font-bold`}>
                          {index + 1}
                        </div>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-base">{creator.name}</h4>
                      <span className={`font-label-sm text-label-sm text-${index === 0 ? 'secondary' : index === 1 ? 'primary' : 'tertiary'}`}>SPPU • Student</span>
                      <div className="w-full grid grid-cols-3 gap-1 mt-4 pt-3 text-center">
                        <div>
                          <span className="font-label-sm text-label-sm text-on-surface font-bold block">{creator.noteCount}</span>
                          <span className="font-label-sm text-[10px] text-outline">Uploads</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-on-surface font-bold block">{creator.downloadSum}</span>
                          <span className="font-label-sm text-[10px] text-outline">Reads</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-alert-amber font-bold block">{creator.rating}★</span>
                          <span className="font-label-sm text-[10px] text-outline">Rating</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-xl border border-glass bg-bg-surface/40 p-10 text-center backdrop-blur-sm">
                    <p className="text-on-surface-variant">No contributors yet.</p>
                  </div>
                )}
              </div>
            </div>
            {/* Honorarium Callout Banner inside widget */}
            <div className="mt-6 p-4 rounded-2xl bg-surface-container-high/50 backdrop-blur-md flex items-center justify-between gap-3 border border-border-glass-specular/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <MaterialIcon name="redeem" size={24} className="text-secondary" />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Contributors receive verified peer honorariums directly per authentic download.</p>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold whitespace-nowrap cursor-pointer hover:underline">Learn more</span>
              </div>
            </div>
          </div>
          </div>
          {/* Upload CTA Card (5 cols) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-glass-high/80 via-surface-glass-base/70 to-surface-container-lowest/60 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between border border-border-glass-specular/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="relative">
              <div className="absolute top-0 right-0 w-52 h-52 bg-secondary/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-6 shadow-md">
                <MaterialIcon name="cloud_upload" size={28} />
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface leading-tight">Got neat notes or working lab code?</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3">Help your juniors get through exam week and earn beer money every time someone unlocks your notes.</p>
              <ul className="space-y-2 mt-6">
                <li className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface">
                  <MaterialIcon name="check_circle" size={20} className="text-success-emerald" />
                  <span>Set your own price (free or ₹10 - ₹49)</span>
                </li>
                <li className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface">
                  <MaterialIcon name="check_circle" size={20} className="text-success-emerald" />
                  <span>Instant UPI payouts directly to your account</span>
                </li>
                <li className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface">
                  <MaterialIcon name="check_circle" size={20} className="text-success-emerald" />
                  <span>Full credit on your verified campus profile</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link to="/upload" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary text-on-surface-lowest px-6 py-4 rounded-xl font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_30px_rgba(76,215,246,0.35)] hover:shadow-[0_0_40px_rgba(76,215,246,0.55)] hover:scale-[1.01] active:scale-95">
                <MaterialIcon name="upload_file" size={22} />
                <span>Upload Your Notes</span>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-surface-glass-low/50 backdrop-blur-2xl border-t border-border-glass-specular/40 mt-space-xl relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div className="relative max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg">
            <div className="lg:col-span-2 space-y-space-md">
              <div className="flex items-center gap-space-sm">
                <img alt="Brand logo. - Primary color: #3b82f6 - Font: plusJakartaSans - Mode: dark - Roundness: rounded-md" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XWtK278lN6PufpQazmKw5VS0luOXX9pxsKkROr3WkqQYTj8F9McQn0KktanEDOkjYDj3_FA0DyRH0Gsqg7Df8jJUaazb6_ONNnsEW4f3ItdEAQzJJpLsrvVfhNLNdCyTKjnX8boapjy2RH0llJesjBumgdWHBHEZiQ1RqQyUBQaM_XPRyWhRKrVDvusFqojaqEXjXrCmaBa1v7ofm8Sy7uGEPOUxMjk4tMRTusOH0H2w8Ih9eh_0V3" />
                <span className="font-headline-sm text-headline-sm text-on-surface">StudyVault</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Built by SPPU students, for SPPU students. Sharing knowledge without the gatekeeping.</p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary border border-secondary/30">SPPU 2024 Pattern</span>
                <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-tertiary/10 text-tertiary border border-tertiary/30">Peer Verified</span>
              </div>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-space-md uppercase tracking-wider">Curricula & Branches</h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-secondary transition-colors cursor-pointer">Computer Engineering</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Information Technology</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">AI & Data Science</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Electronics & Telecomm</li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-space-md uppercase tracking-wider">Resources</h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-secondary transition-colors cursor-pointer">Lecture Notes</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Past PYQs</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Lab Practicals</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Question Banks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-space-md uppercase tracking-wider">Legal</h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-secondary transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Copyright</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Search Results Section */}
      {search.trim() && (
        <section id="notes" className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-12">
          <div className="mb-6">
            <h2 className="text-[14px] font-semibold uppercase tracking-wider text-on-surface-variant">
              Search Results
            </h2>
            <p className="mt-2 text-sm text-outline">
              {filteredNotes.length} result(s) for &ldquo;{search}&rdquo;
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-on-surface-variant">Searching notes...</div>
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="flex flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-brand-primary/50 hover:shadow-brand-glow hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-outline">
                        {note.uploaderName || 'SPPU Student'}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-on-surface">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {note.subject} &middot; Semester {note.semester}
                      </p>
                    </div>
                    <BookmarkButton noteId={note.id} className="border-glass bg-bg-deep/40" />
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="text-secondary" size={16} fill="currentColor" aria-hidden="true" />
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
              <p className="text-on-surface-variant">
                No resources found matching &ldquo;{search}&rdquo;.
              </p>
            </div>
          )}
        </section>
      )}
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
