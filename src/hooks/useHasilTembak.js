import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export function useHasilTembak(tableName) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRows = useCallback(async () => {
    if (!tableName) {
      setRows([])
      setError('Tabel lomba belum ditentukan.')
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('no', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      const sortedData = (data || []).sort((a, b) => {
        const parseValue = (val) => (val === null || val === undefined || val === '-') ? -Infinity : Number(val)
        const aHasil = parseValue(a.hasil)
        const bHasil = parseValue(b.hasil)
        const aPerkenaan = parseValue(a.perkenaan)
        const bPerkenaan = parseValue(b.perkenaan)

        if (aHasil !== bHasil) return bHasil - aHasil
        return bPerkenaan - aPerkenaan
      })
      setRows(sortedData)
      setError(null)
    }
    setLoading(false)
  }, [tableName])

  useEffect(() => {
    fetchRows()

    if (!tableName) return undefined

    // Realtime dipasang hanya pada tabel event yang sedang dibuka.
    const channel = supabase
      .channel(`hasil_tembak_${tableName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        () => fetchRows()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchRows, tableName])

  return { rows, loading, error, refetch: fetchRows }
}
