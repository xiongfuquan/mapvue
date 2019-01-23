<template>
  <div class="coordinate esri-component">
    <span class="coorItem">{{ location.lng + ',&nbsp;' + location.lat }}</span>
  </div>
</template>

<script>
import * as jsapi from '../../utils/jsapi';

export default {
  data() {
    return {
      vm: null,
      location: {
        lng: null,
        lat: null,
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
    watchCoor() {
      const cVue = this;
      cVue.location.lng = cVue.view.center.x.toFixed(4);
      cVue.location.lat = cVue.view.center.y.toFixed(4);
      cVue.view.on('pointer-move', (event) => {
        const mapPoint = cVue.view.toMap(event);
        cVue.location.lng = mapPoint.x.toFixed(4);
        cVue.location.lat = mapPoint.y.toFixed(4);
      });
    },
  },

  mounted() {
    const cVue = this;
    cVue.view.when(async (view) => {
      const [CoordinateConversionViewModel] = await jsapi.load([
        'esri/widgets/CoordinateConversion/CoordinateConversionViewModel',
      ]);
      cVue.vm = new CoordinateConversionViewModel();
      cVue.vm.view = view;
      cVue.watchCoor();
    });
  },
};
</script>

<style scoped>
  .coordinate {
    position: absolute;
    left: 15px;
    bottom: 15px;
    box-shadow: none;
  }

</style>
