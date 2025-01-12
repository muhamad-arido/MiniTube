import { useState } from "react";

interface IframeProps {
  embedUrl: string;
  onDelete: () => void;
  onPaste: () => Promise<void>;
}

export default function Video({ embedUrl, onDelete, onPaste }: IframeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-[1280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        <iframe
          width="1280"
          height="720"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[720px] rounded-xl"
        ></iframe>
      </div>

      <div
        className={`flex gap-2 justify-center mt-6 transition-opacity duration-500 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={onPaste}
          className="w-2/12 min-w-fit text-slate-800 py-2 font-semibold rounded-lg shadow-lg transform transition-all hover:bg-yellow-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Ganti Video
        </button>
        <button
          onClick={onDelete}
          className="w-2/12 min-w-fit text-slate-800 font-semibold rounded-lg shadow-lg transform transition-all hover:bg-red-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Hapus Video
        </button>
      </div>
    </div>
  );
}
