import { useState } from "react";
import { RecordedMedia } from "../types";

export const useMediaLibrary = () => {
  const [list, setList] = useState<RecordedMedia[]>([]);

  const pushMedia = (item: RecordedMedia) => {
    setList([...list, item]);
  };

  const updateMedia = (uid: string, updated: RecordedMedia) => {
    const updatedList = list.map((original) => (original.uid === uid ? updated : original));
    setList(updatedList);
  };

  const removeMedia = (uid: string) => {
    const updatedList = list.filter((media) => media.uid !== uid);
    setList(updatedList);
  };

  const downloadMedia = (uid: string) => {
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

  return {
    list,
    pushMedia,
    updateMedia,
    removeMedia,
    downloadMedia,
  };
};