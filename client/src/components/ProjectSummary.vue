<template>
    <div class="content">

      <h2>Sum of kompiles time by user/project</h2>
      <line-chart v-if="sumLoaded" :chart-data="sumTimes" :chart-labels="sumLabels"></line-chart>

      <h2>Average of kompiles time by user/project</h2>
      <line-chart v-if="averageLoaded" :chart-data="averageTimes" :chart-labels="averageLabels"></line-chart>
    </div>
</template>

<script>
import axios from 'axios'

import LineChart from '@/components/LineChart'

export default {
  name: 'HelloWorld',
  components: {
    LineChart
  },
  data () {
    return {
      sumLoaded: false,
      averageLoaded: false,
      sumTimes: [],
      sumLabels: [],
      averageTimes: [],
      averageLabels: [],
      project: ''
    }
  },

  created () {
    let that = this
    this.project = this.$route.params.project
    axios.all([getSum(this.project), getAverage(this.project)])
      .then(axios.spread(function (sum, average) {
        that.averageTimes = average.data.map(entry => entry.average)
        that.averageLabels = average.data.map(entry => entry.user)
        that.averageLoaded = true

        that.sumTimes = sum.data.map(entry => entry.sum)
        that.sumLabels = sum.data.map(entry => entry.user)
        that.sumLoaded = true
      }))
  }
}
function getSum (project) {
  return axios.get('http://localhost:3000/api/v1/kompiles/sum?project=' + project)
}

function getAverage (project) {
  return axios.get('http://localhost:3000/api/v1/kompiles/average?project=' + project)
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
