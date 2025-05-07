/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({
    user_name: '',
    email: '',
    password: '',
    confirm_password: '',
    date_birth: '',
    accepted: false,
  })

  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const validate = () => {
    const newErrors: any = {}
    if (!form.user_name) newErrors.user_name = 'Họ và tên không được trống'
    if (!form.email) newErrors.email = 'Email không được trống'
    if (!form.password) newErrors.password = 'Mật khẩu không được trống'
    if (form.password.length < 8) newErrors.password = 'Tối thiểu 8 ký tự'
    if (form.password !== form.confirm_password) newErrors.confirm_password = 'Mật khẩu không khớp'
    if (!form.date_birth) newErrors.date_birth = 'Vui lòng nhập ngày sinh'
    if (!form.accepted) newErrors.accepted = 'Cần đồng ý với điều khoản'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await axios.post('http://localhost:3000/users/register', form)
      toast.success(res.data.message || 'Đăng ký thành công')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Lỗi khi đăng ký')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2">Đăng ký tài khoản</h1>
        <p className="text-gray-500 text-center mb-6">Đăng ký tài khoản để sử dụng dịch vụ</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              name="user_name"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />
            {errors.user_name && <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirm_password"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />
            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <input
              type="date"
              name="date_birth"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-sm"
              onChange={handleChange}
            />
            {errors.date_birth && <p className="text-red-500 text-sm mt-1">{errors.date_birth}</p>}
          </div>

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              name="accepted"
              className="mr-2"
              onChange={handleChange}
            />
            <label>
              Bạn đồng ý với <a href="#" className="text-blue-600 underline">chính sách và điều khoản</a>
            </label>
          </div>
          {errors.accepted && <p className="text-red-500 text-sm mt-1">{errors.accepted}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={!form.accepted}
          >
            Đăng ký
          </button>

          <p className="text-center text-sm mt-4">
            Bạn đã có tài khoản? <a href="/login" className="text-blue-600 font-medium">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  )
}
