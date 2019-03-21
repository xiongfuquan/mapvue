<template>
  <div class="trans esri-component">
    <div class="transBtn">
      <a class=""
         @click="switchMap"
        >
          {{ text }}
        </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { VIEW_MODE_2D } from '../../constants/action-types';

export default {
  computed: {
    ...mapState({
      viewMode: state => state.mode,
    }),
    text() {
      return this.viewMode === VIEW_MODE_2D ? '2D' : '3D';
    },
  },
  methods: {
    ...mapMutations({
      switchMap: 'switchMap_M',
    }),
  },
};
</script>

<style scoped>
  .trans {
    position:absolute;
    z-index:12;
    bottom:148px;
    right:25px;
  }
  .transBtn {
    display: inline-block;
    cursor: pointer;
    width: 26px!important;
    height: 26px!important;
    text-align: center;
    position: relative;
    z-index: 1;
    -webkit-transition: color .3s;
    transition: color .3s;
    background: #fff;
    color: #4c4c4c;
    font-family: Microsoft YaHei;
    font-size: 12px;
    font-weight: 700;
    line-height: 26px;
    -webkit-box-shadow: rgba(0,0,0,.15) 1px 2px 1px;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  }


</style>
