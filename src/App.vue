<template>
  <div class="container">
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
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
}
</style>
