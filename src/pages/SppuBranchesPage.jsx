import { useMemo } from 'react';
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
import { useNotes } from '../hooks/useNotes.js';

const branchIcons = {
  'first-year-engineering': GraduationCap,
  'information-technology': Code2,
  'computer-engineering': Cpu,
  aids: BrainCircuit,
  entc: CircuitBoard,
  'mechanical-engineering': Settings,
  'civil-engineering': Building2,
};

function BranchCard({ branch, noteCount, highlight = false }) {
  const Icon = branchIcons[branch.slug] || Code2;

  return (
    <Link
      to={`/sppu/${branch.slug}`}
      className={`group flex h-full min-h-[300px] flex-col rounded-xl border bg-bg-surface/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/50 hover:bg-bg-surface/80 hover:shadow-brand-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${
        highlight
          ? 'border-brand-primary/30 bg-gradient-to-b from-brand-primary/5 to-bg-surface/60'
          : 'border-glass'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary transition group-hover:border-brand-primary/45 group-hover:bg-brand-primary/15 group-hover:text-brand-cyan">
          <Icon size={24} aria-hidden="true" />
        </span>
        {highlight && (
          <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[12px] font-medium text-emerald-200">
            {branch.activeNote}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-xl font-semibold leading-snug text-text-primary">{branch.name}</h3>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{branch.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-glass bg-bg-deep/40 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Resources</p>
          <p className="mt-1 text-lg font-semibold text-text-primary">{noteCount}</p>
        </div>
        <div className="rounded-lg border border-glass bg-bg-deep/40 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Semesters</p>
          <p className="mt-1 text-lg font-semibold text-text-primary">8</p>
        </div>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-text-secondary transition group-hover:text-text-primary">
        Explore branch
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function SppuBranchesPage() {
  const { notes } = useNotes();

  const branchNoteCounts = useMemo(() => {
    const counts = {};
    sppuBranches.forEach(branch => {
      counts[branch.slug] = notes.filter(note => {
        const tags = Array.isArray(note.tags) ? note.tags : [];
        return tags.includes(branch.slug);
      }).length;
    });
    return counts;
  }, [notes]);

  const totalResources = Object.values(branchNoteCounts).reduce((sum, count) => sum + count, 0);

  return (
    <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-12">
      <nav className="flex items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-text-primary">
          Home
        </Link>
        <span className="text-text-muted">/</span>
        <span className="text-text-primary">SPPU</span>
      </nav>

      <section className="mt-10 border-b border-glass pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">SPPU Marketplace</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-text-primary sm:text-5xl">SPPU Engineering</h1>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Browse study resources, PYQs, lab manuals and catalogues organized by branch.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3 text-left">
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Branches</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{sppuBranches.length}</p>
            </div>
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Semesters</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">8</p>
            </div>
            <div className="rounded-xl border border-glass bg-bg-surface/40 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Resources</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{totalResources}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="all-branches-title">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="all-branches-title" className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">
              Browse Branches
            </h2>
            <p className="mt-2 text-sm text-text-muted">Choose a department to view its branch workspace.</p>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sppuBranches.map((branch) => (
            <BranchCard key={branch.slug} branch={branch} noteCount={branchNoteCounts[branch.slug] || 0} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-glass pt-10" aria-labelledby="active-branches-title">
        <div className="mb-6">
          <h2 id="active-branches-title" className="text-[14px] font-semibold uppercase tracking-wider text-text-secondary">
            Most Active Branches
          </h2>
          <p className="mt-2 text-sm text-text-muted">Frequently updated collections with strong student activity.</p>
        </div>

        <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
          {mostActiveSppuBranches.map((branch) => (
            <BranchCard key={branch.slug} branch={branch} noteCount={branchNoteCounts[branch.slug] || 0} highlight />
          ))}
        </div>
      </section>
    </main>
  );
}
