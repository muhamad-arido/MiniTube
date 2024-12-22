interface CustomConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CustomConfirm({
  message,
  onConfirm,
  onCancel,
}: CustomConfirmProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-yellow-300 text-slate-700 font-bold px-4 py-2 rounded hover:bg-yellow-400"
          >
            Ya
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-slate-700 font-bold px-4 py-2 rounded hover:bg-gray-400"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}
