"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.brand}>
            <div style={styles.brandDot} />
            <span style={styles.brandName}>Untangle</span>
          </div>
          <Link href="/auth" style={styles.navCta}>
            Meet your clarity partner →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={{
          ...styles.heroInner,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "2rem" : "4rem",
        }}>
          <div style={{ flex: 1 }}>
            <div style={styles.badge}>Your personal clarity partner</div>
            <h1 style={{
              ...styles.heroTitle,
              fontSize: isMobile ? "36px" : "52px",
            }}>
              Not another app.<br />
              <em style={styles.heroEm}>Someone who listens,<br />remembers, and helps you<br />find clarity.</em>
            </h1>
            <p style={styles.heroSub}>
              Untangle is your personal clarity partner — a safe space to think out loud, find what actually matters, and come back to whenever you need it.
            </p>
            <Link href="/auth" style={styles.heroCta}>
              Meet your clarity partner →
            </Link>
            <p style={styles.heroNote}>Free. Always. No subscriptions.</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={styles.heroCard}>
              <div style={styles.cardPartner}>Your clarity partner, Sage</div>
              <p style={styles.cardMessage}>
                &ldquo;There&apos;s a lot weighing on you right now — the work pressure, the conversation you keep putting off, and underneath it all, something quieter about whether you&apos;re on the right path. I can hear all of it.&rdquo;
              </p>
              <div style={styles.divider} />
              <div style={styles.cardLabel}>Last time you were working through</div>
              <div style={styles.tagRow}>
                <span style={styles.tagSignal}>Career direction</span>
                <span style={styles.tagSignal}>Family time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={styles.testimonialSection}>
        <div style={styles.sectionInner}>
          <blockquote style={{
            ...styles.quote,
            fontSize: isMobile ? "20px" : "28px",
          }}>
            &ldquo;I loved how it filtered the noise and guided me to focus on the one thing that needed my attention. It felt like talking to someone who actually heard me.&rdquo;
          </blockquote>
          <p style={styles.quoteAuthor}>— Priya</p>
        </div>
      </section>

      {/* How it works */}
      <section style={styles.section}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...styles.sectionEyebrow, textAlign: "center" }}>How it works</p>
          <h2 style={{
            ...styles.sectionTitle,
            fontSize: isMobile ? "30px" : "42px",
            textAlign: "center",
          }}>
            A clarity partner who<br />
            <em style={styles.heroEm}>actually remembers you.</em>
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: isMobile ? "1.5rem" : "2rem",
          }}>
            {[
              { step: "01", title: "Say everything", desc: "Pour it all out with no filters and no judgement. Your clarity partner listens first — and reflects back what it actually heard." },
              { step: "02", title: "Find what matters", desc: "Together you separate the real concerns from the noise. The thing that's actually weighing on you becomes clear." },
              { step: "03", title: "Leave clearer", desc: "Walk away with your top priority, a first step, and a closing thought. Your partner saves it all and picks up the thread next time." },
            ].map((item, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNumber}>{item.step}</div>
                <h3 style={styles.stepTitle}>{item.title}</h3>
                <p style={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Untangle */}
      <section style={styles.whySection}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...styles.sectionEyebrow, textAlign: "center" }}>Why Untangle</p>
          <h2 style={{
            ...styles.sectionTitle,
            fontSize: isMobile ? "30px" : "42px",
            textAlign: "center",
          }}>
            Most people don&apos;t lack information.<br />
            <em style={styles.heroEm}>They lack someone safe to think with.</em>
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "1.5rem" : "2rem",
            maxWidth: 800,
            margin: "0 auto",
          }}>
            {[
              { title: "Always available", desc: "Morning, lunch, 2am — whenever the mind needs a moment. No appointment, no waiting." },
              { title: "Remembers your journey", desc: "Your clarity partner holds your story. Every session builds on the last." },
              { title: "Never judges", desc: "No opinions, no agenda, no getting tired of your problems. Just a safe space to think." },
              { title: "Built by a coach", desc: "Every response is shaped by real coaching methodology — not generic AI wellness advice." },
            ].map((item, i) => (
              <div key={i} style={styles.whyCard}>
                <h3 style={styles.whyTitle}>{item.title}</h3>
                <p style={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach section */}
      <section style={styles.coachSection}>
        <div style={{
          ...styles.coachInner,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "2rem" : "4rem",
        }}>
          <div style={{
            borderRadius: 20,
            overflow: "hidden",
            aspectRatio: isMobile ? "1" : "3/4",
            width: isMobile ? "100%" : "360px",
            maxWidth: isMobile ? "360px" : "360px",
            flexShrink: 0,
          }}>
            <img src="/abhi.PNG" alt="Abhi Mohan" style={styles.photo} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={styles.sectionEyebrow}>The coach behind Untangle</p>
            <h2 style={{ ...styles.coachName, fontSize: isMobile ? "28px" : "36px" }}>Abhi Mohan</h2>
            <a href="https://www.jayshettycoaching.com/coaches/abhishek-mohan" target="_blank" rel="noopener noreferrer" style={styles.coachCred}>Jay Shetty Certification School Certified Life Coach</a>
            <p style={styles.coachBio}>
              &ldquo;Everyone deserves a clarity partner. Not just people who can afford coaching, or who know the right people. Everyone. I built Untangle because that safe space — where you can say everything and someone actually hears you — shouldn&apos;t be a privilege. It should be available to anyone, anytime they need it.&rdquo;
            </p>
            <p style={styles.coachMission}>
              Clarity is something everyone deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ ...styles.ctaSection, padding: isMobile ? "4rem 2rem" : "6rem 2rem" }}>
        <div style={styles.sectionInner}>
          <h2 style={{
            ...styles.ctaTitle,
            fontSize: isMobile ? "36px" : "48px",
          }}>
            You deserve someone<br />
            <em style={styles.heroEm}>in your corner.</em>
          </h2>
          <p style={styles.ctaSub}>Meet your clarity partner. Free, always. No subscriptions, no catch.</p>
          <Link href="/auth" style={styles.heroCta}>
            Meet your clarity partner →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{
          ...styles.footerInner,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1rem" : "0",
          textAlign: isMobile ? "center" : "left",
        }}>
          <div style={styles.brand}>
            <div style={styles.brandDot} />
            <span style={styles.brandName}>Untangle</span>
          </div>
          <p style={styles.footerTag}>Clarity is something everyone deserves.</p>
        </div>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f7f4ef", fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" },
  nav: { borderBottom: "1px solid #e8e3da", background: "#f7f4ef", position: "sticky", top: 0, zIndex: 100 },
  navInner: { maxWidth: 1100, margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "baseline", gap: 8 },
  brandDot: { width: 7, height: 7, borderRadius: "50%", background: "#4a7c6f", marginBottom: 3 },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: "#1a1a18", letterSpacing: -0.5 },
  navCta: { padding: "10px 22px", background: "#4a7c6f", color: "white", borderRadius: 100, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, textDecoration: "none", letterSpacing: "0.2px" },
  hero: { padding: "5rem 2rem" },
  heroInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center" },
  badge: { display: "inline-block", background: "#e8f0ee", color: "#2d6b5a", fontSize: 12, fontWeight: 500, padding: "6px 14px", borderRadius: 100, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "1.5rem" },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1.2, marginBottom: "1.5rem", color: "#1a1a18" },
  heroEm: { fontStyle: "italic", color: "#4a7c6f" },
  heroSub: { fontSize: 18, color: "#5a5a55", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem", maxWidth: 460 },
  heroCta: { display: "inline-flex", alignItems: "center", padding: "16px 32px", background: "#4a7c6f", color: "white", borderRadius: 100, fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, textDecoration: "none", letterSpacing: "0.2px" },
  heroNote: { fontSize: 13, color: "#9a9a94", marginTop: "1rem" },
  heroCard: { background: "white", border: "1.5px solid #e8e3da", borderRadius: 20, padding: "2rem" },
  cardPartner: { fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#4a7c6f", marginBottom: 12 },
  cardMessage: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontStyle: "italic", lineHeight: 1.7, color: "#1a1a18", marginBottom: 16 },
  cardLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9a9a94", marginBottom: 12 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tagSignal: { padding: "6px 14px", borderRadius: 100, fontSize: 13, background: "#e8f0ee", color: "#2d6b5a" },
  tagNoise: { padding: "6px 14px", borderRadius: 100, fontSize: 13, background: "#fdf3ec", color: "#8f5a30" },
  divider: { border: "none", borderTop: "1px solid #e8e3da", margin: "1rem 0" },
  testimonialSection: { background: "#4a7c6f", padding: "4rem 2rem", textAlign: "center" },
  sectionInner: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  quote: { fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: "italic", color: "white", lineHeight: 1.5, margin: "0 0 1rem" },
  quoteAuthor: { color: "#8fb5ac", fontSize: 14, fontWeight: 300 },
  section: { padding: "6rem 2rem" },
  whySection: { padding: "6rem 2rem", background: "white", borderTop: "1px solid #e8e3da", borderBottom: "1px solid #e8e3da" },
  sectionEyebrow: { fontSize: 11, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#4a7c6f", marginBottom: "1rem" },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1.3, marginBottom: "3rem", color: "#1a1a18" },
  stepCard: { background: "white", border: "1.5px solid #e8e3da", borderRadius: 16, padding: "2rem" },
  stepNumber: { fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#e8e3da", fontWeight: 400, marginBottom: "1rem" },
  stepTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#1a1a18", marginBottom: "0.75rem" },
  stepDesc: { fontSize: 15, color: "#5a5a55", fontWeight: 300, lineHeight: 1.6 },
  whyCard: { padding: "1.5rem", borderRadius: 16, border: "1.5px solid #e8e3da", background: "#f7f4ef" },
  whyTitle: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, color: "#1a1a18", marginBottom: "0.5rem" },
  whyDesc: { fontSize: 14, color: "#5a5a55", fontWeight: 300, lineHeight: 1.6 },
  coachSection: { background: "white", padding: "6rem 2rem", borderTop: "1px solid #e8e3da", borderBottom: "1px solid #e8e3da" },
  coachInner: { maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center" },
  photo: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" },
  coachName: { fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#1a1a18", marginBottom: "0.5rem" },
  coachCred: { fontSize: 13, color: "#4a7c6f", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "1.5rem", display: "block", textDecoration: "none" },
  coachBio: { fontSize: 17, color: "#5a5a55", fontWeight: 300, lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.5rem" },
  coachMission: { fontSize: 16, color: "#4a7c6f", fontWeight: 500, lineHeight: 1.6 },
  ctaSection: { textAlign: "center" },
  ctaTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 400, lineHeight: 1.3, marginBottom: "1.5rem", color: "#1a1a18" },
  ctaSub: { fontSize: 16, color: "#5a5a55", fontWeight: 300, marginBottom: "2rem" },
  footer: { borderTop: "1px solid #e8e3da", padding: "2rem" },
  footerInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" },
  footerTag: { fontSize: 13, color: "#9a9a94", fontStyle: "italic" },
};