import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Slideshow from '../components/slideshow/Slideshow'
import RankingSlide from '../components/slideshow/RankingSlide'
import ParticipantTableSlide from '../components/slideshow/ParticipantTableSlide'
import { EVENTS } from '../config/event'
import { supabase } from '../services/supabase'

const AllEventsPapan = () => {
  const [dataByEvent, setDataByEvent] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  const fetchAll = useCallback(async () => {
    const results = await Promise.all(
      EVENTS.map(async (event) => {
        const { data, error } = await supabase
          .from(event.table)
          .select('*')
          .order('created_at', { ascending: true })
        return { event, data: data || [], error }
      })
    )

    const parseValue = (val) => (val === null || val === undefined || val === '-') ? -Infinity : Number(val)
    const sortByHasil = (rows) => [...rows].sort((a, b) => {
      const aHasil = parseValue(a.hasil)
      const bHasil = parseValue(b.hasil)
      const aPerkenaan = parseValue(a.perkenaan)
      const bPerkenaan = parseValue(b.perkenaan)
      if (aHasil !== bHasil) return bHasil - aHasil
      return bPerkenaan - aPerkenaan
    })

    const next = {}
    const nextErrors = []
    results.forEach(({ event, data, error }) => {
      next[event.id] = sortByHasil(data)
      if (error) nextErrors.push(`${event.title.join(' ')} — ${event.category}: ${error.message}`)
    })
    setDataByEvent(next)
    setErrors(nextErrors)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()

    const channels = EVENTS.map((event) =>
      supabase
        .channel(`videotron_${event.table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: event.table }, fetchAll)
        .subscribe()
    )

    return () => channels.forEach((channel) => supabase.removeChannel(channel))
  }, [fetchAll])

  const slides = useMemo(() => {
    return EVENTS.flatMap((event) => {
      const rows = dataByEvent[event.id] || []
      return [
        <RankingSlide key={`${event.id}-ranking`} rows={rows} event={event} />,
        <ParticipantTableSlide key={`${event.id}-table`} rows={rows} event={event} />,
      ]
    })
  }, [dataByEvent])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      {loading ? (
        <div style={{ color: '#fff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          Memuat seluruh cabang lomba...
        </div>
      ) : errors.length === EVENTS.length ? (
        <div style={{ color: '#fff', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
          <div>Data lomba belum bisa dimuat dari Supabase.</div>
          <Link to="/lomba" style={{ color: '#c6e84a', fontWeight: 800 }}>Buka daftar lomba</Link>
        </div>
      ) : (
        <Slideshow slides={slides} durationMs={7000} />
      )}

      <button
        type="button"
        aria-label="Buka menu cabang lomba"
        title="Menu"
        onClick={() => setMenuOpen((open) => !open)}
        style={{
          position: 'fixed', top: '1.15rem', left: '1.15rem', zIndex: 50,
          width: 48, height: 48, border: '1px solid rgba(255,255,255,.2)', borderRadius: 12,
          background: 'rgba(0,0,0,.62)', color: '#fff', fontSize: 25, cursor: 'pointer',
          backdropFilter: 'blur(6px)'
        }}
      >☰</button>

      {menuOpen && (
        <div style={{ position: 'fixed', top: '4.6rem', left: '1.15rem', zIndex: 49, width: 330, maxHeight: '78vh', overflowY: 'auto', padding: '1rem', borderRadius: 16, background: 'rgba(5,20,10,.96)', border: '1px solid rgba(255,255,255,.18)', boxShadow: '0 16px 40px rgba(0,0,0,.5)', color: '#fff' }}>
          <div style={{ fontWeight: 900, marginBottom: '.8rem', fontSize: '1rem' }}>DAFTAR LOMBA</div>
          {EVENTS.map((event) => (
            <Link
              key={event.id}
              to={`/lomba/${event.id}`}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '.7rem .8rem', marginBottom: '.35rem', borderRadius: 10, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,.07)' }}
            >
              <div style={{ fontWeight: 800 }}>{event.title.join(' ')}</div>
              <div style={{ fontSize: '.8rem', opacity: .75, marginTop: '.15rem' }}>{event.subCategory || event.category}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllEventsPapan