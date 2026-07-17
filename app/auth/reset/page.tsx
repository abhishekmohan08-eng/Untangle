'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Supabase puts the token in the URL hash — this confirms the session
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsReady(true)
      }
    })
  }, [])

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setIsError(true)
      setMessage('Passwords don\'t match.')
      return
    }
    if (password.length < 6) {
      setIsError(true)
      setMessage('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setIsError(true)
      setMessage(error.message)
    } else {
      setIsError(false)
      setMessage('Password updated. Taking you home...')
      setTimeout(() => {
        window.location.href = '/app'
      }, 2000)
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <a href="/" style={styles.brand}>
          <div style={styles.brandDot} />
          <span style={styles.brandName}>Untangle</span>
        </a>
      </nav>

      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.badge}>Reset your password</div>
          <h1 style={styles.title}>Choose a new password</h1>
          <p style={styles.subtitle}>
            {isReady
              ? 'Enter your new password below.'
              : 'Checking your reset link...'}
          </p>

          {isReady && (
            <>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
              <button
                onClick={handleReset}
                disabled={loading}
                style={styles.button}
              >
                {loading ? 'Updating...' : 'Update password →'}
              </button>
            </>
          )}

          {message && (
            <p style={{ ...styles.message, color: isError ? '#c4875a' : '#4a7c6f' }}>
              {message}
            </p>
          )}
        </div>
        <p style={styles.footer}>The answer was always in you.</p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f7f4ef', fontFamily: "'DM Sans', sans-serif", color: '#1a1a18' },
  nav: { borderBottom: '1px solid #e8e3da', padding: '1rem 2rem' },
  brand: { display: 'inline-flex', alignItems: 'baseline', gap: 8, textDecoration: 'none' },
  brandDot: { width: 7, height: 7, borderRadius: '50%', background: '#4a7c6f', marginBottom: 3 },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: '#1a1a18', letterSpacing: -0.5 },
  wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: '2rem' },
  card: { background: 'white', border: '1.5px solid #e8e3da', borderRadius: 20, padding: '3rem', width: '100%', maxWidth: '440px' },
  badge: { display: 'inline-block', background: '#e8f0ee', color: '#2d6b5a', fontSize: 11, fontWeight: 500, padding: '5px 12px', borderRadius: 100, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '1.25rem' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: '#1a1a18', marginBottom: '0.5rem', lineHeight: 1.2 },
  subtitle: { fontSize: 15, color: '#5a5a55', fontWeight: 300, lineHeight: 1.6, marginBottom: '2rem' },
  input: { width: '100%', padding: '14px 16px', marginBottom: '12px', borderRadius: 10, border: '1.5px solid #e8e3da', fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: '#f7f4ef', color: '#1a1a18', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', background: '#4a7c6f', color: 'white', borderRadius: 100, border: 'none', fontSize: 15, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', marginTop: '4px', letterSpacing: '0.2px' },
  message: { marginTop: '1rem', fontSize: 14, textAlign: 'center' },
  footer: { marginTop: '2rem', fontSize: 13, color: '#9a9a94', fontStyle: 'italic' },
}