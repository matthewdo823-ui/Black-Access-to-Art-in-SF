import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Subtle scroll-in reveal for exhibit sections (no pin / no initial hide on load).
 */
export function useSectionReveal(options = {}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return

      const trigger = ScrollTrigger.create({
        trigger: node,
        start: options.start ?? 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            node,
            { opacity: options.fromOpacity ?? 0.72, y: options.fromY ?? 32 },
            {
              opacity: 1,
              y: 0,
              duration: options.duration ?? 0.65,
              ease: 'power2.out',
            },
          )
        },
      })

      return () => trigger.kill()
    },
    { scope: ref, dependencies: [options.start, options.duration] },
  )

  return ref
}
