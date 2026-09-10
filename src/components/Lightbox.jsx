import React, { useEffect } from 'react';
import './Lightbox.css';

/* ── Lightbox Component ── */
const Lightbox = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (onClose) onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* ── Media ── */}
        <div className="lightbox-media">
          {project.mediaType === 'video' ? (
            <video
              controls
              autoPlay
              src={project.src || project.videoUrl || project.mediaSrc}
            >
              Your browser does not support the video tag.
            </video>
          ) : project.mediaType === 'youtube' ? (
            <iframe
              src={project.youtubeEmbedUrl || project.embedUrl || (project.youtubeUrl ? `https://www.youtube.com/embed/${project.youtubeUrl.split('/').pop().split('?')[0]}?autoplay=1` : '')}
              title={project.title || 'Project Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={project.src || project.image || project.imgSrc}
              alt={project.title || 'Project Preview'}
            />
          )}
        </div>

        {/* ── Information ── */}
        <div className="lightbox-info">
          <div className="lightbox-header-row">
            <h2 className="lightbox-title">{project.title}</h2>
            {project.category && (
              <span className="lightbox-category-badge">{project.category}</span>
            )}
          </div>

          {project.description && (
            <p className="lightbox-description">{project.description}</p>
          )}

          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-youtube-link"
            >
              open_on_youtube →
            </a>
          )}

          {project.tools && (
            <div className="lightbox-tools-row">
              {Array.isArray(project.tools) ? project.tools.join(' • ') : project.tools}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
