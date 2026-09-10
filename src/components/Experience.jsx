/*
 * ═══════════════════════════════════════════
 *  EXPERIENCE SECTION — Easily Removable
 *  To remove this section entirely:
 *   1. Delete this file (Experience.jsx)
 *   2. Delete Experience.css
 *   3. In App.jsx: remove the import line and <Experience /> from <main>
 *   4. Optionally: remove 'experience' from the sectionIds array in App.jsx
 *   5. Optionally: remove the '// experience' entry from Navbar.jsx NAV_ITEMS
 * ═══════════════════════════════════════════
 */

import { useEffect, useRef, useState } from 'react'
import './Experience.css'

const TIMELINE = [
  {
    period: '2021 — 2025',
    title: 'B.Tech in Computer Science',
    subtitle: 'Undergraduate Degree',
    description:
      'Completed a comprehensive Computer Science program covering data structures, algorithms, databases, and software engineering. Built a strong technical foundation alongside a growing passion for visual design and creative media.',
    tags: ['Python', 'JavaScript', 'Data Structures', 'Web Development'],
  },
  {
    period: '2023 — Present',
    title: 'Self-taught Visual & Motion Designer',
    subtitle: 'Creative Exploration',
    description:
      'Dove deep into the world of visual design and motion graphics through online courses, personal projects, and continuous experimentation. Developed proficiency across the Adobe Creative Suite, Figma, and Blender through hands-on portfolio work.',
    tags: ['Photoshop', 'After Effects', 'Figma', 'Blender', 'Premiere Pro'],
  },
  {
    period: 'Now & Beyond',
    title: 'Open to Opportunities',
    subtitle: 'Looking Ahead',
    description:
      'Actively seeking entry-level creative roles, internships, and collaborative projects in visual design, motion graphics, and frontend development. Eager to contribute fresh ideas and grow within a creative team.',
    tags: ['Visual Design', 'Motion Graphics', 'Frontend Dev', 'Internships'],
  },
]

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className={`experience-section reveal-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My journey from CS fundamentals to creative design and what comes next.
          </p>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, index) => (
            <div
              key={item.title}
              className="timeline-item"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* ── Marker ── */}
              <div className="timeline-marker-col">
                <div className="timeline-dot" />
                {index < TIMELINE.length - 1 && <div className="timeline-line" />}
              </div>

              {/* ── Content ── */}
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-subtitle">{item.subtitle}</span>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="pill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
