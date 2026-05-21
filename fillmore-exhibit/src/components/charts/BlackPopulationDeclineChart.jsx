import { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import gsap from 'gsap'
import { useChartScrollEnter } from '../../hooks/useChartScrollEnter'
import './DuBoisCharts.css'

const POPULATION_DATA = [
  { year: 1970, black_population: 96078, percent: 13.4 },
  { year: 1980, black_population: 86190, percent: 12.7 },
  { year: 1990, black_population: 78931, percent: 10.9 },
  { year: 2000, black_population: 60515, percent: 7.8 },
  { year: 2010, black_population: 48870, percent: 6.1 },
  { year: 2020, black_population: 47066, percent: 5.4 },
]

const MARGIN = { top: 28, right: 48, bottom: 48, left: 72 }
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
    .domain([0, d3.max(POPULATION_DATA, (d) => d.black_population) * 1.06])
    .range([INNER_H, 0])

  const area = d3
    .area()
    .x((d) => x(d.year))
    .y0(INNER_H)
    .y1((d) => y(d.black_population))
    .curve(d3.curveMonotoneX)

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.black_population))
    .curve(d3.curveMonotoneX)

  return { x, y, areaPath: area(POPULATION_DATA), linePath: line(POPULATION_DATA) }
}

const { x, y, areaPath, linePath } = buildScales()

export default function BlackPopulationDeclineChart() {
  const svgRef = useRef(null)
  const playedRef = useRef(false)

  const xTicks = POPULATION_DATA.map((d) => d.year)
  const yTicks = y.ticks(5)

  const formatPop = (value) => {
    if (value >= 1000) return `${Math.round(value / 1000)}k`
    return String(value)
  }

  const animateChart = useCallback(() => {
    if (playedRef.current || !svgRef.current) return
    playedRef.current = true

    const clipRect = svgRef.current.querySelector('.dubois-mountain__clip-rect')
    const ridge = svgRef.current.querySelector('.dubois-mountain__ridge')
    const dots = svgRef.current.querySelectorAll('.decline-chart__dot')
    const labels = svgRef.current.querySelectorAll('.decline-chart__pct')
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
      dots,
      { opacity: 0, attr: { r: 0 } },
      {
        opacity: 1,
        attr: { r: 5 },
        duration: 0.45,
        stagger: 0.1,
        delay: 1.2,
        ease: 'back.out(1.4)',
      },
    )

    gsap.fromTo(
      labels,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 1.35, ease: 'power2.out' },
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
      className="dubois-chart dubois-chart--mountain decline-chart"
      aria-label="Black population decline in San Francisco from 1970 to 2020"
    >
      <figcaption className="dubois-chart__title">
        Black Population in San Francisco
      </figcaption>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="dubois-mountain__svg"
        role="img"
      >
        <defs>
          <linearGradient
            id="decline-chart-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--dubois-teal)" />
            <stop offset="50%" stopColor="var(--dubois-vermillion)" />
            <stop offset="100%" stopColor="var(--dubois-crimson)" />
          </linearGradient>
          <clipPath id="decline-chart-clip">
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
            fill="url(#decline-chart-gradient)"
            stroke="var(--dubois-crimson)"
            strokeWidth={2}
            clipPath="url(#decline-chart-clip)"
          />

          <path
            className="dubois-mountain__ridge"
            d={linePath}
            fill="none"
            stroke="var(--exhibit-ink)"
            strokeWidth={1.5}
            opacity={0.55}
          />

          {POPULATION_DATA.map((d) => (
            <g key={d.year} transform={`translate(${x(d.year)}, ${y(d.black_population)})`}>
              <circle
                className="decline-chart__dot"
                r={5}
                fill="var(--dubois-crimson)"
                stroke="#fff"
                strokeWidth={1.5}
                opacity={0}
              />
              <text
                className="decline-chart__pct"
                y={-14}
                textAnchor="middle"
                opacity={0}
              >
                {d.percent}%
              </text>
            </g>
          ))}

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
              Black population
            </text>
          </g>
        </g>
      </svg>
    </figure>
  )
}
