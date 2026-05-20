import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterProgress from './ChapterProgress'
import './ScrollStage.css'

gsap.registerPlugin(ScrollTrigger)

const CHAPTER_FOCUS_LINE = 0.42

export default function ScrollStage({
  chapters,
  onChapterChange,
  className = '',
  pinDuration = '100%',
}) {
  const rootRef = useRef(null)
  const sectionRefs = useRef([])
  const triggerRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const setActiveChapter = useCallback(
    (index) => {
      setActiveIndex((current) => {
        if (current === index) return current
        onChapterChange?.(index, chapters[index])
        return index
      })
    },
    [chapters, onChapterChange],
  )

  useEffect(() => {
    let rafId = 0

    const updateActiveChapter = () => {
      const sections = sectionRefs.current.filter(Boolean)
      if (!sections.length) return

      const focusLine = window.innerHeight * CHAPTER_FOCUS_LINE
      let bestIndex = 0
      let bestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

        const sectionFocus = Math.min(
          Math.max(rect.top + rect.height * 0.35, rect.top),
          rect.bottom,
        )
        const distance = Math.abs(sectionFocus - focusLine)

        if (distance < bestDistance) {
          bestDistance = distance
          bestIndex = index
        }
      })

      setActiveChapter(bestIndex)
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveChapter)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    ScrollTrigger.addEventListener('refresh', scheduleUpdate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      ScrollTrigger.removeEventListener('refresh', scheduleUpdate)
    }
  }, [chapters, setActiveChapter])

  useGSAP(
    () => {
      const sections = sectionRefs.current.filter(Boolean)
      triggerRefs.current = []

      sections.forEach((section, index) => {
        const content = section.querySelector('[data-scroll-content]')
        if (!content) return

        const chapter = chapters[index]
        const isScrollable = Boolean(chapter?.scrollable)

        gsap.set(content, { opacity: 0, y: 56 })

        if (isScrollable) {
          section.classList.add('scroll-stage__chapter--scrollable')

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
          })

          timeline.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
          })

          if (timeline.scrollTrigger) {
            triggerRefs.current[index] = timeline.scrollTrigger
          }
          return
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${pinDuration}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(content, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
          .to(content, {
            opacity: 1,
            y: 0,
            duration: 0.35,
          })
          .to(content, {
            opacity: 0.35,
            y: -28,
            duration: 0.25,
            ease: 'power2.in',
          })

        if (timeline.scrollTrigger) {
          triggerRefs.current[index] = timeline.scrollTrigger
        }
      })

      ScrollTrigger.refresh()
      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        triggerRefs.current.forEach((trigger) => trigger?.kill())
        triggerRefs.current = []
      }
    },
    { scope: rootRef, dependencies: [chapters, pinDuration] },
  )

  const scrollToChapter = (index) => {
    const section = sectionRefs.current[index]
    const trigger = triggerRefs.current[index]
    const chapter = chapters[index]

    if (trigger && !chapter?.scrollable) {
      trigger.scroll(trigger.start + 1)
      return
    }

    if (section) {
      const headerOffset = 72
      const top =
        section.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
  }

  return (
    <div className={`scroll-stage ${className}`.trim()}>
      <ChapterProgress
        chapters={chapters}
        activeIndex={activeIndex}
        onChapterSelect={scrollToChapter}
      />

      <div ref={rootRef} className="scroll-stage__track">
        {chapters.map((chapter, index) => (
          <section
            key={chapter.id}
            ref={(element) => {
              sectionRefs.current[index] = element
            }}
            className="scroll-stage__chapter"
            data-chapter={chapter.id}
            aria-label={chapter.label}
          >
            <div className="scroll-stage__inner">
              <div className="scroll-stage__content" data-scroll-content>
                {chapter.content}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
