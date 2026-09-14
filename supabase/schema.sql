-- ============================================================
-- DATABASE / SUPABASE SCHEMA — PAPAN HASIL LOMBA
-- ============================================================
-- Setiap kombinasi CABANG + KATEGORI menggunakan tabel yang berbeda dengan struktur: No, Name, Gelombang, Lajur, Perkenaan, Hasil.
-- Contoh:
--   100m Umum      -> hasil_tembak
--   100m TNI/Polri -> hasil_tembak_100m_tni_polri
--
-- Jalankan seluruh file ini di Supabase -> SQL Editor.
-- Script dibuat idempotent: aman dijalankan ulang.

create extension if not exists "pgcrypto";

create or replace function public.setup_lomba_table(table_name text)
returns void
language plpgsql
as $$
begin
  execute format($sql$
    create table if not exists public.%I (
      id uuid primary key default gen_random_uuid(),
      no int not null,
      name text not null,
      gelombang int not null,
      lajur int not null,
      perkenaan int not null default 0,
      hasil int not null default 0,
      created_at timestamptz not null default now()
    )
  $sql$, table_name);

  -- Migrasi tabel lama:
  -- 1) pastikan kolom No dan Hasil tersedia
  -- 2) hapus kolom Sesi karena sekarang seluruh sistem memakai Gelombang
  execute format('alter table public.%I add column if not exists no int', table_name);
  execute format('alter table public.%I add column if not exists hasil int not null default 0', table_name);
  execute format('alter table public.%I drop column if exists sesi', table_name);

  -- Data lama yang belum memiliki No diberi nomor berdasarkan urutan id.
  execute format($sql$
    with numbered as (
      select id, row_number() over (order by created_at, id) as rn
      from public.%I
      where no is null
    )
    update public.%I t
    set no = numbered.rn
    from numbered
    where t.id = numbered.id
  $sql$, table_name, table_name);

  execute format('alter table public.%I alter column no set not null', table_name);

  execute format('alter table public.%I enable row level security', table_name);

  execute format('drop policy if exists "Public can read %s" on public.%I', table_name, table_name);
  execute format('drop policy if exists "Public can insert %s" on public.%I', table_name, table_name);

  execute format('create policy "Public can read %s" on public.%I for select using (true)', table_name, table_name);
  execute format('create policy "Public can insert %s" on public.%I for insert with check (true)', table_name, table_name);

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = table_name
  ) then
    execute format('alter publication supabase_realtime add table public.%I', table_name);
  end if;
end;
$$;

-- ============================================================
-- MENEMBAK SENAPAN 3 SIKAP 100 METER
-- ============================================================
select public.setup_lomba_table('hasil_tembak');
select public.setup_lomba_table('hasil_tembak_100m_tni_polri');

-- ============================================================
-- MENEMBAK SENAPAN 3 SIKAP 300 METER
-- ============================================================
select public.setup_lomba_table('hasil_tembak_300m_umum');
select public.setup_lomba_table('hasil_tembak_300m_tni_polri');

-- ============================================================
-- MENEMBAK SENAPAN 3 SIKAP 600 METER
-- ============================================================
select public.setup_lomba_table('hasil_tembak_600m_umum');
select public.setup_lomba_table('hasil_tembak_600m_tni_polri');

-- ============================================================
-- FALLING PLATE
-- ============================================================
select public.setup_lomba_table('hasil_falling_plate_umum');
select public.setup_lomba_table('hasil_falling_plate_tni_polri');

-- ============================================================
-- EKSEKUTIF 20 METER
-- ============================================================
select public.setup_lomba_table('hasil_eksekutif_20m_umum');
select public.setup_lomba_table('hasil_eksekutif_20m_tni_polri');

-- ============================================================
-- PISTOL NON IPSC (5 STAGE)
-- ============================================================
select public.setup_lomba_table('hasil_pistol_non_ipsc_5_stage_umum');
select public.setup_lomba_table('hasil_pistol_non_ipsc_5_stage_tni_polri');

-- ============================================================
-- PISTOL IPSC LEVEL II (10 STAGE)
-- ============================================================
select public.setup_lomba_table('hasil_pistol_ipsc_level_ii_10_stage_umum');
select public.setup_lomba_table('hasil_pistol_ipsc_level_ii_10_stage_tni_polri');

-- ============================================================
-- AIR RIFFLE
-- ============================================================
select public.setup_lomba_table('hasil_air_riffle_wrabf_hr_25m_junior');
select public.setup_lomba_table('hasil_air_riffle_wrabf_hr_25m_senior');
select public.setup_lomba_table('hasil_air_riffle_wrabf_lr_25m_junior');
select public.setup_lomba_table('hasil_air_riffle_wrabf_lr_25m_senior');
select public.setup_lomba_table('hasil_air_riffle_imssu_multi_range_18_41m_junior');
select public.setup_lomba_table('hasil_air_riffle_imssu_multi_range_18_41m_senior');

-- Setelah semua selesai, function helper ini tidak diperlukan lagi.
drop function if exists public.setup_lomba_table(text);
