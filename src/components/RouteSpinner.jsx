import { Loader2 } from 'lucide-react';

export default function RouteSpinner({ label = 'Loading page...' }) {
  return (
    <main className="grid min-h-[calc(100vh-84px)] place-items-center px-5">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-glass glass-strong px-6 py-5">
        <Loader2 className="animate-spin text-brand-cyan" size={28} aria-hidden="true" />
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </main>
  );
}
