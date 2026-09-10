import { useState, useEffect, useRef } from 'react'
import './Hero.css'

const ROLES = ['Visual Designer', 'Motion Designer', 'Creative Developer']
const TYPE_SPEED = 100
const DELETE_SPEED = 50
const PAUSE_DURATION = 2000

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentRole = ROLES[roleIndex]

    if (!isDeleting && text === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
      return () => clearTimeout(timeoutRef.current)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
      return
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    timeoutRef.current = setTimeout(() => {
      setText(
        currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeoutRef.current)
  }, [text, isDeleting, roleIndex])

  const scrollToWork = (e) => {
    e.preventDefault()
    const el = document.getElementById('work')
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            Pragati <span className="neon-glow">Anand</span>
          </h1>
          <div className="hero-role-wrapper">
            <span className="hero-role-prefix">I'm a&nbsp;</span>
            <span className="hero-role neon-glow">{text}</span>
            <span className="hero-cursor">|</span>
          </div>
          <p className="hero-bio">
            CS Graduate exploring visual design, motion graphics, and creative
            media. Based in New Delhi, India.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn-neon" onClick={scrollToWork}>
              View My Work
            </a>
            <a
              href="/CV_Pragati_Anand0809.pdf"
              download
              className="btn-ghost"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-text">scroll down</span>
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  )
}
