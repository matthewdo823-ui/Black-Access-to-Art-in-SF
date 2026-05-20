import { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import gsap from 'gsap'
import { DUBOIS_DECADE_COLORS } from './duboisPalette'
import { useChartScrollEnter } from '../../hooks/useChartScrollEnter'
import './DuBoisCharts.css'

const VENUE_DATA = [
  { decade: '1930s', venues: 12 },
  { decade: '1940s', venues: 28 },
  { decade: '1950s', venues: 22 },
  { decade: '1960s', venues: 14 },
  { decade: '1970s', venues: 4 },
]

const SIZE = 520
const CENTER = SIZE / 2
const SPIRAL_A = 28
const SPIRAL_B = 14
const TURNS = 1.35

function spiralRadius(theta) {
  return SPIRAL_A + SPIRAL_B * theta
}

function buildArcs() {
  const maxVenues = d3.max(VENUE_DATA, (d) => d.venues)
  const venueScale = d3.scaleLinear().domain([0, maxVenues]).range([18, 72])
  const totalAngle = TURNS * Math.PI * 2
  const gap = 0.08
  const slice = totalAngle / VENUE_DATA.length

  return VENUE_DATA.map((d, i) => {
    const startAngle = i * slice + gap / 2
    const endAngle = (i + 1) * slice - gap / 2
    const midAngle = (startAngle + endAngle) / 2
    const innerR = spiralRadius(startAngle)
    const outerR = innerR + venueScale(d.venues)

    const arcGen = d3.arc().cornerRadius(2)
    const path = arcGen({
      innerRadius: innerR,
      outerRadius: outerR,
      startAngle,
      endAngle,
    })

    const labelR = outerR + 22
    const labelX = Math.sin(midAngle) * labelR
    const labelY = -Math.cos(midAngle) * labelR
    const rotate = (midAngle * 180) / Math.PI
    const flip = midAngle > Math.PI / 2 && midAngle < (Math.PI * 3) / 2

    return {
      ...d,
      path,
      color: DUBOIS_DECADE_COLORS[i],
      labelX,
      labelY,
      rotate: flip ? rotate + 180 : rotate,
    }
  })
}

const ARCS = buildArcs()

export default function SpiralVenuesChart() {
  const svgRef = useRef(null)
  const playedRef = useRef(false)

  const animateChart = useCallback(() => {
    if (playedRef.current || !svgRef.current) return
    playedRef.current = true

    const paths = svgRef.current.querySelectorAll('.dubois-spiral__bar')
    const labels = svgRef.current.querySelectorAll('.dubois-spiral__label')

    paths.forEach((path, index) => {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
      })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.1,
        delay: index * 0.18,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(path, { fillOpacity: 0.92, duration: 0.35 })
        },
      })
    })

    gsap.fromTo(
      labels,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.35,
        ease: 'power2.out',
      },
    )
  }, [])

  const containerRef = useChartScrollEnter(animateChart)

  useEffect(() => {
    if (!svgRef.current) return
    const paths = svgRef.current.querySelectorAll('.dubois-spiral__bar')
    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.fillOpacity = '0'
    })
  }, [])

  return (
    <figure
      ref={containerRef}
      className="dubois-chart dubois-chart--spiral"
      aria-label="Black-owned jazz venues in the Fillmore by decade, spiral bar chart"
    >
      <figcaption className="dubois-chart__title">
        Black-Owned Jazz Venues in the Fillmore by Decade
      </figcaption>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="dubois-spiral__svg"
        role="img"
      >
        <g transform={`translate(${CENTER}, ${CENTER})`}>
          <circle
            className="dubois-spiral__origin"
            r={6}
            fill="var(--dubois-gold)"
            opacity={0.85}
          />

          {ARCS.map((arc) => (
            <path
              key={arc.decade}
              className="dubois-spiral__bar"
              d={arc.path}
              fill={arc.color}
              stroke={arc.color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          ))}

          {ARCS.map((arc) => (
            <text
              key={`${arc.decade}-label`}
              className="dubois-spiral__label"
              x={arc.labelX}
              y={arc.labelY}
              transform={`rotate(${arc.rotate}, ${arc.labelX}, ${arc.labelY})`}
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0}
            >
              <tspan className="dubois-spiral__decade">{arc.decade}</tspan>
              <tspan className="dubois-spiral__value" x={arc.labelX} dy="1.15em">
                {arc.venues}
              </tspan>
            </text>
          ))}
        </g>
      </svg>

      <ul className="dubois-chart__legend" aria-hidden="true">
        {ARCS.map((arc) => (
          <li key={arc.decade}>
            <span
              className="dubois-chart__legend-swatch"
              style={{ background: arc.color }}
            />
            {arc.decade} — {arc.venues}
          </li>
        ))}
      </ul>
    </figure>
  )
}
