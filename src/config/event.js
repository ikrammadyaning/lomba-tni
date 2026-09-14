const COMMON = {
  logo: '/images/yonif_edited.png',
  backgroundImage: '/images/bg-loreng.png',
  slideDurationMs: 7000,
  rowsRanking: 8,
  rowsTable: 9,
}

// Setiap kombinasi cabang + kategori mempunyai tabel Supabase sendiri.
// ID dipakai pada URL, sedangkan table adalah nama tabel di Supabase.
export const EVENTS = [
  {
    id: 'air-riffle-wrabf-hr-25m-junior',
    title: ['AIR RIFFLE', 'WRABF HR 25 M'],
    category: 'Junior',
    subCategory: 'WRABF HR 25 m Junior',
    table: 'hasil_air_riffle_wrabf_hr_25m_junior',
  },
  {
    id: 'air-riffle-wrabf-hr-25m-senior',
    title: ['AIR RIFFLE', 'WRABF HR 25 M'],
    category: 'Senior',
    subCategory: 'WRABF HR 25 m Senior',
    table: 'hasil_air_riffle_wrabf_hr_25m_senior',
  },
  {
    id: 'air-riffle-wrabf-lr-25m-junior',
    title: ['AIR RIFFLE', 'WRABF LR 25 M'],
    category: 'Junior',
    subCategory: 'WRABF LR 25 m Junior',
    table: 'hasil_air_riffle_wrabf_lr_25m_junior',
  },
  {
    id: 'air-riffle-wrabf-lr-25m-senior',
    title: ['AIR RIFFLE', 'WRABF LR 25 M'],
    category: 'Senior',
    subCategory: 'WRABF LR 25 m Senior',
    table: 'hasil_air_riffle_wrabf_lr_25m_senior',
  },
  {
    id: 'air-riffle-imssu-multi-range-18-41m-junior',
    title: ['AIR RIFFLE', 'IMSSU MULTI RANGE 18 - 41 M'],
    category: 'Junior',
    subCategory: 'IMSSU MULTI RANGE 18 - 41 m Junior',
    table: 'hasil_air_riffle_imssu_multi_range_18_41m_junior',
  },
  {
    id: 'air-riffle-imssu-multi-range-18-41m-senior',
    title: ['AIR RIFFLE', 'IMSSU MULTI RANGE 18 - 41 M'],
    category: 'Senior',
    subCategory: 'IMSSU MULTI RANGE 18 - 41 m Senior',
    table: 'hasil_air_riffle_imssu_multi_range_18_41m_senior',
  },
].map((event) => ({ ...COMMON, ...event }))

export const DEFAULT_EVENT_ID = 'air-riffle-wrabf-hr-25m-junior'

export function getEventById(id) {
  return EVENTS.find((event) => event.id === id) || null
}
