interface FormProps {
  youtubeUrl: string;
  setYoutubeUrl: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function Form({
  youtubeUrl,
  setYoutubeUrl,
  onSubmit,
  inputRef,
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Masukkan URL YouTube"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="p-3 text-lg border border-gray-300 rounded-md w-80"
      />
      <button
        type="submit"
        className="px-6 py-3 text-lg bg-yellow-400 text-slate-700 font-bold rounded-md hover:bg-yellow-300"
      >
        Tonton
      </button>
    </form>
  );
}
