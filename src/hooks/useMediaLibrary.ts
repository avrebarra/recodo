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
      const { audioBlob, name } = mediaItem;
      const blobUrl = URL.createObjectURL(audioBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;
      link.click();
    }
  };

  return {
    list,
    addItem,
    updateItem,
    removeItem,
    downloadItem,
  };
};
