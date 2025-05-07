/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/users", {
      params: { keyword, status, page },
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data.data || []);
    setTotalPages(Math.ceil(res.data.total / 10));
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, status, page]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tài khoản</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4094F7] text-white px-4 py-2 rounded"
        >
          Thêm mới tài khoản
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6 justify-end">
        <select
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="INACTIVE">Ngừng hoạt động</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm tài khoản theo tên"
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-sm text-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">Họ và tên</th>
              <th className="px-6 py-4 font-medium text-gray-700">Ngày sinh</th>
              <th className="px-6 py-4 font-medium text-gray-700">Email</th>
              <th className="px-6 py-4 font-medium text-gray-700">Quyền hạn</th>
              <th className="px-6 py-4 font-medium text-gray-700">
                Trạng thái
              </th>
              <th className="px-6 py-4 font-medium text-gray-700">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 border-b last:border-b-0"
                style={{ borderColor: "#EAECF0" }}
              >
                <td
                  className="whitespace-nowrap font-semibold text-gray-900"
                  style={{ padding: 26 }}
                >
                  {user.user_name}
                </td>
                <td className="whitespace-nowrap font-semibold text-gray-900">
                  {new Date(user.date_birth).toLocaleDateString("vi-VN")}
                </td>
                <td className="whitespace-nowrap font-semibold text-gray-900">
                  {user.email}
                </td>
                <td className="whitespace-nowrap font-semibold text-gray-900">
                  {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                </td>
                <td className="whitespace-nowrap font-semibold text-gray-900">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {user.status === "ACTIVE"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </span>
                </td>
                <td className="whitespace-nowrap flex items-center justify-center gap-3">
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      setUserToDelete(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrashAlt size={16} />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => {
                      setEditingUser(user);
                    }}
                  >
                    <FaPen size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onUserAdded={() => {
            // gọi API hoặc cập nhật danh sách user sau khi thêm
            fetchUsers(); // giả sử bạn có hàm này
          }}
        />
      )}

      {editingUser && (
        <UpdateUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={fetchUsers}
        />
      )}

      {showDeleteModal && userToDelete && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            const token = localStorage.getItem("token");

            try {
              await axios.delete(
                `http://localhost:3000/users/${userToDelete.id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              toast.success("Xóa tài khoản thành công!");
              setShowDeleteModal(false);
              fetchUsers(); // cập nhật danh sách
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message || "Xóa tài khoản thất bại!"
              );
            }
          }}
        />
      )}
    </div>
  );
}
