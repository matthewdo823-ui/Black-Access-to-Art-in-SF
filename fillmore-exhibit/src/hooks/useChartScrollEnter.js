import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fires `onEnter` once when the chart scrolls into view (for path-draw animations).
 */
export function useChartScrollEnter(onEnter, options = {}) {
  const containerRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useGSAP(
    () => {
      const node = containerRef.current
      if (!node || !onEnter) return

      const trigger = ScrollTrigger.create({
        trigger: node,
        start: options.start ?? 'top 78%',
        once: true,
        onEnter: () => {
          if (hasPlayedRef.current) return
          hasPlayedRef.current = true
          onEnter(node)
        },
      })

      return () => trigger.kill()
    },
    { scope: containerRef, dependencies: [onEnter, options.start] },
  )

  return containerRef
}
