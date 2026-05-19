import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  DollarSign,
  Download,
  Edit3,
  NotebookTabs,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { firebaseReady } from '../firebase.js';
import { useAuth } from '../AuthContext.jsx';
import { deleteNoteSubcollection } from '../lib/noteActions.js';
import { getDeleteErrorMessage } from '../lib/errors.js';
import {
  formatDate,
  getNotePriceAmount,
  getTimestampMillis,
  getUserName,
  isFreeNote,
} from '../lib/utils.js';
import { useNotes } from '../hooks/useNotes.js';
import { useSellerPayments } from '../hooks/useSellerPayments.js';
import { Avatar, DashboardStat, ErrorMessage } from '../components/ui.jsx';

export default function DashboardPage() {
  const { user, updateDisplayName } = useAuth();
  const { notes, loading, error } = useNotes();
  const { payments, error: paymentsError } = useSellerPayments(user?.uid);
  const [profileName, setProfileName] = useState(getUserName(user));
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [editingNoteId, setEditingNoteId] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    priceType: 'free',
    priceAmount: '',
  });
  const [noteBusyId, setNoteBusyId] = useState('');
  const [dashboardError, setDashboardError] = useState('');

  useEffect(() => {
    setProfileName(getUserName(user));
  }, [user]);

  const myNotes = useMemo(
    () =>
      notes
        .filter((note) => note.uploadedBy === user?.uid)
        .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt)),
    [notes, user?.uid],
  );
  const myPayments = useMemo(
    () => payments.filter((payment) => payment.uploadedBy === user?.uid && payment.status === 'success'),
    [payments, user?.uid],
  );

  const totals = useMemo(() => {
    const downloads = myNotes.reduce((sum, note) => sum + Number(note.downloads || 0), 0);
    const earnings = myPayments.reduce((sum, payment) => sum + Number(payment.amountPaise || 0) / 100, 0);
    const ratingCount = myNotes.reduce((sum, note) => sum + Number(note.ratingCount || 0), 0);
    const weightedRating = myNotes.reduce(
      (sum, note) => sum + Number(note.rating || 0) * Number(note.ratingCount || 0),
      0,
    );

    return {
      downloads,
      earnings,
      ratingCount,
      averageRating: ratingCount ? weightedRating / ratingCount : 0,
    };
  }, [myNotes, myPayments]);

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileBusy(true);
    setProfileMessage('');
    setProfileError('');

    try {
      await updateDisplayName(profileName);
      setProfileMessage('Display name updated.');
    } catch (profileUpdateError) {
      console.error('Unable to update profile', profileUpdateError);
      setProfileError('Unable to update display name. Check Firebase Auth and Firestore rules.');
    } finally {
      setProfileBusy(false);
    }
  }

  function startEditing(note) {
    setDashboardError('');
    setEditingNoteId(note.id);
    setEditForm({
      title: note.title || '',
      description: note.description || '',
      priceType: isFreeNote(note) ? 'free' : 'paid',
      priceAmount: isFreeNote(note) ? '' : String(getNotePriceAmount(note) || ''),
    });
  }

  async function handleSaveNote(note) {
    setDashboardError('');

    if (!editForm.title.trim() || !editForm.description.trim()) {
      setDashboardError('Title and description are required.');
      return;
    }

    if (editForm.priceType === 'paid' && (!editForm.priceAmount || Number(editForm.priceAmount) <= 0)) {
      setDashboardError('Enter a valid paid price.');
      return;
    }

    setNoteBusyId(note.id);

    try {
      const services = await firebaseReady;
      const { doc, updateDoc } = await import('firebase/firestore');
      const priceAmount = editForm.priceType === 'paid' ? Number(editForm.priceAmount) : 0;
      await updateDoc(doc(services.db, 'notes', note.id), {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        priceType: editForm.priceType,
        priceAmount,
        price: editForm.priceType === 'free' ? 'Free' : `Rs. ${priceAmount.toFixed(0)}`,
      });
      setEditingNoteId('');
    } catch (saveError) {
      console.error('Unable to update note', saveError);
      setDashboardError('Unable to update note. Check Firestore permissions.');
    } finally {
      setNoteBusyId('');
    }
  }

  async function handleDeleteNote(note) {
    setDashboardError('');

    if (!window.confirm(`Delete "${note.title}"? This removes the note record and PDF.`)) {
      return;
    }

    setNoteBusyId(note.id);

    try {
      const services = await firebaseReady;
      const { deleteObject, ref } = await import('firebase/storage');
      const { deleteDoc, doc } = await import('firebase/firestore');

      if (note.storagePath) {
        try {
          await deleteObject(ref(services.storage, note.storagePath));
        } catch (storageDeleteError) {
          if (storageDeleteError?.code !== 'storage/object-not-found') {
            throw storageDeleteError;
          }
        }
      }

      await deleteNoteSubcollection(note.id, 'ratings');
      await deleteNoteSubcollection(note.id, 'comments');
      await deleteDoc(doc(services.db, 'notes', note.id));

      if (editingNoteId === note.id) {
        setEditingNoteId('');
      }
    } catch (deleteError) {
      console.error('Unable to delete note', deleteError);
      setDashboardError(getDeleteErrorMessage(deleteError));
    } finally {
      setNoteBusyId('');
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to marketplace
          </Link>
          <p className="mt-8 text-sm font-medium uppercase text-mint">Seller dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Your notes and profile</h1>
        </div>
        <Link
          to="/upload"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300"
        >
          <Upload size={18} aria-hidden="true" />
          Upload Notes
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {paymentsError && <div className="mt-4"><ErrorMessage>{paymentsError}</ErrorMessage></div>}
      {dashboardError && <div className="mt-4"><ErrorMessage>{dashboardError}</ErrorMessage></div>}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="Notes uploaded" value={myNotes.length} icon={NotebookTabs} />
        <DashboardStat label="Total downloads" value={totals.downloads} icon={Download} />
        <DashboardStat label="Total earnings" value={`Rs. ${totals.earnings.toFixed(0)}`} icon={DollarSign} />
        <DashboardStat
          label={`${totals.ratingCount} ratings received`}
          value={totals.averageRating.toFixed(1)}
          icon={Star}
        />
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-lg border border-line bg-panel p-6">
          <p className="text-sm font-medium uppercase text-mint">Profile</p>
          <div className="mt-5 flex items-center gap-4 rounded-lg border border-line bg-zinc-950/55 p-4">
            <Avatar user={user} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{getUserName(user)}</p>
              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <form className="mt-5 grid gap-3" onSubmit={handleProfileSubmit}>
            <label>
              <span className="mb-2 block text-sm font-medium text-zinc-300">Display name</span>
              <input
                required
                value={profileName}
                onChange={(event) => {
                  setProfileName(event.target.value);
                  setProfileMessage('');
                  setProfileError('');
                }}
                className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white placeholder:text-zinc-500"
                placeholder="Your display name"
              />
            </label>
            {profileMessage && (
              <p className="rounded-lg border border-mint/30 bg-mint/10 px-3 py-2 text-sm text-teal-100">
                {profileMessage}
              </p>
            )}
            {profileError && <ErrorMessage>{profileError}</ErrorMessage>}
            <button
              type="submit"
              disabled={profileBusy}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} aria-hidden="true" />
              {profileBusy ? 'Saving...' : 'Save Profile'}
            </button>
          </form>

          <div className="mt-5 rounded-lg border border-line bg-zinc-950/45 p-4">
            <p className="text-2xl font-semibold text-white">{totals.averageRating.toFixed(1)}</p>
            <p className="mt-1 text-sm text-zinc-500">Total rating received from {totals.ratingCount} ratings</p>
          </div>
        </aside>

        <section className="rounded-lg border border-line bg-panel p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase text-mint">Uploaded notes</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Manage listings</h2>
            </div>
            <p className="text-sm text-zinc-500">{myNotes.length} total</p>
          </div>

          {loading ? (
            <p className="rounded-lg border border-line bg-zinc-950/45 p-4 text-sm text-zinc-400">
              Loading your notes...
            </p>
          ) : myNotes.length > 0 ? (
            <div className="grid gap-4">
              {myNotes.map((note) => {
                const isEditing = editingNoteId === note.id;
                const isBusy = noteBusyId === note.id;

                return (
                  <article key={note.id} className="rounded-lg border border-line bg-zinc-950/45 p-4">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0">
                        <Link to={`/note/${note.id}`} className="text-lg font-semibold text-white transition hover:text-mint">
                          {note.title}
                        </Link>
                        <p className="mt-1 text-sm text-zinc-400">
                          {note.subject} - uploaded {formatDate(note.createdAt)}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300">
                          <span className="rounded-md bg-panel px-2.5 py-1">{Number(note.downloads || 0)} downloads</span>
                          <span className="rounded-md bg-panel px-2.5 py-1">{Number(note.rating || 0).toFixed(1)} avg rating</span>
                          <span className="rounded-md bg-panel px-2.5 py-1">{note.price || 'Free'}</span>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => (isEditing ? setEditingNoteId('') : startEditing(note))}
                          disabled={isBusy}
                          className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white/[0.04] px-3 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-mint/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isEditing ? <X size={16} aria-hidden="true" /> : <Edit3 size={16} aria-hidden="true" />}
                          {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note)}
                          disabled={isBusy}
                          className="inline-flex h-10 items-center gap-2 rounded-lg border border-ember/30 bg-ember/10 px-3 text-sm font-semibold text-amber-100 transition hover:bg-ember/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                          {isBusy ? 'Working...' : 'Delete'}
                        </button>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-5 grid gap-4 border-t border-line pt-5">
                        <label>
                          <span className="mb-2 block text-sm font-medium text-zinc-300">Title</span>
                          <input
                            required
                            value={editForm.title}
                            onChange={(event) => setEditForm((current) => ({ ...current, title: event.target.value }))}
                            className="h-11 w-full rounded-lg border border-line bg-panel px-4 text-sm text-white placeholder:text-zinc-500"
                          />
                        </label>
                        <label>
                          <span className="mb-2 block text-sm font-medium text-zinc-300">Description</span>
                          <textarea
                            required
                            value={editForm.description}
                            onChange={(event) =>
                              setEditForm((current) => ({ ...current, description: event.target.value }))
                            }
                            className="min-h-28 w-full resize-y rounded-lg border border-line bg-panel px-4 py-3 text-sm text-white placeholder:text-zinc-500"
                          />
                        </label>
                        <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
                          <div>
                            <span className="mb-2 block text-sm font-medium text-zinc-300">Price</span>
                            <div className="grid h-11 grid-cols-2 rounded-lg border border-line bg-panel p-1">
                              {['free', 'paid'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setEditForm((current) => ({ ...current, priceType: type }))}
                                  className={`rounded-md text-sm font-semibold capitalize transition ${
                                    editForm.priceType === type
                                      ? 'bg-mint text-ink'
                                      : 'text-zinc-400 hover:text-white'
                                  }`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                          {editForm.priceType === 'paid' && (
                            <label>
                              <span className="mb-2 block text-sm font-medium text-zinc-300">Price amount</span>
                              <input
                                required
                                min="1"
                                step="1"
                                type="number"
                                value={editForm.priceAmount}
                                onChange={(event) =>
                                  setEditForm((current) => ({ ...current, priceAmount: event.target.value }))
                                }
                                className="h-11 w-full rounded-lg border border-line bg-panel px-4 text-sm text-white placeholder:text-zinc-500"
                                placeholder="49"
                              />
                            </label>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveNote(note)}
                          disabled={isBusy}
                          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Save size={17} aria-hidden="true" />
                          {isBusy ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-lg border border-line bg-zinc-950/45 p-4 text-sm text-zinc-400">
              You have not uploaded any notes yet.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
