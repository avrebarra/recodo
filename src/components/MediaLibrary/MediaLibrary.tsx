import { RecordedMedia } from "../../types";
import MediaItem from "./MediaItem";

interface Props {
  mediaList: RecordedMedia[];
  currentMediaID: string | null;
  currentMediaState: string;
  playMedia: (uid: string) => void;
  pauseMedia: () => void;
  resumeMedia: () => void;
  stopMedia: () => void;
  removeMediaFromList: (uid: string) => void;
  downloadMedia: (uid: string) => void;
}

const MediaLibrary: React.FC<Props> = ({
  mediaList,
  currentMediaID,
  currentMediaState,
  playMedia,
  stopMedia,
  removeMediaFromList,
  downloadMedia,
}) => {
  return (
    <div className="library">
      {mediaList.map((e) => (
        <MediaItem
          key={`media-item-${e.uid}`}
          media={e}
          isCurrentMedia={currentMediaID == e.uid}
          currentMediaState={currentMediaState}
          play={() => playMedia(e.uid)}
          stop={stopMedia}
          removeMediaFromList={() => removeMediaFromList(e.uid)}
          downloadMedia={() => downloadMedia(e.uid)}
        />
      ))}
    </div>
  );
};

export default MediaLibrary;
