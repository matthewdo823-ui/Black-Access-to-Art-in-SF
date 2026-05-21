import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Exhibit1 from './pages/Exhibit1'
import Exhibit2 from './pages/Exhibit2'
import Exhibit3 from './pages/Exhibit3'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/exhibit/1" element={<Exhibit1 />} />
      <Route path="/exhibit/2" element={<Exhibit2 />} />
      <Route path="/exhibit/3" element={<Exhibit3 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
