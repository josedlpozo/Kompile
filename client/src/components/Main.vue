<template>
  <div class="row">
    <div class="col s12 col l4">
      <h4>Filter by user or project</h4>
      <auto-complete :suggestions="suggestions" v-model="selection" @input="onQuery" @enter="enter"></auto-complete>

      <!--<h4>Recent searches</h4>
      <ul style="width:100%">
          <li v-for="recent in recents"
              v-bind:key="recent"
              @click="enter(recent)">
            <p>{{ recent.name }} <small>{{ recent.type }}</small></p>
          </li>
      </ul>-->
    </div>
    <div class="col s12 col l8">
      <h4>Sum of kompiles time by user/project</h4>
      <horizontal-line-chart v-if="sumLoaded" :chart-data="sumTimes" :chart-labels="sumLabels"></horizontal-line-chart>

      <h4>Average of kompiles time by user/project</h4>
      <horizontal-line-chart v-if="averageLoaded" :chart-data="averageTimes" :chart-labels="averageLabels"></horizontal-line-chart>
    </div>
  </div>
</template>

<script>

import api from '../api/ApiClient'
import HorizontalLineChart from '@/components/HorizontalLineChart'
import AutoComplete from '@/components/AutoComplete'

export default {
  name: 'HelloWorld',
  components: {
    HorizontalLineChart,
    AutoComplete
  },
  data () {
    return {
      sumLoaded: false,
      averageLoaded: false,
      sumTimes: [],
      sumLabels: [],
      averageTimes: [],
      averageLabels: [],
      selection: '',
      suggestions: [],
      recents: []
    }
  },

  created () {
    let that = this
    api.zipSumAverage(function (sum, average) {
      that.averageTimes = average.data.map(entry => entry.average)
      that.averageLabels = average.data.map(entry => entry.user + '/' + entry.project)
      that.averageLoaded = true

      that.sumTimes = sum.data.map(entry => entry.sum)
      that.sumLabels = sum.data.map(entry => entry.user + '/' + entry.project)
      that.sumLoaded = true
    })

    this.recents = this.$store.recents
  },

  methods: {
    onQuery: function (query) {
      if (query === '') {
        this.suggestions = []
        return
      }
      let that = this
      api.mergeUsersAndProjects(query, function (users, projects) {
        that.suggestions = users.data.map(entry => {
          return { name: entry.email, type: 'user' }
        }).concat(projects.data.map(entry => {
          return { name: entry.name, type: 'project' }
        }))
      })
    },
    enter: function (element) {
      this.$store.commit('ADD', element)
      if (element.type === 'user') {
        this.$router.push({ name: 'UserSummary', params: { user: element.name } })
      } else {
        this.$router.push({ name: 'ProjectSummary', params: { project: element.name } })
      }
    }
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
