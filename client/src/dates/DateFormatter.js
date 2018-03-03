function format (epoch) {
  let date = new Date(epoch)

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes
}

function secondsToMinutes (seconds) {
  return (seconds / 60).toFixed(2)
}

module.exports = {
  format: format,
  secondsToMinutes: secondsToMinutes
}
