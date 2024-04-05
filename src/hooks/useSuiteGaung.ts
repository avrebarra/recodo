import * as uuid from "uuid";
import { useState } from "react";
import { useMediaLibrary } from "./useMediaLibrary";
import { useMediaRecorder } from "./useMediaRecorder";
import { RecordedMedia } from "../types";
import { useMediaPlayer } from "./useMediaPlayer";

export const useSuiteGaung = () => {
  const [isEchoing, setIsEchoing] = useState<boolean>(true);

  const { record, pause, resume, stop } = useMediaRecorder();
  const { play } = useMediaPlayer();
  const { list, addItem, updateItem, downloadItem, removeItem } = useMediaLibrary();

  const generateMediaName = () => {
    function padZero(number: number, length: number) {
      let str = number.toString();
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    return `recording-${padZero(list.length + 1, 3)}`;
  };

  const generateBlobURL = (b: Blob) => {
    return URL.createObjectURL(b);
  };

  const startRecording = () => {
    record((blob) => {
      if (!blob) throw new Error("no blob emitted");

      const item: RecordedMedia = {
        uid: uuid.v4(),
        audioBlob: blob,
        name: generateMediaName(),
        recordedAt: new Date(),
      };
      addItem(item);

      if (isEchoing) {
        const bloburl = generateBlobURL(blob);
        play(bloburl);
      }
    });
  };

  const toggleEcho = () => setIsEchoing(!isEchoing);

  return {
    mediaList: list,
    startRecording,
    pauseRecording: pause,
    resumeRecording: resume,
    stopRecording: stop,

    toggleEcho,
  };
};
