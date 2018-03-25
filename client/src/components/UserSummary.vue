<template>
  <div class="content">
    <div class="row">
      <h1>User <b>{{ user }}</b></h1>
      <div class="col s12 m6 l6">

        <h4>User summary</h4>
        <p>There are {{ userSummary.numberOfProjects }} projects kompiled by this user. He/she has kompiled it {{ userSummary.numberOfKompiles }} times.</p>

        <p>He/she has spent {{ userSummary.totalTimeKompiling }} kompiling. His/her average by kompiling is {{ userSummary.averageTimeKompiling }}.</p>
      </div>
      <div class="col s12 m6 l6">
        <h4>History</h4>
        <vertical-line-chart v-if="loaded" :chart-data="userSummary.kompileTimes" :chart-labels="userSummary.kompileLabels"></vertical-line-chart>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12 l12">
        <h4>Average</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="userSummary.averageTimes" :chart-labels="userSummary.averageLabels"></horizontal-line-chart>

        <h4>Sum</h4>
        <horizontal-line-chart v-if="loaded" :chart-data="userSummary.sumTimes" :chart-labels="userSummary.sumLabels"></horizontal-line-chart>
      </div>
    </div>
  </div>
</template>

<script>

import service from '@/domain/UserSummaryService'
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
      loaded: false,
      user: '',
      userSummary: ''
    }
  },

  created () {
    let that = this
    this.user = this.$route.params.user
    service.get(this.user).then((userSummary) => {
      that.loaded = true
      that.userSummary = userSummary
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
