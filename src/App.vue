<template>
  <div id="mapid" style="height:100%;">
    <!-- <Trans3D />
    <LeftMenu /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  State,
  Mutation,
} from 'vuex-class';

@Component
export default class App extends Vue{
  @State('mode') viewMode;
  @Mutation('init') mapInit;

  created() {
    this.viewMode
    this.mapInit
  }

  mounted() {
    this.mapInit({
      container: 'mapid',
      viewMode: this.viewMode,
    }); // 初始化地图
  }
}
</script>

<style>
#mapid {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
