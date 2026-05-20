import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EXHIBIT_CONTEXT_CARDS, LAYER_CONTROLS } from '../data/exhibitContext'
import { useExhibitMap } from '../hooks/useExhibitMap'
import './Exhibit3.css'

export default function Exhibit3() {
  const mapContainerRef = useRef(null)
  const mapFrameRef = useRef(null)
  const { mapReady, isControlActive, toggleControl } = useExhibitMap(mapContainerRef)

  const [modal, setModal] = useState(null)
  const [fullscreenLabel, setFullscreenLabel] = useState('Click to examine →')

  const openModal = useCallback((title, content) => {
    setModal({ title, content })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && modal) closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [modal, closeModal])

  const enterMapFullscreen = async () => {
    const mapFrame = mapFrameRef.current
    if (!mapFrame) return

    if (mapFrame.requestFullscreen) {
      await mapFrame.requestFullscreen()
    } else if (mapFrame.webkitRequestFullscreen) {
      await mapFrame.webkitRequestFullscreen()
    } else {
      mapFrame.classList.add('fullscreen')
      document.body.classList.add('fullscreen-active')
    }
  }

  const exitMapFullscreen = async () => {
    const mapFrame = mapFrameRef.current
    if (!mapFrame) return

    if (
      document.fullscreenElement === mapFrame ||
      document.webkitFullscreenElement === mapFrame
    ) {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      }
    }
    mapFrame.classList.remove('fullscreen')
    document.body.classList.remove('fullscreen-active')
  }

  const handleFullscreenClick = async () => {
    const mapFrame = mapFrameRef.current
    if (!mapFrame) return

    if (
      document.fullscreenElement === mapFrame ||
      mapFrame.classList.contains('fullscreen')
    ) {
      await exitMapFullscreen()
      setFullscreenLabel('Click to examine →')
    } else {
      await enterMapFullscreen()
      setFullscreenLabel('Exit fullscreen')
    }
  }

  useEffect(() => {
    const mapFrame = mapFrameRef.current
    if (!mapFrame) return

    const onFullscreenChange = () => {
      if (document.fullscreenElement === mapFrame) {
        setFullscreenLabel('Exit fullscreen')
      } else {
        setFullscreenLabel('Click to examine →')
        mapFrame.classList.remove('fullscreen')
        document.body.classList.remove('fullscreen-active')
      }
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  return (
    <div className="exhibit-page">
      <div className="page-shell">
        <header className="page-header">
          <Link className="back-link" to="/">
            ← Collection
          </Link>
          <div className="header-meta">
            <span className="chapter-label">EXHIBIT III — THE MAP</span>
            <div className="page-nav">
              <span className="nav-dot active" />
              <span className="nav-dot" />
              <span className="nav-dot" />
            </div>
          </div>
        </header>

        <main className="page-layout">
          <aside className="info-panel">
            <p className="eyebrow">SPATIAL DATA · PRESENT DAY</p>
            <h1>The gap has a shape. It can be mapped.</h1>
            <p className="intro-copy">
              Modern arts institutions cluster where Black residents no longer live;
              followingthe exact boundaries of historic redlining.
            </p>

            <section className="legend-card">
              <h2>Legend</h2>
              <ul className="legend-list">
                <li>
                  <span className="legend-swatch redlined" />
                  Redlined zone (1937)
                </li>
                <li>
                  <span className="legend-swatch art-venue" />
                  1% Art Program Builds
                </li>
                <li>
                  <span className="legend-swatch historic-venue" />
                  Civic Art Locations
                </li>
                <li>
                  <span className="legend-swatch density" />
                  Cultural Districts
                </li>
              </ul>
            </section>

            <section className="stats-card">
              <h2>Civic Art Locations per neighborhood</h2>
              <ul className="stats-list">
                <li>
                  <strong>SoMa</strong>
                  <span>11</span>
                </li>
                <li>
                  <strong>Mission</strong>
                  <span>6</span>
                </li>
                <li>
                  <strong>Fillmore</strong>
                  <span>2</span>
                </li>
                <li>
                  <strong>Bayview</strong>
                  <span>1</span>
                </li>
              </ul>
            </section>
          </aside>

          <section className="map-panel">
            <div className="map-frame" ref={mapFrameRef}>
              <div ref={mapContainerRef} className="exhibit-map" />
              <div className="button-bar">
                {LAYER_CONTROLS.map((control) => (
                  <button
                    key={control.id}
                    id={`${control.id}-btn`}
                    type="button"
                    className={isControlActive(control) ? 'active' : 'inactive'}
                    disabled={!mapReady}
                    onClick={() => toggleControl(control)}
                  >
                    {control.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="map-cta">
              <button
                type="button"
                className="primary"
                onClick={handleFullscreenClick}
              >
                {fullscreenLabel}
              </button>
            </div>
          </section>
        </main>

        <section className="exhibit-context">
          <h2 className="context-title">Exhibit Context</h2>
          <p className="context-subtitle">
            Document the story behind the spatial data
          </p>

          <div className="context-grid">
            {EXHIBIT_CONTEXT_CARDS.map((card) => (
              <div
                key={card.label}
                className="context-card"
                role="button"
                tabIndex={0}
                onClick={() => openModal(card.label, card.content)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openModal(card.label, card.content)
                  }
                }}
              >
                <span className="card-label">{card.label}</span>
                <div
                  className={`card-content${card.large ? ' card-content-large' : ''}`}
                >
                  {card.content}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div
        className={`context-modal${modal ? ' active' : ''}`}
        aria-hidden={!modal}
      >
        <div
          className="context-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        />
        <div
          className="context-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="context-modal-title"
        >
          <button
            type="button"
            className="context-modal-close"
            aria-label="Close details"
            onClick={closeModal}
          >
            ×
          </button>
          <h3 id="context-modal-title" className="context-modal-title">
            {modal?.title}
          </h3>
          <div className="context-modal-copy">{modal?.content}</div>
        </div>
      </div>
    </div>
  )
}
