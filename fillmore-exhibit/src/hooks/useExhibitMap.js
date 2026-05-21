import { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LAYER_CONTROLS } from '../data/exhibitContext'

// Must respect Vite base (PAGES_BASE on GitHub Pages), same as mapbox-token.json
const GEOJSON_BASE = `${import.meta.env.BASE_URL}museum/geojson`

const initialActiveLayers = () => {
  const active = new Set()
  for (const control of LAYER_CONTROLS) {
    if (control.defaultActive) {
      for (const layerId of control.layerIds) {
        active.add(layerId)
      }
    }
  }
  return active
}

function setLayersVisibility(map, layerIds, visible) {
  for (const layerId of layerIds) {
    if (!map.getLayer(layerId)) continue
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
  }
}

async function loadMapboxAccessToken() {
  const url = `${import.meta.env.BASE_URL}mapbox-token.json`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Could not load ${url}. Run "npm run sync-mapbox-token" after setting VITE_MAPBOX_ACCESS_TOKEN in .env.`,
    )
  }
  const { accessToken } = await response.json()
  if (!accessToken) {
    throw new Error(
      'mapbox-token.json is missing accessToken. Run "npm run sync-mapbox-token".',
    )
  }
  return accessToken
}

export function useExhibitMap(containerRef) {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [activeLayers, setActiveLayers] = useState(initialActiveLayers)

  const isControlActive = useCallback(
    (control) => control.layerIds.every((id) => activeLayers.has(id)),
    [activeLayers],
  )

  const toggleControl = useCallback(
    (control) => {
      const map = mapRef.current
      if (!map) return

      const currentlyActive = control.layerIds.every((id) => activeLayers.has(id))
      const nextVisible = !currentlyActive

      setLayersVisibility(map, control.layerIds, nextVisible)
      setActiveLayers((prev) => {
        const next = new Set(prev)
        for (const layerId of control.layerIds) {
          if (nextVisible) next.add(layerId)
          else next.delete(layerId)
        }
        return next
      })
    },
    [activeLayers],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let map

    loadMapboxAccessToken()
      .then((token) => {
        if (cancelled) return
        mapboxgl.accessToken = token

        map = new mapboxgl.Map({
          container,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-122.42, 37.785],
          zoom: 13.3,
        })

        map.addControl(new mapboxgl.NavigationControl())
        map.scrollZoom.disable()
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return

          map.setFog({})

          map.addSource('civic_art_collection', {
            type: 'geojson',
            data: `${GEOJSON_BASE}/Civic_Art_Collection_20260502.geojson`,
          })
          map.addLayer({
            id: 'civic_art_collection',
            type: 'circle',
            source: 'civic_art_collection',
            layout: { visibility: 'none' },
            paint: {
              'circle-radius': 5,
              'circle-color': '#80ffe6',
            },
          })

          map.addSource('cultural_districts', {
            type: 'geojson',
            data: `${GEOJSON_BASE}/Cultural_Districts_20260502.geojson`,
          })
          map.addLayer({
            id: 'cultural_districts',
            type: 'line',
            source: 'cultural_districts',
            layout: { visibility: 'none' },
            paint: {
              'line-color': '#9A7B38',
              'line-width': 1.5,
              'line-opacity': 0.6,
              'line-dasharray': [3, 3],
            },
          })

          map.addSource('fullmappinginequality', {
            type: 'geojson',
            data: `${GEOJSON_BASE}/fullmappinginequality.json`,
          })
          map.addLayer({
            id: 'fullmappinginequality',
            type: 'fill',
            source: 'fullmappinginequality',
            paint: {
              'fill-color': '#bf0000',
              'fill-opacity': 0.15,
            },
            filter: ['==', ['get', 'grade'], 'D'],
          })
          map.addLayer({
            id: 'holc-redlined-outline',
            type: 'line',
            source: 'fullmappinginequality',
            filter: ['==', ['get', 'grade'], 'D'],
            paint: {
              'line-color': '#8B2020',
              'line-width': 2,
              'line-opacity': 0.8,
            },
          })

          map.addSource('one_percent_art', {
            type: 'geojson',
            data: `${GEOJSON_BASE}/Public_Art_(from_1%25_Art_Program)_20260502.geojson`,
          })
          map.addLayer({
            id: 'one_percent_art',
            type: 'circle',
            source: 'one_percent_art',
            paint: {
              'circle-radius': 5,
              'circle-color': '#ffd52e',
            },
          })

          setMapReady(true)
        })
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      cancelled = true
      if (map) {
        map.remove()
        mapRef.current = null
        setMapReady(false)
      }
    }
  }, [containerRef])

  return { mapReady, activeLayers, isControlActive, toggleControl }
}
