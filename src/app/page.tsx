"use client";

import useYouTubeEmbed from "@/hooks/useYouTubeEmbed";
import CustomAlert from "@/components/Alerts/CustomAlert";
import CustomConfirm from "@/components/Alerts/CustomConfirm";
import Form from "@/components/Form/index";
import Video from "@/components/Video/index";
import Footer from "@/components/Footer/index";

export default function Home() {
  const {
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
  } = useYouTubeEmbed();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-100">
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}

      {showConfirm && (
        <CustomConfirm
          message="Anda yakin ingin menghapus video?"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
        />
      )}

      {videoId ? (
        <Video
          videoId={videoId}
          onDelete={handleDeleteVideo}
          onPaste={handlePasteLink}
          onReady={onReady}
        />
      ) : (
        <Form
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />
      )}

      <Footer />
    </main>
  );
}
