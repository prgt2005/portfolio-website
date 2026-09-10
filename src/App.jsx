import { useState, useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Lightbox from './components/Lightbox'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const sectionIds = ['home', 'expertise', 'work', 'contact']

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app-root">
      <ParticleBackground />
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <Expertise />
        <Projects onSelectProject={setSelectedProject} />
        <Contact />
      </main>

      <Lightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
