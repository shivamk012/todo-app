<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <TODO/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TODO from './components/todo.vue'

export default {
  name: 'App',
  components: {
    TODO,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
