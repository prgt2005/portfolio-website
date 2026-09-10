import { useEffect, useRef, useState } from 'react'
import './Projects.css'

/* ── Project Data ── */
const PROJECTS = [
  {
    id: 1,
    title: 'Neon Typography Poster',
    category: 'Visual Design',
    description:
      'A bold typographic poster exploring neon color palettes and modern layout composition. Designed for a digital art showcase.',
    image: '/portfolio1.jpeg',
    mediaType: 'image',
    tools: ['Adobe Photoshop', 'Illustrator'],
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'Visual Design',
    description:
      'Complete brand identity package including logo design, color system, typography guidelines, and collateral mockups.',
    image: '/portfolio2.jpeg',
    mediaType: 'image',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
  },
  {
    id: 3,
    title: 'Editorial Layout Design',
    category: 'Visual Design',
    description:
      'A magazine-style editorial spread focused on clean grids, expressive type, and high-impact imagery.',
    image: '/portfolio3.jpeg',
    mediaType: 'image',
    tools: ['Photoshop', 'InDesign'],
  },
  {
    id: 4,
    title: 'Motion Reel — Kinetic Type',
    category: 'Motion Graphics',
    description:
      'Short-form motion graphics reel featuring kinetic typography and dynamic transitions for social media content.',
    image: '/portfolio4.mp4',
    mediaType: 'video',
    src: '/portfolio4.mp4',
    tools: ['After Effects', 'Premiere Pro'],
  },
  {
    id: 5,
    title: 'Animated Visual Story',
    category: 'Motion Graphics',
    description:
      'A narrative-driven animation combining 2D motion design with atmospheric sound design and color grading.',
    image: '/portfolio5.mp4',
    mediaType: 'video',
    src: '/portfolio5.mp4',
    tools: ['After Effects', 'Blender', 'DaVinci Resolve'],
  },
  {
    id: 6,
    title: 'Content Creation',
    category: 'Content Creation',
    description:
      'Engaging video production and creative storytelling edited and crafted for digital audiences and YouTube.',
    image: 'https://img.youtube.com/vi/WYsf55CHQ8w/hqdefault.jpg',
    mediaType: 'youtube',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/WYsf55CHQ8w?autoplay=1',
    youtubeUrl: 'https://youtu.be/WYsf55CHQ8w?si=TNRe6yGIcTvTFiHc',
    tools: ['Premiere Pro', 'After Effects', 'YouTube'],
  },
  {
    id: 7,
    title: 'Zentryx — Productivity Dashboard',
    category: 'Web Application',
    description:
      'An all-in-one productivity dashboard featuring AI coaching, task management, analytics, and a modern glassmorphism UI. Built with Next.js and deployed on Netlify.',
    image: '/zentryx_preview.jpg',
    mediaType: 'webapp',
    liveUrl: 'https://zentryxai.netlify.app/',
    tools: ['Next.js', 'React', 'Tailwind CSS', 'AI'],
  },
]

const CATEGORIES = ['All', 'Visual Design', 'Motion Graphics', 'Content Creation', 'Web Application']

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All')
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
      { threshold: 0.08 }
    )

    const target = sectionRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
      observer.disconnect()
    }
  }, [])

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`projects-section reveal-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Work</h2>
          <p className="section-subtitle">
            Selected projects in visual design, motion graphics, and creative exploration.
          </p>
        </div>

        {/* ── Filter Bar with Superscript Counters ── */}
        <div className="projects-filter-bar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length
            const formattedCount = count < 10 ? `0${count}` : `${count}`

            return (
              <button
                key={cat}
                type="button"
                className={`projects-filter-btn${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span className="filter-name">{cat}</span>
                <sup className="filter-count">{formattedCount}</sup>
              </button>
            )
          })}
        </div>

        {/* ── Grid ── */}
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectProject(project)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View project: ${project.title}`}
            >
              {/* Thumbnail */}
              <div className="project-card-media">
                {project.mediaType === 'video' ? (
                  <video
                    src={project.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                      e.currentTarget.pause()
                      e.currentTarget.currentTime = 0
                    }}
                    onFocus={(e) => e.currentTarget.play()}
                    onBlur={(e) => {
                      e.currentTarget.pause()
                      e.currentTarget.currentTime = 0
                    }}
                  />
                ) : (
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    {project.mediaType === 'youtube' && (
                      <div className="project-play-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="#CCFF00">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {project.mediaType === 'webapp' && (
                      <div className="project-play-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="#CCFF00">
                          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                          <path d="M5 5v14h14v-7h-2v5H7V7h5V5H5z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="project-card-overlay">
                <div className="project-card-overlay-top">
                  <span className="project-card-category">{project.category}</span>
                </div>
                <div className="project-card-overlay-bottom">
                  <h3 className="project-card-title">{project.title}</h3>
                  <span className="project-card-cta">View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
