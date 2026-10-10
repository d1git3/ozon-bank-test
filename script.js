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

// <svg
//   viewBox="0 0 100 100"
//   className="progress"
// >
//   <circle
//     className="progress__track"
//     cx="50"
//     cy="50"
//     r="45.5"
//   />
//   <circle
//     className="progress__value"
//     cx="50"
//     cy="50"
//     r="45.5"
//     stroke-dasharray="251.33"
//     stroke-dashoffset="87.97"
//   />
// </svg>
