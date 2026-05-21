import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useChartScrollEnter } from '../../hooks/useChartScrollEnter'
import './DuBoisCharts.css'
import './DisplacementChartSkeleton.css'

const WIDTH = 720
const HEIGHT = 380
const MARGIN = { top: 28, right: 36, bottom: 48, left: 72 }
const INNER_W = WIDTH - MARGIN.left - MARGIN.right
const INNER_H = HEIGHT - MARGIN.top - MARGIN.bottom

const PLACEHOLDER_PATHS = {
  city: `M 0 ${INNER_H * 0.55} C ${INNER_W * 0.2} ${INNER_H * 0.5}, ${INNER_W * 0.35} ${INNER_H * 0.35}, ${INNER_W * 0.5} ${INNER_H * 0.42} S ${INNER_W * 0.78} ${INNER_H * 0.72}, ${INNER_W} ${INNER_H * 0.88}`,
  fillmore: `M 0 ${INNER_H * 0.38} C ${INNER_W * 0.18} ${INNER_H * 0.32}, ${INNER_W * 0.4} ${INNER_H * 0.22}, ${INNER_W * 0.55} ${INNER_H * 0.35} S ${INNER_W * 0.82} ${INNER_H * 0.78}, ${INNER_W} ${INNER_H * 0.92}`,
}

export default function DisplacementChartSkeleton({
  title,
  scope = 'city',
  ariaLabel,
}) {
  const svgRef = useRef(null)
  const playedRef = useRef(false)
  const pathD = PLACEHOLDER_PATHS[scope] ?? PLACEHOLDER_PATHS.city
  const gradientId = `displacement-skeleton-${scope}`

  const animateChart = useCallback(() => {
    if (playedRef.current || !svgRef.current) return
    playedRef.current = true

    const line = svgRef.current.querySelector('.displacement-skeleton__line')
    const grid = svgRef.current.querySelectorAll('.displacement-skeleton__grid line')
    const badge = svgRef.current.querySelector('.displacement-skeleton__badge')

    if (line) {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      })
    }

    gsap.fromTo(
      grid,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.03, ease: 'power1.out' },
    )

    if (badge) {
      gsap.fromTo(
        badge,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.9, ease: 'power2.out' },
      )
    }
  }, [])

  const containerRef = useChartScrollEnter(animateChart)

  useEffect(() => {
    if (!svgRef.current) return
    const line = svgRef.current.querySelector('.displacement-skeleton__line')
    if (line) {
      const length = line.getTotalLength()
      line.style.strokeDasharray = `${length}`
      line.style.strokeDashoffset = `${length}`
    }
  }, [pathD])

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => INNER_H * t)
  const xTicks = [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => INNER_W * t)

  return (
    <figure
      ref={containerRef}
      className="dubois-chart dubois-chart--mountain displacement-skeleton"
      aria-label={ariaLabel ?? title}
    >
      <figcaption className="dubois-chart__title">{title}</figcaption>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="dubois-mountain__svg displacement-skeleton__svg"
        role="img"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--dubois-teal)" />
            <stop offset="100%" stopColor="var(--dubois-crimson)" />
          </linearGradient>
        </defs>

        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <g className="displacement-skeleton__grid" opacity={0}>
            {yTicks.map((y, index) => (
              <line
                key={`y-${index}`}
                x1={0}
                x2={INNER_W}
                y1={y}
                y2={y}
              />
            ))}
            {xTicks.map((x, index) => (
              <line
                key={`x-${index}`}
                y1={0}
                y2={INNER_H}
                x1={x}
                x2={x}
              />
            ))}
          </g>

          <path
            className="displacement-skeleton__line"
            d={pathD}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          <text
            className="displacement-skeleton__badge"
            x={INNER_W / 2}
            y={INNER_H / 2}
            textAnchor="middle"
            opacity={0}
          >
            Chart in progress
          </text>

          <g className="dubois-mountain__axis dubois-mountain__axis--x">
            {['1950', '1960', '1970', '1980', '1990'].map((label, index) => (
              <g
                key={label}
                transform={`translate(${xTicks[index + 1] ?? xTicks[index]}, ${INNER_H})`}
              >
                <line y2={6} />
                <text y={22}>{label}</text>
              </g>
            ))}
          </g>

          <text
            className="dubois-mountain__axis-label"
            transform={`translate(${-52}, ${INNER_H / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            Black population
          </text>
        </g>
      </svg>

      <p className="displacement-skeleton__note">Data visualization — placeholder</p>
    </figure>
  )
}
