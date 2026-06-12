'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f7f4ef',
    fontFamily: "'DM Sans', sans-serif",
    color: '#1a1a18',
    display: 'flex',
    flexDirection: 'column',
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
    flex: 1,
    padding: '2rem',
  },
  card: {
    background: 'white',
    border: '1.5px solid #e8e3da',
    borderRadius: 20,
    padding: '3rem',
    width: '100%',
    maxWidth: '480px',
  },
  progress: {
    display: 'flex',
    gap: 6,
    marginBottom: '2rem',
  },
  progressDot: {
    height: 4,
    flex: 1,
    borderRadius: 100,
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
    fontSize: 28,
    fontWeight: 400,
    color: '#1a1a18',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#5a5a55',
    fontWeight: 300,
    lineHeight: 1.6,
    marginBottom: '2rem',
  },
  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: '2rem',
  },
  option: {
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid #e8e3da',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    transition: 'all 0.2s',
    background: 'white',
    color: '#1a1a18',
  },
  optionSelected: {
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid #4a7c6f',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    background: '#e8f0ee',
    color: '#2d6b5a',
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
  textarea: {
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
    minHeight: '120px',
    resize: 'vertical',
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
    letterSpacing: '0.2px',
  },
  skipButton: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#9a9a94',
    borderRadius: 100,
    border: 'none',
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    marginTop: '8px',
  },
  sageMessage: {
    background: '#e8f0ee',
    borderRadius: 16,
    padding: '1.5rem',
    marginBottom: '2rem',
    fontSize: 16,
    color: '#2d6b5a',
    fontStyle: 'italic',
    lineHeight: 1.7,
    fontFamily: "'Playfair Display', serif",
  },
  footer: {
    marginTop: '2rem',
    fontSize: 13,
    color: '#9a9a94',
    fontStyle: 'italic',
    textAlign: 'center',
  },
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [partnerName, setPartnerName] = useState('Sage')
  const [customName, setCustomName] = useState('')
  const [useCustomName, setUseCustomName] = useState(false)
  const [partnerStyle, setPartnerStyle] = useState('')
  const [supportNeed, setSupportNeed] = useState('')
  const [userIntro, setUserIntro] = useState('')
  const [loading, setLoading] = useState(false)

  const finalName = useCustomName && customName.trim() ? customName.trim() : 'Sage'

  const saveAndContinue = async () => {
    if (step < 5) {
      setStep(step + 1)
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from('partner_profile').insert({
        user_id: user.id,
        partner_name: finalName,
        partner_style: partnerStyle,
        support_need: supportNeed,
        user_intro: userIntro,
      })
    }

    window.location.href = '/app'
  }

  const totalSteps = 5

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

          {/* Progress bar */}
          <div style={styles.progress}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.progressDot,
                  background: i < step ? '#4a7c6f' : '#e8e3da',
                }}
              />
            ))}
          </div>

          {/* Step 1 — Meet Sage */}
          {step === 1 && (
            <>
              <div style={styles.badge}>Your clarity partner</div>
              <h1 style={styles.title}>Meet Sage</h1>
              <p style={styles.subtitle}>
                Sage is your personal clarity partner — here to listen, help you make sense of things, and grow with you over time.
              </p>
              <p style={styles.subtitle}>
                Would you like to keep the name Sage, or choose your own?
              </p>

              <div style={styles.optionGrid}>
                <div
                  style={useCustomName ? styles.option : styles.optionSelected}
                  onClick={() => setUseCustomName(false)}
                >
                  Keep "Sage"
                </div>
                <div
                  style={useCustomName ? styles.optionSelected : styles.option}
                  onClick={() => setUseCustomName(true)}
                >
                  Choose my own
                </div>
              </div>

              {useCustomName && (
                <input
                  type="text"
                  placeholder="Name your clarity partner"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  style={styles.input}
                />
              )}

              <button onClick={() => setStep(2)} style={styles.button}>
                Continue →
              </button>
            </>
          )}

          {/* Step 2 — Partner style */}
          {step === 2 && (
            <>
              <div style={styles.badge}>How {finalName} shows up</div>
              <h1 style={styles.title}>How would you like {finalName} to be with you?</h1>
              <p style={styles.subtitle}>
                Choose the style that feels most natural to you.
              </p>

              <div style={styles.optionGrid}>
                {['Gentle & nurturing', 'Calm & grounding', 'Direct & honest', 'Curious & exploratory'].map(option => (
                  <div
                    key={option}
                    style={partnerStyle === option ? styles.optionSelected : styles.option}
                    onClick={() => setPartnerStyle(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <button
                onClick={() => partnerStyle && setStep(3)}
                style={{ ...styles.button, opacity: partnerStyle ? 1 : 0.5 }}
              >
                Continue →
              </button>
            </>
          )}

          {/* Step 3 — Support need */}
          {step === 3 && (
            <>
              <div style={styles.badge}>What you need</div>
              <h1 style={styles.title}>When things feel heavy, what helps you most?</h1>
              <p style={styles.subtitle}>
                {finalName} will remember this and show up accordingly.
              </p>

              <div style={styles.optionGrid}>
                {['Just listen', 'Help me make sense of things', 'Challenge me gently', 'Help me take action'].map(option => (
                  <div
                    key={option}
                    style={supportNeed === option ? styles.optionSelected : styles.option}
                    onClick={() => setSupportNeed(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <button
                onClick={() => supportNeed && setStep(4)}
                style={{ ...styles.button, opacity: supportNeed ? 1 : 0.5 }}
              >
                Continue →
              </button>
            </>
          )}

          {/* Step 4 — User intro */}
          {step === 4 && (
            <>
              <div style={styles.badge}>A little about you</div>
              <h1 style={styles.title}>Is there anything you'd like {finalName} to know before you begin?</h1>
              <p style={styles.subtitle}>
                This is optional — but anything you share helps {finalName} understand you better from the start.
              </p>

              <textarea
                placeholder="Share whatever feels right..."
                value={userIntro}
                onChange={e => setUserIntro(e.target.value)}
                style={styles.textarea}
              />

              <button onClick={() => setStep(5)} style={styles.button}>
                Continue →
              </button>
              <button onClick={() => setStep(5)} style={styles.skipButton}>
                Skip for now
              </button>
            </>
          )}

          {/* Step 5 — Sage introduces itself */}
          {step === 5 && (
            <>
              <div style={styles.badge}>You're all set</div>
              <h1 style={styles.title}>{finalName} is ready for you</h1>

              <div style={styles.sageMessage}>
                "Hello. I'm {finalName}, and I'm here for you — whenever you need to think something through, find clarity, or just feel heard. There's no rush. Whenever you're ready, I'm listening."
              </div>

              <p style={styles.subtitle}>
                Your clarity partner will remember your conversations and grow with you over time.
              </p>

              <button onClick={saveAndContinue} style={styles.button} disabled={loading}>
                {loading ? 'Just a moment...' : 'Begin →'}
              </button>
            </>
          )}

        </div>
        <p style={styles.footer}>The answer was always in you.</p>
      </div>
    </div>
  )
}