# Panduan Setup — Papan Tampilan Lomba Tembak

## Konsep baru
Sekarang **setiap kombinasi cabang + kategori mempunyai halaman dan tabel Supabase sendiri**.

Contoh:
- Menembak Senapan 3 Sikap 100 Meter — Umum -> `hasil_tembak` (tabel lama, data tetap dipakai)
- Menembak Senapan 3 Sikap 100 Meter — TNI/Polri -> `hasil_tembak_100m_tni_polri`
- Menembak Senapan 3 Sikap 300 Meter — Umum -> `hasil_tembak_300m_umum`
- Menembak Senapan 3 Sikap 300 Meter — TNI/Polri -> `hasil_tembak_300m_tni_polri`
- dan seterusnya.

Dengan begitu data Umum tidak tercampur dengan TNI/Polri atau cabang lain.

## Setup Supabase
1. Buka project Supabase -> **SQL Editor** -> New query.
2. Copy seluruh isi `supabase/schema.sql` lalu **Run**.
3. Buka **Project Settings -> API**, ambil Project URL dan anon public key.
4. Isi `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=isi-anon-key-kamu
   ```

## Menjalankan project
```bash
npm install
npm run dev
```

## Halaman
- `/lomba` -> daftar semua cabang + kategori.
- `/lomba/:eventId` -> halaman khusus satu cabang + satu kategori.
- `/` -> otomatis membuka **Menembak Senapan 3 Sikap 100 Meter — Umum** agar URL lama tetap berfungsi.

Setiap halaman lomba tetap memakai **2 slide** seperti desain yang sudah ada:
1. **Peringkat** — ranking peserta + statistik/tren.
2. **Tabel peserta** — data detail peserta.

Slide berganti otomatis setiap 7 detik dan data hanya diambil dari tabel Supabase milik cabang/kategori tersebut.

## Daftar event
1. Menembak Senapan 3 Sikap 100 Meter — Umum
2. Menembak Senapan 3 Sikap 100 Meter — TNI/Polri
3. Menembak Senapan 3 Sikap 300 Meter — Umum
4. Menembak Senapan 3 Sikap 300 Meter — TNI/Polri
5. Menembak Senapan 3 Sikap 600 Meter — Umum
6. Menembak Senapan 3 Sikap 600 Meter — TNI/Polri
7. Falling Plate — Umum
8. Falling Plate — TNI/Polri
9. Eksekutif 20 Meter — Umum
10. Eksekutif 20 Meter — TNI/Polri
11. Pistol NON IPSC (5 Stage) — Umum
12. Pistol NON IPSC (5 Stage) — TNI/Polri
13. Pistol IPSC Level II (10 Stage) — Umum
14. Pistol IPSC Level II (10 Stage) — TNI/Polri
15. Air Riffle — WRABF HR 25 m Junior
16. Air Riffle — WRABF HR 25 m Senior
17. Air Riffle — WRABF LR 25 m Junior
18. Air Riffle — WRABF LR 25 m Senior
19. Air Riffle — IMSSU MULTI RANGE 18 - 41 m Junior
20. Air Riffle — IMSSU MULTI RANGE 18 - 41 m Senior

## Catatan
- Struktur tampilan, background, logo, ranking dan tabel tetap menggunakan komponen desain lama.
- Yang dibuat dinamis adalah **judul, kategori, URL, dan sumber tabel Supabase**.
- Realtime juga hanya subscribe ke tabel event yang sedang dibuka.
