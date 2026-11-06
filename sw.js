/* ============================================================
   PINTU GURU — Service Worker pembungkus (GitHub Pages)
   ------------------------------------------------------------
   Tugasnya hanya dua:
   1. Memenuhi syarat "bisa dipasang" (kriteria PWA Chrome/Edge).
   2. Menampilkan halaman offline yang rapi saat koneksi terputus.

   Data absensi / nilai / jurnal TIDAK pernah disimpan di sini —
   semuanya selalu diambil langsung dari server Google Apps
   Script supaya tetap akurat dan terbaru.
   ============================================================ */

const CACHE = 'pintu-guru-shell-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Pasang: simpan kerangka halaman pembungkus */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* Aktif: hapus sisa cache versi lama */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Fetch:
   - Permintaan lintas domain (iframe Google Apps Script) → dibiarkan
     lewat normal, TIDAK disentuh sama sekali.
   - Navigasi halaman pembungkus → coba jaringan dulu; kalau gagal
     (offline), tampilkan offline.html.
   - Ikon / aset pembungkus → ambil dari cache bila sudah ada. */
self.addEventListener('fetch', (event) => {
  let url;
  try { url = new URL(event.request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return; // iframe GAS: lewatkan

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const salin = res.clone();
          caches.open(CACHE)
            .then((c) => c.put('./index.html', salin))
            .catch(() => {});
          return res;
        })
        .catch(() => caches.match('./offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((kena) => kena || fetch(event.request))
  );
});
