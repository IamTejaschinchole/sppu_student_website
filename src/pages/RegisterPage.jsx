import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, UserPlus } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import { getAuthErrorMessage } from '../lib/errors.js';
import { AuthLayout, ErrorMessage, Field } from '../components/ui.jsx';

export default function RegisterPage() {
  const { user, loading, registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleRegister(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await registerWithEmail(name, email, password);
      navigate(from, { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Register to start sharing notes"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerTo="/login"
      footerState={location.state}
    >
      <form className="space-y-4" onSubmit={handleRegister}>
        <Field
          icon={UserPlus}
          label="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          icon={Mail}
          label="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="student@example.com"
          autoComplete="email"
        />
        <Field
          icon={LockKeyhole}
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlus size={18} aria-hidden="true" />
          {busy ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </AuthLayout>
  );
}
