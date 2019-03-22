<template>
  <div class="leftmenu" :class="{show: isActive}">
    <ul class="tabhead">
      <li class="cell Rp1" v-for="( menu, index ) in leftmenus" :key="index"
      :class="{sel: selected === index}" @click="togglePane(index)">
        <router-link :to="menu.routerLink">
          <a href="javascript:void(0)" class="btn">
            <i class="icon" :class="menu.icon"></i>
            <span class="txt">{{menu.title}}</span>
          </a>
        </router-link>
      </li>
    </ul>
    <div class="ctitle">
      <i class="icon" :class="selectMenu.icon"></i>
      <span class="txt">{{selectMenu.title}}</span>
    </div>
    <div class="tabcnt service-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftmenus from './LeftMenuCfg';

export default {
  data() {
    return {
      isActive: false,
      selected: -1,
      leftmenus,
    };
  },
  computed: {
    selectMenu() {
      return this.selected > -1 ? leftmenus[this.selected] : {};
    },
  },
  methods: {
    togglePane(selected) {
      if (this.selected === selected) {
        this.selected = -1;
        this.isActive = !this.isActive;
      } else {
        this.selected = selected;
        this.isActive = true;
      }
    },
  },
};
</script>

<style scoped>
.leftmenu {
  position: absolute;
  left: 0;
  top: 108px;
  min-width: 75px;
}

.leftmenu > .tabhead {
  background-color: rgb(89, 164, 238);
  width: 38px;
  left: 0;
  position: absolute;
  top: 0;
  z-index: 10;
  border-left: none;
  border-top: 4px solid #ff5200;
  box-shadow: 0 3px 11px rgba(0, 0, 0, 0.33);
  border-right: 1px solid rgb(89, 164, 238);
  border-bottom: 1px solid rgb(89, 164, 238);
}

.leftmenu > .tabhead > .cell .btn {
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.3;
  padding: 14px 0;
  border-radius: 0;
  display: block;
  border-bottom: 1px solid #363636;
  border-left: none;
  border-right: none;
  border-top: none;
  border-color: currentcolor currentcolor #ededed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.54);
  text-decoration: none;
  transition-duration: 0.3s;
}

.leftmenu > .tabhead > .cell.sel {
  background-color: #fff;
}

.leftmenu > .tabhead > .cell.sel .btn {
    background-color: #FFFFFF;
    color: #0473c2;
    margin-right: -1px;
    text-shadow: none;
}

.leftmenu > .tabhead > .cell:last-child .btn {
  border-bottom: none;
}

.leftmenu > .tabhead > .cell .btn .icon {
  display: block;
  margin: 0 auto 2px;
  font-size: 15px;
  text-align: center;
}

.leftmenu > .tabhead > .cell .btn .txt {
  display: block;
  padding: 0 10px;
  white-space: normal;
}

.leftmenu > .ctitle {
  background-color: #ff5200;
  color: #fff;
  font-size: 16px;
  padding: 8px 4px 3px;
  text-align: center;
  position: absolute;
  left: -50px;
  line-height: 1.3;
  top: 0;
  width: 28px;
  transition: all 0.5s ease;
  border-top: 4px solid #ff5200;
  box-shadow: 0 3px 11px rgba(0, 0, 0, 0.33);
}

.leftmenu > .ctitle::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 14px solid;
  border-color: #ff5200 transparent transparent #ff5200;
  border-width: 13px;
  bottom: -25px;
  left: 0;
}

.leftmenu.show > .ctitle {
  left: 484px;
  transition: all 0.5s cubic-bezier(0, 1, 0, 1) 0.2s;
  cursor: pointer;
}

.leftmenu > .tabcnt {
  width: 450px;
  border: 1px solid rgb(89, 164, 238);
  left: -460px;
  position: absolute;
  transition: all 0.5s ease 0.2s;
  opacity: 0;
  filter: alpha(opacity=0);
  background-color: #fff;
  overflow: auto;
  border-top: 4px solid #ff5200;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 3px 11px rgba(0, 0, 0, 0.33);
}

.leftmenu.show > .tabcnt {
  left: 37px;
  opacity: 1;
  filter: alpha(opacity=100);
  transition: all 0.5s cubic-bezier(0, 1, 0, 1);
}
</style>
