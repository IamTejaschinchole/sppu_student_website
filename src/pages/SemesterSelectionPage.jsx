import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getSppuBranch, getSppuSemesters } from '../lib/sppu.js';

function SemesterCard({ branchSlug, semester }) {
  return (
    <Link
      to={`/sppu/${branchSlug}/${semester.slug}`}
      className="group flex h-full min-h-[210px] flex-col rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#6366f1]/70 hover:bg-white/[0.03] hover:shadow-[0_18px_60px_rgba(99,102,241,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-[#6366f1]/25 bg-[#6366f1]/10 text-[#818cf8] transition group-hover:border-[#6366f1]/45 group-hover:bg-[#6366f1]/15 group-hover:text-[#a5b4fc]">
          <BookOpen size={21} aria-hidden="true" />
        </span>
        <span className="rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] px-2.5 py-1 text-[11px] font-medium text-zinc-400">
          SPPU
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold leading-snug text-white">{semester.title}</h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Subjects</p>
          <p className="mt-1 text-base font-semibold text-zinc-100">{semester.subjects}</p>
        </div>
        <div className="rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Catalogues</p>
          <p className="mt-1 text-base font-semibold text-zinc-100">{semester.catalogues}</p>
        </div>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-zinc-200 transition group-hover:text-white">
        Explore semester
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function SemesterSelectionPage() {
  const { branchSlug } = useParams();
  const branch = getSppuBranch(branchSlug);

  if (!branch) {
    return <Navigate to="/sppu" replace />;
  }

  const semesters = getSppuSemesters(branch.slug);
  const totalSubjects = semesters.reduce((total, semester) => total + semester.subjects, 0);
  const totalCatalogues = semesters.reduce((total, semester) => total + semester.catalogues, 0);

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-10">
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link to="/sppu" className="transition hover:text-white">
          SPPU
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">{branch.name}</span>
      </nav>

      <section className="mt-9 border-b border-[rgba(255,255,255,0.06)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">Branch Workspace</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight text-white sm:text-5xl">{branch.name}</h1>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Choose a semester to browse branch-specific resources, PYQs, lab manuals, and catalogues.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3 text-left">
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Semesters</p>
              <p className="mt-1 text-lg font-semibold text-white">{semesters.length}</p>
            </div>
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Subjects</p>
              <p className="mt-1 text-lg font-semibold text-white">{totalSubjects}</p>
            </div>
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Catalogues</p>
              <p className="mt-1 text-lg font-semibold text-white">{totalCatalogues}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="semester-grid-title">
        <div className="mb-5">
          <h2 id="semester-grid-title" className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">
            Choose Semester
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Move from branch selection into the right academic term.</p>
        </div>

        {semesters.length > 0 ? (
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {semesters.map((semester) => (
              <SemesterCard key={semester.slug} branchSlug={branch.slug} semester={semester} />
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 text-sm text-zinc-400">
            No semesters configured for this branch yet.
          </div>
        )}
      </section>
    </main>
  );
}
