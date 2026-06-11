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
      else window.location.href = '/'
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Account created! You can now sign in.')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>
        {isLogin ? 'Welcome back' : 'Create your account'}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleAuth}
        disabled={loading}
        style={{ width: '100%', padding: '12px', background: '#000', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
      </button>

      {message && <p style={{ marginTop: '12px', color: 'red' }}>{message}</p>}

      <p style={{ marginTop: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </p>
    </div>
  )
}