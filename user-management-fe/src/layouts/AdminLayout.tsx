// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
