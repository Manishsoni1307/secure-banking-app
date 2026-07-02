import "./Loader.css";

function Loader({
  message = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      className={`loader-container ${
        fullScreen ? "fullscreen" : ""
      }`}
    >
      <div className="loader-content">
        <div className="bank-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h5 className="loader-title">
          SecureBank
        </h5>

        <p className="loader-message">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loader;