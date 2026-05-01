import { useCallback, useEffect, useState } from 'react'
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
    id: 'neon-flow',
    image: group1,
    rotation: '-17deg',
    x: -18.5,
    modalTone: '#1ea9e1',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
  {
    id: 'midnight-drop',
    image: group2,
    rotation: '-10deg',
    x: -11.1,
    modalTone: '#ef3340',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
  {
    id: 'signal-wave',
    image: group3,
    rotation: '-2deg',
    x: -3.9,
    modalTone: '#0c4f63',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
  {
    id: 'soft-light',
    image: group4,
    rotation: '5deg',
    x: 3.2,
    modalTone: '#d8c0af',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
  {
    id: 'aqua-system',
    image: group5,
    rotation: '11deg',
    x: 10.2,
    modalTone: '#39d2d7',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
  {
    id: 'night-badge',
    image: group6,
    rotation: '18deg',
    x: 17.3,
    modalTone: '#0e1014',
    title: 'This is the title with max 2 lines',
    description: 'this is the description of the product',
    productName: 'Product name',
    productSummary: 'short description of the product',
  },
]

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.75 16.25 16.25 7.75" />
      <path d="M9 7.75h7.25V15" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6.75 6.75 10.5 10.5" />
      <path d="m17.25 6.75-10.5 10.5" />
    </svg>
  )
}

function MediaPlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <circle cx="10" cy="10" r="1.45" />
      <path d="m8 16 3.2-3.2a1 1 0 0 1 1.4 0L16 16" />
    </svg>
  )
}

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [modalPhase, setModalPhase] = useState('closed')

  const openModal = (card) => {
    setActiveCard(card)
    setModalPhase('opening')
  }

  const closeModal = useCallback(() => {
    if (!activeCard || modalPhase === 'closing') {
      return
    }

    setModalPhase('closing')
  }, [activeCard, modalPhase])

  useEffect(() => {
    if (!activeCard) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCard, closeModal, modalPhase])

  useEffect(() => {
    if (!activeCard || modalPhase !== 'opening') {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      setModalPhase('open')
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [activeCard, modalPhase])

  useEffect(() => {
    if (modalPhase !== 'closing') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setActiveCard(null)
      setModalPhase('closed')
    }, 320)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [modalPhase])

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

          <div className="card-showcase" aria-label="Featured projects">
            {artCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className="art-card"
                style={{
                  '--rotation': card.rotation,
                  '--x': card.x,
                }}
                onClick={() => openModal(card)}
                aria-haspopup="dialog"
                aria-label={`Open ${card.productName}`}
              >
                <div className="art-card-inner">
                  <img className="art-card-image" src={card.image} alt="" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {activeCard ? (
        <div
          className={`modal-backdrop modal-${modalPhase}`}
          onClick={closeModal}
          role="presentation"
        >
          <section
            className={`product-modal modal-${modalPhase}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            <div
              className="modal-media"
              style={{ '--modal-tone': activeCard.modalTone }}
            >
              <div className="modal-media-placeholder" aria-hidden="true">
                <MediaPlaceholderIcon />
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-copy-block">
                <h2 id="product-modal-title">{activeCard.title}</h2>
                <p className="modal-description">{activeCard.description}</p>
              </div>

              <div className="modal-product-row">
                <div className="modal-product-meta">
                  <img
                    className="modal-product-thumb"
                    src={activeCard.image}
                    alt=""
                  />

                  <div className="modal-product-copy">
                    <strong>{activeCard.productName}</strong>
                    <span>{activeCard.productSummary}</span>
                  </div>
                </div>

                <button type="button" className="modal-visit-button">
                  <span>Visit</span>
                  <ArrowUpRightIcon />
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default App
