import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CircuitBoard,
  Code2,
  Cpu,
  GraduationCap,
  Settings,
} from 'lucide-react';
import { mostActiveSppuBranches, sppuBranches } from '../lib/sppu.js';

const branchIcons = {
  'first-year-engineering': GraduationCap,
  'information-technology': Code2,
  'computer-engineering': Cpu,
  aids: BrainCircuit,
  entc: CircuitBoard,
  'mechanical-engineering': Settings,
  'civil-engineering': Building2,
};

function BranchCard({ branch, highlight = false }) {
  const Icon = branchIcons[branch.slug] || Code2;

  return (
    <Link
      to={`/sppu/${branch.slug}`}
      className={`group flex h-full min-h-[286px] flex-col rounded-[8px] border bg-[#141414] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#6366f1]/70 hover:bg-white/[0.03] hover:shadow-[0_18px_60px_rgba(99,102,241,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${
        highlight
          ? 'border-[#6366f1]/30 bg-[linear-gradient(180deg,rgba(99,102,241,0.08),rgba(20,20,20,1)_48%)]'
          : 'border-[rgba(255,255,255,0.06)]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-[#6366f1]/25 bg-[#6366f1]/10 text-[#818cf8] transition group-hover:border-[#6366f1]/45 group-hover:bg-[#6366f1]/15 group-hover:text-[#a5b4fc]">
          <Icon size={22} aria-hidden="true" />
        </span>
        {highlight && (
          <span className="rounded-[6px] border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
            {branch.activeNote}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-snug text-white">{branch.name}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{branch.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Catalogues</p>
          <p className="mt-1 text-base font-semibold text-zinc-100">{branch.catalogues}</p>
        </div>
        <div className="rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Resources</p>
          <p className="mt-1 text-base font-semibold text-zinc-100">{branch.resources}</p>
        </div>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-zinc-200 transition group-hover:text-white">
        Explore branch
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function SppuBranchesPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-10">
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">SPPU</span>
      </nav>

      <section className="mt-9 border-b border-[rgba(255,255,255,0.06)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">SPPU Marketplace</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight text-white sm:text-5xl">SPPU Engineering</h1>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Browse study resources, PYQs, lab manuals and catalogues organized by branch.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3 text-left">
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Branches</p>
              <p className="mt-1 text-lg font-semibold text-white">{sppuBranches.length}</p>
            </div>
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Catalogues</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {sppuBranches.reduce((total, branch) => total + branch.catalogues, 0)}
              </p>
            </div>
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-white/[0.025] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Resources</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {sppuBranches.reduce((total, branch) => total + branch.resources, 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="all-branches-title">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="all-branches-title" className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">
              Browse Branches
            </h2>
            <p className="mt-1 text-sm text-zinc-500">Choose a department to view its branch workspace.</p>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sppuBranches.map((branch) => (
            <BranchCard key={branch.slug} branch={branch} />
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8" aria-labelledby="active-branches-title">
        <div className="mb-5">
          <h2 id="active-branches-title" className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">
            Most Active Branches
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Frequently updated collections with strong student activity.</p>
        </div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          {mostActiveSppuBranches.map((branch) => (
            <BranchCard key={branch.slug} branch={branch} highlight />
          ))}
        </div>
      </section>
    </main>
  );
}
