import React from "react";
import { BiX } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";

function DeleteAlert({
  handleDelete,
  onClose,
}: {
  handleDelete: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="size-6 text-red-400"/>
            <h2 className="text-xl font-semibold text-red-400">Delete Alert</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <BiX className="size-5" />
          </button>
        </div>

          <div className="mb-4">
            <p className="font-medium">This snippet will be deleted permanantely.</p>
          </div>
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500/10 text-white rounded-lg hover:bg-gray-600/10 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
      </div>
    </div>
  );
}

export default DeleteAlert;
