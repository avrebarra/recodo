import { FaCircle, FaPause, FaStop } from "react-icons/fa";
import ShowOn from "../ShowOn";
import ControlButton from "./ControlButton";

interface Props {
  state: "idle" | "recording" | "paused";
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

const RecordingControl: React.FC<Props> = ({ state, start, pause, resume, stop }) => {
  return (
    <div className="control">
      <div className="navbar flex justify-center shadow-lg shadow-slate-100 p-4 space-x-2">
        <ShowOn condition={state === "idle"}>
          <ControlButton primary={state === "idle"} icon={<FaCircle />} onClick={start} />
        </ShowOn>
        <ShowOn condition={state === "paused"}>
          <ControlButton primary={state === "paused"} icon={<FaCircle />} onClick={resume} />
        </ShowOn>
        <ShowOn condition={state === "paused" || state === "recording"}>
          <ControlButton primary={state === "recording"} icon={<FaStop />} onClick={stop} />
        </ShowOn>
        <ShowOn condition={state === "recording"}>
          <ControlButton onClick={pause} icon={<FaPause />} />
        </ShowOn>
      </div>
    </div>
  );
};

export default RecordingControl;
