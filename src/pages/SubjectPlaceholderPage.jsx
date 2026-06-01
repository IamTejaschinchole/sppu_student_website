import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, FileText, Library, FileQuestion, BookOpen } from 'lucide-react';
import { getSppuBranch, getSppuSemester } from '../lib/sppu.js';
import { getSppuSubjectsForRoute, slugifyAcademicName } from '../data/sppuSubjects.js';

const mockCatalogues = [
  {
    id: 'complete-notes-pack',
    title: 'Complete Notes Pack',
    resources: '12 Resources',
    rating: '4.9',
    creator: 'Tejas Chinchole',
    icon: BookOpen,
  },
  {
    id: 'pyq-collection',
    title: 'PYQ Collection (2019-2023)',
    resources: '15 Resources',
    rating: '4.8',
    creator: 'Rahul Sharma',
    icon: FileQuestion,
  },
  {
    id: 'assignment-collection',
    title: 'Assignment Solutions',
    resources: '8 Resources',
    rating: '4.7',
    creator: 'Aman Patel',
    icon: FileText,
  },
  {
    id: 'lab-resources',
    title: 'Complete Lab Manual',
    resources: '10 Resources',
    rating: '4.8',
    creator: 'Priya Singh',
    icon: Library,
  },
];

export default function SubjectPlaceholderPage() {
  const { branchSlug, semesterSlug, subjectSlug } = useParams();
  const branch = getSppuBranch(branchSlug);
  const semester = getSppuSemester(semesterSlug);

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

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-16 pt-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">Home</Link>
        <span className="text-zinc-700">/</span>
        <Link to="/sppu" className="transition hover:text-white">SPPU</Link>
        <span className="text-zinc-700">/</span>
        <Link to={`/sppu/${branch.slug}`} className="transition hover:text-white">{branch.name}</Link>
        <span className="text-zinc-700">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}`} className="transition hover:text-white">{semester.title}</Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">{subject}</span>
      </nav>

      <section className="mt-9 border-b border-[rgba(255,255,255,0.06)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Link 
              to={`/sppu/${branch.slug}/${semester.slug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Subjects
            </Link>
            <p className="mt-2 text-[13px] font-medium uppercase tracking-wider text-zinc-400">Subject Marketplace</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {subject}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Browse top-rated catalogues, notes, and resources for this subject curated by top students.
            </p>
          </div>

          <div className="grid max-w-sm grid-cols-2 gap-3 text-left">
             <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Total Resources</p>
              <p className="mt-1 text-lg font-semibold text-white">45+</p>
            </div>
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Catalogues</p>
              <p className="mt-1 text-lg font-semibold text-white">{mockCatalogues.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">Featured Catalogues</h2>
            <p className="mt-1 text-sm text-zinc-500">Highly rated resource collections for {subject}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {mockCatalogues.map((catalogue) => {
            const Icon = catalogue.icon;
            return (
              <article
                key={catalogue.id}
                className="flex h-[200px] flex-col rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-5 transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.025]"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-medium text-zinc-500">{catalogue.creator}</p>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] bg-[#6366f1]/10 text-[#818cf8]">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{catalogue.title}</h3>

                <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="text-ember" size={15} fill="currentColor" aria-hidden="true" />
                    {catalogue.rating}
                  </span>
                  <span>{catalogue.resources}</span>
                </div>

                <Link
                  to={`/sppu/${branch.slug}/${semester.slug}/${subjectSlug}/${catalogue.id}`}
                  className="mt-auto inline-flex h-10 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.08)] px-4 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-[#6366f1]/70 hover:bg-white/[0.04]"
                >
                  View Catalogue
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
