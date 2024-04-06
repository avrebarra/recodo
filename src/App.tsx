import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { useSuiteStudio } from "./hooks/useSuiteStudio";
import RecordingControl from "./components/RecordingControl";
import MediaLibrary from "./components/MediaLibrary";

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
      <GeistProvider>
        <CssBaseline />
        <RecordingControl
          currentRecordingState={currentRecordingState}
          pauseRecording={pauseRecording}
          resumeRecording={resumeRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />

        <MediaLibrary
          mediaList={mediaList}
          currentMedia={currentMedia}
          currentMediaState={currentMediaState}
          playMedia={playMedia}
          pauseMedia={pauseMedia}
          resumeMedia={resumeMedia}
          stopMedia={stopMedia}
          removeMediaFromList={removeMediaFromList}
          downloadMedia={downloadMedia}
        />

        <button type="button" onClick={toggleRepeating}>
          {isRepeating ? "disable repeat" : "enable repeat"}
        </button>
        <button type="button" onClick={toggleEcho}>
          {isEchoing ? "disable echo" : "enable echo"}
        </button>
      </GeistProvider>
    </>
  );
}

export default App;
