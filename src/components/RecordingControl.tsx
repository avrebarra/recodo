import ShowOn from "./ShowOn";

interface Props {
  currentRecordingState: string;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
}

const RecordingControl: React.FC<Props> = ({ currentRecordingState, startRecording, pauseRecording, resumeRecording, stopRecording }) => {
  return (
    <div className="control">
      <div className="recording-control">
        <ShowOn condition={currentRecordingState === "idle"}>
          <button type="button" onClick={startRecording}>
            record
          </button>
        </ShowOn>
        <ShowOn condition={currentRecordingState === "recording"}>
          <button type="button" onClick={pauseRecording}>
            pause
          </button>
        </ShowOn>
        <ShowOn condition={currentRecordingState === "paused"}>
          <button type="button" onClick={resumeRecording}>
            resume
          </button>
        </ShowOn>
        <ShowOn condition={currentRecordingState === "paused" || currentRecordingState === "recording"}>
          <button type="button" onClick={stopRecording}>
            stop
          </button>
        </ShowOn>
      </div>
    </div>
  );
};

export default RecordingControl;
