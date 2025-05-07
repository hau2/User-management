/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<any>({})
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const validate = () => {
    const newErrors: any = {}
    if (!form.email) newErrors.email = 'Email không được trống'
    if (!form.password) newErrors.password = 'Mật khẩu không được trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await axios.post('http://localhost:3000/auth/login', form)
      const token = res.data.token

      if (token) {
        localStorage.setItem('token', token)

        // Decode JWT to get role
        const payloadBase64 = token.split('.')[1]
        const payload = JSON.parse(atob(payloadBase64))
        const role = payload.role

        toast.success(res.data.message || 'Đăng nhập thành công')

        // Redirect theo role
        if (role === 'ADMIN') {
          navigate('/dashboard')
        } else {
          navigate('/home')
        }
      } else {
        toast.error('Không nhận được token từ server')
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Lỗi khi đăng nhập')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2">Đăng nhập</h1>
        <p className="text-gray-500 text-center mb-6">Đăng nhập tài khoản để sử dụng hệ thống quản lý.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" name="remember" onChange={handleChange} className="mr-2" />
              Nhớ tài khoản
            </label>
            <a href="#" className="text-blue-600 font-medium">Quên mật khẩu?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Đăng nhập
          </button>

          <p className="text-center text-sm mt-4">
            Bạn chưa có tài khoản? <a href="/register" className="text-blue-600 font-medium">Đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  )
}
