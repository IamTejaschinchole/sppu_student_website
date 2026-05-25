import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  NotebookTabs,
  Search,
  Star,
  Tags,
  Upload,
  X,
} from 'lucide-react';
import { useAuth } from './AuthContext.jsx';
import RouteSpinner from './components/RouteSpinner.jsx';
import {
  Avatar,
  ErrorMessage,
  FilterSelect,
  LoadingScreen,
  Pagination,
  RatingControl,
  Uploader,
} from './components/ui.jsx';
import {
  accentClass,
  notesPerPage,
  priceFilters,
  semesters,
  sortOptions,
  subjectCatalog,
} from './lib/constants.js';
import { getRatingErrorMessage } from './lib/errors.js';
import { downloadNote, submitRating } from './lib/noteActions.js';
import {
  filterAndSortNotes,
  getAccent,
  getSemesterCounts,
  getSubjectFromUrl,
  getSubjectOptions,
  getUserName,
  isFreeNote,
} from './lib/utils.js';
import { useNotes } from './hooks/useNotes.js';

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const UploadPage = lazy(() => import('./pages/UploadPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'));
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage.jsx'));

function PageSuspense({ label, children }) {
  return <Suspense fallback={<RouteSpinner label={label} />}>{children}</Suspense>;
}

function App() {
  return (
    <div className="min-h-screen text-zinc-100">
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
          path="/note/:id"
          element={
            <PageSuspense label="Loading note...">
              <NoteDetailPage />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: '#141414', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-[24px] py-3">
        {/* Left side */}
        <Link to="/" className="text-white font-semibold text-lg" aria-label="StudyVault home">
          StudyVault
        </Link>

        {/* Desktop Right side links */}
        <nav className="hidden md:flex items-center gap-5 text-[#888888]">
          <Link className="transition hover:text-white" to="/#notes">
            Browse
          </Link>
          <Link className="transition hover:text-white" to="/upload">
            Upload
          </Link>
          {user && (
            <Link className="transition hover:text-white" to="/dashboard">
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="transition hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link className="transition hover:text-white" to="/login">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#888888] hover:text-white transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full border-t border-[#2a2a2a]" style={{ background: '#141414' }}>
          <nav className="flex flex-col px-[24px] py-4 gap-4 text-[#888888]">
            <Link 
              className="transition hover:text-white" 
              to="/#notes"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse
            </Link>
            <Link 
              className="transition hover:text-white" 
              to="/upload"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upload
            </Link>
            {user && (
              <Link 
                className="transition hover:text-white" 
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left transition hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link 
                className="transition hover:text-white" 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { notes, loading: notesLoading, error: notesError } = useNotes();
  const [downloadError, setDownloadError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [downloadingId, setDownloadingId] = useState('');
  const [ratingId, setRatingId] = useState('');
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState(() => getSubjectFromUrl(location.search));
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const subjectFromUrl = getSubjectFromUrl(location.search);
    setSubjectFilter(subjectFromUrl);
  }, [location.search]);

  useEffect(() => {
    setPage(1);
  }, [search, subjectFilter, semesterFilter, priceFilter, sortBy]);

  const subjects = useMemo(() => getSubjectOptions(notes), [notes]);
  const filteredNotes = useMemo(
    () => filterAndSortNotes(notes, { search, subjectFilter, semesterFilter, priceFilter, sortBy }),
    [notes, priceFilter, search, semesterFilter, sortBy, subjectFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / notesPerPage));
  const visibleNotes = filteredNotes.slice((page - 1) * notesPerPage, page * notesPerPage);
  const semesterCounts = useMemo(() => getSemesterCounts(notes), [notes]);
  const totalDownloads = useMemo(() => notes.reduce((total, note) => total + Number(note.downloads || 0), 0), [notes]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  async function handleDownload(note) {
    await downloadNote({
      note,
      user,
      navigate,
      location,
      setBusyId: setDownloadingId,
      setError: setDownloadError,
    });
  }

  async function handleRate(note, rating) {
    setRatingError('');

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setRatingId(note.id);

    try {
      await submitRating(note.id, user, rating);
    } catch (error) {
      console.error('Unable to rate note', error);
      setRatingError(getRatingErrorMessage(error));
    } finally {
      setRatingId('');
    }
  }

  return (
    <main>
      <section className="mx-auto flex flex-col items-center w-full max-w-[1200px] px-[24px] pt-8 pb-6">
        <div className="text-center max-w-[700px] w-full">
          <h1 className="text-[2rem] font-semibold text-[#f0f0f0]">
            India's student-powered study library
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#888888]">
            Notes, PYQs and guides from students across schools, colleges and exams
          </p>
        </div>

        <div className="relative mt-5 w-full max-w-[600px]">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
            size={20}
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-[8px] border border-[rgba(255,255,255,0.06)] pl-[44px] pr-4 py-2 text-sm text-white placeholder:text-[#888888] outline-none focus:border-[#6366f1] transition-colors"
            style={{ background: '#141414' }}
            placeholder="Search notes, subjects, exams..."
            type="search"
          />
        </div>

        <div className="mt-8 w-full grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Engineering', emoji: '🏗️' },
            { label: 'JEE/NEET', emoji: '📐' },
            { label: 'UPSC', emoji: '🏛️' },
            { label: 'CBSE/ICSE', emoji: '📚' },
            { label: 'University Notes', emoji: '🎓' },
            { label: 'Placements', emoji: '💼' },
            { label: 'PYQs', emoji: '📝' },
            { label: 'All Notes', emoji: '🗂️' },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.06)] transition-colors hover:border-[#6366f1] cursor-pointer"
              style={{ background: '#141414', height: '70px' }}
            >
              <span className="mb-0.5" style={{ fontSize: '20px', lineHeight: 1 }}>{cat.emoji}</span>
              <span className="text-[#f0f0f0] font-medium text-center leading-tight" style={{ fontSize: '0.85rem' }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="notes" className="border-y border-[rgba(255,255,255,0.06)] bg-zinc-950/55 py-4">
        <div className="mx-auto grid w-full max-w-[1200px] gap-3 px-[24px] lg:grid-cols-[1fr_12rem_12rem_10rem_12rem]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 w-full rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-panel pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#6366f1]"
              placeholder="Search notes, subjects, exams..."
              type="search"
            />
          </div>
          
          {[
            { label: 'Filter by subject', value: subjectFilter, setter: setSubjectFilter, options: subjects },
            { label: 'Filter by semester', value: semesterFilter, setter: setSemesterFilter, options: semesters },
            { label: 'Filter by price', value: priceFilter, setter: setPriceFilter, options: priceFilters }
          ].map((filter) => (
            <label key={filter.label} className="relative">
              <span className="sr-only">{filter.label}</span>
              <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} aria-hidden="true" />
              <select
                value={filter.value}
                onChange={(e) => filter.setter(e.target.value)}
                className="h-9 w-full appearance-none rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-panel pl-9 pr-3 text-sm text-white outline-none focus:border-[#6366f1]"
              >
                {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
          ))}

          <label className="relative">
            <span className="sr-only">Sort notes</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-9 w-full appearance-none rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-panel px-3 text-sm text-white outline-none focus:border-[#6366f1]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-[24px] py-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[1rem] font-medium text-[#888888]">SE IT Semester 3 and 4</h2>
          </div>
          <p className="text-xs text-[#888888]">
            {filteredNotes.length} note packs found - page {page} of {totalPages}
          </p>
        </div>

        {notesError && <ErrorMessage>{notesError}</ErrorMessage>}
        {downloadError && <ErrorMessage>{downloadError}</ErrorMessage>}
        {ratingError && <ErrorMessage>{ratingError}</ErrorMessage>}

        {notesLoading ? (
          <div className="rounded-lg border border-line bg-panel p-8 text-center text-zinc-400">
            Loading notes from Firestore...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {visibleNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isDownloading={downloadingId === note.id}
                isRating={ratingId === note.id}
                onDownload={() => handleDownload(note)}
                onRate={(rating) => handleRate(note, rating)}
              />
            ))}
          </div>
        )}

        {!notesLoading && filteredNotes.length === 0 && (
          <div className="rounded-lg border border-line bg-panel p-8 text-center text-zinc-400">
            No uploaded notes match the current search and filters.
          </div>
        )}

        {!notesLoading && filteredNotes.length > notesPerPage && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </section>
    </main>
  );
}

function NoteCard({ note, isDownloading, isRating, onDownload, onRate }) {
  const tags = Array.isArray(note.tags) ? note.tags : [];
  const averageRating = Number(note.rating || 0);
  const accent = getAccent(note.subject || note.title || note.id);

  return (
    <article className="flex flex-col rounded-[8px] border border-[rgba(255,255,255,0.06)] p-[14px] transition hover:-translate-y-1 hover:border-[#6366f1] hover:shadow-glow" style={{ background: '#141414' }}>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-[4px] border border-[rgba(255,255,255,0.06)] px-2 py-0.5 text-[10px] font-medium text-[#6366f1] bg-transparent">
          Semester {note.semester}
        </span>
        <span className="rounded-[4px] border border-[#22c55e] px-2 py-0.5 text-[10px] font-semibold text-[#22c55e] bg-transparent">
          {note.price || 'Free'}
        </span>
      </div>

      <div className="mt-2.5">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">{note.subject}</p>
        <Link to={`/note/${note.id}`} className="mt-1 block text-[1.15rem] font-bold leading-tight text-[#f0f0f0] transition hover:text-[#6366f1]">
          {note.title}
        </Link>
      </div>

      <div className="mt-2.5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <RatingControl
            value={averageRating}
            count={Number(note.ratingCount || 0)}
            disabled={isRating}
            onRate={onRate}
          />
          <div className="text-[10px] text-zinc-500">{Number(note.downloads || 0)} downl.</div>
        </div>

        <div className="flex items-center justify-between">
          <Uploader name={note.uploaderName} avatar={note.uploaderAvatar} />
          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex h-[28px] items-center justify-center gap-1.5 rounded-[4px] bg-[#6366f1] px-2.5 text-[10px] font-semibold text-white transition hover:bg-[#4f46e5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={12} aria-hidden="true" />
            {isDownloading ? '...' : isFreeNote(note) ? 'Download' : 'Pay'}
          </button>
        </div>
      </div>
    </article>
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
