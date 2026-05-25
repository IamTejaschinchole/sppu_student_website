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
    <header className="sticky top-0 z-50 w-full" style={{ background: '#141414', borderBottom: '1px solid #2a2a2a' }}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-[24px] py-4">
        {/* Left side */}
        <Link to="/" className="text-white font-medium text-lg" aria-label="StudyVault home">
          StudyVault 📚
        </Link>

        {/* Desktop Right side links */}
        <nav className="hidden md:flex items-center gap-6 text-[#888888]">
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
      <section className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-10 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:pb-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300">
            <CheckCircle2 size={16} className="text-mint" aria-hidden="true" />
            Live notes from SPPU SE IT students
          </div>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            SPPU Notes Marketplace
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Find concise student-made PDFs by subject, semester, rating, and exam focus. Sign in to
            download, rate once, or upload your own notes for the SE IT batch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#notes"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-ink transition hover:bg-zinc-200"
            >
              Browse Notes
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <Link
              to="/categories"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-mint/10"
            >
              <Tags size={18} aria-hidden="true" />
              View Categories
            </Link>
          </div>

          <div id="subjects" className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Subjects', subjects.length - 1],
              ['Sem 3 Notes', semesterCounts[3]],
              ['Sem 4 Notes', semesterCounts[4]],
              ['Downloads', totalDownloads],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-line bg-panel/70 p-4">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel shadow-glow">
          <div className="grid grid-cols-[1fr_0.78fr] gap-0 border-b border-line">
            <div className="p-6">
              <p className="text-sm uppercase text-zinc-500">Live marketplace</p>
              <p className="mt-3 text-3xl font-semibold leading-tight text-white">
                {notes.length || 0} uploaded PDF note packs
              </p>
            </div>
            <div className="border-l border-line bg-zinc-950/45 p-6">
              <BookOpen className="text-ember" size={34} aria-hidden="true" />
              <p className="mt-5 text-sm leading-6 text-zinc-300">
                Firestore-backed notes with protected downloads, live ratings, and comments.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-line">
            {(notes.length ? notes.slice(0, 4) : subjectCatalog.slice(0, 4)).map((item) => {
              const note = typeof item === 'string' ? null : item;
              const subject = note?.subject || item;
              const accent = getAccent(subject);

              return (
                <div key={note?.id || subject} className="bg-panel p-5">
                  <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${accentClass[accent]}`}>
                    {note ? `Sem ${note.semester}` : 'Waiting'}
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white">{subject}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {note ? `${Number(note.downloads || 0)} downloads` : 'Upload first note'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="notes" className="border-y border-line bg-zinc-950/55 py-6">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_12rem_12rem_10rem_12rem]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-12 w-full rounded-lg border border-line bg-panel pl-12 pr-4 text-sm text-white placeholder:text-zinc-500"
              placeholder="Search title, subject, description, or tags"
              type="search"
            />
          </div>
          <FilterSelect
            label="Filter by subject"
            value={subjectFilter}
            onChange={setSubjectFilter}
            options={subjects}
          />
          <FilterSelect
            label="Filter by semester"
            value={semesterFilter}
            onChange={setSemesterFilter}
            options={semesters}
          />
          <FilterSelect
            label="Filter by price"
            value={priceFilter}
            onChange={setPriceFilter}
            options={priceFilters}
          />
          <label>
            <span className="sr-only">Sort notes</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-line bg-panel px-4 text-sm text-white"
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

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase text-mint">Firestore notes</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">SE IT Semester 3 and 4</h2>
          </div>
          <p className="text-sm text-zinc-400">
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
    <article className="flex min-h-[30rem] flex-col rounded-lg border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-mint/35 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${accentClass[accent]}`}>
          Semester {note.semester}
        </span>
        <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-white">
          {note.price || 'Free'}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-zinc-400">{note.subject}</p>
        <Link to={`/note/${note.id}`} className="mt-2 block min-h-[4.5rem] text-xl font-semibold leading-7 text-white transition hover:text-mint">
          {note.title}
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{note.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span key={tag} className="rounded-md bg-zinc-950/70 px-2.5 py-1 text-xs text-zinc-300">
              {tag}
            </span>
          ))
        ) : (
          <span className="rounded-md bg-zinc-950/70 px-2.5 py-1 text-xs text-zinc-500">No tags</span>
        )}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-line pt-5">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <NotebookTabs size={17} className="text-zinc-500" aria-hidden="true" />
            PDF notes
          </div>
          <div className="text-sm text-zinc-400">{Number(note.downloads || 0)} downloads</div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <RatingControl
            value={averageRating}
            count={Number(note.ratingCount || 0)}
            disabled={isRating}
            onRate={onRate}
          />
          <Uploader name={note.uploaderName} avatar={note.uploaderAvatar} />
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={18} aria-hidden="true" />
            {isDownloading ? 'Preparing...' : isFreeNote(note) ? 'Download' : 'Pay & Download'}
          </button>
          <Link
            to={`/note/${note.id}`}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white/[0.04] px-3 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-mint/10"
            aria-label={`Open ${note.title}`}
          >
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
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
