import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../data/mockData';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === AUTH.email && password === AUTH.password) {
        sessionStorage.setItem('coadmin_auth', 'true');
        navigate('/');
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)', fontFamily: 'var(--font)'
    }}>
      <div style={{
        background: 'var(--card)', borderRadius: 20, padding: '40px 36px',
        width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: '#3b82f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 auto 12px'
          }}>CA</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>CoAdmin</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Sign in to your account</div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca',
            borderRadius: 8, padding: '10px 14px', fontSize: 12, marginBottom: 16, fontWeight: 600
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="form-grp" style={{ marginBottom: 14 }}>
            <label className="form-lbl">Email Address</label>
            <input
              className="form-inp"
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-grp" style={{ marginBottom: 20 }}>
            <label className="form-lbl">Password</label>
            <input
              className="form-inp"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="save-btn"
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? '⏳ Signing in...' : '🔐 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--muted)' }}>
          Demo: admin@gmail.com / admin123
        </div>
      </div>
    </div>
  );
}