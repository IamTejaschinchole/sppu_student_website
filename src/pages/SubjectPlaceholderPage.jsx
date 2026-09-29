import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { getSppuBranch, getSppuSemester } from '../lib/sppu.js';
import { getSppuSubjectsForRoute, slugifyAcademicName } from '../data/sppuSubjects.js';
import { useNotes } from '../hooks/useNotes.js';
import { getSubjectCounts } from '../lib/utils.js';
import { ErrorMessage, LoadingPanel } from '../components/ui.jsx';
import { BookmarkButton } from '../components/BookmarkButton.jsx';

export default function SubjectPlaceholderPage() {
  const { branchSlug, semesterSlug, subjectSlug } = useParams();
  const branch = getSppuBranch(branchSlug);
  const semester = getSppuSemester(semesterSlug);
  const { notes, loading, error } = useNotes();

  if (!branch) {
    return <Navigate to="/sppu" replace />;
  }

  if (!semester) {
    return <Navigate to={`/sppu/${branch.slug}`} replace />;
  }

  const subject = getSppuSubjectsForRoute(branch.slug, semester.slug).find(
    (subjectName) => slugifyAcademicName(subjectName) === subjectSlug,
  );

  if (!subject) {
    return <Navigate to={`/sppu/${branch.slug}/${semester.slug}`} replace />;
  }

  const subjectNotes = useMemo(
    () => notes.filter((note) => note.subject === subject),
    [notes, subject],
  );

  if (loading) {
    return <LoadingPanel label="Loading subject resources..." />;
  }

  if (error) {
    return (
      <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] py-10">
        <ErrorMessage>{error}</ErrorMessage>
      </main>
    );
  }

  return (
    <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] pb-16 pt-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-text-primary">Home</Link>
        <span className="text-text-secondary">/</span>
        <Link to="/sppu" className="transition hover:text-text-primary">SPPU</Link>
        <span className="text-text-secondary">/</span>
        <Link to={`/sppu/${branch.slug}`} className="transition hover:text-text-primary">{branch.name}</Link>
        <span className="text-text-secondary">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}`} className="transition hover:text-text-primary">{semester.title}</Link>
        <span className="text-text-secondary">/</span>
        <span className="text-text-primary">{subject}</span>
      </nav>

      <section className="mt-9 border-b border-glass pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Link
              to={`/sppu/${branch.slug}/${semester.slug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Subjects
            </Link>
            <p className="mt-2 text-[13px] font-medium uppercase tracking-wider text-text-secondary">Subject Marketplace</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight text-text-primary sm:text-5xl">
              {subject}
            </h1>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Notes, PYQs, and study resources for {subject} uploaded by SPPU students.
            </p>
          </div>

          <div className="grid max-w-sm grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Total Resources</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{subjectNotes.length}</p>
            </div>
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Contributors</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">
                {new Set(subjectNotes.map((n) => n.uploadedBy)).size}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wider text-text-secondary">Resources</h2>
            <p className="mt-1 text-sm text-text-muted">
              Real notes and study materials for {subject}
            </p>
          </div>
        </div>

        {subjectNotes.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {subjectNotes.map((note) => (
              <article
                key={note.id}
                className="flex h-[200px] flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/80 hover:shadow-brand-glow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-text-muted">
                      {note.uploaderName || 'SPPU Student'}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-text-primary">{note.title}</h3>
                  </div>
                  <BookmarkButton noteId={note.id} className="border-glass bg-bg-deep/40" />
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-brand-cyan">
                      {Number(note.rating || 0).toFixed(1)}
                    </span>
                    ({note.ratingCount || 0} ratings)
                  </span>
                  <span>{note.downloads || 0} downloads</span>
                </div>

                <Link
                  to={`/note/${note.id}`}
                  className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-glass bg-bg-surface/40 px-4 text-sm font-medium text-text-primary transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/60"
                >
                  View Resource
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-glass bg-bg-surface/40 p-12 text-center backdrop-blur-sm">
            <p className="text-text-secondary">
              No resources uploaded for {subject} yet. Be the first to upload!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
