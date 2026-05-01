import logo from '../droopslab.svg'
import group1 from '../folder-image-stacked/Group 1.png'
import group2 from '../folder-image-stacked/Group 2.png'
import group3 from '../folder-image-stacked/Group 3.png'
import group4 from '../folder-image-stacked/Group 4.png'
import group5 from '../folder-image-stacked/Group 5.png'
import group6 from '../folder-image-stacked/Group 6.png'
import './App.css'

const artCards = [
  {
    image: group1,
    rotation: '-17deg',
    x: -18.5,
  },
  {
    image: group2,
    rotation: '-10deg',
    x: -11.1,
  },
  {
    image: group3,
    rotation: '-2deg',
    x: -3.9,
  },
  {
    image: group4,
    rotation: '5deg',
    x: 3.2,
  },
  {
    image: group5,
    rotation: '11deg',
    x: 10.2,
  },
  {
    image: group6,
    rotation: '18deg',
    x: 17.3,
  },
]

function App() {
  return (
    <div className="page">
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <main className="shell">
        <header className="topbar">
          <div className="brand" aria-label="DroopsLab logo" role="img">
            <img className="brand-logo" src={logo} alt="DroopsLab" />
          </div>
        </header>

        <section className="hero" id="hero">
          <p className="eyebrow">Built for the next generation</p>
          <h1>
            Turn ideas into digital experiences poeple{' '}
            <span className="headline-accent">actually loves.</span>
          </h1>
          <p className="hero-copy">
            DroopsLab is a product studio that builds mobile apps and website
            for the next generation. Fast, design-led and obsessed with impact.
          </p>

          <div className="card-showcase" aria-hidden="true">
            {artCards.map((card) => (
              <article
                key={`${card.image}-${card.rotation}`}
                className="art-card"
                style={{
                  '--rotation': card.rotation,
                  '--x': card.x,
                }}
              >
                <div className="art-card-inner">
                  <img className="art-card-image" src={card.image} alt="" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
