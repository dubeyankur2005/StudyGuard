import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck, FiLock, FiMail, FiShield, FiUser } from "react-icons/fi";
import { useAuth } from "./authContext";
import "./AuthPages.css";

export function AuthPage({ register = false }) {
  const { user, authenticate, loading } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && user) return <Navigate to="/" replace />;

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    if (register && values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      setBusy(false);
      return;
    }
    delete values.confirmPassword;
    try {
      await authenticate(register ? "register" : "login", values);
      navigate(location.state?.from || "/", { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || "Unable to authenticate. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-orb auth-orb-teal" aria-hidden="true" />
      <div className="auth-orb auth-orb-violet" aria-hidden="true" />
      <section className="auth-card" aria-labelledby="auth-title">
        <Link className="auth-brand" to="/login" aria-label="StudyGuard home">
          <span className="auth-brand-mark"><FiShield aria-hidden="true" /></span>
          <span>Study<span>Guard</span></span>
        </Link>

        <div className="auth-intro">
          <span className="auth-eyebrow"><span className="auth-eyebrow-dot" /> YOUR FOCUS, PROTECTED</span>
          <h1 id="auth-title">{register ? "Build better study habits." : "Welcome back."}</h1>
          <p>{register ? "Create your account and make every study session count." : "Sign in to pick up where your focus left off."}</p>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {register && <div className="auth-field">
            <label htmlFor="auth-name">Full name</label>
            <div className="auth-input-wrap"><FiUser aria-hidden="true" /><input id="auth-name" name="name" type="text" placeholder="Your name" autoComplete="name" required minLength="1" maxLength="80" /></div>
          </div>}
          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <div className="auth-input-wrap"><FiMail aria-hidden="true" /><input id="auth-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength="254" /></div>
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-input-wrap"><FiLock aria-hidden="true" /><input id="auth-password" name="password" type="password" placeholder={register ? "At least 8 characters" : "Enter your password"} autoComplete={register ? "new-password" : "current-password"} required minLength={register ? 8 : 1} maxLength="128" /></div>
          </div>
          {register && <div className="auth-field">
            <label htmlFor="auth-confirm-password">Confirm password</label>
            <div className="auth-input-wrap"><FiLock aria-hidden="true" /><input id="auth-confirm-password" name="confirmPassword" type="password" placeholder="Re-enter your password" autoComplete="new-password" required minLength="8" maxLength="128" /></div>
          </div>}

          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>
            <span>{busy ? "Please wait…" : register ? "Create account" : "Sign in"}</span>
            {!busy && <FiArrowRight aria-hidden="true" />}
            {busy && <span className="auth-spinner" aria-hidden="true" />}
          </button>
        </form>

        <div className="auth-assurance"><FiCheck aria-hidden="true" /><span>Your data stays private and secure</span></div>
        <p className="auth-switch">{register ? "Already have an account? " : "New to StudyGuard? "}<Link to={register ? "/login" : "/register"}>{register ? "Sign in" : "Create an account"}</Link></p>
      </section>
      <p className="auth-footer">Stay focused. Make progress. <span>One session at a time.</span></p>
    </main>
  );
}

export function ProtectedRoute({ children }) {
  const { user, loading, sessionError, retrySession, logout } = useAuth();
  const location = useLocation();
  if (sessionError && !loading) return (
    <main className="session-check" role="alert">
      <h1>We couldn't verify your session</h1>
      <p>Your saved sign-in is still available. Check your connection and retry.</p>
      <button type="button" onClick={retrySession}>Retry session check</button>
      <button className="session-check-secondary" type="button" onClick={logout}>Sign in again</button>
    </main>
  );
  if (loading) return <p role="status">Checking your session…</p>;
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
