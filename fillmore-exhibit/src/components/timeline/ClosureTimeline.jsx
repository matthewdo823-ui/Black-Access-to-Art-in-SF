import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CLOSURE_TIMELINE_ENTRIES } from '../../data/closureTimelineEntries'
import { DUBOIS_DECADE_COLORS } from '../charts/duboisPalette'
import '../gallery/PhotoGallery.css'
import './ClosureTimeline.css'

const MODAL_SCROLL_SELECTOR = '.gallery-modal__panel, .gallery-modal__layout'
const RAIL_INSET = 11

function canScrollElement(element, deltaY) {
  const { scrollTop, scrollHeight, clientHeight } = element
  if (scrollHeight <= clientHeight + 1) return false
  if (deltaY < 0) return scrollTop > 0
  return scrollTop + clientHeight < scrollHeight - 1
}

/** Even spacing — compresses decades into a balanced visual rhythm. */
function positionForIndex(index, total) {
  if (total <= 1) return 50
  const span = 100 - RAIL_INSET * 2
  return RAIL_INSET + (index / (total - 1)) * span
}

function formatYear(year) {
  if (year === 2026 || year == null || year === '') return 'Present'
  return String(year)
}

function shortTitle(title) {
  return title.replace(/\s*—\s*.*$/, '').trim()
}


function TimelineModal({ entry, index, total, onClose, onPrev, onNext }) {
  const backdropRef = useRef(null)
  const dialogRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(
    () => {
      const backdrop = backdropRef.current
      const dialog = dialogRef.current
      const image = imageRef.current
      if (!backdrop || !dialog) return

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.28 }, 0)
        .fromTo(
          dialog,
          { opacity: 0, scale: 0.92, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.42 },
          0.06,
        )
      if (image) {
        tl.fromTo(image, { scale: 1.06 }, { scale: 1, duration: 0.5 }, 0.1)
      }

      return () => tl.kill()
    },
    { dependencies: [entry.id] },
  )

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) onClose()
  }

  return createPortal(
    <div
      className="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="closure-modal-title"
    >
      <div
        ref={backdropRef}
        className="gallery-modal__backdrop"
        onClick={handleBackdropClick}
      />
      <div ref={dialogRef} className="gallery-modal__frame">
        <button
          type="button"
          className="gallery-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <button
          type="button"
          className="gallery-modal__nav gallery-modal__nav--prev"
          onClick={onPrev}
          aria-label="Previous venue"
        >
          ←
        </button>
        <button
          type="button"
          className="gallery-modal__nav gallery-modal__nav--next"
          onClick={onNext}
          aria-label="Next venue"
        >
          →
        </button>

        <div className="gallery-modal__layout">
          <div className="gallery-modal__image-wrap">
            <img
              ref={imageRef}
              src={entry.image}
              alt={entry.title}
              className="gallery-modal__image"
            />
          </div>
          <div className="gallery-modal__panel">
            <p className="gallery-modal__counter">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h3 id="closure-modal-title" className="gallery-modal__title">
              {entry.title}
            </h3>
            <p className="gallery-modal__meta">
              <span>Closed {formatYear(entry.year)}</span>
            </p>
            <p className="gallery-modal__description">{entry.description}</p>
            <aside className="gallery-modal__related">
              <span className="gallery-modal__related-label">Related</span>
              <p>{entry.related}</p>
            </aside>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function ClosureTimeline() {
  const rootRef = useRef(null)
  const playedRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const activeEntry =
    activeIndex !== null ? CLOSURE_TIMELINE_ENTRIES[activeIndex] : null

  const closeModal = useCallback(() => setActiveIndex(null), [])

  const goPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + CLOSURE_TIMELINE_ENTRIES.length) %
          CLOSURE_TIMELINE_ENTRIES.length,
    )
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) % CLOSURE_TIMELINE_ENTRIES.length,
    )
  }, [])

  const railSpan = useMemo(() => {
    const numericYears = CLOSURE_TIMELINE_ENTRIES.map((e) => e.year).filter(
      (y) => typeof y === 'number',
    )
    if (!numericYears.length) return { start: '—', end: '—' }
    return {
      start: String(Math.min(...numericYears)),
      end: String(Math.max(...numericYears)),
    }
  }, [])

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || playedRef.current) return

      const markers = root.querySelectorAll('.closure-timeline__marker')
      const ticks = root.querySelectorAll('.closure-timeline__tick')
      const line = root.querySelector('.closure-timeline__line')
      const spanLabels = root.querySelectorAll('.closure-timeline__span-label')

      if (!markers.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting || playedRef.current) return
          playedRef.current = true

          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

          if (line) {
            const vertical = window.matchMedia('(max-width: 900px)').matches
            if (vertical) {
              gsap.set(line, { scaleY: 0, scaleX: 1, transformOrigin: 'top center' })
              tl.to(line, { scaleY: 1, duration: 1.1 }, 0)
            } else {
              gsap.set(line, { scaleX: 0, scaleY: 1, transformOrigin: 'left center' })
              tl.to(line, { scaleX: 1, duration: 1.1 }, 0)
            }
          }

          tl.fromTo(
            spanLabels,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
            0.2,
          )
            .fromTo(
              ticks,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.35, stagger: 0.08 },
              0.15,
            )
            .fromTo(
              markers,
              { opacity: 0, y: (i) => (i % 2 === 0 ? -18 : 18) },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: 'back.out(1.35)',
              },
              0.35,
            )
          observer.disconnect()
        },
        { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
      )

      observer.observe(root)
      return () => observer.disconnect()
    },
    { scope: rootRef },
  )

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    const onWheel = (event) => {
      const scrollParent = event.target.closest(MODAL_SCROLL_SELECTOR)
      if (
        scrollParent instanceof HTMLElement &&
        canScrollElement(scrollParent, event.deltaY)
      ) {
        return
      }
      event.preventDefault()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, closeModal, goPrev, goNext])

  const total = CLOSURE_TIMELINE_ENTRIES.length

  return (
    <div
      ref={rootRef}
      className="closure-timeline"
      style={{ '--rail-inset': `${RAIL_INSET}%` }}
      role="list"
      aria-label="Timeline of Fillmore venue closures"
    >
      <div className="closure-timeline__stage">
        <div className="closure-timeline__rail" aria-hidden="true">
          <span className="closure-timeline__track" />
          <span className="closure-timeline__line" />
          <span className="closure-timeline__cap closure-timeline__cap--start" />
          <span className="closure-timeline__cap closure-timeline__cap--end" />
          <span className="closure-timeline__span-label closure-timeline__span-label--start">
            {railSpan.start}
          </span>
          <span className="closure-timeline__span-label closure-timeline__span-label--end">
            {railSpan.end}
          </span>
          {CLOSURE_TIMELINE_ENTRIES.map((entry, index) => (
            <span
              key={`tick-${entry.id}`}
              className="closure-timeline__tick"
              style={{
                '--position': `${positionForIndex(index, total)}%`,
                '--tick-accent': DUBOIS_DECADE_COLORS[index % DUBOIS_DECADE_COLORS.length],
              }}
            />
          ))}
        </div>

        <ul className="closure-timeline__markers">
          {CLOSURE_TIMELINE_ENTRIES.map((entry, index) => (
            <li
              key={entry.id}
              className="closure-timeline__marker closure-timeline__marker--caption-above"
              style={{
                '--position': `${positionForIndex(index, total)}%`,
                '--marker-accent':
                  DUBOIS_DECADE_COLORS[index % DUBOIS_DECADE_COLORS.length],
              }}
              role="listitem"
            >
              <button
                type="button"
                className="closure-timeline__thumb"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${entry.title}, closed ${formatYear(entry.year)}`}
              >
                <span className="closure-timeline__stack closure-timeline__stack--above">
                  <span className="closure-timeline__caption" aria-hidden="true">
                    <span className="closure-timeline__year">
                      {formatYear(entry.year)}
                    </span>
                    <span className="closure-timeline__title">
                      {shortTitle(entry.title)}
                    </span>
                  </span>
                  <span
                    className="closure-timeline__stem closure-timeline__stem--to-dot"
                    aria-hidden="true"
                  />
                </span>
                <span className="closure-timeline__stack closure-timeline__stack--below">
                  <span
                    className="closure-timeline__stem closure-timeline__stem--from-dot"
                    aria-hidden="true"
                  />
                  <span className="closure-timeline__frame">
                    <img
                      src={entry.image}
                      alt=""
                      loading="lazy"
                      className="closure-timeline__img"
                    />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeEntry && (
        <TimelineModal
          entry={activeEntry}
          index={activeIndex}
          total={total}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  )
}
