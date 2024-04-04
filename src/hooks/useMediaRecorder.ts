import { useState } from "react";

export const useMediaRecorder = () => {
  const [state, setState] = useState<"idle-empty" | "idle-filled" | "recording" | "paused">("idle-empty");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedURL, setRecordedURL] = useState<string | null>(null);

  const startRecording = async () => {
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
          setRecordedURL(audioUrl);
          setState("idle-filled");
        };

        setMediaRecorder(recorder);
      }

      mediaRecorder!.start();
      setState("recording");
    } catch (error) {
      console.error("error recording:", error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && state === "recording") {
      mediaRecorder.pause();
      setState("paused");
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && state === "paused") {
      mediaRecorder.resume();
      setState("recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && state !== "idle-empty") {
      mediaRecorder.stop();
      setMediaStream(null);
      setMediaRecorder(null);
      setRecordedChunks([]);
    }
  };

  const clearMedia = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setRecordedURL(null);
    }
  };

  const getMedia = () => {
    return recordedURL;
  };

  return {
    state,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    getMedia,
    clearMedia,
  };
};
