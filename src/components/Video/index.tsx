"use client";
import { useState } from "react";
import YouTube, {
  YouTubeEvent,
  YouTubeProps,
  YouTubePlayer,
} from "react-youtube";

interface VideoProps {
  videoId: string;
  onDelete: () => void;
  onPaste: () => Promise<void>;
  onReady: (event: YouTubeEvent<YouTubePlayer>) => void;
}

export default function Video({
  videoId,
  onDelete,
  onPaste,
  onReady,
}: VideoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
    },
  };

  return (
    <div
      className="relative w-full max-w-[1280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Responsive wrapper (16:9) */}
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-lg bg-black">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          iframeClassName="absolute top-0 left-0 w-full h-full rounded-xl"
        />
      </div>

      {/* Buttons */}
      <div
        className={`flex flex-col sm:flex-row px-4 sm:px-0 gap-3 justify-center mt-6 transition-opacity duration-500 ease-in-out 
        ${isHovered ? "opacity-100" : "sm:opacity-0"}`}
      >
        <button
          onClick={onPaste}
          className="flex-1 sm:flex-none sm:w-40 text-slate-800 py-2 font-semibold rounded-lg shadow-lg transform transition-all hover:bg-yellow-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Ganti Video
        </button>
        <button
          onClick={onDelete}
          className="flex-1 sm:flex-none sm:w-40 text-slate-800 py-2 font-semibold rounded-lg shadow-lg transform transition-all hover:bg-red-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Hapus Video
        </button>
      </div>
    </div>
  );
}
