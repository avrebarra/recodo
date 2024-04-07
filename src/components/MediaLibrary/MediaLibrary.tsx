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
    <div className="library flex flex-col space-y-5">
      {mediaList.map((e) => (
        <div key={`media-item-${e.uid}`}>
          <MediaItem
            media={e}
            isCurrentMedia={currentMediaID == e.uid}
            currentMediaState={currentMediaState}
            play={() => playMedia(e.uid)}
            stop={stopMedia}
            removeMediaFromList={() => removeMediaFromList(e.uid)}
            downloadMedia={() => downloadMedia(e.uid)}
          />
        </div>
      ))}
    </div>
  );
};

export default MediaLibrary;
