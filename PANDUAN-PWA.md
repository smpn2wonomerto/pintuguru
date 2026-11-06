# PINTU GURU — Paket PWA (Bisa Dipasang Seperti Aplikasi)

Paket ini membuat halaman GitHub Pages Anda menjadi **PWA**: bisa dipasang di HP
maupun laptop, punya ikon sendiri di layar utama, terbuka tanpa bilah alamat
browser (mode standalone), dan menampilkan halaman offline yang rapi saat
koneksi terputus.

---

## 1. Isi Paket

| File | Status | Fungsi |
|---|---|---|
| `index.html` | **GANTI** yang lama | Pembungkus + blok PWA (manifest, tombol pasang, petunjuk iPhone) |
| `manifest.json` | Baru | "KTP" aplikasi: nama, ikon, warna, mode standalone |
| `sw.js` | Baru | Service worker — syarat wajib agar bisa dipasang |
| `offline.html` | Baru | Halaman rapi saat koneksi terputus |
| `icons/` (5 file PNG) | Baru | Ikon aplikasi (192/512, maskable Android, apple-touch iPhone) |

## 2. Cara Upload ke GitHub

1. Buka repo GitHub yang dipakai untuk Pages Anda.
2. **Ganti** isi `index.html` dengan `index.html` dari paket ini
   (URL iframe GAS di dalamnya sudah persis sama — tidak perlu diubah).
3. **Tambahkan** `manifest.json`, `sw.js`, `offline.html`, dan folder `icons/`
   ke root repo — **sejajar** dengan `index.html` (jangan di dalam subfolder).
4. Commit. Tunggu ±1 menit sampai GitHub Pages selesai build.
5. Buka alamat Pages Anda lalu tekan **Ctrl+Shift+R** (bersihkan cache).

## 3. Cara Memasang Aplikasinya

**Android (Chrome)**
- Buka alamat Pages → tombol biru **"📲 Pasang aplikasi"** muncul di kanan bawah → ketuk → **Install**.
- Atau lewat menu ⋮ Chrome → **"Tambahkan ke layar utama"** → **Install**.

**iPhone / iPad (Safari)**
- Buka alamat Pages → ketuk tombol **"📲 Tambah ke Layar Utama"** di halaman,
  lalu ikuti 3 langkahnya (Bagikan → Tambahkan ke Layar Utama → Tambah).
- Bisa juga manual: tombol **Bagikan** di Safari → **Tambahkan ke Layar Utama**.

**Laptop / PC (Chrome, Edge)**
- Klik ikon **pasang (⊕)** di ujung kanan address bar, atau tombol
  **"📲 Pasang aplikasi"** di halaman → **Install**.

## 4. Apakah GAS (Apps Script) Perlu Diubah?

**TIDAK perlu sama sekali.** Alasannya:

- Semua syarat "bisa dipasang" (manifest, service worker, ikon) wajib berada di
  **halaman paling luar** — yaitu GitHub Pages Anda.
- Halaman GAS berada **di dalam iframe**, dan browser memang **mengabaikan**
  manifest/service worker yang berasal dari dalam iframe.
- Apps Script (`script.google.com`) tidak bisa dijadikan PWA langsung — tidak
  mengizinkan manifest/service worker — jadi pola "GitHub Pages membungkus
  iframe GAS" yang Anda pakai **justru sudah arsitektur yang benar**.

Jadi: **tidak perlu deploy ulang, tidak perlu buka Apps Script.** Cukup perbarui
isi repo GitHub Pages dengan paket ini.

## 5. Catatan Penting

- **Aplikasi tetap butuh internet** — data absensi/nilai/jurnal hidup di server
  GAS. Saat offline, `offline.html` yang muncul dengan tombol "Coba Lagi".
- **Fitur scan/kamera**: `allow="camera"` sudah ditambahkan pada iframe — jika
  sebelumnya fitur scan kamera macet saat dibuka dari GitHub Pages, sekarang
  browser bisa memberi izin kamera ke aplikasi.
- **Ganti ikon nanti?** Cukup timpa file di `icons/`, lalu naikkan versi cache di
  `sw.js` (`pintu-guru-shell-v1` → `v2`) agar perangkat yang terpasang ikut
  memperbarui.
- Pengguna yang sudah "menambahkan ke layar utama" **sebelum** paket ini dipasang
  akan tetap melihat ikon lama sampai mereka menghapus dan memasang ulang.
- URL iframe di `index.html` **jangan diubah** — itu kunci koneksi ke GAS.
