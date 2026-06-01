import { lazy, Suspense, useState } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  BookOpen,
  FileText,
  GraduationCap,
  Menu,
  NotebookTabs,
  Search,
  Star,
  X,
} from 'lucide-react';
import { useAuth } from './AuthContext.jsx';
import RouteSpinner from './components/RouteSpinner.jsx';
import { LoadingScreen } from './components/ui.jsx';

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const UploadPage = lazy(() => import('./pages/UploadPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'));
const SppuBranchesPage = lazy(() => import('./pages/SppuBranchesPage.jsx'));
const SemesterSelectionPage = lazy(() => import('./pages/SemesterSelectionPage.jsx'));
const SubjectMarketplacePage = lazy(() => import('./pages/SubjectMarketplacePage.jsx'));
const SubjectPlaceholderPage = lazy(() => import('./pages/SubjectPlaceholderPage.jsx'));
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage.jsx'));

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

const featuredCatalogues = [
  {
    creator: 'Tejas Chinchole',
    title: 'JEE Complete Bundle',
    rating: '4.9',
    resources: '48 Resources',
  },
  {
    creator: 'Rahul Sharma',
    title: 'Physics Master Collection',
    rating: '4.8',
    resources: '31 Resources',
  },
  {
    creator: 'Aman Patel',
    title: 'NEET Biology Collection',
    rating: '4.7',
    resources: '27 Resources',
  },
];

const topCreators = [
  {
    name: 'Tejas Chinchole',
    rating: '4.9',
    resources: '48 Resources',
    downloads: '2,300 Downloads',
  },
  {
    name: 'Rahul Sharma',
    rating: '4.8',
    resources: '31 Resources',
    downloads: '1,700 Downloads',
  },
  {
    name: 'Aman Patel',
    rating: '4.7',
    resources: '27 Resources',
    downloads: '1,200 Downloads',
  },
];

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
  const [search, setSearch] = useState('');

  return (
    <main>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-[24px] pb-8 pt-8">
        <div className="w-full max-w-[700px] text-center">
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
            className="w-full rounded-[8px] border border-[rgba(255,255,255,0.06)] py-2 pl-[44px] pr-4 text-sm text-white placeholder:text-[#888888] outline-none transition-colors focus:border-[#6366f1]"
            style={{ background: '#141414' }}
            placeholder="Search notes, subjects, exams..."
            type="search"
          />
        </div>
      </section>

      <section id="notes" className="mx-auto w-full max-w-[1200px] px-[24px] pb-16">
        <div className="mb-5">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">Choose a Category</h2>
          <p className="mt-1 text-sm text-zinc-500">Browse study resources by exam, university, or course.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categoryCards.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.label}
                to={category.to}
                className="flex h-[104px] flex-col items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] text-center transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.03]"
              >
                <Icon className="text-[#6366f1]" size={22} aria-hidden="true" />
                <span className="mt-3 text-sm font-medium leading-tight text-[#f0f0f0]">{category.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-[24px] pb-12">
        <div className="mb-5">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">Top Catalogues</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Browse the highest-rated study collections from student creators.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredCatalogues.map((catalogue) => (
            <article
              key={catalogue.title}
              className="flex h-[220px] flex-col rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-5 transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.025]"
            >
              <p className="text-[11px] font-medium text-zinc-500">{catalogue.creator}</p>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{catalogue.title}</h3>

              <div className="mt-4 flex items-center justify-between gap-4 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="text-ember" size={15} fill="currentColor" aria-hidden="true" />
                  {catalogue.rating}
                </span>
                <span>{catalogue.resources}</span>
              </div>

              <button
                type="button"
                className="mt-auto inline-flex h-10 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.08)] px-4 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.04]"
              >
                View Catalogue
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-[24px] pb-12">
        <div className="mb-5">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">Top Creators</h2>
          <p className="mt-1 text-sm text-zinc-500">Most trusted student contributors on the platform.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topCreators.map((creator) => (
            <article
              key={creator.name}
              className="flex min-h-[170px] flex-col rounded-[12px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-5 transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.025]"
            >
              <h3 className="text-lg font-semibold text-white">{creator.name}</h3>

              <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-300">
                <Star className="text-ember" size={15} fill="currentColor" aria-hidden="true" />
                {creator.rating}
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-5 text-sm text-zinc-400">
                <span>{creator.resources}</span>
                <span>{creator.downloads}</span>
              </div>
            </article>
          ))}
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
