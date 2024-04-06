import { RecordedMedia } from "../../types";
import ShowOn from "../ShowOn";

interface Props {
  mediaItem: RecordedMedia;
  currentMedia: string | null;
  currentMediaState: string;
  playMedia: (uid: string) => void;
  pauseMedia: () => void;
  resumeMedia: () => void;
  stopMedia: () => void;
  removeMediaFromList: (uid: string) => void;
  downloadMedia: (uid: string) => void;
}

const MediaItem: React.FC<Props> = ({
  mediaItem,
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
    <div className="media-item">
      <span className="meta">
        <span className="name">{mediaItem.name}</span>
      </span>
      <span className="actions">
        <ShowOn condition={currentMedia !== mediaItem.uid || currentMediaState === "idle"}>
          <button onClick={() => playMedia(mediaItem.uid)}>play</button>
        </ShowOn>
        <ShowOn condition={currentMedia === mediaItem.uid}>
          <ShowOn condition={currentMediaState === "playing"}>
            <button onClick={pauseMedia}>pause</button>
          </ShowOn>
          <ShowOn condition={currentMediaState === "paused"}>
            <button onClick={resumeMedia}>resume</button>
          </ShowOn>
          <ShowOn condition={currentMediaState === "playing" || currentMediaState === "paused"}>
            <button onClick={stopMedia}>stop</button>
          </ShowOn>
        </ShowOn>
        <button type="button" onClick={() => removeMediaFromList(mediaItem.uid)}>
          delete
        </button>
        <button type="button" onClick={() => downloadMedia(mediaItem.uid)}>
          download
        </button>
      </span>
    </div>
  );
};

export default MediaItem;
