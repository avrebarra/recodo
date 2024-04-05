import { useState } from "react";

export const useMediaRecorder = () => {
  const [state, setState] = useState<"idle" | "recording" | "paused">("idle");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const record = async (onAvailableURL: (url: string) => void) => {
    try {
      if (!mediaStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
      }

      if (!mediaRecorder) {
        const recorder = new MediaRecorder(mediaStream!);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks([...recordedChunks, event.data]);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(recordedChunks, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          onAvailableURL(audioUrl);
          setState("idle");
        };

        setMediaRecorder(recorder);
      }

      mediaRecorder!.start();
      setState("recording");
    } catch (error) {
      console.error("error recording:", error);
    }
  };

  const pause = () => {
    if (!mediaRecorder || state !== "recording") return;

    mediaRecorder.pause();
    setState("paused");
  };

  const resume = () => {
    if (!mediaRecorder || state !== "paused") return;

    mediaRecorder.resume();
    setState("recording");
  };

  const stop = () => {
    if (!mediaRecorder || state == "idle") return;

    mediaRecorder.stop();
    setMediaStream(null);
    setMediaRecorder(null);
    setRecordedChunks([]);
  };

  const clearMedia = () => {
    if (!mediaStream) return;
    mediaStream.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  };

  return {
    state,
    record,
    pause,
    resume,
    stop,
    clearMedia,
  };
};
