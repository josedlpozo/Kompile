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
      averageLabels: []
    }
  },

  created () {
    axios.get('http://localhost:3000/api/v1/kompiles/sum')
      .then(response => {
        this.sumTimes = response.data.map(entry => entry.sum)
        this.sumLabels = response.data.map(entry => entry.user + '/' + entry.project)
        this.sumLoaded = true
      }).catch(e => console.log(e))

    axios.get('http://localhost:3000/api/v1/kompiles/average')
      .then(response => {
        this.averageTimes = response.data.map(entry => entry.average)
        this.averageLabels = response.data.map(entry => entry.user + '/' + entry.project)
        this.averageLoaded = true
      }).catch(e => console.log(e))
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
