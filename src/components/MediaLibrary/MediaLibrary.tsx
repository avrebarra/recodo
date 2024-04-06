import { RecordedMedia } from "../../types";
import MediaItem from "./MediaItem";

interface Props {
  mediaList: RecordedMedia[];
  currentMedia: string | null;
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
  currentMedia,
  currentMediaState,
  playMedia,
  pauseMedia,
  resumeMedia,
  stopMedia,
  removeMediaFromList,
  downloadMedia,
}) => {
  return (
    <div className="library">
      {mediaList.map((e) => (
        <MediaItem
          key={`media-item-${e.uid}`}
          mediaItem={e}
          currentMedia={currentMedia}
          currentMediaState={currentMediaState}
          playMedia={playMedia}
          pauseMedia={pauseMedia}
          resumeMedia={resumeMedia}
          stopMedia={stopMedia}
          removeMediaFromList={removeMediaFromList}
          downloadMedia={downloadMedia}
        />
      ))}
    </div>
  );
};

export default MediaLibrary;
