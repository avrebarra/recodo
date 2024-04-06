import ShowOn from "./components/ShowOn";
import { useSuiteStudio } from "./hooks/useSuiteStudio";

function App() {
  const {
    mediaList,
    currentMedia,
    currentMediaState,
    currentRecordingState,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    playMedia,
    pauseMedia,
    resumeMedia,
    stopMedia,
    removeMediaFromList,
    downloadMedia,

    isEchoing,
    toggleEcho,
    isRepeating,
    toggleRepeating,
  } = useSuiteStudio();
  return (
    <>
      <div className="control">
        {/* <div className="playback-control">
          <button type="button">play</button>
          <button type="button">pause</button>
          <button type="button">stop</button>
        </div> */}
        <div className="recording-control">
          <ShowOn condition={currentRecordingState == "idle"}>
            <button type="button" onClick={startRecording}>
              record
            </button>
          </ShowOn>
          <ShowOn condition={currentRecordingState == "recording"}>
            <button type="button" onClick={pauseRecording}>
              pause
            </button>
          </ShowOn>
          <ShowOn condition={currentRecordingState == "paused"}>
            <button type="button" onClick={resumeRecording}>
              resume
            </button>
          </ShowOn>
          <ShowOn condition={currentRecordingState == "paused" || currentRecordingState == "recording"}>
            <button type="button" onClick={stopRecording}>
              stop
            </button>
          </ShowOn>
          <button type="button" onClick={toggleEcho}>
            {isEchoing ? "disable echo" : "enable echo"}
          </button>
        </div>
      </div>
      <button type="button" onClick={toggleRepeating}>
        {isRepeating ? "disable repeat" : "enable repeat"}
      </button>
      <div className="library">
        {mediaList.map((e) => (
          <div key={`media-item-${e.uid}`} className="media-item">
            <span className="meta">
              <span className="name">{e.name}</span>
            </span>
            <span className="actions">
              <ShowOn condition={currentMedia != e.uid || currentMediaState == "idle"}>
                <button onClick={() => playMedia(e.uid)}>play</button>
              </ShowOn>

              <ShowOn condition={currentMedia == e.uid}>
                <ShowOn condition={currentMediaState == "playing"}>
                  <button onClick={pauseMedia}>pause</button>
                </ShowOn>
                <ShowOn condition={currentMediaState == "paused"}>
                  <button onClick={resumeMedia}>resume</button>
                </ShowOn>
                <ShowOn condition={currentMediaState == "playing" || currentMediaState == "paused"}>
                  <button onClick={stopMedia}>stop</button>
                </ShowOn>
              </ShowOn>
              <button type="button" onClick={() => removeMediaFromList(e.uid)}>
                delete
              </button>
              <button type="button" onClick={() => downloadMedia(e.uid)}>
                download
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
