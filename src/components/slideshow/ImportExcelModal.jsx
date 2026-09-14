import React, { useMemo, useState } from 'react'
import { FileSpreadsheet, Upload, X } from 'lucide-react'
import * as XLSX from 'xlsx'
import Modal from '../ui/Modal'
import { supabase } from '../../services/supabase'

const cleanNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  const number = Number(String(value).replace(',', '.'))
  return Number.isFinite(number) ? number : null
}

const getValue = (row, keys) => {
  const found = Object.keys(row).find((key) => keys.some((wanted) => key.trim().toLowerCase() === wanted))
  return found ? row[found] : null
}

const ImportExcelModal = ({ isOpen, onClose, onSaved, event }) => {
  const [fileName, setFileName] = useState('')
  const [rows, setRows] = useState([])
  const [sheetName, setSheetName] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const preview = useMemo(() => rows.slice(0, 5), [rows])

  const reset = () => {
    setFileName('')
    setRows([])
    setSheetName('')
    setMessage('')
    setError('')
  }

  const close = () => {
    if (!busy) {
      reset()
      onClose()
    }
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setMessage('')
    setFileName(file.name)

    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const wanted = workbook.SheetNames.find((name) => name.toLowerCase().trim() === event.category.toLowerCase().trim())
      const selected = wanted || workbook.SheetNames[0]
      const worksheet = workbook.Sheets[selected]
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
      const valid = json.filter((row) => {
        const name = getValue(row, ['nama peserta', 'nama', 'name'])
        const gelombang = cleanNumber(getValue(row, ['gelombang', 'gelombang ke']))
        const lajur = cleanNumber(getValue(row, ['lajur']))
        const perkenaan = cleanNumber(getValue(row, ['perkenaan']))
        const hasil = cleanNumber(getValue(row, ['hasil', 'total', 'nilai']))
        return String(name || '').trim() && gelombang !== null && lajur !== null && perkenaan !== null && hasil !== null
      })
      setSheetName(selected)
      setRows(valid)
      if (!valid.length) setError('Data peserta tidak ditemukan. Pastikan file memakai kolom No, Name/Nama, Gelombang, Lajur, Perkenaan, dan Hasil.')
    } catch (err) {
      setRows([])
      setError(`File Excel tidak bisa dibaca: ${err.message}`)
    }
  }

  const importData = async () => {
    if (!rows.length) return
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const payload = rows.map((row, index) => ({
        no: cleanNumber(getValue(row, ['no', 'nomor', 'no.'])) || index + 1,
        name: String(getValue(row, ['nama peserta', 'nama', 'name']) || '').trim(),
        gelombang: cleanNumber(getValue(row, ['gelombang', 'gelombang ke'])) || 0,
        lajur: cleanNumber(getValue(row, ['lajur'])) || 0,
        perkenaan: cleanNumber(getValue(row, ['perkenaan'])) || 0,
        hasil: cleanNumber(getValue(row, ['hasil', 'total', 'nilai'])) || 0,
      })).filter((row) => row.name)

      if (!payload.length) throw new Error('Tidak ada baris peserta yang valid.')

      const chunkSize = 100
      for (let i = 0; i < payload.length; i += chunkSize) {
        const chunk = payload.slice(i, i + chunkSize)
        const { error: insertError } = await supabase.from(event.table).insert(chunk)
        if (insertError) throw insertError
      }

      setMessage(`${payload.length} data berhasil dimasukkan ke ${event.category}.`)
      onSaved?.()
      setTimeout(close, 900)
    } catch (err) {
      setError(`Import gagal: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div style={{ width: 'min(760px, 90vw)', padding: '1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem', fontWeight: 900, fontSize: '1.25rem' }}>
              <FileSpreadsheet size={24} /> Import Nilai Excel
            </div>
            <div style={{ opacity: .7, marginTop: '.25rem' }}>{event.title.join(' ')} — {event.category}</div>
          </div>
          <button onClick={close} disabled={busy} style={{ border: 0, background: 'transparent', cursor: busy ? 'not-allowed' : 'pointer' }}><X /></button>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem', padding: '1.2rem', border: '2px dashed #90B800', borderRadius: 14, cursor: 'pointer', marginBottom: '1rem' }}>
          <Upload size={20} />
          <span>{fileName || 'Pilih file Excel (.xlsx / .xls)'}</span>
          <input type="file" accept=".xlsx,.xls" onChange={handleFile} style={{ display: 'none' }} />
        </label>

        {sheetName && <div style={{ marginBottom: '.7rem', fontSize: '.9rem' }}>Sheet terbaca: <b>{sheetName}</b> · {rows.length} baris</div>}

        {preview.length > 0 && (
          <div style={{ overflowX: 'auto', border: '1px solid #ddd', borderRadius: 10, marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
              <thead>
                <tr>
                  {['No.', 'Name', 'Gelombang', 'Lajur', 'Perkenaan', 'Hasil'].map((label) => (
                    <th key={label} style={{ padding: '.55rem', textAlign: 'left' }}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['no', 'nomor', 'no.']) || i + 1}</td>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['nama peserta', 'nama', 'name'])}</td>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['gelombang', 'gelombang ke'])}</td>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['lajur'])}</td>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['perkenaan'])}</td>
                    <td style={{ padding: '.55rem', borderTop: '1px solid #eee' }}>{getValue(row, ['hasil', 'total', 'nilai'])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {message && <div style={{ padding: '.8rem', borderRadius: 10, background: '#e9f7d1', marginBottom: '1rem' }}>{message}</div>}
        {error && <div style={{ padding: '.8rem', borderRadius: 10, background: '#fee2e2', color: '#991b1b', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.6rem' }}>
          <button onClick={close} disabled={busy} style={{ padding: '.7rem 1rem', borderRadius: 10, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Batal</button>
          <button onClick={importData} disabled={busy || !rows.length} style={{ padding: '.7rem 1.1rem', borderRadius: 10, border: 0, background: '#90B800', color: '#fff', fontWeight: 800, cursor: busy || !rows.length ? 'not-allowed' : 'pointer' }}>
            {busy ? 'Mengimpor...' : `Import ${rows.length || ''} Data`}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ImportExcelModal
