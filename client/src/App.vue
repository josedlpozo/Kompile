<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Kompiler</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="https://github.com/josedlpozo/Kompile">Contribute</a></li>
        </ul>
      </div>
    </nav>
    <router-view/>
    <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Kompiler</h5>
                <p class="grey-text text-lighten-4">Build time counter</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Projects</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="https://github.com/josedlpozo/Kompile">Kompile</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://github.com/josedlpozo/Kompile-Gradle-Plugin">Kompile Gradle plugin</a></li>
                  <!--<li><a class="grey-text text-lighten-3" href="#!">Kompile iOS plugin</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Kompile maven plugin</a></li>-->
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              <a class="grey-text text-lighten-3" href="https://github.com/josedlpozo">josedlpozo</a>
            </div>
          </div>
    </footer>
  </div>
</template>

<script>
export default {
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
}
</style>
