/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UpdateUserModalProps {
  onClose: () => void;
  onUserUpdated: () => void;
  user: {
    id: number;
    user_name: string;
    date_birth: string;
    email: string;
    password: string;
    status: "ACTIVE" | "INACTIVE";
  };
}

export default function UpdateUserModal({
  onClose,
  onUserUpdated,
  user,
}: UpdateUserModalProps) {
  const [form, setForm] = useState<any>({
    user_name: user.user_name,
    date_birth: user.date_birth,
    email: user.email,
    status: user.status,
  });

    const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({ ...prev, status: e.target.value }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.user_name) newErrors.user_name = "Họ và tên không được để trống";
    if (!form.date_birth) {
      newErrors.date_birth = "Ngày sinh không được để trống";
    } else {
      const selectedDate = new Date(form.date_birth);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date_birth = "Ngày sinh không được lớn hơn ngày hiện tại";
      }
    }
    if (!form.email) newErrors.email = "Email không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3000/users/${user.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật tài khoản thành công");
      onUserUpdated();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message.join('\n') || "Lỗi khi cập nhật tài khoản"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cập nhật tài khoản</h2>
          <button onClick={onClose} className="text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="text"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              name="date_birth"
              value={form.date_birth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="date"
            />
            {errors.date_birth && (
              <p className="text-red-500 text-sm mt-1">{errors.date_birth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={user ? "Nhập mật khẩu mới nếu muốn thay đổi" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="ACTIVE"
                  checked={form.status === "ACTIVE"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Đang hoạt động
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="INACTIVE"
                  checked={form.status === "INACTIVE"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Ngừng hoạt động
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#4094F7] text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
