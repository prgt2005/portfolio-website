import { useEffect, useRef, useState } from 'react'
import './Expertise.css'

const EXPERTISE_AREAS = [
  {
    icon: '🎨',
    title: 'Visual Design',
    description:
      'Creating compelling visual narratives through typography, color theory, and layout composition for digital and print media.',
    skills: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Canva'],
  },
  {
    icon: '🎬',
    title: 'Motion Graphics',
    description:
      'Bringing ideas to life through animation, video editing, and dynamic visual storytelling for social media and web.',
    skills: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Blender'],
  },
  {
    icon: '💻',
    title: 'Frontend Development',
    description:
      'Building responsive, interactive web experiences with modern frameworks and clean, maintainable code.',
    skills: ['HTML / CSS', 'JavaScript', 'React', 'Python'],
  },
]

export default function Expertise() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    const target = sectionRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className={`expertise-section reveal-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Expertise</h2>
          <p className="section-subtitle">
            A blend of creative design and technical skills, bridging aesthetics with functionality.
          </p>
        </div>

        <div className="expertise-grid">
          {EXPERTISE_AREAS.map((area, index) => (
            <div
              key={area.title}
              className="expertise-card"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <span className="expertise-icon">{area.icon}</span>
              <h3 className="expertise-card-title">{area.title}</h3>
              <p className="expertise-card-desc">{area.description}</p>
              <div className="expertise-skills">
                {area.skills.map((skill) => (
                  <span key={skill} className="pill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
