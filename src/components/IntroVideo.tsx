import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const VIDEO_SRC = '/video/intro.mp4?v=1'
const POSTER_SRC = '/video/intro-poster.jpg?v=1'
const CAPTIONS_SRC = '/video/intro.en.vtt?v=1'

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const handlePlay = () => {
    setStarted(true)
    requestAnimationFrame(() => {
      void videoRef.current?.play()
    })
  }

  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="intro-video-heading"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
        Introduction
      </p>
      <h2 id="intro-video-heading" className="text-2xl md:text-3xl font-bold mb-3">
        Prefer watching over reading?
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Eight minutes on my background, the projects I maintain, and how I work.
      </p>

      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
        <video
          ref={videoRef}
          className="h-full w-full"
          poster={POSTER_SRC}
          preload="none"
          controls={started}
          playsInline
          aria-describedby="intro-video-note"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <track
            kind="captions"
            src={CAPTIONS_SRC}
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support embedded video.{' '}
          <a href={VIDEO_SRC}>Download the introduction</a>.
        </video>

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/35 transition-colors hover:bg-slate-950/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/60"
            aria-label="Play the eight minute introduction video, with English captions"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform group-hover:scale-105">
              <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-medium text-white drop-shadow">
              Watch introduction · 8 min
            </span>
          </button>
        )}
      </div>

      <p id="intro-video-note" className="mt-3 text-sm text-slate-500">
        English captions available from the player controls.
      </p>
    </motion.section>
  )
}
