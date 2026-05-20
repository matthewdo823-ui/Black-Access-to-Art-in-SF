import { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import gsap from 'gsap'
import { useChartScrollEnter } from '../../hooks/useChartScrollEnter'
import './DuBoisCharts.css'

const POPULATION_DATA = [
  { year: 1930, population: 4000 },
  { year: 1940, population: 10000 },
  { year: 1950, population: 30000 },
  { year: 1960, population: 35000 },
  { year: 1970, population: 18000 },
  { year: 1980, population: 6500 },
]

const MARGIN = { top: 28, right: 36, bottom: 48, left: 72 }
const WIDTH = 720
const HEIGHT = 380
const INNER_W = WIDTH - MARGIN.left - MARGIN.right
const INNER_H = HEIGHT - MARGIN.top - MARGIN.bottom

function buildScales() {
  const x = d3
    .scaleLinear()
    .domain(d3.extent(POPULATION_DATA, (d) => d.year))
    .range([0, INNER_W])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(POPULATION_DATA, (d) => d.population) * 1.08])
    .range([INNER_H, 0])

  const area = d3
    .area()
    .x((d) => x(d.year))
    .y0(INNER_H)
    .y1((d) => y(d.population))
    .curve(d3.curveMonotoneX)

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.population))
    .curve(d3.curveMonotoneX)

  return { x, y, areaPath: area(POPULATION_DATA), linePath: line(POPULATION_DATA) }
}

const { x, y, areaPath, linePath } = buildScales()

export default function PopulationMountainChart() {
  const svgRef = useRef(null)
  const playedRef = useRef(false)

  const xTicks = x.ticks(6).filter((t) => t % 10 === 0)
  const yTicks = y.ticks(5)

  const peakYear = 1950
  const renewalYear = 1970
  const peakX = x(peakYear)
  const renewalX = x(renewalYear)

  const formatPop = (value) => {
    if (value >= 1000) return `${Math.round(value / 1000)}k`
    return String(value)
  }

  const animateChart = useCallback(() => {
    if (playedRef.current || !svgRef.current) return
    playedRef.current = true

    const clipRect = svgRef.current.querySelector('.dubois-mountain__clip-rect')
    const ridge = svgRef.current.querySelector('.dubois-mountain__ridge')
    const annots = svgRef.current.querySelectorAll('.dubois-mountain__annot')
    const grid = svgRef.current.querySelectorAll('.dubois-mountain__grid line')

    if (clipRect) {
      gsap.fromTo(
        clipRect,
        { attr: { width: 0 } },
        { attr: { width: INNER_W }, duration: 1.85, ease: 'power2.inOut' },
      )
    }

    if (ridge) {
      const len = ridge.getTotalLength()
      gsap.set(ridge, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(ridge, {
        strokeDashoffset: 0,
        duration: 1.75,
        ease: 'power2.inOut',
      })
    }

    gsap.fromTo(
      grid,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power1.out' },
    )

    gsap.fromTo(
      annots,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.2, delay: 1.1, ease: 'power2.out' },
    )
  }, [])

  const containerRef = useChartScrollEnter(animateChart)

  useEffect(() => {
    if (!svgRef.current) return
    const ridge = svgRef.current.querySelector('.dubois-mountain__ridge')
    const clipRect = svgRef.current.querySelector('.dubois-mountain__clip-rect')
    if (ridge) {
      const length = ridge.getTotalLength()
      ridge.style.strokeDasharray = `${length}`
      ridge.style.strokeDashoffset = `${length}`
    }
    if (clipRect) clipRect.setAttribute('width', '0')
  }, [])

  return (
    <figure
      ref={containerRef}
      className="dubois-chart dubois-chart--mountain"
      aria-label="Black population in the Fillmore over time, area chart"
    >
      <figcaption className="dubois-chart__title">
        Black Population in the Fillmore
      </figcaption>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="dubois-mountain__svg"
        role="img"
      >
        <defs>
          <linearGradient
            id="dubois-mountain-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--dubois-crimson)" />
            <stop offset="55%" stopColor="var(--dubois-vermillion)" />
            <stop offset="100%" stopColor="var(--dubois-gold)" />
          </linearGradient>
          <clipPath id="dubois-mountain-clip">
            <rect
              className="dubois-mountain__clip-rect"
              x={0}
              y={0}
              width={0}
              height={INNER_H}
            />
          </clipPath>
        </defs>

        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <g className="dubois-mountain__grid" opacity={0}>
            {yTicks.map((tick) => (
              <line
                key={`y-${tick}`}
                x1={0}
                x2={INNER_W}
                y1={y(tick)}
                y2={y(tick)}
              />
            ))}
            {xTicks.map((tick) => (
              <line
                key={`x-${tick}`}
                y1={0}
                y2={INNER_H}
                x1={x(tick)}
                x2={x(tick)}
              />
            ))}
          </g>

          <path
            className="dubois-mountain__area"
            d={areaPath}
            fill="url(#dubois-mountain-gradient)"
            stroke="var(--dubois-gold)"
            strokeWidth={2}
            clipPath="url(#dubois-mountain-clip)"
          />

          <path
            className="dubois-mountain__ridge"
            d={linePath}
            fill="none"
            stroke="var(--exhibit-ink)"
            strokeWidth={1.5}
            opacity={0.55}
          />

          <g className="dubois-mountain__axis dubois-mountain__axis--x">
            {xTicks.map((tick) => (
              <g key={tick} transform={`translate(${x(tick)}, ${INNER_H})`}>
                <line y2={6} />
                <text y={22}>{tick}</text>
              </g>
            ))}
          </g>

          <g className="dubois-mountain__axis dubois-mountain__axis--y">
            {yTicks.map((tick) => (
              <g key={tick} transform={`translate(0, ${y(tick)})`}>
                <line x2={-6} />
                <text x={-12} dy="0.32em">
                  {formatPop(tick)}
                </text>
              </g>
            ))}
            <text
              className="dubois-mountain__axis-label"
              transform={`translate(${-52}, ${INNER_H / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              Population
            </text>
          </g>

          <g className="dubois-mountain__annot" opacity={0}>
            <line
              x1={peakX}
              x2={peakX}
              y1={y(30000)}
              y2={INNER_H}
              className="dubois-mountain__annot-line"
            />
            <text
              x={peakX}
              y={y(30000) - 14}
              textAnchor="middle"
              className="dubois-mountain__annot-text"
            >
              PEAK MIGRATION
            </text>
          </g>

          <g className="dubois-mountain__annot" opacity={0}>
            <line
              x1={renewalX}
              x2={renewalX}
              y1={y(18000)}
              y2={INNER_H}
              className="dubois-mountain__annot-line"
            />
            <text
              x={renewalX}
              y={y(18000) - 14}
              textAnchor="middle"
              className="dubois-mountain__annot-text dubois-mountain__annot-text--renewal"
            >
              URBAN RENEWAL BEGINS
            </text>
          </g>
        </g>
      </svg>
    </figure>
  )
}
