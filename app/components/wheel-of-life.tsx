'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Area = {
  key: string
  label: string
}

const AREAS: Area[] = [
  { key: 'career', label: 'Career' },
  { key: 'money', label: 'Money' },
  { key: 'health', label: 'Health' },
  { key: 'relationships', label: 'Relationships' },
  { key: 'growth', label: 'Growth' },
  { key: 'fun', label: 'Fun' },
  { key: 'environment', label: 'Environment' },
  { key: 'purpose', label: 'Purpose' },
]

const CX = 170
const CY = 170
const MAX_R = 130

function polar(index: number, total: number, r: number): [number, number] {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)]
}

interface WheelOfLifeProps {
  sessionId?: string
  initialScores?: Record<string, number>
  onComplete?: (scores: Record<string, number>) => void
}

export default function WheelOfLife({ sessionId, initialScores, onComplete }: WheelOfLifeProps) {
  const [scores, setScores] = useState<Record<string, number>>(
    initialScores ?? Object.fromEntries(AREAS.map(a => [a.key, 6]))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const updateScore = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('life_wheel_entries').insert({
          user_id: user.id,
          session_id: sessionId ?? null,
          scores,
        })
      }
      setSaved(true)
      onComplete?.(scores)
    } catch (err) {
      console.error('Failed to save wheel of life entry', err)
    } finally {
      setSaving(false)
    }
  }

  const polygonPoints = AREAS.map((a, i) =>
    polar(i, AREAS.length, (MAX_R / 10) * scores[a.key]).join(',')
  ).join(' ')

  return (
    <div style={styles.wrapper}>
      <div style={styles.badge}>Wheel of life</div>
      <h2 style={styles.title}>Where does life feel out of balance?</h2>
      <p style={styles.subtitle}>
        Rate each area from 1 (needs attention) to 10 (thriving). There&apos;s no right answer — just where things stand today.
      </p>

      <div style={styles.content}>
        <div style={styles.wheelBox}>
          <svg viewBox="0 0 340 340" width="100%" height="100%" role="img" aria-label="Wheel of life chart">
            <g>
              {[1, 2, 3, 4, 5].map(ring => {
                const r = (MAX_R / 5) * ring
                const pts = AREAS.map((_, i) => polar(i, AREAS.length, r).join(',')).join(' ')
                return <polygon key={ring} points={pts} fill="none" stroke="#e8e3da" strokeWidth={1} />
              })}
            </g>
            <g>
              {AREAS.map((_, i) => {
                const [x, y] = polar(i, AREAS.length, MAX_R)
                return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#e8e3da" strokeWidth={1} />
              })}
            </g>
            <polygon points={polygonPoints} fill="rgba(74,124,111,0.15)" stroke="#4a7c6f" strokeWidth={2} />
            {AREAS.map((a, i) => {
              const [px, py] = polar(i, AREAS.length, (MAX_R / 10) * scores[a.key])
              const [lx, ly] = polar(i, AREAS.length, MAX_R + 24)
              return (
                <g key={a.key}>
                  <circle cx={px} cy={py} r={4} fill="#4a7c6f" />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={12}
                    fontFamily="'DM Sans', sans-serif"
                    fill="#5a5a55"
                  >
                    {a.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div style={styles.sliders}>
          {AREAS.map(a => (
            <div key={a.key} style={styles.sliderRow}>
              <label style={styles.sliderLabel}>{a.label}</label>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={scores[a.key]}
                onChange={e => updateScore(a.key, Number(e.target.value))}
                style={styles.range}
              />
              <span style={styles.sliderValue}>{scores[a.key]}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} style={styles.button}>
        {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save my wheel →'}
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: 'white',
    border: '1.5px solid #e8e3da',
    borderRadius: 20,
    padding: '2.5rem',
    fontFamily: "'DM Sans', sans-serif",
    color: '#1a1a18',
    maxWidth: 720,
    margin: '0 auto',
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
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 14,
    color: '#5a5a55',
    fontWeight: 300,
    lineHeight: 1.6,
    marginBottom: '2rem',
    maxWidth: 480,
  },
  content: {
    display: 'flex',
    gap: '2.5rem',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  wheelBox: {
    flex: '0 0 auto',
    width: 300,
    maxWidth: '100%',
  },
  sliders: {
    flex: '1 1 260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: 240,
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sliderLabel: {
    fontSize: 13,
    color: '#5a5a55',
    width: 100,
    flexShrink: 0,
  },
  range: {
    flex: 1,
    accentColor: '#4a7c6f',
  },
  sliderValue: {
    fontSize: 13,
    fontWeight: 500,
    minWidth: 18,
    textAlign: 'right',
  },
  button: {
    marginTop: '2rem',
    padding: '14px 28px',
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
}