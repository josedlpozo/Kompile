import api from '../api/ApiClient'
import dates from '../dates/DateFormatter'

function get (user) {
  return new Promise((resolve, reject) => {
    api.zip3(() => api.getSumByUser(user), () => api.getAverageByUser(user), () => api.getKompilesByUser(user), (sum, average, kompiles) => {
	      	const averageTimes = average.data.map(entry => entry.average)
      		const averageLabels = average.data.map(entry => entry.project)

      		const numberOfProjects = averageLabels.length

      		const sumTimes = sum.data.map(entry => entry.sum)
      		const sumLabels = sum.data.map(entry => entry.project)

      		const kompileTimes = kompiles.data.map(entry => entry.duration)
      		const kompileLabels = kompiles.data.map(entry => dates.format(entry.createdAt))
      		const numberOfKompiles = kompiles.data.length
      		const kompilingTime = kompiles.data.reduce(function (acc, next) {
        		return acc + next.duration
      		}, 0)
      		const totalTimeKompiling = dates.formatTime(kompilingTime)
      		const averageTimeKompiling = dates.formatTime((kompilingTime / numberOfKompiles).toFixed(2))

      		const user = {
      			averageTimes: averageTimes,
      			averageLabels: averageLabels,
      			numberOfProjects: numberOfProjects,
      			sumTimes: sumTimes,
      			sumLabels: sumLabels,
      			kompileTimes: kompileTimes,
      			kompileLabels: kompileLabels,
      			numberOfKompiles: numberOfKompiles,
      			kompilingTime: kompilingTime,
      			totalTimeKompiling: totalTimeKompiling,
      			averageTimeKompiling: averageTimeKompiling
      		}
	      	resolve(user)
	    })
  })
}

export default { get }
