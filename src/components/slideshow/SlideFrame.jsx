import React from 'react'

const SlideFrame = ({ children, event }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundImage: `url(${event.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#556b2f',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2.5rem 3rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <div
          style={{
            background: 'linear-gradient(180deg, #1f4d36, #163a29)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '1.25rem 2rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
          }}
        >
          {event.title.map((line) => (
            <div
              key={line}
              style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '0.5px' }}
            >
              {line}
            </div>
          ))}
          <div style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)', fontWeight: 700, marginTop: '0.5rem' }}>
            Kategori : {event.subCategory || event.category}
          </div>
        </div>
        <img
          src={event.logo}
          alt="Logo Lomba Tembak"
          style={{ height: 'clamp(90px, 10vw, 125px)', objectFit: 'contain', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))' }}
        />
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  )
}

export default SlideFrame
