<template>
  <div class="esri-component">
    <div class="compass">
      <a class="compassBtn" @click="this.reset">
        <span class="esri-icon-compass" :style="toRotationTransform"/>
      </a>
    </div>
  </div>
</template>

<script>
import * as jsapi from '../../utils/jsapi';

export default {
  data() {
    return {
      vm: null,
      state: {
        orientation: {
          z: 0,
        },
      },
    };
  },
  props: {
    view: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    reset() {
      this.vm.reset();
    },
  },
  computed: {
    toRotationTransform() {
      return {
        display: 'inline-block',
        fontSize: '24px',
        transform: `rotateZ(${this.state.orientation.z}deg)`,
      };
    },
  },
  mounted() {
    const cVue = this;
    cVue.view.when(async (view) => {
      const [CompassViewModel] = await jsapi.load([
        'esri/widgets/Compass/CompassViewModel',
      ]);
      cVue.vm = new CompassViewModel();
      cVue.vm.view = view;
      cVue.vm.watch('orientation', (orientation) => {
        cVue.state = { ...cVue.state, orientation };
      });
    });
  },
};
</script>

<style scoped>
.compass {
  position: absolute;
  right: -2px;
  bottom: 165px;
  box-shadow: none;
}

.compassBtn {
  display: inline-block;
  cursor: pointer;
  margin: 6px;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50%;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
  background: #fff;
  font-size: 24px;
  font-weight: bold;
}
</style>
