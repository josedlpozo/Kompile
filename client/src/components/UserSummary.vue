<template>
  <div class="content">
    <div class="row">
      <h1>User <b>{{ user }}</b></h1>
      <div class="col s12 m6 l6">

        <h4>User summary</h4>
        <p>There are {{ numberOfProjects }} projects kompiled by this user. He/she has kompiled it {{ numberOfKompiles }} times.</p>

        <p>He/she has spent {{ totalTimeKompiling }} minutes kompiling. His/her average by kompiling is {{ averageTimeKompiling }} minutes.</p>
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
  name: 'UserSummary',
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
      numberOfProjects: 0,
      numberOfKompiles: 0,
      totalTimeKompiling: 0,
      averageTimeKompiling: 0,
      project: ''
    }
  },

  created () {
    let that = this
    this.user = this.$route.params.user
    api.zipSumAverageByUser(this.user, function (sum, average) {
      that.averageTimes = average.data.map(entry => entry.average)
      that.averageLabels = average.data.map(entry => entry.project)

      that.numberOfProjects = that.averageLabels.length

      that.sumTimes = sum.data.map(entry => entry.sum)
      that.sumLabels = sum.data.map(entry => entry.project)
      that.loaded = true
    })

    api.getKompilesByUser(this.user).then(function (kompiles) {
      that.kompileTimes = kompiles.data.map(entry => entry.duration)
      that.kompileLabels = kompiles.data.map(entry => dates.format(entry.createdAt))
      that.numberOfKompiles = kompiles.data.length
      that.totalTimeKompiling = dates.secondsToMinutes(kompiles.data.reduce(function (acc, next) {
        return acc + next.duration
      }, 0))
      that.averageTimeKompiling = (that.totalTimeKompiling / that.numberOfKompiles).toFixed(2)
      that.kompilesLoaded = true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
