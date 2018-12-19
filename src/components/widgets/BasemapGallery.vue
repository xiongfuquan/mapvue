<template>
  <div class="basemapGallery esri-component">
    <div v-for="item in baseMapList" :key="item.key"></div>
  </div>
</template>

<script>
import * as jsapi from '../../utils/jsapi';

export default {
  data() {
    return {
      vm: null,
    };
  },
  computed: {
    baseMapList() {
      return this.vm.items;
    },
  },
  props: {
    view: {
      type: Object,
      default: () => {},
    },
  },
  methods: {

  },
  mounted() {
    const cVue = this;
    cVue.view.when(async (view) => {
      const [BasemapGalleryViewModel] = await jsapi.load(['BasemapGalleryViewModel']);
      cVue.vm = new BasemapGalleryViewModel();
      cVue.vm.view = view;

    });
  }
}
</script>

<style scoped>
  .basemapGallery {
    background-color: #fff;
  }
</style>


