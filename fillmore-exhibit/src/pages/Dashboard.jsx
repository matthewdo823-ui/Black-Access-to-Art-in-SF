import { Link } from 'react-router-dom'
import './Dashboard.css'

const EXHIBITS = [
  { index: 'I', title: 'The Harlem of the West', path: '/exhibit/1', active: true },
  { index: 'II', title: 'Urban Renewal', path: '/exhibit/3', active: false },
  { index: 'III', title: 'A Moderninity Gap in the Map', path: '/exhibit/3', active: false },
]

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="hero-header">
          <p className="hero-eyebrow">SAN FRANCISCO · A SPATIAL INVESTIGATION</p>
          <h1>
            The Fillmore Erased:
            <br />
            Art, Space & Black Displacement
          </h1>
          <p className="hero-copy">
            Three exhibits revealing how a neighborhood lost its culture; and where
            the San Fransisco's arts went instead.
          </p>
        </header>

        <section className="exhibit-grid">
          {EXHIBITS.map((exhibit) => (
            <Link
              key={exhibit.index}
              to={exhibit.path}
              className="exhibit-card-link"
            >
              <article
                className={`exhibit-card${exhibit.active ? ' active' : ''}`}
              >
                <span className="exhibit-index">{exhibit.index}</span>
                <h2>{exhibit.title}</h2>
              </article>
            </Link>
          ))}
        </section>

        <div className="dashboard-action">
          <Link className="enter-button" to="/exhibit/1">
            Enter the collection
          </Link>
        </div>
      </div>
    </div>
  )
}
