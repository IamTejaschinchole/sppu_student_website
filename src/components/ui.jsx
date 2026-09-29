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
    <main className="stitch-page mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to marketplace
        </Link>
        <div className="mt-8 inline-flex rounded-md border border-brand-primary/25 bg-brand-primary/10 px-2.5 py-1 text-xs font-medium text-brand-primary">
          {eyebrow}
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-text-primary sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
          Firebase Authentication protects uploads and downloads while Firestore keeps profile and
          note records in sync.
        </p>
      </section>

      <section className="rounded-xl border border-glass glass-strong p-6 shadow-glass-md sm:p-7">
        {children}
        <p className="mt-6 text-center text-sm text-text-secondary">
          {footerText}{' '}
          <Link to={footerTo} state={footerState} className="font-semibold text-brand-primary transition hover:text-brand-cyan">
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
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        size={18}
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-lg border border-glass bg-bg-deep/40 pl-11 pr-4 text-sm text-text-primary"
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
      <p className="mt-1 text-xs text-text-muted">
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
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-glass bg-bg-surface/40 px-3 text-sm font-semibold text-text-primary transition hover:border-brand-primary/50 hover:bg-bg-surface/60 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={17} aria-hidden="true" />
        Previous
      </button>
      <span className="rounded-lg border border-glass bg-bg-surface/40 px-4 py-2 text-sm text-text-secondary">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-glass bg-bg-surface/40 px-3 text-sm font-semibold text-text-primary transition hover:border-brand-primary/50 hover:bg-bg-surface/60 disabled:cursor-not-allowed disabled:opacity-50"
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
      <span className="mb-2 block text-sm font-medium text-text-secondary">{label}</span>
      <span className="relative block">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          size={18}
          aria-hidden="true"
        />
        <input
          required
          className="h-12 w-full rounded-lg border border-glass bg-bg-deep/40 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted"
          {...inputProps}
        />
      </span>
    </label>
  );
}

export function Avatar({ user }) {
  const name = getUserName(user);

  if (user?.photoURL) {
    return <img className="h-9 w-9 rounded-xl object-cover" src={user.photoURL} alt={`${name} avatar`} />;
  }

  return <InitialsAvatar name={name} />;
}

export function InitialsAvatar({ name }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-primary text-sm font-bold text-white">
      {getInitials(name)}
    </span>
  );
}

export function Uploader({ name, avatar }) {
  const displayName = name || 'SPPU Student';

  return (
    <div className="flex min-w-0 items-center gap-2">
      {avatar ? (
        <img className="h-8 w-8 rounded-xl object-cover" src={avatar} alt={`${displayName} avatar`} />
      ) : (
        <InitialsAvatar name={displayName} />
      )}
      <p className="max-w-24 truncate text-xs text-text-muted">by {displayName}</p>
    </div>
  );
}

export function DashboardStat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-glass bg-bg-surface/60 p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">{label}</p>
        <Icon size={18} className="text-brand-cyan" aria-hidden="true" />
      </div>
      <p className="mt-3 text-3xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}

export function ErrorMessage({ children }) {
  return <p className="rounded-xl border border-ember/30 bg-ember/10 px-3 py-2 text-sm text-amber-200">{children}</p>;
}

export function LoadingScreen() {
  return <LoadingPanel label="Checking session..." />;
}

export function LoadingPanel({ label }) {
  return (
    <main className="grid min-h-[calc(100vh-84px)] place-items-center px-5">
      <div className="rounded-xl border border-glass bg-bg-surface/60 px-5 py-4 text-sm text-text-secondary">{label}</div>
    </main>
  );
}

export function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-glass bg-bg-deep/60 backdrop-blur-md shadow-glass-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-glass bg-bg-deep/40 p-10 backdrop-blur-sm">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
      <p className="text-sm text-text-secondary">{label}</p>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-glass bg-bg-deep/40 p-12 text-center backdrop-blur-sm">
      {Icon ? (
        <div className="grid h-14 w-14 place-items-center rounded-xl border border-glass-strong bg-bg-surface/60 text-brand-cyan">
          <Icon size={28} aria-hidden="true" />
        </div>
      ) : null}
      <div>
        <p className="text-base font-semibold text-text-primary">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {action ? action : null}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-ember/30 bg-ember/5 p-12 text-center backdrop-blur-sm">
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-ember/30 bg-ember/10 text-ember">
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </div>
      <div>
        <p className="text-base font-semibold text-text-primary">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-brand-primary/40 bg-brand-primary/10 px-4 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-glass bg-bg-deep/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 px-5 py-8 text-sm text-text-muted sm:flex-row sm:justify-between">
        <p>Faltu Notes &mdash; SPPU student-powered study library</p>
        <p>Powered by Firebase &middot; Built with React + Tailwind</p>
      </div>
    </footer>
  );
}
