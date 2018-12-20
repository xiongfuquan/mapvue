<template>
  <div id="mapType_wraper" class="esri-component" :class="{expand: isExpand}"
  @mouseenter="expandCard" @mouseleave="collapseCard">
    <div id="mapType" @mouseenter="expandCard">
      <div class="mapTypeCard normal" :class="{active: active.normal}" @click="changeMap('normal')">
        <span>地图</span>
      </div>
      <div class="mapTypeCard imagery" :class="{active: active.imagery}"
      @click="changeMap('imagery')">
        <span>地球</span>
      </div>
      <div class="mapTypeCard pano" :class="{active: active.pano}" @click="changeMap('pano')">
        <span>全景</span>
      </div>
    </div>
  </div>
</template>

<script>
// import * as jsapi from '../../utils/jsapi';

export default {
  data() {
    return {
      isExpand: false,
      active: {
        normal: true,
        imagery: false,
        pano: false,
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
    expandCard() {
      this.isExpand = true;
    },

    collapseCard() {
      this.isExpand = false;
    },

    changeMap(type) {
      const cVue = this;
      switch (type) {
        case 'normal':
          cVue.active = {
            normal: true,
            imagery: false,
            pano: false,
          };
          cVue.showBaseMap(['tdtVecLayer', 'tdtCvaLayer']);
          break;
        case 'imagery':
          cVue.active = {
            normal: false,
            imagery: true,
            pano: false,
          };
          cVue.showBaseMap(['tdtImgLayer', 'tdtCvaLayer']);
          break;
        case 'pano':
          cVue.active = {
            normal: false,
            imagery: false,
            pano: true,
          };
          break;
        default:
          break;
      }
    },

    showBaseMap(arr) {
      const cVue = this;
      const baseMaps = cVue.view.map.basemap.baseLayers.items;
      for (let i = 0; i < baseMaps.length; i += 1) {
        const item = baseMaps[i];
        if (arr.includes(item.id)) {
          item.visible = true;
        } else {
          item.visible = false;
        }
      }
    },
  },
};
</script>

<style scoped>
  #mapType_wraper {
    position: absolute;
    right: -15px;
    bottom: -15px;
    box-shadow: none;
  }

  #mapType {
    width: 110px;
    height: 80px;
    cursor: pointer;
    background-color: rgba(255,255,255,0);
    transition-property: "background-color,width";
    transition-duration: .4s;
  }

  .expand>#mapType {
    width: 298px;
    background-color: rgba(255,255,255,0.8);
  }

  #mapType .mapTypeCard {
    position: absolute;
    width: 86px;
    height: 60px;
    top: 10px;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(153,153,153,0.45);
    transition-property: "right";
    transition-duration: .4s;
    background-size: 86px 240px;
  }

  #mapType .normal {
    z-index: 1;
    right: 20px;
    background-image: url('../../assets/maptype.png');
    background-position: 0 -1px;
  }

  #mapType .imagery {
    z-index: 2;
    right: 15px;
    background-image: url('../../assets/maptype.png');
    background-position: 0 -181px;
  }

  #mapType .pano {
    z-index: 3;
    right: 10px;
    background-image: url('../../assets/maptype.png');
    background-position: 0 -121px;
  }

  .expand #mapType .normal {
    right: 202px;
  }

  .expand #mapType .imagery {
    right: 106px;
  }

  .expand #mapType .mapTypeCard.active, #mapType .mapTypeCard:hover {
    border: 1px solid #3385ff
  }

  #mapType .mapTypeCard span{
    display: inline-block;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 3px 3px 2px 4px;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #fff;
    border-top-left-radius: 2px;
  }

  #mapType .mapTypeCard.active span, #mapType .mapTypeCard:hover span {
    background-color: #3385ff;
  }

</style>
