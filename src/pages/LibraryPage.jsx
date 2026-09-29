import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Star } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import { useNotes } from '../hooks/useNotes.js';
import { useSavedNotes } from '../hooks/useSavedNotes.js';
import { getNotePriceAmount, isFreeNote } from '../lib/utils.js';
import { Avatar, ErrorMessage, LoadingScreen } from '../components/ui.jsx';
import { BookmarkButton } from '../components/BookmarkButton.jsx';

export default function LibraryPage() {
  const { user } = useAuth();
  const { notes, loading: notesLoading, error: notesError } = useNotes();
  const { savedIds, loading: savedLoading, error: savedError } = useSavedNotes(user?.uid);

  const savedNotes = useMemo(() => {
    return notes.filter(note => savedIds.includes(note.id));
  }, [notes, savedIds]);

  if (notesLoading || savedLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="stitch-page stitch-library mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to marketplace
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase text-text-secondary">My Library</p>
          <h1 className="mt-2 text-4xl font-bold text-text-primary">Saved Resources</h1>
        </div>
      </div>

      {notesError && <ErrorMessage>{notesError}</ErrorMessage>}
      {savedError && <div className="mt-4"><ErrorMessage>{savedError}</ErrorMessage></div>}

      <section>
        {savedNotes.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {savedNotes.map((note) => (
              <article
                key={note.id}
                className="flex flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 transition-all duration-200 hover:border-brand-primary/50 hover:shadow-brand-glow hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-text-muted">
                      {note.uploaderName || 'SPPU Student'}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-text-primary">{note.title}</h3>
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

                <div className="mt-auto pt-5">
                  <Link
                    to={`/note/${note.id}`}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-glass bg-bg-surface/40 px-4 text-sm font-medium text-text-primary transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/60"
                  >
                    <Download size={16} aria-hidden="true" />
                    View Resource
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-glass bg-bg-surface/40 p-12 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-xl border border-glass bg-bg-deep/40 text-text-muted mx-auto mb-4">
              <BookOpen size={28} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No saved resources yet</h3>
            <p className="text-text-secondary mb-6">
              Save notes to your library to easily access them later.
            </p>
            <Link
              to="/sppu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow"
            >
              Browse Resources
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
