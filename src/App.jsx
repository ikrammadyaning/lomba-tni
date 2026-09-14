import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Dashboard from './pages/Dashboard'
import Papan from './pages/Papan'
import EventSelector from './pages/EventSelector'
import AllEventsPapan from './pages/AllEventsPapan'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { DEFAULT_EVENT_ID } from './config/event'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Pilih cabang + kategori */}
        <Route path="/lomba" element={<EventSelector />} />
        {/* Setiap kombinasi cabang + kategori punya halaman sendiri */}
        <Route path="/lomba/:eventId" element={<Papan />} />

        {/* Tetap pertahankan URL lama: 100m Umum */}
        <Route path="/" element={<AllEventsPapan />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  )
}

export default App
