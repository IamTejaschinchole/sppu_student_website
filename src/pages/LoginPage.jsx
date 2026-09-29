import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, GraduationCap, Loader2, LockKeyhole, LogIn, Mail, ShieldCheck, UserPlus, Zap } from 'lucide-react';
import loginBackground from '../assets/stitch/login-background.jpg';
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

  if (!loading && user) return <Navigate to={from} replace />;

  async function handleEmailLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setSuccessMessage('');
    try {
      await loginWithEmail(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (authError) {
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
      setError(getAuthErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0e17] px-4 py-10 text-slate-200 sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(10,14,23,.65),rgba(15,19,28,.85)), url(${loginBackground})`, backgroundAttachment: 'fixed', backgroundPosition: 'center center' }} />
      <div className="pointer-events-none absolute -left-24 top-8 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-[600px] overflow-hidden rounded-2xl border border-cyan-200/15 bg-[rgba(26,38,64,.76)] p-6 shadow-[0_24px_64px_-12px_rgba(0,0,0,.75)] backdrop-blur-2xl sm:p-8"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
        <div className="relative mb-7 text-center"><div className="relative mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-800/80 text-cyan-300 shadow-[0_0_30px_rgba(76,215,246,.24)]"><div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-blue-500/15 to-violet-400/25 blur-md" /><GraduationCap size={30} className="relative" /></div><h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl">Faltu Notes</h1><p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-300"><ShieldCheck size={15} className="text-cyan-300" /> SPPU Academic Vault · Savitribai Phule Pune University</p></div>
        <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-950/70 p-1"><span className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-3 text-sm font-semibold text-slate-100"><LogIn size={16} className="text-cyan-300" /> Log In</span><Link to="/register" state={location.state} className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-slate-100"><UserPlus size={16} className="text-violet-300" /> Create Account</Link></div>

        {error && <div role="alert" className="mb-5 rounded-xl border border-red-400/35 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        {successMessage && <div className="mb-5 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-200">{successMessage}</div>}

        <form className="space-y-5" onSubmit={handleEmailLogin}><LoginField icon={Mail} label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="student@example.com" autoComplete="email" disabled={busy} /><LoginPasswordField value={password} onChange={(event) => setPassword(event.target.value)} showPassword={showPassword} onToggle={() => setShowPassword((current) => !current)} disabled={busy} /><div className="flex flex-wrap items-center justify-between gap-3"><label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} disabled={busy} className="h-4 w-4 rounded border-white/20 bg-slate-950/40 text-blue-500 focus:ring-cyan-300/40" /> Keep me signed in</label><button type="button" onClick={handleForgotPassword} disabled={busy} className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 disabled:opacity-60">Forgot password?</button></div><button type="submit" disabled={busy} className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 text-base font-bold text-slate-950 shadow-[0_0_24px_rgba(76,215,246,.22)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">{busy ? <><Loader2 size={19} className="animate-spin" /> Signing in...</> : <>Log in to Faltu Notes <Zap size={18} /></>}</button></form>

        <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-white/10" /><span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">or continue with</span><span className="h-px flex-1 bg-white/10" /></div><button type="button" onClick={handleGoogleLogin} disabled={busy} className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"><GoogleLogo /> Google sign-in</button><p className="mt-6 text-center text-xs leading-5 text-slate-500">Your account and Faltu Notes access remain protected by Firebase Authentication.</p><Link to="/" className="mx-auto mt-5 flex w-fit items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-300">Return to marketplace <ArrowRight size={14} /></Link>
      </section>
    </main>
  );
}

function LoginField({ icon: Icon, label, disabled, ...inputProps }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span><span className="relative block"><Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required disabled={disabled} className="h-13 w-full rounded-xl border border-white/10 bg-slate-950/65 px-4 pl-11 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15 disabled:opacity-60" {...inputProps} /></span></label>; }

function LoginPasswordField({ value, onChange, showPassword, onToggle, disabled }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-200">Password</span><span className="relative block"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} disabled={disabled} placeholder="Enter password" autoComplete="current-password" className="h-13 w-full rounded-xl border border-white/10 bg-slate-950/65 px-4 pl-11 pr-12 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15 disabled:opacity-60" /><button type="button" onClick={onToggle} disabled={disabled} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-cyan-300 disabled:opacity-60" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>; }

function GoogleLogo() { return <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>; }
