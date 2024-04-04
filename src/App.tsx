function App() {
  return (
    <>
      <div className="control">
        <div className="playback-control">
          <button type="button">play</button>
          <button type="button">pause</button>
          <button type="button">stop</button>
        </div>
        <div className="recording-control">
          <button type="button">record</button>
          <button type="button">pause</button>
          <button type="button">stop</button>
        </div>
      </div>
      <div className="library">
        <div className="media-item">
          <button type="button">play</button>
          <button type="button">delete</button>
          <button type="button">download</button>
        </div>
      </div>
    </>
  );
}

export default App;
