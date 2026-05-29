import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PopulationMountainChart from '../components/charts/PopulationMountainChart'
import SpiralVenuesChart from '../components/charts/SpiralVenuesChart'
import PhotoGallery from '../components/gallery/PhotoGallery'
import { useSectionReveal } from '../hooks/useSectionReveal'
import './Exhibit1.css'

const SECTIONS = [
  { id: 'hero', label: 'Opening' },
  { id: 'population-rise', label: 'Population' },
  { id: 'club-map', label: 'Clubs' },
  { id: 'photo-gallery', label: 'Gallery' },
]

function ExhibitSection({ id, className = '', children }) {
  const revealRef = useSectionReveal()
  return (
    <section
      id={id}
      ref={revealRef}
      className={`exhibit1-section ${className}`.trim()}
      data-section={id}
    >
      {children}
    </section>
  )
}

export default function Exhibit1() {
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
    <div className="exhibit-page exhibit1-page">
      <header className="page-header exhibit1-header">
        <Link className="back-link" to="/">
          ← Collection
        </Link>
        <div className="header-meta">
          <span className="chapter-label">EXHIBIT I — THE HARLEM OF THE WEST</span>
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

      <main ref={trackRef} className="exhibit1-track">
        <ExhibitSection id="hero" className="exhibit1-section--hero">
          <article className="exhibit-chapter exhibit-chapter--hero">
            <p className="eyebrow">Exhibit I · San Francisco, 1940–1970</p>
            <h1>The Harlem of the West</h1>
            <p className="intro-copy exhibit-chapter-lead">
              Fillmore: a city filled with jazz, nightclubs, and the greatest Black artists of the time.
            </p>
            <p className="scroll-hint">Scroll to enter the record</p>
          </article>
        </ExhibitSection>

        <ExhibitSection
          id="population-rise"
          className="exhibit1-section--chart"
        >
          <article className="exhibit-chapter exhibit-chapter--chart">
            <header className="exhibit-chapter-header">
              <span className="chapter-num">02</span>
              <h2>Population Rise</h2>
            </header>
            <div className="chart-layout">
              <aside className="chart-aside">
                <p className="eyebrow chart-aside-eyebrow">Demographic shift</p>
                <p className="chart-aside-body">
                With the Second Great Migration came African American families looking to benefit from the surplus of wartime jobs. As the Black population quickly grew (&gt;19x in 30 years), the Fillmore district developed into a thriving community. Due to a strong cultural scene (jazz and broader entertainment), it was given the nickname “the Harlem of the West”.
                </p>
              </aside>
              <div className="chart-frame">
                <PopulationMountainChart />
              </div>
            </div>
          </article>
        </ExhibitSection>

        <ExhibitSection id="club-map" className="exhibit1-section--chart">
          <article className="exhibit-chapter exhibit-chapter--chart">
            <header className="exhibit-chapter-header">
              <span className="chapter-num">03</span>
              <h2>Cultural Expansion</h2>
            </header>
            <div className="chart-layout">
              <aside className="chart-aside">
                <p className="eyebrow chart-aside-eyebrow">Nightlife geography</p>
                <p className="chart-aside-body">
                Jazz and entertainment venues spiked with African American migration in the 30’s and 40’s. However, urban renewal projects of the 70’s-80’s used eminent domain to break down private, black owned businesses (Western Addition Area A-2 Redevelopment Plan). This disproportionately affected Black and Japanese minorities, displacing them for their neighborhoods. The displacement of Black Americans broke their ability to forge cultural communities, and tied with other oppressive policies, led to modern-day inequality in access to art.
                </p>
              </aside>
              <div className="chart-frame">
                <SpiralVenuesChart />
              </div>
            </div>
          </article>
        </ExhibitSection>

        <ExhibitSection
          id="photo-gallery"
          className="exhibit1-section--gallery"
        >
          <article className="exhibit-chapter exhibit-chapter--gallery">
            <header className="exhibit-chapter-header">
              <span className="chapter-num">04</span>
              <h2>Photo Gallery</h2>
            </header>
            <div className="gallery-panel">
              <PhotoGallery />
            </div>
          </article>
        </ExhibitSection>
      </main>
    </div>
  )
}
