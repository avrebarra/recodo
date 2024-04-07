import { Button } from "@chakra-ui/react";
import { RecordedMedia } from "../../types";
import ShowOn from "../ShowOn";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";

interface Props {
  media: RecordedMedia;
  isCurrentMedia: boolean;
  currentMediaState: string;
  play: () => void;
  stop: () => void;
  removeMediaFromList: () => void;
  downloadMedia: () => void;
}

const MediaItem: React.FC<Props> = ({ media, isCurrentMedia, currentMediaState, play, stop, removeMediaFromList, downloadMedia }) => {
  const fmtDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours > 0 ? hours.toString() + "h" : "";
    const formattedMinutes = minutes.toString() + "m"; // Always show minutes
    const formattedSeconds = remainingSeconds > 0 ? remainingSeconds.toString() + "s" : "";

    const formattedTime = [formattedHours, formattedMinutes, formattedSeconds].filter((piece) => piece !== "").join("");

    return formattedTime === "" ? "0s" : formattedTime;
  };

  return (
    <div className="media-item">
      <div className="media-item flex flex-row justify-between">
        <div className="left flex flex-row space-x-4">
          <div className="actions">
            <ShowOn condition={!isCurrentMedia || currentMediaState === "idle"}>
              <Button borderRadius={100} height="48px" onClick={play}>
                <FaPlay />
              </Button>
            </ShowOn>
            <ShowOn condition={isCurrentMedia}>
              <ShowOn condition={currentMediaState === "playing" || currentMediaState === "paused"}>
                <Button borderRadius={100} height="48px" onClick={stop}>
                  <FaStop />
                </Button>
              </ShowOn>
            </ShowOn>
          </div>
          <div className="meta">
            <div className="track-name font-semibold">{media.name}</div>
            <div className="duration text-sm">{fmtDuration(media.duration)}</div>
          </div>
        </div>
        <div className="right flex flex-row items-center space-x-2">
          <RiDeleteBin6Fill className="h-5 w-5" onClick={() => removeMediaFromList()} />
          <LuDownload className="h-5 w-5" onClick={() => downloadMedia()} />
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
