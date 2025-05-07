// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 font-bold text-xl">🔥 Ecommerce</div>
      <nav className="space-y-2 px-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm hover:bg-blue-50 ${
              isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-700'
            }`
          }
        >
          <span>🏠</span> Thống kê
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm hover:bg-blue-50 ${
              isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-700'
            }`
          }
        >
          <span>👥</span> Quản lý tài khoản
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm hover:bg-blue-50 ${
              isActive ? 'text-blue-600 bg-blue-100' : 'text-gray-700'
            }`
          }
        >
          <span>📦</span> Quản lý sản phẩm
        </NavLink>
      </nav>
    </aside>
  )
}
