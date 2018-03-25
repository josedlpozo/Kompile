import api from '../api/ApiClient'
import dates from '../dates/DateFormatter'

function get (project) {
  return new Promise((resolve, reject) => {
    api.zip4(() => api.getSumByProject(project), () => api.getAverageByProject(project), () => api.getKompilesByProject(project), () => api.getRecords(project), (sum, average, kompiles, records) => {
      const averageTimes = average.data.map(entry => dates.secondsToMinutes(entry.average))
      const averageLabels = average.data.map(entry => entry.user)

	      	const numberOfUsers = averageLabels.length

	      	const sumTimes = sum.data.map(entry => dates.secondsToMinutes(entry.sum))
	      	const sumLabels = sum.data.map(entry => entry.user)

	      	const kompileTimes = kompiles.data.map(entry => dates.secondsToMinutes(entry.duration))
	      	const kompileLabels = kompiles.data.map(entry => dates.format(entry.createdAt))
	      	const numberOfKompiles = kompiles.data.length
	      	const kompilingTime = kompiles.data.reduce(function (acc, next) {
	        	return acc + next.duration
	      	}, 0)
	      	const totalTimeKompiling = dates.formatTime(kompilingTime)
	      	const averageTimeKompiling = dates.formatTime((kompilingTime / numberOfKompiles).toFixed(2))

		  	const slowestUser = records.data.slowest.user
	      	const fastestUser = records.data.fastest.user
	      	const minTime = dates.formatTime(records.data.fastest.duration)
	      	const maxTime = dates.formatTime(records.data.slowest.duration)

	      	const project = {
		      	averageTimes: averageTimes,
		      	averageLabels: averageLabels,
		      	numberOfUsers: numberOfUsers,
		      	sumTimes: sumTimes,
		      	sumLabels: sumLabels,
		      	kompileTimes: kompileTimes,
		      	kompileLabels: kompileLabels,
		      	numberOfKompiles: numberOfKompiles,
		      	kompilingTime: kompilingTime,
		      	totalTimeKompiling: totalTimeKompiling,
		      	slowestUser: slowestUser,
		      	fastestUser: fastestUser,
		      	minTime: minTime,
		      	maxTime: maxTime
	      	}
	      	resolve(project)
	    })
  })
}

export default { get }
