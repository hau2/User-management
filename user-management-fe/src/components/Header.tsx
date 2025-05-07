// src/components/Header.tsx
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div></div>
      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="text-sm text-red-600 font-medium">
          Đăng xuất
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
