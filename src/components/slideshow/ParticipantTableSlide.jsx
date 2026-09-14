import React from 'react'
import SlideFrame from './SlideFrame'
import RowPill from './RowPill'

const ParticipantTableSlide = ({ rows, event }) => {
  const rowCount = event.rowsTable
  
  // Data sudah diurutkan dari useHasilTembak.js
  // Kita hanya perlu memisahkan baris yang memiliki hasil (valid) dan yang kosong
  const validRows = rows.filter(row => row.hasil !== null && row.hasil !== undefined && row.hasil !== '-')
  const emptyRows = rows.filter(row => row.hasil === null || row.hasil === undefined || row.hasil === '-')
  
  const displayRows = [...validRows, ...emptyRows]

  return (
    <SlideFrame event={event}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5rem' }}>
        <RowPill isHeader cells={[
          { value: 'No.', flex: 0.6, align: 'left' },
          { value: 'Name', flex: 2 },
          { value: 'Gelombang', flex: 1.4 },
          { value: 'Lajur', flex: 1 },
          { value: 'Perkenaan', flex: 1.4 },
          { value: 'Hasil', flex: 1 },
        ]} />
        {Array.from({ length: rowCount }, (_, i) => {
          const row = displayRows[i]
          const isGreen = i % 2 === 1
          return (
            <RowPill
              key={row?.id || i}
              isGreen={isGreen}
              cells={[
                { value: row && (row.hasil !== null && row.hasil !== undefined && row.hasil !== '-') ? `${i + 1}.` : '-', flex: 0.6, align: 'left' },
                { value: row ? row.name : '-', flex: 2 },
                { value: row ? row.gelombang : '-', flex: 1.4 },
                { value: row ? row.lajur : '-', flex: 1 },
                { value: row ? row.perkenaan : '-', flex: 1.4 },
                { value: row ? row.hasil : '-', flex: 1 },
              ]}
            />
          )
        })}
      </div>
    </SlideFrame>
  )
}

export default ParticipantTableSlide
