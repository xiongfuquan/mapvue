<template>
  <div style="height:100%;">
    <web-map></web-map>
  </div>
</template>

<script>
import WebMap from './components/Map';

export default {
  name: 'App',
  components: {
    WebMap,
  },
};
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
