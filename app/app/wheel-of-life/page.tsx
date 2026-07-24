'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import WheelOfLife from '@/app/components/wheel-of-life'

function WheelOfLifePageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId') ?? undefined

  const handleComplete = (scores: Record<string, number>) => {
    setTimeout(() => {
      router.push('/app')
    }, 1200)
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
        <WheelOfLife sessionId={sessionId} onComplete={handleComplete} />
        <a href="/app" style={styles.skipLink}>
          Skip for now →
        </a>
      </div>
    </div>
  )
}

export default function WheelOfLifePage() {
  return (
    <Suspense fallback={null}>
      <WheelOfLifePageInner />
    </Suspense>
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
    padding: '3rem 1.5rem',
    gap: '1.5rem',
  },
  skipLink: {
    fontSize: 13,
    color: '#9a9a94',
    textDecoration: 'none',
  },
}