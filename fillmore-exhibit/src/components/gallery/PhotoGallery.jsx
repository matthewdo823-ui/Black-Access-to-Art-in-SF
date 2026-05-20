import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GALLERY_PHOTOS } from '../../data/galleryPhotos'
import './PhotoGallery.css'

gsap.registerPlugin(ScrollTrigger)

const MODAL_SCROLL_SELECTOR = '.gallery-modal__panel, .gallery-modal__layout'

function canScrollElement(element, deltaY) {
  const { scrollTop, scrollHeight, clientHeight } = element
  if (scrollHeight <= clientHeight + 1) return false
  if (deltaY < 0) return scrollTop > 0
  return scrollTop + clientHeight < scrollHeight - 1
}

function GalleryModal({ photo, index, total, onClose, onPrev, onNext }) {
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
    { dependencies: [photo.id] },
  )

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) onClose()
  }

  return createPortal(
    <div
      className="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
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
          aria-label="Close gallery"
        >
          ×
        </button>

        <button
          type="button"
          className="gallery-modal__nav gallery-modal__nav--prev"
          onClick={onPrev}
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          type="button"
          className="gallery-modal__nav gallery-modal__nav--next"
          onClick={onNext}
          aria-label="Next photo"
        >
          →
        </button>

        <div className="gallery-modal__layout">
          <div className="gallery-modal__image-wrap">
            <img
              ref={imageRef}
              src={photo.image}
              alt={photo.title}
              className="gallery-modal__image"
            />
          </div>
          <div className="gallery-modal__panel">
            <p className="gallery-modal__counter">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h3 id="gallery-modal-title" className="gallery-modal__title">
              {photo.title}
            </h3>
            <p className="gallery-modal__meta">
              <span>{photo.year}</span>
              <span aria-hidden="true"> · </span>
              <span>{photo.photographer}</span>
            </p>
            <p className="gallery-modal__description">{photo.description}</p>
            <aside className="gallery-modal__related">
              <span className="gallery-modal__related-label">Related</span>
              <p>{photo.related}</p>
            </aside>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function PhotoGallery() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const activePhoto =
    activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null

  const openPhoto = (index) => setActiveIndex(index)
  const closeModal = useCallback(() => setActiveIndex(null), [])

  const goPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
    )
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % GALLERY_PHOTOS.length,
    )
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid || hasAnimatedRef.current) return undefined

    const cards = grid.querySelectorAll('.gallery-card')
    if (!cards.length) return undefined

    gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 })

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasAnimatedRef.current) return
        hasAnimatedRef.current = true
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.09,
          ease: 'power2.out',
        })
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    const scrollTriggers = ScrollTrigger.getAll()
    scrollTriggers.forEach((trigger) => trigger.disable(false))

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
      scrollTriggers.forEach((trigger) => trigger.enable(false))
      document.body.style.overflow = ''
      document.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, closeModal, goPrev, goNext])

  return (
    <section ref={sectionRef} className="photo-gallery" aria-label="Archival photo gallery">
      <div ref={gridRef} className="photo-gallery__grid">
        {GALLERY_PHOTOS.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={`gallery-card ${photo.gridClass}`.trim()}
            onClick={() => openPhoto(index)}
            aria-label={`View ${photo.title}, ${photo.year}`}
          >
            <span className="gallery-card__media">
              <img
                src={photo.image}
                alt=""
                loading="lazy"
                className="gallery-card__img"
              />
              <span className="gallery-card__overlay" aria-hidden="true">
                <span className="gallery-card__view">VIEW +</span>
              </span>
              <span className="gallery-card__stamp">{photo.year}</span>
            </span>
            <span className="gallery-card__caption">{photo.caption}</span>
          </button>
        ))}
      </div>

      {activePhoto && (
        <GalleryModal
          photo={activePhoto}
          index={activeIndex}
          total={GALLERY_PHOTOS.length}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  )
}
