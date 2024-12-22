# MiniTube

Aplikasi sederhana untuk menonton YouTube tanpa patah-patah di laptop kentang. Dibangun menggunakan **Next.js** dengan App Router, **Tailwind CSS**, dan desain komponen modular untuk performa optimal.

---

## Fitur Utama

- **Input URL YouTube:**
  - Memvalidasi URL YouTube yang dimasukkan pengguna.
  - Mengonversi URL menjadi URL embed untuk iframe.
- **Pemutaran Video:**
  - Menampilkan video dalam elemen iframe responsif.
  - Dukungan autoplay untuk pengalaman menonton yang mulus.
- **Penyimpanan URL:**
  - URL video terakhir disimpan di localStorage sehingga tidak hilang saat aplikasi dimuat ulang.
- **Tombol Hapus:**
  - Menghapus URL video dan reset aplikasi.
- **Alert dan Confirm:**
  - Komponen custom untuk memberi feedback dan konfirmasi aksi pengguna.

---

## Teknologi yang Digunakan

- **[Next.js](https://nextjs.org/):** Framework React modern untuk pengembangan aplikasi web.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework utility-first untuk styling.
- **Atomic Design:** Struktur komponen modular untuk kemudahan pengelolaan.

---

## Demo

Aplikasi ini telah dideploy dan dapat diakses di:
[MiniTube - https://mini-tube-hazel.vercel.app](https://mini-tube-hazel.vercel.app)

---

## Cara Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal:

### 1. Clone Repositori

```bash
git clone https://github.com/muhamad-arido/MiniTube.git
```

### 2. Masuk ke Direktori Proyek

```bash
cd MiniTube
```

### 3. Instal Dependensi

Pastikan Anda sudah menginstal **Node.js** dan **npm** atau **yarn** di sistem Anda.

```bash
npm install
```

atau dengan Yarn:

```bash
yarn install
```

### 4. Jalankan Proyek

Untuk menjalankan aplikasi di mode pengembangan:

```bash
npm run dev
```

atau dengan Yarn:

```bash
yarn dev
```

Akses aplikasi di [http://localhost:3000](http://localhost:3000).

---

## Kontribusi

Jika Anda ingin berkontribusi, silakan fork repositori ini dan buat pull request dengan perubahan atau fitur yang diusulkan.

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
