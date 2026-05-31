import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3 } from 'lucide-react';

const branchNames = {
  'information-technology': 'Information Technology',
  'computer-engineering': 'Computer Engineering',
  aids: 'AIDS',
  entc: 'ENTC',
  'mechanical-engineering': 'Mechanical Engineering',
  'civil-engineering': 'Civil Engineering',
};

export default function BranchPlaceholderPage() {
  const { branchSlug } = useParams();
  const branchName = branchNames[branchSlug];

  if (!branchName) {
    return <Navigate to="/sppu" replace />;
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-16 pt-10">
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link to="/sppu" className="transition hover:text-white">
          SPPU
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">{branchName}</span>
      </nav>

      <section className="mt-8 rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-[8px] border border-[#6366f1]/25 bg-[#6366f1]/10 text-[#818cf8]">
          <Clock3 size={23} aria-hidden="true" />
        </div>
        <p className="mt-6 text-[13px] font-medium uppercase tracking-wider text-zinc-400">Branch Selected</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">{branchName}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          This branch page is ready for future resource browsing. Semester selection and branch-specific content will be added later.
        </p>
        <Link
          to="/sppu"
          className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-[6px] border border-[rgba(255,255,255,0.08)] px-4 text-sm font-medium text-zinc-200 transition hover:border-[#6366f1]/70 hover:bg-white/[0.04]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to branches
        </Link>
      </section>
    </main>
  );
}
