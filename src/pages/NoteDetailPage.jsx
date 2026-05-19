import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import { accentClass } from '../lib/constants.js';
import { formatDate, getAccent, isFreeNote } from '../lib/utils.js';
import { getRatingErrorMessage } from '../lib/errors.js';
import { downloadNote, submitRating } from '../lib/noteActions.js';
import { useNote } from '../hooks/useNote.js';
import { CommentSection } from '../components/CommentSection.jsx';
import { ErrorMessage, InitialsAvatar, LoadingPanel, RatingControl } from '../components/ui.jsx';

export default function NoteDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { note, loading, error } = useNote(id);
  const [downloadError, setDownloadError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [downloadingId, setDownloadingId] = useState('');
  const [ratingId, setRatingId] = useState('');

  async function handleDownload() {
    await downloadNote({
      note,
      user,
      navigate,
      location,
      setBusyId: setDownloadingId,
      setError: setDownloadError,
    });
  }

  async function handleRate(rating) {
    setRatingError('');

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setRatingId(note.id);

    try {
      await submitRating(note.id, user, rating);
    } catch (rateError) {
      console.error('Unable to rate note', rateError);
      setRatingError(getRatingErrorMessage(rateError));
    } finally {
      setRatingId('');
    }
  }

  if (loading) {
    return <LoadingPanel label="Loading note details..." />;
  }

  if (error || !note) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <ErrorMessage>{error || 'Note not found.'}</ErrorMessage>
      </main>
    );
  }

  const tags = Array.isArray(note.tags) ? note.tags : [];

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_22rem] lg:py-16">
      <section className="rounded-lg border border-line bg-panel p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to marketplace
        </Link>
        <div className="mt-8 flex flex-wrap gap-2">
          <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${accentClass[getAccent(note.subject)]}`}>
            Semester {note.semester}
          </span>
          <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-white">
            {note.price || 'Free'}
          </span>
          <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-zinc-300">
            {note.subject}
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">{note.title}</h1>
        <p className="mt-5 whitespace-pre-line text-base leading-8 text-zinc-300">{note.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
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

        <div className="mt-8 border-t border-line pt-6">
          <CommentSection noteId={note.id} />
        </div>
      </section>

      <aside className="h-fit rounded-lg border border-line bg-panel p-6">
        <p className="text-sm font-medium uppercase text-mint">Uploader</p>
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-zinc-950/55 p-4">
          {note.uploaderAvatar ? (
            <img className="h-11 w-11 rounded-lg object-cover" src={note.uploaderAvatar} alt={`${note.uploaderName} avatar`} />
          ) : (
            <InitialsAvatar name={note.uploaderName || 'SPPU Student'} />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{note.uploaderName || 'SPPU Student'}</p>
            <p className="truncate text-xs text-zinc-500">{formatDate(note.createdAt)}</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-line bg-zinc-950/55 p-4">
          <RatingControl
            value={Number(note.rating || 0)}
            count={Number(note.ratingCount || 0)}
            disabled={ratingId === note.id}
            onRate={handleRate}
          />
        </div>

        {downloadError && <div className="mt-4"><ErrorMessage>{downloadError}</ErrorMessage></div>}
        {ratingError && <div className="mt-4"><ErrorMessage>{ratingError}</ErrorMessage></div>}

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloadingId === note.id}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download size={18} aria-hidden="true" />
          {downloadingId === note.id ? 'Preparing...' : isFreeNote(note) ? 'Download PDF' : 'Pay & Download PDF'}
        </button>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-line bg-zinc-950/45 p-3">
            <p className="text-xl font-semibold text-white">{Number(note.downloads || 0)}</p>
            <p className="mt-1 text-zinc-500">Downloads</p>
          </div>
          <div className="rounded-lg border border-line bg-zinc-950/45 p-3">
            <p className="text-xl font-semibold text-white">{Number(note.rating || 0).toFixed(1)}</p>
            <p className="mt-1 text-zinc-500">Avg rating</p>
          </div>
        </div>
      </aside>
    </main>
  );
}
