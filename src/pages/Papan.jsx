import React, { useMemo, useState } from 'react'
import { ArrowLeft, FileSpreadsheet } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Slideshow from '../components/slideshow/Slideshow'
import RankingSlide from '../components/slideshow/RankingSlide'
import ParticipantTableSlide from '../components/slideshow/ParticipantTableSlide'
import ImportExcelModal from '../components/slideshow/ImportExcelModal'
import { getEventById, DEFAULT_EVENT_ID } from '../config/event'
import { useHasilTembak } from '../hooks/useHasilTembak'

const Papan = ({ eventId: eventIdProp }) => {
  const { eventId: routeEventId } = useParams()
  const eventId = eventIdProp || routeEventId || DEFAULT_EVENT_ID
  const event = getEventById(eventId) || getEventById(DEFAULT_EVENT_ID)
  const { rows, loading, error, refetch } = useHasilTembak(event.table)
  const [excelOpen, setExcelOpen] = useState(false)

  const slides = useMemo(
    () => [
      <RankingSlide key="ranking" rows={rows} event={event} />,
      <ParticipantTableSlide key="table" rows={rows} event={event} />,
    ],
    [rows, event]
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      {loading ? (
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Memuat data...</div>
      ) : error ? (
        <div style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '2rem', gap: '1rem' }}>
          <div>Gagal memuat data dari Supabase:<br />{error}</div>
          <Link to="/lomba" style={{ color: '#c6e84a', fontWeight: 700 }}>Pilih Cabang / Kategori</Link>
        </div>
      ) : (
        <Slideshow slides={slides} durationMs={event.slideDurationMs} />
      )}

      <div style={{ position: 'fixed', top: '1.25rem', left: '1.25rem', zIndex: 20, display: 'flex', gap: '0.6rem' }}>
        <Link to="/lomba" title="Pilih cabang dan kategori" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1rem', borderRadius: '999px', background: 'rgba(0,0,0,0.65)', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          <ArrowLeft size={18} /> Cabang / Kategori
        </Link>
      </div>

      <button onClick={() => setExcelOpen(true)} style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 20, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.5rem', borderRadius: '999px', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
        <FileSpreadsheet size={20} /> Input Excel
      </button>

      <ImportExcelModal isOpen={excelOpen} onClose={() => setExcelOpen(false)} onSaved={refetch} event={event} />
    </div>
  )
}

export default Papan
