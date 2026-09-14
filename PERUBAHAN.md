# Perubahan Sistem Penilaian

Struktur data peserta sekarang menggunakan field:
- `no`
- `name`
- `gelombang`
- `lajur`
- `perkenaan`
- `hasil`

Kolom `sesi` sudah dihapus dari seluruh alur aplikasi dan database.
Kolom `hasil` tidak lagi dibuat otomatis dari `perkenaan`; nilai `hasil` harus berasal dari Excel.

## Supabase
Jalankan `supabase/schema.sql` di SQL Editor Supabase. Script:
- membuat/menyesuaikan semua tabel cabang + kategori;
- menambahkan `no` dan `hasil` bila belum ada;
- menghapus `sesi`;
- mempertahankan `id` dan `created_at` sebagai metadata teknis aplikasi.

## Excel
Gunakan kolom:
`No | Name | Gelombang | Lajur | Perkenaan | Hasil`

Kolom `No` boleh diisi. Jika kosong, aplikasi akan memberi nomor urut.
`Hasil` wajib diambil dari data Excel dan tidak disamakan otomatis dengan `Perkenaan`.

## Tampilan
- `Sesi Tembak` -> `Gelombang`
- `TREN SKOR PER SESI` -> `TREN SKOR PER GELOMBANG`
- Grafik menggunakan rata-rata `Hasil` per `Gelombang`.
- Tabel peserta tetap menampilkan `Perkenaan` dan `Hasil` sebagai dua nilai yang berbeda.
- Modal input nilai manual `InputNilaiModal.jsx` dihapus karena alur input menggunakan Excel.
