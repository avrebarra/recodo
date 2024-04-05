import { useEffect, useState } from "react";

export const useMediaRecorder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<"idle" | "recording" | "paused">("idle");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!mediaStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const record = (onAvailableBlob: (b: Blob) => void) => {
    try {
      if (isLoading) throw new Error("recorder not ready");
      let audioChunks: Blob[] = [];

      const recorder = new MediaRecorder(mediaStream!);
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioChunks = [];
        onAvailableBlob(audioBlob);
        setState("idle");
      };

      recorder.start();
      setMediaRecorder(recorder);
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
  };

  return {
    state,
    record,
    pause,
    resume,
    stop,
  };
};
