function setSelector(baseSelector) {
  return function(selector) {
    return `[${[baseSelector, selector].join("-")}]`
  } 
}

class ProgressBar {
  getSelector = setSelector("js-data-progress")

  selectors = {
    progressContainerElement: this.getSelector(),
    progressBarElement: this.getSelector("bar"),
    progressValueElement: this.getSelector("value"),
    ValueInputElement: this.getSelector("input-value")
    
  }

  constructor(radius) {
    if (!Number.isNaN(radius)) {
      this.radius = radius
    } else {
      throw new Error("Радиус должен быть числом")
    }
  }

}

const circle = document.querySelector(".progress__value")

const radius = 80
const circumference = 2 * Math.PI * radius

document.querySelector("#progress-value-input").addEventListener("input", (event) => {
  let input = Number(event.target.value)
  if (!Number.isNaN(input)) {
    const value = Math.min(100, Math.max(0, Number(input)))

    event.target.value = value
    circle.style.strokeDasharray = circumference
    circle.style.strokeDashoffset = circumference * ((100 - value) / 100)
  } else {
    event.target.value = 0
  }


})

/*<div
    class="progress"
    data-js-progress-bar
  >
    <svg
      class="progress__bar"
      data-js-progress-bar
    >
      <circle
        class="progress__track"
        cx="160"
        cy="160"
        r="80"
      />
      <circle
        class="progress__value"
        cx="160"
        cy="160"
        r="80"
        data-js-progress-value
      />
    </svg>
    <div class="progress-controls">
      <form class="progress-controls__form">
        <div class="input-group">
          <label for="progress-value-input">Value</label>
          <input 
            id="progress-value-input"
            type="text"
            data-js-progress-input-value
          />
        </div>
        <div class="input-group">
          <label for="animate-input">Animate</label>
          <input
            id="animate-input"
            class="input"
            type="checkbox"
            data-js-progress-checkbox-animate
          />
        </div>
        <div class="input-group">
          <label for="hide-input">Hide</label>
          <input
            id="hide-input"
            class="input"
            type="checkbox"
            data-js-progress-checkbox-hide
          />
        </div>
      </form>
    </div>
  </div>*/
