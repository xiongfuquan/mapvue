<template>
  <div class="zoom esri-component">
    <div class="zoomBtn" @click="zoomIn">
      <div class="zoomin"></div>
    </div>
    <div class="zoomBtn" @click="zoomOut">
      <div class="zoomout"></div>
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
        updating: false,
        maxZoomed: false,
        minZoomed: false,
        zoomVal: null,
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
    zoomIn() {
      if (!this.state.maxZoomed) {
        this.vm.zoomIn();
      }
    },

    zoomOut() {
      if (!this.state.minZoomed) {
        this.vm.zoomOut();
      }
    },

    watchZoom() {
      const cVue = this;
      cVue.state.zoomVal = cVue.view.zoom;
      this.view.watch('zoom', (newValue) => {
        cVue.state.zoomVal = Math.round(newValue);
      });
    },
  },

  mounted() {
    const cVue = this;
    cVue.view.when(async (view) => {
      const [ZoomViewModel, watchUtils] = await jsapi.load([
        'esri/widgets/Zoom/ZoomViewModel',
        'esri/core/watchUtils',
      ]);
      cVue.vm = new ZoomViewModel();
      cVue.vm.view = view;
      watchUtils.init(view, 'zoom', (val) => {
        cVue.state.maxZoomed = val === view.constraints.maxZoom;
        cVue.state.minZoomed = val === view.constraints.minZoom;
      });
      watchUtils.init(view, 'stationary', (updating) => {
        cVue.state.updating = updating;
      });
    });
    this.watchZoom();
  },
};
</script>

<style scoped>
  .zoom {
    position:absolute;
    z-index:12;
    bottom:75px;
    right:10px;
  }
  .zoomBtn {
    width:26px;
    height:26px;
    box-shadow: 1px 2px 1px rgba(0,0,0,0.15);
    cursor: pointer;
    background-color: #fff;
    overflow: hidden;
  }

  .zoomBtn:first-child{
    border-bottom: 1px solid #ccc;
  }

  .zoomin {
    position:relative;
    top:8px;
    left:8px;
    width:10px;
    height:10px;
    background-image: url('../../assets/mapZoom.png');
    background-position: 0 0;
  }

  .zoomout{
    position:relative;
    top:8px;
    left:8px;
    width:10px;
    height:10px;
    background-image: url('../../assets/mapZoom.png');
    background-position: -10px 0;
  }

  .zoomin:hover{
    background-position: -20px 0;
  }

  .zoomout:hover{
    background-position: -30px 0;
  }
</style>
