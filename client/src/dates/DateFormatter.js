function format (epoch) {
  let date = new Date(epoch)

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes
}

function formatTime (timeSeconds) {
  var hours = Math.floor(timeSeconds / 3600)
  var minutes = Math.floor((timeSeconds - (hours * 3600)) / 60)
  var seconds = Math.floor(timeSeconds - (hours * 3600) - (minutes * 60))

  return (formatItem(hours, 'h') + ' ' + formatItem(minutes, 'm') + ' ' + formatItem(seconds, 's')).trim()
}

function formatItem (item, suffix) {
  if (item <= 0) {
    return ''
  } else {
    return item + suffix
  }
}

function secondsToMinutes (seconds) {
  return (seconds / 60).toFixed(2)
}

module.exports = {
  format: format,
  secondsToMinutes: secondsToMinutes,
  formatTime: formatTime
}
