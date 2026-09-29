import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { getSppuBranch, getSppuSemester } from '../lib/sppu.js';
import { getSppuSubjectsForRoute, slugifyAcademicName } from '../data/sppuSubjects.js';
import { useNotes } from '../hooks/useNotes.js';

function SubjectCard({ branchSlug, semesterSlug, subject, noteCount }) {
  return (
    <Link
      to={`/sppu/${branchSlug}/${semesterSlug}/${slugifyAcademicName(subject)}`}
      className="group flex h-full min-h-[200px] flex-col rounded-xl border border-glass bg-bg-surface/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/50 hover:bg-bg-surface/80 hover:shadow-brand-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary transition group-hover:border-brand-primary/45 group-hover:bg-brand-primary/15 group-hover:text-brand-cyan">
          <FileText size={24} aria-hidden="true" />
        </span>
        <span className="rounded-lg border border-glass bg-bg-deep/40 px-3 py-1.5 text-[12px] font-medium text-text-muted">
          Subject
        </span>
      </div>

      <h2 className="mt-6 text-xl font-semibold leading-snug text-text-primary">{subject}</h2>

      <div className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-text-secondary transition group-hover:text-text-primary">
        Explore subject
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export default function SubjectMarketplacePage() {
  const { branchSlug, semesterSlug } = useParams();
  const branch = getSppuBranch(branchSlug);
  const semester = getSppuSemester(semesterSlug);
  const { notes } = useNotes();

  if (!branch) {
    return <Navigate to="/sppu" replace />;
  }

  if (!semester) {
    return <Navigate to={`/sppu/${branch.slug}`} replace />;
  }

  const subjects = getSppuSubjectsForRoute(branch.slug, semester.slug);

  const subjectNoteCounts = useMemo(() => {
    const counts = {};
    subjects.forEach(subject => {
      counts[subject] = notes.filter(note => note.subject === subject).length;
    });
    return counts;
  }, [notes, subjects]);

  const totalResources = Object.values(subjectNoteCounts).reduce((sum, count) => sum + count, 0);

  return (
    <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-12">
      <nav className="flex items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-text-primary">
          Home
        </Link>
        <span className="text-text-muted">/</span>
        <Link to="/sppu" className="transition hover:text-text-primary">
          SPPU
        </Link>
        <span className="text-text-muted">/</span>
        <Link to={`/sppu/${branch.slug}`} className="transition hover:text-text-primary">
          {branch.name}
        </Link>
        <span className="text-text-muted">/</span>
        <span className="text-text-primary">{semester.title}</span>
      </nav>

      <section className="mt-10 border-b border-glass pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">Subject Marketplace</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
              {branch.name} - {semester.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Browse subject-wise study resources, PYQs, lab manuals, and catalogues for this academic term.
            </p>
          </div>

          <div className="grid max-w-sm grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Subjects</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{subjects.length}</p>
            </div>
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Resources</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{totalResources}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="subject-grid-title">
        <div className="mb-6">
          <h2 id="subject-grid-title" className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">
            Choose Subject
          </h2>
          <p className="mt-2 text-sm text-text-muted">Open a subject workspace when resources are ready.</p>
        </div>

        {subjects.length > 0 ? (
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject}
                branchSlug={branch.slug}
                semesterSlug={semester.slug}
                subject={subject}
                noteCount={subjectNoteCounts[subject] || 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-glass bg-bg-surface/40 p-8 text-sm text-text-secondary">
            No subjects configured for this semester yet.
          </div>
        )}
      </section>
    </main>
  );
}
