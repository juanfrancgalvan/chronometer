const chronometer = document.querySelector('#chronometer')
const buttonStartPause = document.querySelector('#button-start-pause')
const buttonRestart = document.querySelector('#button-restart')

let [hours, minutes, seconds] = [0, 0, 0]

let timeInterval
let chronometerState = 'paused'

function updateChronometer() {
  seconds++
  if (seconds / 60 === 1) {
    seconds = 0
    minutes++
    if (minutes / 60 === 1) {
      minutes = 0
      hours++
    }
  }

  const secondsFormat = assignFormat(seconds)
  const minutesFormat = assignFormat(minutes)
  const hoursFormat = assignFormat(hours)

  chronometer.textContent = `${hoursFormat}:${minutesFormat}:${secondsFormat}`
}

function assignFormat(timeUnit) {
  return timeUnit < 10 ? '0' + timeUnit : timeUnit
}

buttonStartPause.addEventListener('click', function() {
  if (chronometerState === 'paused') {
    timeInterval = window.setInterval(updateChronometer, 1000)
    buttonStartPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
    buttonStartPause.classList.remove('start')
    buttonStartPause.classList.add('pause')
    chronometerState = 'go'
  }
  else {
    window.clearInterval(timeInterval)
    buttonStartPause.innerHTML = '<i class="bi bi-play-fill"></i>'
    buttonStartPause.classList.remove('pause')
    buttonStartPause.classList.add('start')
    chronometerState = 'paused'
  }
})

buttonRestart.addEventListener('click', function() {
  window.clearInterval(timeInterval)
  seconds = 0
  minutes = 0
  hours = 0

  chronometer.innerHTML = `00:00:00`

  buttonStartPause.innerHTML = '<i class="bi bi-play-fill"></i>'
  buttonStartPause.classList.remove('pause')
  buttonStartPause.classList.add('start')

  chronometerState = 'paused'
})