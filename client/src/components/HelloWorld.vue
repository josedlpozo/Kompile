<template>
  <ul v-if="sums && sums.length">
    <li v-for="sum of sums">
      <p><strong>{{sum.user}}</strong></p>
      <p>{{sum.sum}} segundos</p>
      <p>{{sum.project}}</p>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      sums: [],
      average: []
    }
  },

  created() {
    axios.get('http://localhost:3000/api/v1/kompiles/sum')
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response)
      this.sums = response.data
    }).catch(e => console.log(e))

    axios.get('http://localhost:3000/api/v1/kompiles/average')
    .then(response => {
      // JSON responses are automatically parsed.
      this.average = response.data
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
