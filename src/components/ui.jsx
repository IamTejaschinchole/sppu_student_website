import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
} from 'lucide-react';
import { getInitials, getUserName } from '../lib/utils.js';

export function AuthLayout({ eyebrow, title, children, footerText, footerLinkText, footerTo, footerState }) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to marketplace
        </Link>
        <div className="mt-8 inline-flex rounded-md border border-mint/35 bg-mint/10 px-2.5 py-1 text-xs font-medium text-mint">
          {eyebrow}
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
          Firebase Authentication protects uploads and downloads while Firestore keeps profile and
          note records in sync.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-panel p-6 shadow-glow sm:p-7">
        {children}
        <p className="mt-6 text-center text-sm text-zinc-400">
          {footerText}{' '}
          <Link to={footerTo} state={footerState} className="font-semibold text-mint transition hover:text-teal-300">
            {footerLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
}

export function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <Filter
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        size={18}
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-lg border border-line bg-panel pl-11 pr-4 text-sm text-white"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function RatingControl({ value, count, disabled, onRate }) {
  function handleRate(star) {
    if (!disabled) {
      onRate(star);
    }
  }

  function handleTouchEnd(event, star) {
    event.preventDefault();
    handleRate(star);
  }

  return (
    <div>
      <div className="flex items-center gap-1" aria-label={`${value} star rating`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => handleRate(star)}
            onTouchEnd={(event) => handleTouchEnd(event, star)}
            className="rounded-md p-1 text-ember transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={18}
              fill={star <= Math.round(value) ? 'currentColor' : 'none'}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        {Number(value || 0).toFixed(1)} - {count} ratings
      </p>
    </div>
  );
}

export function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white/[0.04] px-3 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-mint/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={17} aria-hidden="true" />
        Previous
      </button>
      <span className="rounded-lg border border-line bg-panel px-4 py-2 text-sm text-zinc-300">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white/[0.04] px-3 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-mint/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

export function Field({ icon: Icon, label, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <span className="relative block">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
          aria-hidden="true"
        />
        <input
          required
          className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500"
          {...inputProps}
        />
      </span>
    </label>
  );
}

export function Avatar({ user }) {
  const name = getUserName(user);

  if (user?.photoURL) {
    return <img className="h-9 w-9 rounded-lg object-cover" src={user.photoURL} alt={`${name} avatar`} />;
  }

  return <InitialsAvatar name={name} />;
}

export function InitialsAvatar({ name }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint text-sm font-bold text-ink">
      {getInitials(name)}
    </span>
  );
}

export function Uploader({ name, avatar }) {
  const displayName = name || 'SPPU Student';

  return (
    <div className="flex min-w-0 items-center gap-2">
      {avatar ? (
        <img className="h-8 w-8 rounded-lg object-cover" src={avatar} alt={`${displayName} avatar`} />
      ) : (
        <InitialsAvatar name={displayName} />
      )}
      <p className="max-w-24 truncate text-xs text-zinc-500">by {displayName}</p>
    </div>
  );
}

export function DashboardStat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">{label}</p>
        <Icon size={18} className="text-mint" aria-hidden="true" />
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function ErrorMessage({ children }) {
  return <p className="rounded-lg border border-ember/30 bg-ember/10 px-3 py-2 text-sm text-amber-200">{children}</p>;
}

export function LoadingScreen() {
  return <LoadingPanel label="Checking session..." />;
}

export function LoadingPanel({ label }) {
  return (
    <main className="grid min-h-[calc(100vh-84px)] place-items-center px-5">
      <div className="rounded-lg border border-line bg-panel px-5 py-4 text-sm text-zinc-300">{label}</div>
    </main>
  );
}
