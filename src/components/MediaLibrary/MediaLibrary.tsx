import { RecordedMedia } from "../../types";
import ShowOn from "../ShowOn";
import EmptyState from "./EmptyState";
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
    <div className="library flex flex-col w-full">
      <ShowOn condition={mediaList.length === 0}>
        <EmptyState />
      </ShowOn>
      <div className="overflow-y-auto space-y-5 pt-20">
        {mediaList.map((e) => (
          <div key={`media-item-${e.uid}`}>
            <MediaItem
              media={e}
              isCurrentMedia={currentMediaID === e.uid}
              currentMediaState={currentMediaState}
              play={() => playMedia(e.uid)}
              stop={stopMedia}
              removeMediaFromList={() => removeMediaFromList(e.uid)}
              downloadMedia={() => downloadMedia(e.uid)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
