import ProgressBar from "./components/ProgressBar.js";
import ProgressControls from "./components/ProgressControls.js";

const progressBarRootElement = document.querySelector(".progress");
const progressControlsRootElement = document.querySelector(".progress-controls")

const progressBar = new ProgressBar(progressBarRootElement);

new ProgressControls(
  progressControlsRootElement,
  progressBar
)
