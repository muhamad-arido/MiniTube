import { useState, useEffect, useRef } from "react";

export default function useYouTubeEmbed() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getYouTubeVideoID = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoID = getYouTubeVideoID(youtubeUrl);
    if (videoID) {
      const newEmbedUrl = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
      setEmbedUrl(newEmbedUrl);
      localStorage.setItem("embedUrl", newEmbedUrl);
    } else {
      setAlertMessage("URL YouTube tidak valid!");
    }
  };

  const handlePasteLink = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const videoID = getYouTubeVideoID(clipboardText);
      if (videoID) {
        const newEmbedUrl = `https://www.youtube.com/embed/${videoID}?autoplay=1`;

        if (newEmbedUrl === embedUrl) {
          setAlertMessage(
            "Tautan yang Anda salin adalah video yang sama dengan yang sedang diputar"
          );
          return;
        }

        setEmbedUrl(newEmbedUrl);
        localStorage.setItem("embedUrl", newEmbedUrl);
      } else {
        setAlertMessage("URL YouTube tidak valid!");
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Gagal membaca clipboard. Pastikan izin diizinkan.");
    }
  };

  useEffect(() => {
    const savedEmbedUrl = localStorage.getItem("embedUrl");
    if (savedEmbedUrl) {
      setEmbedUrl(savedEmbedUrl);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDeleteVideo = () => {
    setShowConfirm(true);
    setPendingAction(() => () => {
      setEmbedUrl("");
      setYoutubeUrl("");
      localStorage.removeItem("embedUrl");
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
    youtubeUrl,
    setYoutubeUrl,
    embedUrl,
    alertMessage,
    showConfirm,
    handleSubmit,
    handlePasteLink,
    handleDeleteVideo,
    handleConfirmAction,
    handleCancelAction,
    setAlertMessage,
    inputRef,
  };
}
