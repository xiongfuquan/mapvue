<template>
  <div class="compass esri-component">
    <button class="antiClock" @click="rotateHandler('antiClock')"></button>
    <button class="north" :style="{ transform: 'rotate(' + degree + 'deg)' }"
    @click="rotateHandler('north')"></button>
    <button class="clock" @click="rotateHandler('clock')"></button>
  </div>
</template>

<script>
import * as jsapi from '../../utils/jsapi';

export default {
  data() {
    return {
      vm: null,
      degree: 0,
    };
  },
  props: {
    view: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    rotateHandler(type) {
      switch (type) {
        case 'antiClock':
          this.vm.view.rotation -= 90;
          this.degree -= 90;
          break;
        case 'north':
          this.degree = 0;
          this.vm.reset();
          break;
        case 'clock':
          this.degree += 90;
          this.vm.view.rotation += 90;
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    const cVue = this;
    cVue.view.when(async (view) => {
      const [CompassViewModel] = await jsapi.load(['esri/widgets/Compass/CompassViewModel']);
      cVue.vm = new CompassViewModel();
      cVue.vm.view = view;
    });
  },
};
</script>

<style scoped>
  .compass {
    position: absolute;
    width: 52px;
    height: 54px;
    right: -2px;
    bottom: 135px;
    box-shadow: none;
    background: url('../../assets/earth-navi-control-pc4.png') 0% 0% / 266px no-repeat;
  }

  .antiClock {
    position: absolute;
    width: 15px;
    height: 42px;
    left: 2px;
    top: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 1;
    background: url('../../assets/earth-navi-control-pc4.png') -75px -5px / 266px no-repeat;
  }

  .antiClock:hover, .clock:hover{
    background: url('../../assets/earth-navi-control-pc4.png') -89px -5px / 266px no-repeat;
  }

  .north {
    position: absolute;
    width: 14px;
    height: 44px;
    top: 4px;
    left: 19px;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 1;
    background: url('../../assets/earth-navi-control-pc4.png') -56px -4px /266px no-repeat;
  }

  .clock {
    position: absolute;
    width: 15px;
    height: 42px;
    right: 2px;
    top: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 1;
    background: url('../../assets/earth-navi-control-pc4.png') -75px -5px / 266px no-repeat;
    transform: scaleX(-1);
  }
</style>
