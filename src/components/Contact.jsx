import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Contact.css';

/* ── Contact Component ── */
export default function Contact({ className = '' }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const currentTarget = sectionRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText('prgt2005@gmail.com').then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section reveal-up ${isVisible ? 'visible' : ''} ${className}`.trim()}
    >
      <div className="section-header contact-header">
        <h2 className="section-title">// contact</h2>
        <p className="section-subtitle">
          Open for entry-level creative roles, internships, and visual collaborations.
        </p>
      </div>

      <div className="terminal-box">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot close" />
            <span className="terminal-dot minimize" />
            <span className="terminal-dot expand" />
          </div>
          <span className="terminal-title">terminal — bash</span>
        </div>

        <div className="terminal-body">
          <div className="terminal-command">&gt; ./say_hello</div>
          <div className="terminal-output">
            &quot;Awaiting input...&quot;<span className="cursor-blink" />
          </div>

          <div className="terminal-actions">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=prgt2005@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon contact-btn"
            >
              $ email (prgt2005@gmail.com)
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-ghost contact-btn"
            >
              {copied ? '$ email_copied_to_clipboard!' : '$ copy_email'}
            </button>
            <a
              href="https://www.linkedin.com/in/pragati-anand-675121325"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost contact-btn"
            >
              $ linkedin
            </a>
          </div>
        </div>
      </div>

      <footer className="contact-footer">
        © {currentYear}. Designed and built by Pragati Anand.
      </footer>
    </section>
  );
}
