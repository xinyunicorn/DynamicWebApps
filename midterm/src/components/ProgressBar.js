// progress bar component showing overall completion
function ProgressBar(props) {
  const {progress} = props;

  return (
    <div className="overall-progress-container">
      <h2>
        Overall Progress: {progress}%
        <span className={`star ${progress === 100 ? "visible" : "hidden"}`}>⭐</span>
      </h2>
      <div className="overall-progress-bar">
        <div
          className="overall-progress-fill"
          style={{width: `${progress}%`}}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
