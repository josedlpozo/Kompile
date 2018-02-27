<template>
  <div id="app">
    <router-view/>
    <k-footer></k-footer>
  </div>
</template>

<script>
import KFooter from '@/components/Footer'
export default {
  components: { KFooter },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
