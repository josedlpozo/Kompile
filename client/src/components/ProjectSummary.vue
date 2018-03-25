<template>
  <div class="content">
    <div class="row">
      <h1>Project <b>{{ project }}</b></h1>
      <div class="col s12 m6 l6" v-if="loaded">

        <h4>Project summary</h4>
        <p>There are {{ projectSummary.numberOfUsers }} users kompiling this project. They have kompiled it {{ projectSummary.numberOfKompiles }} times.</p>

        <p>They have spent {{ projectSummary.totalTimeKompiling }} kompiling. Their average by kompiling is {{ projectSummary.averageTimeKompiling }}.</p>
        <br>
        <h4>Records</h4>

        <p>The fastest is <b>{{ projectSummary.fastestUser }}</b> with a minimum kompile time of {{ projectSummary.minTime }}</p>
        <p>The slowest is <b>{{ projectSummary.slowestUser }}</b> with a maximum kompile time of {{ projectSummary.maxTime }}</p>
      </div>
      <div class="col s12 m6 l6">
        <h4>History</h4>
        <vertical-line-chart v-if="loaded" :chart-data="projectSummary.kompileTimes" :chart-labels="projectSummary.kompileLabels"></vertical-line-chart>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12 l12">
        <h4>Average</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="projectSummary.averageTimes" :chart-labels="projectSummary.averageLabels"></horizontal-line-chart>

        <h4>Sum</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="projectSummary.sumTimes" :chart-labels="projectSummary.sumLabels"></horizontal-line-chart>
      </div>
    </div>
  </div>
</template>

<script>

import service from '@/domain/ProjectSummaryService'
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
      loaded: false,
      project : '',
      projectSummary : []
    }
  },

  created () {
    let that = this
    this.project = this.$route.params.project
    service.get(this.project).then((project) => {
      that.loaded = true
      that.projectSummary = project
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
