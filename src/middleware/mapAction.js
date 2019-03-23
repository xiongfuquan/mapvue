// 与地图相关操作，在该文件中实现

import Vue from 'vue';
import * as jsapi from '../utils/jsapi';
import { VIEW_MODE_2D } from '../constants/action-types';
// import Zoom from '../components/widgets/Zoom.vue';
// import BasemapGallery from '../components/widgets/BasemapGallery.vue';
// import Compass from '../components/widgets/Compass.vue';
// import Coordinate from '../components/widgets/Coordinate.vue';

const ags = {}; // 保存地图对象
let dragHandler = null; // 二三维转换，拖拽功能句柄

// eslint-disable-next-line no-unused-vars
async function initWebMap(container) {
  const [
    WebMap,
    MapView,
    WebTileLayer,
    TileInfo,
    Point,
    SpatialReference,
  ] = await jsapi.load([
    'esri/WebMap',
    'esri/views/MapView',
    'esri/layers/WebTileLayer',
    'esri/layers/support/TileInfo',
    'esri/geometry/Point',
    'esri/geometry/SpatialReference',
  ]);

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
        resolution: 8.58306884765625e-5,
        scale: 36071.483527679447,
      },
      {
        level: 15,
        levelValue: 15,
        resolution: 4.291534423828125e-5,
        scale: 18035.741763839724,
      },
      {
        level: 16,
        levelValue: 16,
        resolution: 2.1457672119140625e-5,
        scale: 9017.8708819198619,
      },
      {
        level: 17,
        levelValue: 17,
        resolution: 1.0728836059570313e-5,
        scale: 4508.9354409599309,
      },
      {
        level: 18,
        levelValue: 18,
        resolution: 5.3644180297851563e-6,
        scale: 2254.4677204799655,
      },
      {
        level: 19,
        levelValue: 19,
        resolution: 2.68220901489257815e-6,
        scale: 1127.23386023998275,
      },
      {
        level: 20,
        levelValue: 20,
        resolution: 1.341104507446289075e-6,
        scale: 563.616930119991375,
      },
    ],
  });

  const tdtImageLayer = new WebTileLayer({
    urlTemplate:
      'http://t0.tianditu.com/DataServer?T=img_c&x={col}&y={row}&l={level}&tk=01818ec5666329a82714298832c40278',
    tileInfo,
    visible: false,
    id: 'tdtImgLayer',
    maxScale: 2254.4677204799655,
  });

  const tdtNotationLayer = new WebTileLayer({
    urlTemplate:
      'http://t0.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}&tk=01818ec5666329a82714298832c40278',
    tileInfo,
    visible: true,
    id: 'tdtCvaLayer',
    maxScale: 2254.4677204799655,
  });

  const tdtVecLayer = new WebTileLayer({
    urlTemplate:
      'http://t0.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}&tk=01818ec5666329a82714298832c40278',
    tileInfo,
    visible: true,
    id: 'tdtVecLayer',
    maxScale: 2254.4677204799655,
  });

  const webMap = new WebMap({
    basemap: {
      baseLayers: [tdtImageLayer, tdtVecLayer, tdtNotationLayer],
    },
  });

  ags.view = new MapView({
    map: webMap,
    container,
    spatialReference: {
      wkid: 4490,
    },
    constraints: {
      rotationEnabled: true,
      maxScale: 2254.4677204799655, // 放大到18级就不允许再放大
      minScale: 18468599.566171877, // 缩小到5级就不允许在缩小
      minZoom: 6,
      maxZoom: 18,
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
}

async function initSceneMap(container) {
  const [
    esriConfig,
    WebScene,
    SceneView,
  ] = await jsapi.load(['esri/config', 'esri/WebScene', 'esri/views/SceneView']);

  esriConfig.portalUrl = 'https://www.arcgis.com/';

  const webScene = new WebScene({
    portalItem: {
      id: '19dcff93eeb64f208d09d328656dd492',
    },
  });

  ags.view = new SceneView({
    container,
    map: webScene,
    ui: {
      components: [],
    },
  });
}

async function initToolbar() {
  const [domConstruct] = await jsapi.load(['dojo/dom-construct']);
  const zoomDiv = domConstruct.create('div');

  ags.view.ui.add(zoomDiv, { position: 'bottom-right' });
  /* eslint-disable */
  const zoom = new Vue({
    el: zoomDiv,
    data: {
      mapView: ags.view,
    },
    components: { Zoom },
    template: '<zoom :view="mapView"/>'
  });

  const basemapDiv = domConstruct.create('div');
  ags.view.ui.add(basemapDiv, { position: 'bottom-right' });
  /* eslint-disable */
  const basemapGallery = new Vue({
    el: basemapDiv,
    data: {
      mapView: ags.view,
    },
    components: { BasemapGallery },
    template: '<basemap-gallery :view="mapView"/>'
  });

  const compassDiv = domConstruct.create('div');
  ags.view.ui.add(compassDiv, { position: 'bottom-right' });
  /* eslint-disable */
  const compass = new Vue({
    el: compassDiv,
    data: {
      mapView: ags.view,
    },
    components: { Compass },
    template: '<compass :view="mapView"/>'
  });

  const coorDiv = domConstruct.create('div');
  ags.view.ui.add(coorDiv, { position: 'bottom-left' });
  /* eslint-disable */
  const coor = new Vue({
    el: coorDiv,
    data: {
      mapView: ags.view,
    },
    components: { Coordinate },
    template: '<coordinate :view="mapView" />'
  });
}

export async function initMap(state, payload) {
  const { container } = payload;
  await initSceneMap(container);

  // await initToolbar();
}

export function switchMap(state) {
  if( state.mode === VIEW_MODE_2D ) {
    dragHandler = ags.view.on('drag',function(event){
      if(event.button === 2) {
        event.stopPropagation();
      }
    });
    ags.view.goTo({
      heading: 0,
      tilt: 0,
    });
  } else {
    dragHandler&&dragHandler.remove();
  }
}





export default null;