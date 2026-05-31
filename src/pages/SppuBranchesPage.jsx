import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  Building2,
  ChevronRight,
  CircuitBoard,
  Code2,
  Cpu,
  Settings,
} from 'lucide-react';

const branches = [
  {
    name: 'Information Technology',
    slug: 'information-technology',
    icon: Code2,
    description: 'Curated notes, labs, PYQs, and practical resources for IT students.',
  },
  {
    name: 'Computer Engineering',
    slug: 'computer-engineering',
    icon: Cpu,
    description: 'Core computer engineering material organized for fast academic browsing.',
  },
  {
    name: 'AIDS',
    slug: 'aids',
    icon: BrainCircuit,
    description: 'Artificial Intelligence and Data Science resources for modern SPPU courses.',
  },
  {
    name: 'ENTC',
    slug: 'entc',
    icon: CircuitBoard,
    description: 'Electronics, communication, signals, and circuit-focused study material.',
  },
  {
    name: 'Mechanical Engineering',
    slug: 'mechanical-engineering',
    icon: Settings,
    description: 'Mechanical systems, design, thermal, and production resources in one place.',
  },
  {
    name: 'Civil Engineering',
    slug: 'civil-engineering',
    icon: Building2,
    description: 'Structural, surveying, environmental, and construction study resources.',
  },
];

export default function SppuBranchesPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-16 pt-10">
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">SPPU</span>
      </nav>

      <section className="mt-8 max-w-3xl">
        <p className="text-[13px] font-medium uppercase tracking-wider text-zinc-400">SPPU Marketplace</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Choose your engineering branch
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
          Start with your branch before exploring notes, PYQs, practical files, and guides from SPPU students.
        </p>
      </section>

      <section className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="SPPU branches">
        {branches.map((branch) => {
          const Icon = branch.icon;

          return (
            <Link
              key={branch.slug}
              to={`/sppu/${branch.slug}`}
              className="group flex min-h-[224px] flex-col rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#6366f1]/70 hover:bg-white/[0.03] hover:shadow-[0_18px_60px_rgba(99,102,241,0.12)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[8px] border border-[#6366f1]/25 bg-[#6366f1]/10 text-[#818cf8] transition group-hover:border-[#6366f1]/45 group-hover:bg-[#6366f1]/15 group-hover:text-[#a5b4fc]">
                <Icon size={22} aria-hidden="true" />
              </span>

              <h2 className="mt-5 text-xl font-semibold leading-snug text-white">{branch.name}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{branch.description}</p>

              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-zinc-300 transition group-hover:text-white">
                View branch
                <ChevronRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
