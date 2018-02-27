<template>
  <footer>
   <span> Build with <a href="https://vuejs.org/">Vue.js</a> and <a href="http://vue-chartjs.org/#/">vue-chartjs</a></span>
   <span>For issues or feature requests visit <a href="https://github.com/josedlpozo/Kompile">Github</a></span>
   <span>Built by <a href="https://www.linkedin.com/in/jose-mar%C3%ADa-del-pozo-alonso-398890a5/">josedlpozo</a></span>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
  footer {
    background-color: #42A5F5;
    color: #fff;
    font-size: rem(16);
    padding: rem(30) rem(40);
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
  }
  a {
      color: #9E9E9E;
      hover-active-states {
        background: darken(color(robin-egg-blue), 20%);
      }
    }
</style>
