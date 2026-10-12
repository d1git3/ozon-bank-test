import { setSelector } from "../utils"


export default class ProgressControls {
  getSelector = setSelector("js-data-progress-controls")

  selectors = {
    form: this.getSelector("form"),
    valueInput: this.getSelector("input-value"),
    animateCheckbox: this.getSelector("checkbox-animate"),
    hideCheckbox: this.getSelector("checkbox-hide")
  }

  constructor(
    rootElement,
    progressBar
  ) {
    if (!rootElement) {
      throw new Error("Корневой элемент не передан/не найден")
    }

    this.rootElement = rootElement
    this.progressBar = progressBar

    this.render()

    this.formElement = this.rootElement.querySelector(this.selectors.form)
    this.valueInputElement = this.rootElement.querySelector(this.selectors.valueInput)
    this.animateCheckboxElement = this.rootElement.querySelector(this.selectors.animateCheckbox)
    this.hideCheckboxElement = this.rootElement.querySelector(this.selectors.hideCheckbox)

    this.bindEvents()
  }

  onValueInputChange(value) {
    if (value.trim() === "") {
      return;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      this.progressBar.setValue(0);
      this.valueInputElement.value = ""
      return;
    }

    const normalizedValue = Math.min(100, Math.max(0, number));

    this.progressBar.setValue(normalizedValue);
    this.valueInputElement.value = normalizedValue;
  }

  onAnimateCheckboxClick(isAnimated) {
    this.progressBar.setAnimated(isAnimated)
  }

  onHideCheckboxClick(isHidden) {
    this.progressBar.setHidden(isHidden)
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  render() {
    this.rootElement.innerHTML = `
      <form
        class="controls-form"
        ${this.selectors.form.slice(1, -1)}
      >
        <div class="controls-form__field">
          <input
            id="value-input"
            class="controls-form__input input"
            type="number"
            min="0"
            max="100"
            value=${this.progressBar.value}
            ${this.selectors.valueInput.slice(1, -1)}
          />
          <label for="value-input">Value</label>
        </div>
        <div class="controls-form__field">
          <input
            id="animate-input"
            class="controls-form__checkbox input"
            type="checkbox"
            ${this.progressBar.isAnimated ? "checked" : ""}
            ${this.selectors.animateCheckbox.slice(1, -1)}
          />
          <label for="animate-input">Animate</label>
        </div>
        <div class="controls-form__field">
          <input
            id="hide-input"
            class="controls-form__checkbox input"
            type="checkbox"
            ${this.progressBar.isHidden ? "checked" : ""}
            ${this.selectors.hideCheckbox.slice(1, -1)}
          />
          <label for="hide-input">Hide</label>
        </div>
      </form>
    `
  }

  bindEvents() {
    this.valueInputElement.addEventListener("input", event => {
      this.onValueInputChange(event.target.value)
    })

    this.animateCheckboxElement.addEventListener("change", event => {
      this.onAnimateCheckboxClick(event.target.checked)
    })

    this.hideCheckboxElement.addEventListener("change", event => {
      this.onHideCheckboxClick(event.target.checked)
    })

    this.formElement.addEventListener("submit", event => {
      this.onFormSubmit(event)
    })
  }
}