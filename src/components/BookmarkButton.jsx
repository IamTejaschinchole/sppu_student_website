import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import { useIsSaved } from '../hooks/useIsSaved.js';

export function BookmarkButton({ noteId, size = 18, className = '' }) {
  const { user } = useAuth();
  const { isSaved, busy, toggleSaved } = useIsSaved(user?.uid, noteId);

  if (!user) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      disabled={busy}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      aria-label={isSaved ? 'Remove from library' : 'Save to library'}
      title={isSaved ? 'Remove from library' : 'Save to library'}
    >
      {isSaved ? (
        <BookmarkCheck size={size} className="text-brand-primary" aria-hidden="true" />
      ) : (
        <Bookmark size={size} className="text-text-secondary" aria-hidden="true" />
      )}
    </button>
  );
}