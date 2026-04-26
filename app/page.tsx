"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.brand}>
            <div style={styles.brandDot} />
            <span style={styles.brandName}>Untangle</span>
          </div>
          <Link href="/app" style={styles.navCta}>
            Start for free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroLeft}>
            <div style={styles.badge}>3 minutes to clarity</div>
            <h1 style={styles.heroTitle}>
              When your head is tangled with a million thoughts,<br />
              <em style={styles.heroEm}>clarity starts here.</em>
            </h1>
            <p style={styles.heroSub}>
              This is your safe space. Let it all out — and let Untangle help you separate what actually matters from the noise.
            </p>
            <Link href="/app" style={styles.heroCta}>
              Untangle your mind →
            </Link>
            <p style={styles.heroNote}>Free to try. No account needed.</p>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.heroCard}>
              <div style={styles.cardLabel}>Signal — real things worth your attention</div>
              <div style={styles.tagRow}>
                <span style={styles.tagSignal}>Work deadline</span>
                <span style={styles.tagSignal}>Family time</span>
                <span style={styles.tagSignal}>Difficult conversation</span>
              </div>
              <div style={styles.divider} />
              <div style={{ ...styles.cardLabel, color: "#c4875a" }}>Noise — let this go</div>
              <div style={styles.tagRow}>
                <span style={styles.tagNoise}>What others think</span>
                <span style={styles.tagNoise}>Worst case scenarios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={styles.testimonialSection}>
        <div style={styles.sectionInner}>
          <blockquote style={styles.quote}>
            &ldquo;I loved how it filtered the noise and guided me to focus on the one thing that needed my attention. Quick, clear, and surprisingly powerful.&rdquo;
          </blockquote>
          <p style={styles.quoteAuthor}>— First user</p>
        </div>
      </section>

      {/* How it works */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionEyebrow}>How it works</p>
          <h2 style={styles.sectionTitle}>A real coaching session,<br /><em style={styles.heroEm}>in 3 minutes.</em></h2>
          <div style={styles.stepsGrid}>
            {[
              { step: "01", title: "Pour it all out", desc: "Write everything that's on your mind. No filters, no judgement. This is your safe space." },
              { step: "02", title: "Signal vs Noise", desc: "Untangle separates what genuinely deserves your attention from the mental clutter you can let go of." },
              { step: "03", title: "Your clarity snapshot", desc: "Walk away with your top priority, your first step, and a closing thought from your coach." },
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

      {/* Coach section */}
      <section style={styles.coachSection}>
        <div style={styles.coachInner}>
          <div style={styles.coachPhoto}>
            <img
              src="/abhi.PNG"
              alt="Abhi Mohan"
              style={styles.photo}
            />
          </div>
          <div style={styles.coachText}>
            <p style={styles.sectionEyebrow}>The coach behind Untangle</p>
            <h2 style={styles.coachName}>Abhi Mohan</h2>
            <p style={styles.coachCred}>Jay Shetty School of Life Certified Life Coach</p>
            <p style={styles.coachBio}>
              &ldquo;As a life coach, the moment I love most is watching someone&apos;s shoulders drop. That shift when the noise clears and they can finally see what actually matters. I built Untangle because that feeling shouldn&apos;t be reserved for a coaching session. Every overwhelmed mind deserves a moment of clarity — quickly, privately, and on their own terms.&rdquo;
            </p>
            <p style={styles.coachMission}>
              A balanced, focused mind doesn&apos;t just perform better — it loves better.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionInner}>
          <h2 style={styles.ctaTitle}>
            Your mind deserves<br />
            <em style={styles.heroEm}>this moment.</em>
          </h2>
          <p style={styles.ctaSub}>Takes 3 minutes. Nothing is saved. Completely private.</p>
          <Link href="/app" style={styles.heroCta}>
            Start for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.brand}>
            <div style={styles.brandDot} />
            <span style={styles.brandName}>Untangle</span>
          </div>
          <p style={styles.footerTag}>The answer was always in you.</p>
        </div>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a18",
  },
  nav: {
    borderBottom: "1px solid #e8e3da",
    background: "#f7f4ef",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#4a7c6f",
    marginBottom: 3,
  },
  brandName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 400,
    color: "#1a1a18",
    letterSpacing: -0.5,
  },
  navCta: {
    padding: "10px 22px",
    background: "#4a7c6f",
    color: "white",
    borderRadius: 100,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    letterSpacing: "0.2px",
  },
  hero: {
    padding: "5rem 2rem",
  },
  heroInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  heroLeft: {},
  badge: {
    display: "inline-block",
    background: "#e8f0ee",
    color: "#2d6b5a",
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 100,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 52,
    fontWeight: 400,
    lineHeight: 1.2,
    marginBottom: "1.5rem",
    color: "#1a1a18",
  },
  heroEm: {
    fontStyle: "italic",
    color: "#4a7c6f",
  },
  heroSub: {
    fontSize: 18,
    color: "#5a5a55",
    fontWeight: 300,
    lineHeight: 1.7,
    marginBottom: "2rem",
    maxWidth: 460,
  },
  heroCta: {
    display: "inline-flex",
    alignItems: "center",
    padding: "16px 32px",
    background: "#4a7c6f",
    color: "white",
    borderRadius: 100,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    letterSpacing: "0.2px",
  },
  heroNote: {
    fontSize: 13,
    color: "#9a9a94",
    marginTop: "1rem",
  },
  heroRight: {},
  heroCard: {
    background: "white",
    border: "1.5px solid #e8e3da",
    borderRadius: 20,
    padding: "2rem",
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#9a9a94",
    marginBottom: 12,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagSignal: {
    padding: "6px 14px",
    borderRadius: 100,
    fontSize: 13,
    background: "#e8f0ee",
    color: "#2d6b5a",
  },
  tagNoise: {
    padding: "6px 14px",
    borderRadius: 100,
    fontSize: 13,
    background: "#fdf3ec",
    color: "#8f5a30",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e8e3da",
    margin: "1rem 0",
  },
  testimonialSection: {
    background: "#4a7c6f",
    padding: "4rem 2rem",
    textAlign: "center",
  },
  sectionInner: {
    maxWidth: 800,
    margin: "0 auto",
    textAlign: "center",
  },
  quote: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 400,
    fontStyle: "italic",
    color: "white",
    lineHeight: 1.5,
    margin: "0 0 1rem",
  },
  quoteAuthor: {
    color: "#8fb5ac",
    fontSize: 14,
    fontWeight: 300,
  },
  section: {
    padding: "6rem 2rem",
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#4a7c6f",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 42,
    fontWeight: 400,
    lineHeight: 1.3,
    marginBottom: "3rem",
    color: "#1a1a18",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
  },
  stepCard: {
    background: "white",
    border: "1.5px solid #e8e3da",
    borderRadius: 16,
    padding: "2rem",
  },
  stepNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    color: "#e8e3da",
    fontWeight: 400,
    marginBottom: "1rem",
  },
  stepTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 400,
    color: "#1a1a18",
    marginBottom: "0.75rem",
  },
  stepDesc: {
    fontSize: 15,
    color: "#5a5a55",
    fontWeight: 300,
    lineHeight: 1.6,
  },
  coachSection: {
    background: "white",
    padding: "6rem 2rem",
    borderTop: "1px solid #e8e3da",
    borderBottom: "1px solid #e8e3da",
  },
  coachInner: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  coachPhoto: {
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: "3/4",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    display: "block",
  },
  coachText: {},
  coachName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    fontWeight: 400,
    color: "#1a1a18",
    marginBottom: "0.5rem",
  },
  coachCred: {
    fontSize: 13,
    color: "#4a7c6f",
    fontWeight: 500,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
  },
  coachBio: {
    fontSize: 17,
    color: "#5a5a55",
    fontWeight: 300,
    lineHeight: 1.8,
    fontStyle: "italic",
    marginBottom: "1.5rem",
  },
  coachMission: {
    fontSize: 16,
    color: "#4a7c6f",
    fontWeight: 500,
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: "6rem 2rem",
    textAlign: "center",
  },
  ctaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 48,
    fontWeight: 400,
    lineHeight: 1.3,
    marginBottom: "1.5rem",
    color: "#1a1a18",
  },
  ctaSub: {
    fontSize: 16,
    color: "#5a5a55",
    fontWeight: 300,
    marginBottom: "2rem",
  },
  footer: {
    borderTop: "1px solid #e8e3da",
    padding: "2rem",
  },
  footerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerTag: {
    fontSize: 13,
    color: "#9a9a94",
    fontStyle: "italic",
  },
};
