<template>
  <div id="mapid"></div>
</template>


<script>
import { mapMutations } from 'vuex';
import Vue from 'vue';
import Zoom from './widgets/Zoom';
import * as jsapi from '../utils/jsapi';

export default {
  methods: {
    ...mapMutations(['initMap', 'initMapView']),

    async init() {
      const cVue = this;
      const [WebMap, MapView, WebTileLayer, TileInfo, Point, SpatialReference, BasemapGallery, domConstruct] = await jsapi.load(['esri/WebMap', 'esri/views/MapView', 'esri/layers/WebTileLayer', 'esri/layers/support/TileInfo', 'esri/geometry/Point', 'esri/geometry/SpatialReference', 'esri/widgets/BasemapGallery', 'dojo/dom-construct']);

      const tileInfo = new TileInfo({
        dpi: 90.71428571427429,
        rows: 256,
        cols: 256,
        compressionQuality: 0,
        origin: {
          x: -180,
          y: 90,
        },
        spatialReference: {
          wkid: 4490,
        },
        lods: [
          {
            level: 2,
            levelValue: 2,
            resolution: 0.3515625,
            scale: 147748796.52937502,
          },
          {
            level: 3,
            levelValue: 3,
            resolution: 0.17578125,
            scale: 73874398.264687508,
          },
          {
            level: 4,
            levelValue: 4,
            resolution: 0.087890625,
            scale: 36937199.132343754,
          },
          {
            level: 5,
            levelValue: 5,
            resolution: 0.0439453125,
            scale: 18468599.566171877,
          },
          {
            level: 6,
            levelValue: 6,
            resolution: 0.02197265625,
            scale: 9234299.7830859385,
          },
          {
            level: 7,
            levelValue: 7,
            resolution: 0.010986328125,
            scale: 4617149.8915429693,
          },
          {
            level: 8,
            levelValue: 8,
            resolution: 0.0054931640625,
            scale: 2308574.9457714846,
          },
          {
            level: 9,
            levelValue: 9,
            resolution: 0.00274658203125,
            scale: 1154287.4728857423,
          },
          {
            level: 10,
            levelValue: 10,
            resolution: 0.001373291015625,
            scale: 577143.73644287116,
          },
          {
            level: 11,
            levelValue: 11,
            resolution: 0.0006866455078125,
            scale: 288571.86822143558,
          },
          {
            level: 12,
            levelValue: 12,
            resolution: 0.00034332275390625,
            scale: 144285.93411071779,
          },
          {
            level: 13,
            levelValue: 13,
            resolution: 0.000171661376953125,
            scale: 72142.967055358895,
          },
          {
            level: 14,
            levelValue: 14,
            resolution: 8.58306884765625e-005,
            scale: 36071.483527679447,
          },
          {
            level: 15,
            levelValue: 15,
            resolution: 4.291534423828125e-005,
            scale: 18035.741763839724,
          },
          {
            level: 16,
            levelValue: 16,
            resolution: 2.1457672119140625e-005,
            scale: 9017.8708819198619,
          },
          {
            level: 17,
            levelValue: 17,
            resolution: 1.0728836059570313e-005,
            scale: 4508.9354409599309,
          },
          {
            level: 18,
            levelValue: 18,
            resolution: 5.3644180297851563e-006,
            scale: 2254.4677204799655,
          },
          {
            level: 19,
            levelValue: 19,
            resolution: 2.68220901489257815e-006,
            scale: 1127.23386023998275,
          },
          {
            level: 20,
            levelValue: 20,
            resolution: 1.341104507446289075e-006,
            scale: 563.616930119991375,
          },
        ],
      });

      const tdtImageLayer = new WebTileLayer({
        url: 'http://t0.tianditu.gov.cn/img_c/wmts',
        tileInfo,
        visible: false,
        id: 'tdtImgLayer',
        maxScale: 577143.73644287116,
      });

      const tdtNotationLayer = new WebTileLayer({
        url: 'http://t0.tianditu.gov.cn/cva_c/wmts',
        tileInfo,
        visible: false,
        id: 'tdtCvaLayer',
        maxScale: 577143.73644287116,
      });

      const tdtVecLayer = new WebTileLayer({
        url: 'http://t0.tianditu.gov.cn/vec_w/wmts',
        tileInfo,
        visible: false,
        id: 'tdtVecLayer',
        maxScale: 577143.73644287116,
      });

      const webMap = new WebMap({
        basemap: {
          baseLayers: [tdtImageLayer, tdtNotationLayer, tdtVecLayer],
        },
      });

      const mapView = new MapView({
        map: webMap,
        container: 'mapid',
        spatialReference: {
          wkid: 4490,
        },
        constraints: {
          rotationEnabled: false,
          maxScale: 2254.4677204799655, // 放大到18级就不允许再放大
        },
        center: new Point({
          x: 120.59013615091254,
          y: 29.11387399448924,
          spatialReference: new SpatialReference({ wkid: 4490 }),
        }),
        scale: 2308574.988834645,
        ui: {
          components: [],
        },
      });

      const basemapGallery = new BasemapGallery({
        view: mapView,
      });

      mapView.ui.add(basemapGallery, { position: 'bottom-right' });

      const zoomDiv = domConstruct.create('div');

      mapView.ui.add(zoomDiv, { position: 'bottom-right' });
      /* eslint-disable */
      const zoom = new Vue({
        el: zoomDiv,
        data:{
          mapView,
        },
        components: { Zoom },
        template: '<zoom :view="mapView"/>',
      });

      cVue.initMap({ webMap });
      cVue.initMapView({ mapView });
    },
  },
  mounted() {
    const cVue = this;
    cVue.init();
  },
};
</script>

<style>
@import url("https://js.arcgis.com/4.10/esri/themes/dark/main.css");
#mapid {
  height: 100%;
}
</style>
