<template>
  <div id="mapid" style="height:100%;">
    <Trans3D />
    <LeftMenu />
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css';
import { mapState, mapMutations } from 'vuex';
import Trans3D from './components/widgets/Trans3D';
import LeftMenu from './components/leftmenu/LeftMenu';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Trans3D,
    LeftMenu,
  },
  computed: mapState({
    viewMode: state => state.mode,
  }),
  methods: {
    ...mapMutations({
      init: 'init',
    }),
  },
  mounted() {
    this.init({
      container: 'mapid',
      viewMode: this.viewMode,
    }); // 初始化地图
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
