import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Loader2, LockKeyhole, LogIn, Mail } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import { getAuthErrorMessage } from '../lib/errors.js';

export default function LoginPage() {
  const { user, loading, loginWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleEmailLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setSuccessMessage('');

    try {
      await loginWithEmail(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (authError) {
      console.log('Login auth error:', authError?.code, authError?.message);
      setError(getAuthErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleLogin() {
    setBusy(true);
    setError('');
    setSuccessMessage('');

    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (authError) {
      console.error('Google auth error:', authError?.code, authError?.message, authError);
      setError(getAuthErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Enter your email address above, then click Forgot Password.');
      setSuccessMessage('');
      return;
    }

    setBusy(true);
    setError('');
    setSuccessMessage('');

    try {
      await resetPassword(trimmedEmail);
      setSuccessMessage('Password reset email sent. Check your inbox and spam folder.');
    } catch (authError) {
      console.log('Password reset error:', authError?.code, authError?.message);
      setError(getAuthErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-84px)] items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-2xl shadow-black/50 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-mint/25 bg-mint/10 text-mint">
            <GraduationCap size={28} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">SPPU Notes</h1>
          <p className="mt-1.5 text-sm text-zinc-400">SPPU&apos;s #1 Notes Marketplace</p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-lg border border-mint/35 bg-mint/10 px-4 py-3 text-sm text-mint">
            {successMessage}
          </div>
        )}

        <p className="mb-3 text-center text-xs text-zinc-500">
          Note: Please allow pop-ups for this site to use Google Sign-In.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={busy}
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleLogo />
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">OR</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <LoginField
            icon={Mail}
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="student@example.com"
            autoComplete="email"
            disabled={busy}
          />

          <LoginPasswordField
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            showPassword={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
            disabled={busy}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={busy}
                className="h-4 w-4 rounded border-line bg-zinc-950/55 text-mint focus:ring-mint/40"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={busy}
              className="text-sm font-medium text-mint transition hover:text-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} aria-hidden="true" />
                Login
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            state={location.state}
            className="font-semibold text-mint transition hover:text-teal-300"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function LoginField({ icon: Icon, label, disabled, ...inputProps }) {
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
          disabled={disabled}
          className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
          {...inputProps}
        />
      </span>
    </label>
  );
}

function LoginPasswordField({ label, value, onChange, showPassword, onToggle, disabled }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <span className="relative block">
        <LockKeyhole
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
          aria-hidden="true"
        />
        <input
          required
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter password"
          autoComplete="current-password"
          className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 pl-11 pr-12 text-sm text-white placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </span>
    </label>
  );
}
