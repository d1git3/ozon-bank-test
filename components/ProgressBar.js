import { setSelector } from "../utils.js"


export default class ProgressBar {
  RADIUS = 70
  INITIAL_VALUE = 50

  getSelector = setSelector("js-data-progress")

  selectors = {
    progressBar: this.getSelector("bar"),
    value: this.getSelector("value"),
  }

  stateClasses = {
    isAnimated: "is-animated",
    isHidden: "is-hidden"
  }

  constructor(rootElement) {
    if (!rootElement) {
      throw new Error("Корневой элемент не передан/не найден")
    }

    this.state = {
      isAnimated: false,
      isHidden: false,
      value: this.INITIAL_VALUE,
    }

    this.rootElement = rootElement

    this.render()

    this.progressBarElement = this.rootElement.querySelector(this.selectors.progressBar)
    this.valueElement = this.progressBarElement.querySelector(this.selectors.value)
  }

  render() {
    this.rootElement.innerHTML = `
      <svg
        class="progress__bar"
        ${this.selectors.progressBar.slice(1, -1)}
      >
        <circle
          class="progress__track"
          cx="80"
          cy="80"
          r=${this.RADIUS}
        />
        <circle
          class="progress__value"
          cx="80"
          cy="80"
          r=${this.RADIUS}
          stroke-dasharray=${this.circumference}
          stroke-dashoffset=${this.offset}
          ${this.selectors.value.slice(1, -1)}
        />
      </svg>
    `
  }

  get circumference() {
    return 2 * Math.PI * this.RADIUS
  }

  get offset() {
    return this.circumference * ((100 - this.state.value) / 100)
  }

  get value() {
    return this.state.value
  }

  get isAnimated() {
    return this.state.isAnimated
  }

  get isHidden() {
    return this.state.isHidden
  }

  setValue(number) {
    this.state.value = Math.min(100, Math.max(0, number));

    this.valueElement.setAttribute(
      "stroke-dashoffset",
      this.offset
    );
  }

  setAnimated(isChecked) {
    this.state.isAnimated = isChecked

    this.rootElement.classList.toggle(
      this.stateClasses.isAnimated,
      this.isAnimated
    );
  }

  setHidden(isChecked) {
    this.state.isHidden = isChecked

    this.rootElement.classList.toggle(
      this.stateClasses.isHidden,
      this.isHidden
    );
  }
}