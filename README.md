# Aplikasi Manajemen Tugas

Aplikasi manajemen tugas modern dan responsif yang dibangun dengan React, TypeScript, dan Vite. Fitur autentikasi pengguna, operasi CRUD untuk tugas, dan antarmuka mode gelap/terang yang indah.

## 🚀 Fitur

- **Autentikasi Pengguna**: Fungsi pendaftaran dan login dengan sesi persisten
- **Manajemen Tugas**: Buat, baca, perbarui, dan hapus tugas
- **Pelacakan Status Tugas**: Atur tugas berdasarkan status (Pending, On Progress, Completed)
- **Pencarian & Filter**: Cari tugas berdasarkan judul/deskripsi dan filter berdasarkan status
- **Mode Gelap/Terang**: Beralih antara tema dengan preferensi persisten
- **Desain Responsif**: Berfungsi dengan lancar di desktop dan perangkat mobile
- **Pembaruan Real-time**: Pembaruan UI instan dengan pembaruan optimis
- **Validasi Form**: Validasi sisi klien dengan penanganan error

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Manajemen State**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Ikon**: Lucide React
- **Backend**: JSON Server (untuk development)
- **Penanganan Form**: React Hook Form

## 📋 Prasyarat

- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

## 🚀 Instalasi & Setup

1. **Clone repositori**
   ```bash
   git clone <repository-url>
   cd a-task-management
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di direktori root:
   ```env
   VITE_API_BASE_URL=http://localhost:3005
   ```

4. **Jalankan JSON Server (Backend)**
   ```bash
   npm run server
   ```
   Ini akan menjalankan server API mock di port 3005.

5. **Jalankan Server Development**
   ```bash
   npm run dev
   ```
   Aplikasi akan tersedia di `http://localhost:5173`

### Akun Default untuk Testing

Untuk memudahkan testing, gunakan akun default berikut:
- **Email**: admin@example.com
- **Password**: password

Atau Anda dapat mendaftar akun baru melalui halaman registrasi.

## 📖 Penggunaan

### Pendaftaran & Login Pengguna

1. **Daftar**: Navigasi ke `/register` dan buat akun baru
2. **Login**: Gunakan kredensial Anda untuk login di `/login`
3. **Persistensi Sesi**: Status login Anda dipertahankan di seluruh sesi browser

### Mengelola Tugas

1. **Lihat Tugas**: Dashboard menampilkan semua tugas dengan opsi pencarian dan filter
2. **Tambah Tugas**: Klik "Tambah Tugas Baru" untuk membuat tugas baru
3. **Edit Tugas**: Klik pada tugas apa pun atau gunakan tombol edit untuk memodifikasi
4. **Hapus Tugas**: Gunakan tombol hapus (dengan konfirmasi)
5. **Ubah Status**: Klik tombol status untuk memperbarui progress tugas

### Mode Gelap

- Beralih mode gelap/terang menggunakan ikon bulan/matahari di navigasi atas
- Preferensi tema disimpan dan bertahan di seluruh sesi

## 📁 Struktur Proyek

```
src/
├── components/         # Komponen React yang dapat digunakan ulang
│   ├── Task.tsx        # Komponen tugas individual
│   ├── TaskList.tsx    # Container daftar tugas
│   ├── ProtectedRoute.tsx # Wrapper perlindungan rute
│   └── TaskForm.tsx    # Komponen form tugas (jika ada)
├── pages/              # Komponen halaman (routes)
│   ├── Dashboard.tsx   # Dashboard utama dengan daftar tugas
│   ├── Login.tsx       # Halaman login pengguna
│   ├── Register.tsx    # Halaman registrasi pengguna
│   ├── AddTask.tsx     # Halaman pembuatan tugas
│   ├── EditTask.tsx    # Halaman edit tugas
│   └── TaskDetail.tsx  # Halaman detail tugas
├── routes/             # Konfigurasi routing
│   └── index.tsx       # Definisi rute aplikasi
├── services/           # Layanan API
│   └── api.ts          # Klien Axios dan endpoint API
├── stores/             # Manajemen state (Zustand)
│   ├── authStore.ts    # State autentikasi
│   └── themeStore.ts   # State tema
├── types/              # Definisi tipe TypeScript
│   └── index.ts        # Definisi tipe
├── App.tsx             # Komponen aplikasi utama
└── main.tsx            # Titik masuk aplikasi
```

## 🔧 Endpoint API

Aplikasi menggunakan JSON Server untuk endpoint API mock. Semua panggilan API diabstraksikan melalui `src/services/api.ts`.

### Tugas
- `GET /tasks` - Mendapatkan semua tugas
- `GET /tasks/:id` - Mendapatkan tugas berdasarkan ID
- `POST /tasks` - Membuat tugas baru
- `PUT /tasks/:id` - Memperbarui tugas
- `PATCH /tasks/:id` - Memperbarui sebagian tugas
- `DELETE /tasks/:id` - Menghapus tugas

### Pengguna
- `GET /users` - Mendapatkan semua pengguna
- `POST /users` - Membuat pengguna baru

## 🏗️ Dokumentasi Kode

### Arsitektur

Aplikasi mengikuti arsitektur berbasis komponen dengan:

- **Pemisahan Perhatian**: Komponen menangani UI, store mengelola state
- **Keamanan Tipe**: Cakupan TypeScript penuh dengan typing yang ketat
- **Manajemen State**: Zustand untuk pembaruan state yang dapat diprediksi
- **Routing**: Rute yang dilindungi dengan pemeriksaan autentikasi

### Komponen Utama

#### Alur Autentikasi
- `authStore.ts`: Mengelola state autentikasi pengguna
- `ProtectedRoute.tsx`: Melindungi rute yang memerlukan autentikasi
- Komponen Login/Register menangani autentikasi pengguna

#### Manajemen Tugas
- `Dashboard.tsx`: Ringkasan dan kontrol tugas utama
- `TaskList.tsx`: Merender daftar tugas yang difilter
- `Task.tsx`: Item tugas individual dengan aksi
- `AddTask.tsx` / `EditTask.tsx`: Form CRUD tugas
- `TaskDetail.tsx`: Tampilan detail tugas dengan manajemen status

#### Sistem Tema
- `themeStore.ts`: Manajemen state tema global
- Semua komponen mendukung mode gelap/terang dengan styling kondisional

### Manajemen State

#### Auth Store
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
```

#### Theme Store
```typescript
interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
```

### Panduan Styling

- **Tailwind CSS**: Framework CSS utility-first
- **Dark Mode**: Kelas kondisional berdasarkan state `isDarkMode`
- **Responsif**: Pendekatan mobile-first dengan breakpoint `sm:`, `md:`, `lg:`
- **Aksesibilitas**: Rasio kontras yang tepat dan state focus

### Panduan Development

1. **Struktur Komponen**:
   - Gunakan komponen fungsional dengan hooks
   - Pertahankan interface prop yang konsisten
   - Implementasikan penanganan error yang tepat

2. **Manajemen State**:
   - Gunakan store Zustand untuk state global
   - Jaga komponen agar stateless jika memungkinkan
   - Tangani state loading dan error

3. **Integrasi API**:
   - Gunakan Axios untuk request HTTP
   - Implementasikan penanganan error yang tepat
   - Ikuti konvensi RESTful

4. **TypeScript**:
   - Gunakan typing yang ketat
   - Definisikan interface untuk semua struktur data
   - Hindari penggunaan tipe `any`

## 🧪 Testing

```bash
# Jalankan test
npm run test

# Jalankan linting
npm run lint

# Build untuk production
npm run build
```

## 🚀 Deployment

1. **Build aplikasi**
   ```bash
   npm run build
   ```

2. **Serve folder dist** menggunakan server statis apa pun

3. **Variabel Environment**: Update `.env` untuk URL API production

## 🤝 Contributing

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/fitur-hebat`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur hebat'`)
4. Push ke branch (`git push origin feature/fitur-hebat`)
5. Buka Pull Request

## 📝 License

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Penulis

- **Developer** - Pekerjaan awal

## 🙏 Ucapan Terima Kasih

- Tim React untuk framework yang amazing
- Tailwind CSS untuk framework CSS utility-first
- JSON Server untuk fungsionalitas API mock
