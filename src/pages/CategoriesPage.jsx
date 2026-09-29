import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { accentClass } from '../lib/constants.js';
import { getAccent, getSubjectCounts } from '../lib/utils.js';
import { useNotes } from '../hooks/useNotes.js';
import { ErrorMessage } from '../components/ui.jsx';

export default function CategoriesPage() {
  const { notes, loading, error } = useNotes();
  const categories = useMemo(() => getSubjectCounts(notes), [notes]);

  return (
    <main className="stitch-page mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to marketplace
          </Link>
          <p className="mt-8 text-sm font-medium uppercase text-brand-cyan">Categories</p>
          <h1 className="mt-2 text-4xl font-semibold text-text-primary">All subjects</h1>
        </div>
        <Link
          to="/upload"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow"
        >
          <Upload size={18} aria-hidden="true" />
          Upload Notes
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <div className="rounded-xl border border-glass bg-bg-surface/40 p-8 text-center text-text-secondary">
          Loading categories...
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const accent = getAccent(category.subject);

            return (
              <Link
                key={category.subject}
                to={`/?subject=${encodeURIComponent(category.subject)}#notes`}
                className="rounded-xl border border-glass bg-bg-surface/60 p-6 transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/80 hover:shadow-brand-glow hover:-translate-y-1"
              >
                <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${accentClass[accent]}`}>
                  {category.count} notes
                </span>
                <h2 className="mt-5 text-xl font-semibold text-text-primary">{category.subject}</h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Browse uploaded PDF notes, ratings, comments, and downloads for this subject.
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
