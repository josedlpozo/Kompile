<template>
  <div class="content">
    <div class="row">
      <h1>Project <b>{{ project }}</b></h1>
      <div class="col s12 m6 l6">

        <h4>Project summary</h4>
        <p>There are {{ numberOfUsers }} users kompiling this project. They have kompiled it {{ numberOfKompiles }} times.</p>

        <p>They have spent {{ totalTimeKompiling }} kompiling. Their average by kompiling is {{ averageTimeKompiling }}.</p>
        <br>
        <h4>Records</h4>

        <p>The fastest is <b>{{ fastestUser }}</b> with a minimum kompile time of {{ minTime }}</p>
        <p>The slowest is <b>{{ slowestUser }}</b> with a maximum kompile time of {{ maxTime }}</p>
      </div>
      <div class="col s12 m6 l6">
        <h4>History</h4>
        <vertical-line-chart v-if="kompilesLoaded" :chart-data="kompileTimes" :chart-labels="kompileLabels"></vertical-line-chart>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12 l12">
        <h4>Average</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="averageTimes" :chart-labels="averageLabels"></horizontal-line-chart>

        <h4>Sum</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="sumTimes" :chart-labels="sumLabels"></horizontal-line-chart>
      </div>
    </div>
  </div>
</template>

<script>

import api from '../api/ApiClient'
import dates from '../dates/DateFormatter'
import VerticalLineChart from '@/components/VerticalLineChart'
import HorizontalLineChart from '@/components/HorizontalLineChart'

export default {
  name: 'ProjectSummary',
  components: {
    VerticalLineChart,
    HorizontalLineChart
  },
  data () {
    return {
      kompilesLoaded: false,
      loaded: false,
      sumTimes: [],
      sumLabels: [],
      averageTimes: [],
      averageLabels: [],
      kompileTimes: [],
      kompileLabels: [],
      numberOfUsers: 0,
      numberOfKompiles: 0,
      totalTimeKompiling: 0,
      averageTimeKompiling: 0,
      project: '',
      slowestUser: '',
      maxTime: 0,
      fastestUser: '',
      minTime: '',
      recordLoaded: false
    }
  },

  created () {
    let that = this
    this.project = this.$route.params.project
    api.zipSumAverageByProject(this.project, function (sum, average) {
      that.averageTimes = average.data.map(entry => dates.secondsToMinutes(entry.average))
      that.averageLabels = average.data.map(entry => entry.user)

      that.numberOfUsers = that.averageLabels.length

      that.sumTimes = sum.data.map(entry => dates.secondsToMinutes(entry.sum))
      that.sumLabels = sum.data.map(entry => entry.user)
      that.loaded = true
    })

    api.getKompilesByProject(this.project).then(function (kompiles) {
      that.kompileTimes = kompiles.data.map(entry => dates.secondsToMinutes(entry.duration))
      that.kompileLabels = kompiles.data.map(entry => dates.format(entry.createdAt))
      that.numberOfKompiles = kompiles.data.length
      const kompilingTime = kompiles.data.reduce(function (acc, next) {
        return acc + next.duration
      }, 0)
      that.totalTimeKompiling = dates.formatTime(kompilingTime)
      that.averageTimeKompiling = dates.formatTime((kompilingTime / that.numberOfKompiles).toFixed(2))
      that.kompilesLoaded = true
    })

    api.getRecords(this.project).then(function (kompile) {
      that.slowestUser = kompile.data.slowest.user
      that.fastestUser = kompile.data.fastest.user
      that.minTime = dates.formatTime(kompile.data.fastest.duration)
      that.maxTime = dates.formatTime(kompile.data.slowest.duration)
      that.recordLoaded = true
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
