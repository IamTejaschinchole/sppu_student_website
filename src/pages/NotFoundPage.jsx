import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="stitch-page mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-[1200px] flex-col items-center justify-center px-5 py-12 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-2xl border border-glass bg-bg-surface/60 text-brand-primary">
        <span className="text-4xl font-bold">404</span>
      </div>
      
      <h1 className="mt-8 text-3xl font-bold text-text-primary sm:text-4xl">
        Page not found
      </h1>
      
      <p className="mt-4 max-w-md text-text-secondary">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow"
        >
          <Home size={18} aria-hidden="true" />
          Go to Homepage
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-glass bg-bg-surface/60 px-6 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/80"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Go Back
        </button>
      </div>
    </main>
  );
}
