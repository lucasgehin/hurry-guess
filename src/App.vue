<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <logo></logo>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
}
body {

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
#app::before {
  content: '';
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.1;
  background-image: url(./assets/background.png);
  background-size: cover;
}
</style>
