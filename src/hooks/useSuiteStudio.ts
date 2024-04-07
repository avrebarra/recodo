import * as uuid from "uuid";
import { useState } from "react";
import { useMediaLibrary } from "./useMediaLibrary";
import { useMediaRecorder } from "./useMediaRecorder";
import { RecordedMedia } from "../types";
import { useMediaPlayer } from "./useMediaPlayer";

let autoIncrementID = 0;

export const useSuiteStudio = () => {
  const [isEchoing, setIsEchoing] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);

  const mediaRecorder = useMediaRecorder();
  const mediaPlayer = useMediaPlayer();
  const mediaLibrary = useMediaLibrary();

  const findMedia = (uid: string) => mediaLibrary.list.find((e) => e.uid == uid);
  const generateMediaName = () => {
    function padZero(number: number, length: number) {
      let str = number.toString();
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    autoIncrementID++;

    return `recording-${padZero(autoIncrementID, 3)}`;
  };

  const generateBlobURL = (b: Blob) => {
    return URL.createObjectURL(b);
  };

  const startRecording = () => {
    let startTime = Date.now();
    mediaRecorder.record(async (blob) => {
      if (!blob) throw new Error("no blob emitted");

      const endTime = Date.now();
      const durationInSeconds = (endTime - startTime) / 1000;

      const item: RecordedMedia = {
        uid: uuid.v4(),
        audioBlob: blob,
        audioBlobURL: generateBlobURL(blob),
        duration: durationInSeconds,
        name: generateMediaName(),
        recordedAt: new Date(),
      };
      mediaLibrary.addItem(item);

      if (isEchoing) {
        mediaPlayer.play(item.audioBlobURL);
      }
    });
  };

  const playMedia = (uid: string) => {
    const targ = findMedia(uid);
    if (!targ) throw new Error("media with id ${uid} not found!");

    setCurrentMedia(uid);
    mediaPlayer.play(targ.audioBlobURL);
  };

  const toggleEcho = () => setIsEchoing(!isEchoing);

  return {
    mediaList: mediaLibrary.list,
    currentMedia,
    currentMediaState: mediaPlayer.state,
    currentRecordingState: mediaRecorder.state,

    startRecording,
    pauseRecording: mediaRecorder.pause,
    resumeRecording: mediaRecorder.resume,
    stopRecording: mediaRecorder.stop,

    playMedia,
    pauseMedia: mediaPlayer.pause,
    resumeMedia: mediaPlayer.resume,
    stopMedia: mediaPlayer.stop,

    removeMediaFromList: mediaLibrary.removeItem,
    downloadMedia: mediaLibrary.downloadItem,

    isEchoing,
    toggleEcho,
    isRepeating: mediaPlayer.isRepeating,
    toggleRepeating: mediaPlayer.toggleRepeat,
  };
};
