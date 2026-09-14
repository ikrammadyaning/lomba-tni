import React, { useEffect, useRef, useState } from 'react'
const Slideshow = ({ slides, durationMs = 7000 }) => {
  const total = slides.length
  const [renderIndex, setRenderIndex] = useState(0)
  const [withTransition, setWithTransition] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    if (total <= 1) return undefined
    timerRef.current = setInterval(() => setRenderIndex((prev) => prev + 1), durationMs)
    return () => clearInterval(timerRef.current)
  }, [total, durationMs])

  useEffect(() => {
    if (renderIndex === total) {
      const t = setTimeout(() => {
        setWithTransition(false)
        setRenderIndex(0)
      }, 650)
      return () => clearTimeout(t)
    }
    return undefined
  }, [renderIndex, total])

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setWithTransition(true)))
      return () => cancelAnimationFrame(raf)
    }
    return undefined
  }, [withTransition])

  if (total === 0) return null

  const extendedSlides = total > 1 ? [...slides, slides[0]] : slides
  const activeDot = renderIndex % total

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: `${extendedSlides.length * 100}%`, height: '100%', transform: `translateX(-${(renderIndex * 100) / extendedSlides.length}%)`, transition: withTransition ? 'transform 0.6s ease-in-out' : 'none' }}>
        {extendedSlides.map((slide, i) => <div key={i} style={{ width: `${100 / extendedSlides.length}%`, height: '100%', flexShrink: 0 }}>{slide}</div>)}
      </div>
      {total > 1 && (
        <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          {slides.map((_, i) => <div key={i} style={{ width: i === activeDot ? '22px' : '8px', height: '8px', borderRadius: '999px', background: i === activeDot ? '#c6e84a' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s ease' }} />)}
        </div>
      )}
    </div>
  )
}

export default Slideshow
