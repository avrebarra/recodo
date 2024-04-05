import { useState } from "react";
import { RecordedMedia } from "../types";

export const useMediaLibrary = () => {
  const [list, setList] = useState<RecordedMedia[]>([]);

  const addItem = (item: RecordedMedia) => {
    setList([...list, item]);
  };

  const updateItem = (uid: string, updated: RecordedMedia) => {
    const updatedList = list.map((original) => (original.uid === uid ? updated : original));
    setList(updatedList);
  };

  const removeItem = (uid: string) => {
    const updatedList = list.filter((media) => media.uid !== uid);
    setList(updatedList);
  };

  const downloadItem = (uid: string) => {
    const mediaItem = list.find((media) => media.uid === uid);
    if (mediaItem) {
      const link = document.createElement("a");
      link.href = mediaItem.audioURI;
      link.download = mediaItem.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const generatePlaceholderMediaName = () => {
    function padZero(number: number, length: number) {
      let str = number.toString();
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    return `recording-${padZero(list.length + 1, 3)}`;
  };

  return {
    list,
    addItem,
    updateItem,
    removeItem,
    downloadItem,
    generatePlaceholderMediaName,
  };
};
