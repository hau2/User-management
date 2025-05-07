import React from 'react';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
        <h3 className="text-xl font-semibold mb-2">Xác nhận</h3>
        <p className="text-gray-600 mb-4">
          Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống không?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
