import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Download, Search, FileText } from 'lucide-react';
import { getSppuBranch, getSppuSemester } from '../lib/sppu.js';
import { getSppuSubjectsForRoute, slugifyAcademicName } from '../data/sppuSubjects.js';
import { useNotes } from '../hooks/useNotes.js';
import { ErrorMessage, LoadingPanel } from '../components/ui.jsx';

export default function CatalogueDetailPage() {
  const { branchSlug, semesterSlug, subjectSlug, catalogueId } = useParams();
  const branch = getSppuBranch(branchSlug);
  const semester = getSppuSemester(semesterSlug);
  const [search, setSearch] = useState('');
  const { notes, loading, error } = useNotes();

  if (!branch || !semester) {
    return <Navigate to="/sppu" replace />;
  }

  const subject = getSppuSubjectsForRoute(branch.slug, semester.slug).find(
    (subjectName) => slugifyAcademicName(subjectName) === subjectSlug
  );

  if (!subject) {
    return <Navigate to={`/sppu/${branch.slug}/${semester.slug}`} replace />;
  }

  const subjectNotes = useMemo(
    () => notes.filter((note) => note.subject === subject),
    [notes, subject],
  );

  const filteredResources = useMemo(() => {
    const queryText = search.trim().toLowerCase();
    return subjectNotes.filter((note) => {
      const tags = Array.isArray(note.tags) ? note.tags : [];
      return (
        !queryText ||
        note.title?.toLowerCase().includes(queryText) ||
        note.subject?.toLowerCase().includes(queryText) ||
        note.description?.toLowerCase().includes(queryText) ||
        tags.some((tag) => tag.toLowerCase().includes(queryText))
      );
    });
  }, [subjectNotes, search]);

  return (
    <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-text-primary">Home</Link>
        <span className="text-text-secondary">/</span>
        <Link to="/sppu" className="transition hover:text-text-primary">SPPU</Link>
        <span className="text-text-secondary">/</span>
        <Link to={`/sppu/${branch.slug}`} className="transition hover:text-text-primary">{branch.name}</Link>
        <span className="text-text-secondary">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}`} className="transition hover:text-text-primary">{semester.title}</Link>
        <span className="text-text-secondary">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}/${subjectSlug}`} className="transition hover:text-text-primary">{subject}</Link>
        <span className="text-text-secondary">/</span>
        <span className="text-text-primary">Catalogue</span>
      </nav>

      <section className="mt-9 border-b border-glass pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
             <Link
              to={`/sppu/${branch.slug}/${semester.slug}/${subjectSlug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to {subject}
            </Link>

            <h1 className="mt-2 text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
              {subject} Resources
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
              <span className="font-medium text-text-primary">{subjectNotes.length} resources</span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="text-ember" size={15} fill="currentColor" aria-hidden="true" />
                {subjectNotes.length > 0
                  ? (subjectNotes.reduce((s, n) => s + Number(n.rating || 0), 0) / subjectNotes.length).toFixed(1)
                  : '0.0'}
              </span>
              <span>{subjectNotes.reduce((s, n) => s + Number(n.downloads || 0), 0)} total downloads</span>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              Real study resources for {subject} uploaded by SPPU students.
            </p>
          </div>
        </div>
      </section>

<section className="mt-8">
        {error && (
          <div className="mb-6">
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        )}

        {loading ? (
          <LoadingPanel label="Loading resources..." />
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Resources</h2>
                <p className="mt-1 text-sm text-text-muted">Download files for this subject.</p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-glass bg-bg-deep/40 py-2 pl-[38px] pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-primary"
                  placeholder="Search resources..."
                  type="search"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredResources.length > 0 ? (
                filteredResources.map((note) => (
                  <div
                    key={note.id}
                    className="group flex flex-col gap-4 rounded-xl border border-glass bg-bg-surface/60 p-4 transition-all duration-200 hover:border-brand-primary/50 hover:bg-bg-surface/80 hover:shadow-brand-glow sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-bg-deep/40 text-text-muted transition-colors group-hover:bg-brand-primary/10 group-hover:text-brand-primary">
                        <FileText size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-medium text-text-primary">{note.title}</h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
                          <span className="rounded-lg border border-glass bg-bg-deep/40 px-1.5 py-0.5">
                            {note.uploaderName || 'SPPU Student'}
                          </span>
                          <span>{note.downloads || 0} downloads</span>
                          <span>{Number(note.rating || 0).toFixed(1)} rating</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/note/${note.id}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow sm:w-auto"
                    >
                      <Download size={16} aria-hidden="true" />
                      View Resource
                    </Link>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-glass bg-bg-surface/40 p-8 text-center">
                  <p className="text-text-secondary">
                    {search
                      ? `No resources found matching "${search}".`
                      : `No resources uploaded for ${subject} yet.`}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
