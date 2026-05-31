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
    to: '/categories',
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

      <section id="notes" className="mx-auto w-full max-w-[1200px] px-[24px] pb-10">
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
