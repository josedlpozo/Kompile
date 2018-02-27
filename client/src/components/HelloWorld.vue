<template>
  <div>
    <h1>Sum by user and project</h1>
    <ul v-if="sums && sums.length">
      <li v-for="sum of sums">
        <p><strong>{{sum.user}}</strong></p>
        <p>{{sum.sum}} segundos</p>
        <p>{{sum.project}}</p>
      </li>
    </ul>

    <h1>Average by user and project</h1>
    <ul v-if="averages && averages.length">
      <li v-for="average of averages">
        <p><strong>{{average.user}}</strong></p>
        <p>{{average.average}} segundos</p>
        <p>{{average.project}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      sums: [],
      averages: []
    }
  },

  created() {
    axios.get('http://localhost:3000/api/v1/kompiles/sum')
    .then(response => {
      this.sums = response.data
    }).catch(e => console.log(e))

    axios.get('http://localhost:3000/api/v1/kompiles/average')
    .then(response => {
      this.averages = response.data
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
