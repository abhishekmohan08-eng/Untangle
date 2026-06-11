'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/app'
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Account created! You can now sign in.')
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>

      {/* Nav */}
      <nav style={styles.nav}>
        <a href="/" style={styles.brand}>
          <div style={styles.brandDot} />
          <span style={styles.brandName}>Untangle</span>
        </a>
      </nav>

      {/* Card */}
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.badge}>Your clarity partner awaits</div>
          <h1 style={styles.title}>
            {isLogin ? 'Welcome back' : 'Begin your journey'}
          </h1>
          <p style={styles.subtitle}>
            {isLogin
              ? 'Your clarity partner has been keeping your story safe.'
              : 'Create your account and meet your clarity partner.'}
          </p>

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Just a moment...' : isLogin ? 'Sign In →' : 'Create Account →'}
          </button>

          {message && (
            <p style={styles.message}>{message}</p>
          )}

          <p style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </p>
        </div>

        <p style={styles.footer}>The answer was always in you.</p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f7f4ef',
    fontFamily: "'DM Sans', sans-serif",
    color: '#1a1a18',
  },
  nav: {
    borderBottom: '1px solid #e8e3da',
    padding: '1rem 2rem',
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 8,
    textDecoration: 'none',
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#4a7c6f',
    marginBottom: 3,
  },
  brandName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 400,
    color: '#1a1a18',
    letterSpacing: -0.5,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: '2rem',
  },
  card: {
    background: 'white',
    border: '1.5px solid #e8e3da',
    borderRadius: 20,
    padding: '3rem',
    width: '100%',
    maxWidth: '440px',
  },
  badge: {
    display: 'inline-block',
    background: '#e8f0ee',
    color: '#2d6b5a',
    fontSize: 11,
    fontWeight: 500,
    padding: '5px 12px',
    borderRadius: 100,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '1.25rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 400,
    color: '#1a1a18',
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 15,
    color: '#5a5a55',
    fontWeight: 300,
    lineHeight: 1.6,
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '12px',
    borderRadius: 10,
    border: '1.5px solid #e8e3da',
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    background: '#f7f4ef',
    color: '#1a1a18',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#4a7c6f',
    color: 'white',
    borderRadius: 100,
    border: 'none',
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    marginTop: '4px',
    letterSpacing: '0.2px',
  },
  message: {
    marginTop: '1rem',
    fontSize: 14,
    color: '#c4875a',
    textAlign: 'center',
  },
  toggle: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: 14,
    color: '#4a7c6f',
    cursor: 'pointer',
    fontWeight: 500,
  },
  footer: {
    marginTop: '2rem',
    fontSize: 13,
    color: '#9a9a94',
    fontStyle: 'italic',
  },
}