import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'home', label: '// home' },
  { id: 'expertise', label: '// expertise' },
  { id: 'work', label: '// work' },
  { id: 'contact', label: '// contact' },
]

export default function Navbar({ activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header className={`navbar-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="navbar-brand" onClick={(e) => scrollTo(e, 'home')}>
          Pragati Anand
        </a>

        <nav className="navbar-desktop">
          <ul className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`navbar-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={(e) => scrollTo(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar-mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`navbar-mobile-link${activeSection === item.id ? ' active' : ''}`}
              onClick={(e) => scrollTo(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
