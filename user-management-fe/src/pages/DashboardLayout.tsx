import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function DashboardLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-4">
        <h2 className="text-xl font-semibold mb-6">🔥 Ecommerce</h2>
        <nav className="flex flex-col space-y-2 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
            }
          >
            📊 Thống kê
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
            }
          >
            👤 Quản lý tài khoản
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
            }
          >
            📦 Quản lý sản phẩm
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
          <h1 className="text-lg font-semibold">Tài khoản</h1>
          <div className="flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="w-9 h-9 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Nội dung bên trong */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
