interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

export default function CustomAlert({ message, onClose }: CustomAlertProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <p className="text-lg mb-4 dark:text-black">{message}</p>
        <button
          onClick={onClose}
          className="bg-yellow-300 text-slate-700 font-bold px-4 py-2 rounded hover:bg-yellow-400"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
