import { useState } from 'react'
import { Link } from 'react-router-dom'
import PopulationMountainChart from '../components/charts/PopulationMountainChart'
import SpiralVenuesChart from '../components/charts/SpiralVenuesChart'
import ScrollStage from '../components/ScrollStage/ScrollStage'
import PhotoGallery from '../components/gallery/PhotoGallery'
import './Exhibit1.css'

const CHAPTERS = [
  {
    id: 'hero',
    label: 'Hero',
    shortLabel: 'Opening',
    content: (
      <article className="exhibit-chapter exhibit-chapter--hero">
        <p className="eyebrow">Exhibit I · San Francisco, 1940–1970</p>
        <h1>The Harlem of the West</h1>
        <p className="intro-copy exhibit-chapter-lead">
          [Hero narrative — opening statement and archival framing will go here.]
        </p>
        <p className="scroll-hint">Scroll to enter the record</p>
      </article>
    ),
  },
  {
    id: 'population-rise',
    label: 'Population Rise',
    shortLabel: 'Population',
    content: (
      <article className="exhibit-chapter exhibit-chapter--chart">
        <header className="exhibit-chapter-header">
          <span className="chapter-num">02</span>
          <h2>Population Rise</h2>
        </header>
        <div className="chart-layout">
          <aside className="chart-aside">
            <p className="eyebrow chart-aside-eyebrow">Demographic shift</p>
            <p className="chart-aside-body">
              [Narrative on Black migration into the Fillmore during and after
              the Second World War — wartime employment, housing pressure, and
              the neighborhood&apos;s rapid growth will go here.]
            </p>
          </aside>
          <div className="chart-frame">
            <PopulationMountainChart />
          </div>
        </div>
      </article>
    ),
  },
  {
    id: 'club-map',
    label: 'Club Map',
    shortLabel: 'Clubs',
    content: (
      <article className="exhibit-chapter exhibit-chapter--chart">
        <header className="exhibit-chapter-header">
          <span className="chapter-num">03</span>
          <h2>Club Map</h2>
        </header>
        <div className="chart-layout">
          <aside className="chart-aside">
            <p className="eyebrow chart-aside-eyebrow">Nightlife geography</p>
            <p className="chart-aside-body">
              [Narrative on jazz clubs, supper rooms, and performance venues that
              defined the Fillmore corridor — who played, who listened, and how
              the scene mapped onto the street grid will go here.]
            </p>
          </aside>
          <div className="chart-frame">
            <SpiralVenuesChart />
          </div>
        </div>
      </article>
    ),
  },
  {
    id: 'photo-gallery',
    label: 'Photo Gallery',
    shortLabel: 'Gallery',
    scrollable: true,
    content: (
      <article className="exhibit-chapter exhibit-chapter--gallery">
        <header className="exhibit-chapter-header">
          <span className="chapter-num">04</span>
          <h2>Photo Gallery</h2>
        </header>
        <div className="gallery-panel">
          <PhotoGallery />
        </div>
      </article>
    ),
  },
]

export default function Exhibit1() {
  const [activeChapter, setActiveChapter] = useState(0)

  return (
    <div className="exhibit-page exhibit1-page">
      <header className="page-header exhibit1-header">
        <Link className="back-link" to="/">
          ← Collection
        </Link>
        <div className="header-meta">
          <span className="chapter-label">EXHIBIT I — THE HARLEM OF THE WEST</span>
          <div className="page-nav" aria-hidden="true">
            {CHAPTERS.map((chapter, index) => (
              <span
                key={chapter.id}
                className={`nav-dot${index === activeChapter ? ' active' : ''}`}
              />
            ))}
          </div>
        </div>
      </header>

      <ScrollStage
        chapters={CHAPTERS}
        className="exhibit1-scroll-stage"
        onChapterChange={(index) => setActiveChapter(index)}
      />
    </div>
  )
}
