import { EXHIBIT_ATMOSPHERE } from '../data/exhibitAtmosphere'
import './ExhibitAtmosphere.css'

export default function ExhibitAtmosphere({ variant = 'collection' }) {
  const layers = EXHIBIT_ATMOSPHERE[variant] ?? EXHIBIT_ATMOSPHERE.collection

  return (
    <div className="exhibit-atmosphere" aria-hidden="true">
      <div className="exhibit-atmosphere__base" />
      <div className="exhibit-atmosphere__striation" />
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={`exhibit-atmosphere__photo exhibit-atmosphere__photo--${layer.placement}`}
          style={{ backgroundImage: `url("${layer.src}")` }}
        />
      ))}
      <div className="exhibit-atmosphere__grain" />
      <div className="exhibit-atmosphere__veil" />
    </div>
  )
}
