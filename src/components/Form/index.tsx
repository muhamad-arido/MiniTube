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
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[600px] px-4"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Masukkan URL YouTube"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="flex-1 w-full p-3 text-base sm:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:text-black"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-semibold text-slate-800 bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Tonton
      </button>
    </form>
  );
}
