import { useState, useEffect, useRef } from "react";
import type { YouTubePlayer, YouTubeProps } from "react-youtube";

export default function useYouTubeEmbed() {
  const [videoId, setVideoId] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const getYouTubeVideoID = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ID = getYouTubeVideoID(youtubeUrl);
    if (ID) {
      localStorage.setItem("video-id", ID);
      setVideoId(ID);
    } else {
      setAlertMessage("URL YouTube tidak valid!");
      setYoutubeUrl("");
    }
  };

  const handlePasteLink = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const ID = getYouTubeVideoID(clipboardText);
      if (ID) {
        if (ID === videoId) {
          setAlertMessage(
            "Tautan yang Anda salin adalah video yang sama dengan yang sedang diputar"
          );
          return;
        }

        setVideoId(ID);
        localStorage.setItem("video-id", ID);
      } else {
        setAlertMessage("URL YouTube tidak valid!");
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Gagal membaca clipboard. Pastikan izin diizinkan.");
    }
  };

  const onReady: YouTubeProps["onReady"] = async (e) => {
    playerRef.current = e.target;
    iframeRef.current = await e.target.getIframe();
  };

  useEffect(() => {
    const savedVideoId = localStorage.getItem("video-id");
    if (savedVideoId) setVideoId(savedVideoId);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timer);
    }

    const handleShortcuts = (e: KeyboardEvent) => {
      // ⛔ Abaikan jika fokus di input/textarea agar tidak bentrok
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      if (!playerRef.current) return;
      const player = playerRef.current;
      const state = player.getPlayerState();

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          if (state === 1) {
            player.pauseVideo();
          } else {
            player.playVideo();
          }
          break;

        case "m":
          e.preventDefault();
          if (player.isMuted()) {
            player.unMute();
          } else {
            player.mute();
          }
          break;

        case "j":
        case "arrowleft":
          e.preventDefault();
          player.seekTo(player.getCurrentTime() - 10, true);
          break;

        case "l":
        case "arrowright":
          e.preventDefault();
          player.seekTo(player.getCurrentTime() + 10, true);
          break;

        case "arrowup":
          e.preventDefault();
          player.setVolume(Math.min(player.getVolume() + 5, 100));
          break;

        case "arrowdown":
          e.preventDefault();
          player.setVolume(Math.max(player.getVolume() - 5, 0));
          break;

        case "f":
          e.preventDefault();
          if (iframeRef.current?.requestFullscreen) {
            iframeRef.current.requestFullscreen();
          }
          break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault();
          const percent = parseInt(e.key, 10);
          const duration = player.getDuration();
          player.seekTo((duration * percent) / 10, true);
          break;
      }
    };

    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [alertMessage]);

  const handleDeleteVideo = () => {
    setShowConfirm(true);
    setPendingAction(() => () => {
      setVideoId("");
      setYoutubeUrl("");
      localStorage.removeItem("video-id");
    });
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      pendingAction();
    }
    setShowConfirm(false);
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setShowConfirm(false);
    setPendingAction(null);
  };

  return {
    videoId,
    youtubeUrl,
    setYoutubeUrl,
    alertMessage,
    showConfirm,
    handleSubmit,
    handlePasteLink,
    handleDeleteVideo,
    handleConfirmAction,
    handleCancelAction,
    setAlertMessage,
    inputRef,
    onReady,
  };
}
