import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, Star, User } from 'lucide-react';
import { usePublicProfile } from '../hooks/usePublicProfile.js';
import { useContributorNotes } from '../hooks/useContributorNotes.js';
import { Avatar, ErrorMessage, LoadingScreen } from '../components/ui.jsx';
import { formatDate, getNotePriceAmount, isFreeNote } from '../lib/utils.js';

export default function ContributorProfilePage() {
  const { uid } = useParams();
  const { profile, loading: profileLoading, error: profileError } = usePublicProfile(uid);
  const { notes, loading: notesLoading, error: notesError } = useContributorNotes(uid);

  if (profileLoading || notesLoading) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <main className="stitch-page mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <ErrorMessage>Contributor profile not found.</ErrorMessage>
      </main>
    );
  }

  const stats = {
    totalNotes: notes.length,
    totalDownloads: notes.reduce((sum, note) => sum + Number(note.downloads || 0), 0),
    avgRating: notes.length > 0 
      ? (notes.reduce((sum, note) => sum + Number(note.rating || 0) * Number(note.ratingCount || 0), 0) / 
         notes.reduce((sum, note) => sum + Number(note.ratingCount || 0), 0)).toFixed(1)
      : '0.0',
    totalRatings: notes.reduce((sum, note) => sum + Number(note.ratingCount || 0), 0),
  };

  return (
    <main className="stitch-page mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to marketplace
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase text-text-secondary">Contributor Profile</p>
          <h1 className="mt-2 text-4xl font-bold text-text-primary">{profile.displayName || 'Student'}</h1>
          {profile.bio && (
            <p className="mt-3 text-base text-text-secondary max-w-2xl">{profile.bio}</p>
          )}
        </div>
      </div>

      {profileError && <ErrorMessage>{profileError}</ErrorMessage>}
      {notesError && <div className="mt-4"><ErrorMessage>{notesError}</ErrorMessage></div>}

      <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-glass bg-bg-surface/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">Resources</p>
            <User size={18} className="text-brand-primary" aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{stats.totalNotes}</p>
        </div>
        <div className="rounded-xl border border-glass bg-bg-surface/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">Downloads</p>
            <Download size={18} className="text-brand-cyan" aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{stats.totalDownloads}</p>
        </div>
        <div className="rounded-xl border border-glass bg-bg-surface/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">Rating</p>
            <Star size={18} className="text-brand-violet" aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{stats.avgRating}</p>
          <p className="text-sm text-text-muted">{stats.totalRatings} ratings</p>
        </div>
        <div className="rounded-xl border border-glass bg-bg-surface/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">Joined</p>
            <Calendar size={18} className="text-brand-primary" aria-hidden="true" />
          </div>
          <p className="text-lg font-semibold text-text-primary">{formatDate(profile.createdAt)}</p>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Uploaded Resources</h2>
          <p className="mt-1 text-sm text-text-secondary">Study materials shared by this contributor</p>
        </div>

        {notes.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => (
              <article
                key={note.id}
                className="flex flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 transition-all duration-200 hover:border-brand-primary/50 hover:shadow-brand-glow hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <Avatar user={{ displayName: profile.displayName, photoURL: profile.photoURL }} />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary leading-snug">{note.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {note.subject} &middot; Semester {note.semester}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="text-brand-cyan" size={16} fill="currentColor" aria-hidden="true" />
                    {Number(note.rating || 0).toFixed(1)}
                  </span>
                  <span>{note.downloads || 0} downloads</span>
                  <span className="rounded-lg border border-glass bg-bg-surface/40 px-2.5 py-1 text-xs font-medium text-text-primary">
                    {note.price || 'Free'}
                  </span>
                </div>

                <Link
                  to={`/note/${note.id}`}
                  className="mt-auto inline-flex h-11 items-center justify-center rounded-lg border border-glass bg-bg-surface/40 px-4 text-sm font-medium text-text-primary transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/60"
                >
                  View Resource
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-glass bg-bg-surface/40 p-12 text-center">
            <p className="text-text-secondary">No resources uploaded yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
