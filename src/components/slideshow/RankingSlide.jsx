import React from 'react'
import SlideFrame from './SlideFrame'
import RowPill from './RowPill'

const StatCard = ({ value, label }) => (
  <div
    style={{
      flex: 1,
      background: 'linear-gradient(180deg, #1f4d36, #163a29)',
      border: '2px solid rgba(255,255,255,0.15)',
      borderRadius: '14px',
      padding: '1.25rem 1.5rem',
      textAlign: 'right',
    }}
  >
    <div style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#c6e84a', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', marginTop: '0.5rem', fontWeight: 600 }}>{label}</div>
  </div>
)

const RankingSlide = ({ rows, rankedRows, event }) => {
  const pesertaSelesai = rows.length
  // Filter rows with placeholder results and sort
  const validRows = rows.filter(row => row.hasil !== '-')
  const gelombangSet = new Set(validRows.map((r) => r.gelombang))
  const gelombangCount = gelombangSet.size
  const skorTertinggi = validRows.length ? Math.max(...validRows.map((r) => r.hasil)) : 0

  const perGelombang = Array.from(gelombangSet)
    .sort((a, b) => a - b)
    .map((gelombang) => {
      const gelombangRows = validRows.filter((r) => r.gelombang === gelombang)
      const avg = gelombangRows.reduce((sum, r) => sum + r.hasil, 0) / gelombangRows.length
      return { gelombang, value: Math.round(avg * 10) / 10 }
    })
  const maxValue = Math.max(1, ...perGelombang.map((s) => s.value))

  // Sort valid rows by Hasil desc, then Perkenaan desc
  const sortedRows = Array.isArray(validRows) ? validRows.sort((a, b) => {
    const aHasil = a.hasil
    const bHasil = b.hasil
    const aPerkenaan = a.perkenaan
    const bPerkenaan = b.perkenaan

    if (aHasil !== bHasil) return bHasil - aHasil
    return bPerkenaan - aPerkenaan
  }) : []

  const rowCount = event.rowsRanking
  const topRows = sortedRows.slice(0, rowCount)

  return (
    <SlideFrame event={event}>
      <div style={{ display: 'flex', gap: '1.75rem', height: '100%' }}>
        {/* Kolom kiri: No / Name / Hasil */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <RowPill isHeader cells={[
            { value: 'No.', flex: 0.6, align: 'left' },
            { value: 'Name', flex: 2 },
            { value: 'Hasil', flex: 1 },
          ]} />
          {Array.from({ length: rowCount }, (_, i) => {
            const row = topRows[i]
            const isGreen = i % 2 === 1
            return (
              <RowPill
                key={row?.id || i}
                isGreen={isGreen}
                cells={[
                  { value: `${i + 1}.`, flex: 0.6, align: 'left' },
                  { value: row ? row.name : '-', flex: 2 },
                  { value: row ? row.hasil : '-', flex: 1 },
                ]}
              />
            )
          })}
        </div>

        {/* Kolom kanan: stat cards + chart */}
        <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <StatCard value={pesertaSelesai} label="Peserta yang selesai menembak" />
            <StatCard value={gelombangCount} label="Gelombang" />
            <StatCard value={skorTertinggi} label="Skor Tertinggi" />
          </div>

          <div
            style={{
              flex: 1,
              background: 'linear-gradient(180deg, #1f4d36, #163a29)',
              border: '2px solid rgba(255,255,255,0.15)',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '1rem' }}>
              TREN SKOR PER GELOMBANG
            </div>
            {perGelombang.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
                Belum ada data gelombang
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                {perGelombang.map((s) => (
                  <div key={s.gelombang} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ marginBottom: '0.4rem', fontWeight: 700 }}>{s.value}</div>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '60px',
                        height: `${(s.value / maxValue) * 100}%`,
                        background: '#c6e84a',
                        borderRadius: '6px 6px 0 0',
                        minHeight: '6px',
                      }}
                    />
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Gelombang {s.gelombang}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

export default RankingSlide
