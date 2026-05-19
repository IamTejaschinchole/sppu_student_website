import { Loader2 } from 'lucide-react';

export default function RouteSpinner({ label = 'Loading page...' }) {
  return (
    <main className="grid min-h-[calc(100vh-84px)] place-items-center px-5">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-panel px-6 py-5">
        <Loader2 className="animate-spin text-mint" size={28} aria-hidden="true" />
        <p className="text-sm text-zinc-300">{label}</p>
      </div>
    </main>
  );
}
