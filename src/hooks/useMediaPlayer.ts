import { useEffect, useState } from "react";

export const useMediaPlayer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!audioElement) {
        const a = new Audio();
        a.loop = isRepeating;
        a.addEventListener("ended", () => setState("idle"));
        setAudioElement(a);
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const play = (url: string) => {
    if (isLoading || !audioElement) throw new Error("audio element not ready");

    audioElement.src = url;
    audioElement.play();
    setState("playing");
  };

  const pause = () => {
    if (isLoading || !audioElement) throw new Error("audio element not ready");
    if (state != "playing") return;

    audioElement.pause();
    setState("paused");
  };

  const resume = () => {
    if (isLoading || !audioElement) throw new Error("audio element not ready");
    if (state != "paused") return;

    audioElement.play();
    setState("playing");
  };

  const stop = () => {
    if (isLoading || !audioElement) throw new Error("audio element not ready");

    audioElement.pause();
    audioElement.currentTime = 0;
    setState("idle");
  };

  const toggleRepeat = () => {
    if (isLoading || !audioElement) throw new Error("audio element not ready");

    const newval = !isRepeating;
    audioElement.loop = newval;
    setIsRepeating(newval);
  };

  return {
    state,
    play,
    pause,
    resume,
    stop,

    isRepeating,
    toggleRepeat,
  };
};
