import { useState } from "react";

export const useMediaPlayer = () => {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const setURL = (url: string) => {
    if (!audio) {
      const newAudio = new Audio(url);
      setAudio(newAudio);
      return;
    }

    audio.src = url;
    audio.load();
  };

  const play = () => {
    if (!audio) return;

    audio.play();
    setState("playing");
  };

  const pause = () => {
    if (!audio) return;

    audio.pause();
    setState("paused");
  };

  const stop = () => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setState("idle");
  };

  return {
    state,
    setURL,
    play,
    pause,
    stop,
  };
};
