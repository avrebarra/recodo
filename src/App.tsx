import { Button, ChakraProvider } from "@chakra-ui/react";
import { FaRepeat } from "react-icons/fa6";
import { PiBirdFill } from "react-icons/pi";
import MediaLibrary from "./components/MediaLibrary";
import RecordingControl from "./components/RecordingControl";
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
      <ChakraProvider>
        <div className="min-h-screen flex flex-col">
          <div className="py-2 px-4 flex-none sticky top-0 z-10"></div>
          <div className="flex flex-grow overflow-y-auto p-6">
            <MediaLibrary
              mediaList={mediaList}
              currentMediaID={currentMedia}
              currentMediaState={currentMediaState}
              playMedia={playMedia}
              pauseMedia={pauseMedia}
              resumeMedia={resumeMedia}
              stopMedia={stopMedia}
              removeMediaFromList={removeMediaFromList}
              downloadMedia={downloadMedia}
            />
          </div>

          <div className="p-4 flex-none sticky bottom-0 z-10">
            <div className="floater grid grid-cols-3 grid-rows-1 py-4 px-8 border border-slate-50 rounded-xl shadow-2xl shadow-slate-300 bg-white items-center">
              <div></div>
              <div className="mid justify-center">
                <RecordingControl
                  state={currentRecordingState}
                  pause={pauseRecording}
                  resume={resumeRecording}
                  start={startRecording}
                  stop={stopRecording}
                />
              </div>
              <div className="right flex justify-end space-x-2">
                <Button
                  borderRadius={100}
                  size={"sm"}
                  variant={isRepeating ? "solid" : "outline"}
                  colorScheme={isRepeating ? "teal" : undefined}
                  onClick={toggleRepeating}
                >
                  <FaRepeat />
                </Button>
                <Button
                  borderRadius={100}
                  size={"sm"}
                  variant={isEchoing ? "solid" : "outline"}
                  colorScheme={isEchoing ? "teal" : undefined}
                  onClick={toggleEcho}
                >
                  <PiBirdFill />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
