"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface PartnerProfile {
  partner_name: string;
}

interface Session {
  id: string;
  signal: string;
  closing_thread: string;
  created_at: string;
}

export default function HomePage() {
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth'
        return
      }

      const { data: profileData } = await supabase
        .from('partner_profile')
        .select('partner_name')
        .eq('user_id', user.id)
        .single()

      if (!profileData) {
        window.location.href = '/onboarding'
        return
      }

      setPartner(profileData)

      const { data: sessionData } = await supabase
        .from('sessions')
        .select('id, signal, closing_thread, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (sessionData) setSessions(sessionData)
      setLoading(false)
    }
    loadData()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  function timeAgo(dateStr: string) {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  const partnerName = partner?.partner_name || "Sage"
  const visibleSessions = showAll ? sessions : sessions.slice(0, 3)

  if (loading) return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.loadingText}>...</p>
      </div>
    </div>
  )

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.brandDot} />
            <span style={styles.brandName}>Untangle</span>
          </div>
          <button onClick={handleSignOut} style={styles.signOutBtn}>Sign out</button>
        </div>

        {/* Greeting */}
        <div style={styles.greetingSection}>
          <p style={styles.partnerLabel}>with {partnerName}</p>
          <h1 style={styles.greeting}>
            {sessions.length === 0
              ? `${partnerName} is here whenever you're ready.`
              : sessions.length === 1
              ? `Good to have you back. Your first session is saved.`
              : `Good to have you back. You've had ${sessions.length} sessions together.`}
          </h1>
          {sessions.length > 0 && (
            <p style={styles.lastSession}>
              Last time you were working through: {sessions[0].signal?.split(',')[0]?.toLowerCase() || "something important"}.
            </p>
          )}
        </div>

        {/* Start new session */}
        <button
          style={styles.newSessionBtn}
          onClick={() => window.location.href = '/session'}
        >
          Begin a new session →
        </button>

        {/* Session history */}
        {sessions.length > 0 && (
          <div style={styles.historySection}>
            <p style={styles.historyLabel}>Your journey with {partnerName}</p>
            <div style={styles.sessionList}>
              {visibleSessions.map((session) => (
                <div key={session.id} style={styles.sessionCard}>
                  <div style={styles.sessionMeta}>{timeAgo(session.created_at)}</div>
                  <div style={styles.sessionSignal}>
                    {session.signal?.split(',')[0] || "A clarity session"}
                  </div>
                  {session.closing_thread && (
                    <div style={styles.sessionThread}>
                      First step: {session.closing_thread}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {sessions.length > 3 && (
              <button
                style={styles.viewAllBtn}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show less" : `View all ${sessions.length} sessions`}
              </button>
            )}
          </div>
        )}

        <p style={styles.footer}>The answer was always in you.</p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f7f4ef", fontFamily: "DM Sans, sans-serif", color: "#1a1a18" },
  container: { maxWidth: 680, margin: "0 auto", padding: "3rem 2rem 5rem" },
  loadingText: { color: "#9a9a94", fontSize: 14, marginTop: "40vh", textAlign: "center" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" },
  brand: { display: "flex", alignItems: "baseline", gap: 8 },
  brandDot: { width: 7, height: 7, borderRadius: "50%", background: "#4a7c6f", marginBottom: 3 },
  brandName: { fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 400, color: "#1a1a18", letterSpacing: -0.5 },
  signOutBtn: { background: "none", border: "none", fontSize: 12, color: "#9a9a94", cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  greetingSection: { marginBottom: "2.5rem" },
  partnerLabel: { fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#4a7c6f", marginBottom: "0.75rem" },
  greeting: { fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#1a1a18", marginBottom: "1rem" },
  lastSession: { fontSize: 15, color: "#5a5a55", fontWeight: 300, lineHeight: 1.6 },
  newSessionBtn: { display: "inline-flex", alignItems: "center", padding: "16px 32px", background: "#4a7c6f", color: "white", borderRadius: 100, border: "none", fontSize: 16, fontWeight: 500, fontFamily: "DM Sans, sans-serif", cursor: "pointer", letterSpacing: "0.2px", marginBottom: "3rem" },
  historySection: { borderTop: "1px solid #e8e3da", paddingTop: "2rem" },
  historyLabel: { fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#9a9a94", marginBottom: "1.5rem" },
  sessionList: { display: "flex", flexDirection: "column", gap: 12 },
  sessionCard: { background: "white", border: "1.5px solid #e8e3da", borderRadius: 16, padding: "1.25rem 1.5rem" },
  sessionMeta: { fontSize: 11, color: "#9a9a94", fontWeight: 400, marginBottom: 6, letterSpacing: "0.3px" },
  sessionSignal: { fontSize: 15, fontWeight: 500, color: "#1a1a18", marginBottom: 4 },
  sessionThread: { fontSize: 13, color: "#5a5a55", fontWeight: 300, fontStyle: "italic" },
  viewAllBtn: { background: "none", border: "none", fontSize: 13, color: "#4a7c6f", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 500, marginTop: "1rem", padding: 0 },
  footer: { marginTop: "3rem", fontSize: 13, color: "#9a9a94", fontStyle: "italic", textAlign: "center" },
}