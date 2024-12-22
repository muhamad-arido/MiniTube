"use client";

import useYouTubeEmbed from "@/hooks/useYouTubeEmbed";
import CustomAlert from "@/components/Alerts/CustomAlert";
import CustomConfirm from "@/components/Alerts/CustomConfirm";
import Form from "@/components/Form/index";
import Video from "@/components/Video/index";
import Foooter from "@/components/Footer/index";

export default function Home() {
  const {
    youtubeUrl,
    setYoutubeUrl,
    embedUrl,
    alertMessage,
    showConfirm,
    handleSubmit,
    handleDeleteVideo,
    handleConfirmAction,
    handleCancelAction,
    setAlertMessage,
    inputRef,
  } = useYouTubeEmbed();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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

      {embedUrl ? (
        <Video embedUrl={embedUrl} onDelete={handleDeleteVideo} />
      ) : (
        <Form
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />
      )}

      <Foooter />
    </main>
  );
}
