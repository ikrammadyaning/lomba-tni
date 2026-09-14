import React from 'react'

// isHeader -> selalu hijau tebal (baris judul kolom)
// isGreen -> warna alternating untuk baris data
const RowPill = ({ cells, isHeader = false, isGreen = false }) => {
  const green = isHeader || isGreen
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderRadius: '999px',
        padding: '0 1.5rem',
        background: green ? '#8bc21f' : '#e8e8e2',
        color: green ? '#fff' : '#1a1a1a',
        fontWeight: 700,
        border: green ? '2px solid #5a8f0f' : '2px solid #aeaea6',
        fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)',
      }}
    >
      {cells.map((cell, i) => (
        <div key={i} style={{ flex: cell.flex ?? 1, textAlign: cell.align || 'center' }}>
          {cell.value}
        </div>
      ))}
    </div>
  )
}

export default RowPill
