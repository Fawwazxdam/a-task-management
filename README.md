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

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Backend**: JSON Server (for development)
- **Form Handling**: React Hook Form

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd a-task-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3005
   ```

4. **Start the JSON Server (Backend)**
   ```bash
   npm run server
   ```
   This starts the mock API server on port 3005.

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

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

## 📁 Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Task.tsx        # Individual task component
│   ├── TaskList.tsx    # Task list container
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── TaskForm.tsx    # Task form component (if exists)
├── pages/              # Page components (routes)
│   ├── Dashboard.tsx   # Main dashboard with task list
│   ├── Login.tsx       # User login page
│   ├── Register.tsx    # User registration page
│   ├── AddTask.tsx     # Task creation page
│   ├── EditTask.tsx    # Task editing page
│   └── TaskDetail.tsx  # Task details page
├── routes/             # Routing configuration
│   └── index.tsx       # App routes definition
├── services/           # API services
│   └── api.ts          # Axios API client and endpoints
├── stores/             # State management (Zustand)
│   ├── authStore.ts    # Authentication state
│   └── themeStore.ts   # Theme state
├── types/              # TypeScript type definitions
│   └── index.ts        # Type definitions
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🔧 API Endpoints

The app uses JSON Server for mock API endpoints. All API calls are abstracted through `src/services/api.ts`.

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `PATCH /tasks/:id` - Partial update task
- `DELETE /tasks/:id` - Delete task

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user

## 🏗️ Code Documentation

### Architecture

The application follows a component-based architecture with:

- **Separation of Concerns**: Components handle UI, stores manage state
- **Type Safety**: Full TypeScript coverage with strict typing
- **State Management**: Zustand for predictable state updates
- **Routing**: Protected routes with authentication checks

### Key Components

#### Authentication Flow
- `authStore.ts`: Manages user authentication state
- `ProtectedRoute.tsx`: Guards routes requiring authentication
- Login/Register components handle user authentication

#### Task Management
- `Dashboard.tsx`: Main task overview and controls
- `TaskList.tsx`: Renders filtered task list
- `Task.tsx`: Individual task item with actions
- `AddTask.tsx` / `EditTask.tsx`: Task CRUD forms
- `TaskDetail.tsx`: Detailed task view with status management

#### Theme System
- `themeStore.ts`: Global theme state management
- All components support dark/light mode with conditional styling

### State Management

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

### Styling Guidelines

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Conditional classes based on `isDarkMode` state
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Accessibility**: Proper contrast ratios and focus states

### Development Guidelines

1. **Component Structure**:
   - Use functional components with hooks
   - Maintain consistent prop interfaces
   - Implement proper error handling

2. **State Management**:
   - Use Zustand stores for global state
   - Keep components stateless when possible
   - Handle loading and error states

3. **API Integration**:
   - Use Axios for HTTP requests
   - Implement proper error handling
   - Follow RESTful conventions

4. **TypeScript**:
   - Use strict typing
   - Define interfaces for all data structures
   - Avoid `any` type usage

## 🧪 Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint

# Build for production
npm run build
```

## 🚀 Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Serve the dist folder** using any static server

3. **Environment Variables**: Update `.env` for production API URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Developer** - Initial work

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- JSON Server for the mock API functionality
