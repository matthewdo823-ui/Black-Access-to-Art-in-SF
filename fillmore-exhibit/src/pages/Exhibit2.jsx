import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BlackPopulationDeclineChart from '../components/charts/BlackPopulationDeclineChart'
import ClosureTimeline from '../components/timeline/ClosureTimeline'
import { useSectionReveal } from '../hooks/useSectionReveal'
import './Exhibit2.css'

const SECTIONS = [
  { id: 'hero', label: 'Opening' },
  { id: 'city-displacement', label: 'City' },
  { id: 'fillmore-displacement', label: 'Closures' },
  { id: 'shutdown-artifact', label: 'Artifact' },
]

function ExhibitSection({ id, className = '', children }) {
  const revealRef = useSectionReveal()
  return (
    <section
      id={id}
      ref={revealRef}
      className={`exhibit2-section ${className}`.trim()}
      data-section={id}
    >
      {children}
    </section>
  )
}

export default function Exhibit2() {
  const [activeSection, setActiveSection] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    const sections = trackRef.current?.querySelectorAll('[data-section]')
    if (!sections?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const id = visible[0].target.getAttribute('data-section')
        const index = SECTIONS.findIndex((section) => section.id === id)
        if (index >= 0) setActiveSection(index)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.12, 0.35, 0.55] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="exhibit-page exhibit2-page">
      <header className="page-header exhibit2-header">
        <Link className="back-link" to="/">
          ← Collection
        </Link>
        <div className="header-meta">
          <span className="chapter-label">EXHIBIT II — URBAN RENEWAL</span>
          <div className="page-nav" aria-label="Exhibit sections">
            {SECTIONS.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`nav-dot${index === activeSection ? ' active' : ''}`}
                aria-label={section.label}
                aria-current={index === activeSection ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </header>

      <main ref={trackRef} className="exhibit2-track">
        <ExhibitSection id="hero" className="exhibit2-section--hero">
          <article className="exhibit2-chapter exhibit2-chapter--hero">
            <p className="eyebrow">Exhibit II · San Francisco, 1950–1980</p>
            <h1>Urban Renewal</h1>
            <p className="intro-copy exhibit2-lead">
              Redevelopment, eminent domain, and the dismantling of the Fillmore community.
            </p>
            <p className="scroll-hint">Scroll to follow the displacement record</p>
          </article>
        </ExhibitSection>

        <ExhibitSection
          id="city-displacement"
          className="exhibit2-section--chart"
        >
          <article className="exhibit2-chapter exhibit2-chapter--chart">
            <header className="exhibit2-chapter-header">
              <span className="chapter-num">02</span>
              <h2>Black Population Displacement</h2>
            </header>
            <div className="chart-layout">
              <aside className="chart-aside">
                <p className="eyebrow chart-aside-eyebrow">Citywide context</p>
                <p className="chart-aside-body">
                “Negro removal” was a synonym to urban renewal. Discriminatory housing policies, forced displacement, and gentrification pushed Black Americans out of San Francisco and made it more difficult for them to return. Certificates, in return for eminent domain, offered little respite as redevelopment took nearly a decade; much too long for any family. The pushing-out of Black Americans from the San Fransiscan space had a significant impact on top-level demographics, but it also left those who remained in a similarly poor situation.
                </p>
              </aside>
              <div className="chart-frame">
                <BlackPopulationDeclineChart />
              </div>
            </div>
          </article>
        </ExhibitSection>

        <ExhibitSection
          id="fillmore-displacement"
          className="exhibit2-section--timeline"
        >
          <article className="exhibit2-chapter exhibit2-chapter--timeline">
            <header className="exhibit2-chapter-header">
              <span className="chapter-num">03</span>
              <h2>Fillmore Closures</h2>
            </header>
            <div className="closure-timeline-panel">
              <ClosureTimeline />
            </div>
          </article>
        </ExhibitSection>

        <ExhibitSection
          id="shutdown-artifact"
          className="exhibit2-section--artifact"
        >
          <article className="exhibit2-chapter exhibit2-chapter--artifact">
            <header className="exhibit2-chapter-header">
              <span className="chapter-num">04</span>
              <h2>Fillmore's Legacy</h2>
            </header>
            <div className="artifact-layout">
              <figure className="museum-artifact">
                <div className="museum-artifact__frame">
                <div className="museum-artifact__image">
                  <img
                    src="https://www.foundsf.org/images/thumb/0/04/Fillmore-street-1921.jpg/720px-Fillmore-street-1921.jpg"
                    alt="Archival photograph of Fillmore Street, 1921"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                  <figcaption className="museum-artifact__plaque">
                    <span className="museum-artifact__plaque-eyebrow">
                      Collection artifact
                    </span>
                    <h3 className="museum-artifact__plaque-title">
                      Fillmore Street
                    </h3>
                    <p className="museum-artifact__plaque-meta">
                      1921
                    </p>
                    <p className="museum-artifact__plaque-copy">
                    Urban renewal was not one large or grand event; rather, it was a series of policies that progressively stripped away more and more space from Black Americans. By the end, Black community was stratified, and the Fillmore’s short history is a reminder of what once was.

                    </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          </article>
        </ExhibitSection>
      </main>
    </div>
  )
}
