import React from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../config/event'

const EventSelector = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundImage: "url('/images/bg-loreng.png')", backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>PAPAN HASIL LOMBA</h1>
            <p style={{ marginTop: '.5rem', opacity: .85 }}>Pilih cabang dan kategori untuk membuka halaman ranking.</p>
          </div>
          <img src="/images/yonif_edited.png" alt="Logo" style={{ height: 140, maxWidth: 240, objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {EVENTS.map((event) => (
            <Link key={event.id} to={`/lomba/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '100%', padding: '1.25rem', borderRadius: 16, background: 'linear-gradient(180deg, rgba(31,77,54,.97), rgba(22,58,41,.97))', border: '2px solid rgba(255,255,255,.14)', boxShadow: '0 8px 20px rgba(0,0,0,.3)' }}>
                <div style={{ fontSize: '.8rem', fontWeight: 800, opacity: .7, marginBottom: '.55rem' }}>CABANG LOMBA</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{event.title.join(' ')}</div>
                <div style={{ marginTop: '.7rem', display: 'inline-block', padding: '.45rem .8rem', borderRadius: 999, background: '#8bc21f', fontWeight: 800, fontSize: '.9rem' }}>{event.subCategory || event.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventSelector
