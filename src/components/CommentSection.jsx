import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { firebaseReady } from '../firebase.js';
import { useAuth } from '../AuthContext.jsx';
import { formatDate, getUserName } from '../lib/utils.js';
import { ErrorMessage, InitialsAvatar } from './ui.jsx';

export function CommentSection({ noteId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { collection, onSnapshot, orderBy, query } = await import(
          'firebase/firestore'
        );
        const commentsQuery = query(
          collection(services.db, 'notes', noteId, 'comments'),
          orderBy('createdAt', 'asc'),
        );

        unsubscribe = onSnapshot(
          commentsQuery,
          (snapshot) => {
            setComments(snapshot.docs.map((commentDoc) => ({ id: commentDoc.id, ...commentDoc.data() })));
            setLoading(false);
            setError('');
          },
          (commentsError) => {
            console.error('Unable to load comments', commentsError);
            setError('Unable to load comments. Check Firestore rules.');
            setLoading(false);
          },
        );
      })
      .catch((initError) => {
        console.error('Firebase init failed', initError);
        setError('Unable to connect to Firebase.');
        setLoading(false);
      });

    return () => unsubscribe();
  }, [noteId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setBusy(true);

    try {
      const services = await firebaseReady;
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

      await addDoc(collection(services.db, 'notes', noteId, 'comments'), {
        text: comment.trim(),
        userId: user.uid,
        userName: getUserName(user),
        userAvatar: user.photoURL || '',
        createdAt: serverTimestamp(),
      });
      setComment('');
    } catch (commentError) {
      console.error('Unable to add comment', commentError);
      setError('Unable to save comment. Check Firestore permissions.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="flex items-center gap-2">
        <MessageSquare size={19} className="text-brand-cyan" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-text-primary">Comments</h2>
        <span className="text-sm text-text-muted">({comments.length})</span>
      </div>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="min-h-24 w-full resize-y rounded-lg border border-glass bg-bg-deep/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted"
          placeholder={user ? 'Add a helpful comment for other students' : 'Login to add a comment'}
        />
        <button
          type="submit"
          disabled={busy || !comment.trim()}
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MessageSquare size={17} aria-hidden="true" />
          {busy ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {error && (
        <div className="mt-4">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {loading ? (
          <p className="rounded-lg border border-glass bg-bg-surface/40 p-4 text-sm text-text-secondary">
            Loading comments...
          </p>
        ) : comments.length > 0 ? (
          comments.map((item) => (
            <article key={item.id} className="rounded-lg border border-glass bg-bg-surface/40 p-4">
              <div className="flex items-center gap-3">
                {item.userAvatar ? (
                  <img
                    className="h-9 w-9 rounded-xl object-cover"
                    src={item.userAvatar}
                    alt={`${item.userName} avatar`}
                  />
                ) : (
                  <InitialsAvatar name={item.userName || 'SPPU Student'} />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">{item.userName || 'SPPU Student'}</p>
                  <p className="text-xs text-text-muted">{formatDate(item.createdAt)}</p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">{item.text}</p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-glass bg-bg-surface/40 p-4 text-sm text-text-secondary">No comments yet.</p>
        )}
      </div>
    </section>
  );
}
