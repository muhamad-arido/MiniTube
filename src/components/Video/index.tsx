interface IframeProps {
  embedUrl: string;
  onDelete: () => void;
}

export default function Video({ embedUrl, onDelete }: IframeProps) {
  return (
    <>
      <div className="relative w-full max-w-[1280px]">
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
      <div className="mt-4">
        <button
          onClick={onDelete}
          className="bg-yellow-300 text-slate-700 font-bold px-4 py-2 rounded hover:bg-yellow-400"
        >
          Hapus Video
        </button>
      </div>
    </>
  );
}
