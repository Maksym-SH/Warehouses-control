<template>
  <div id="app" :class="[dark ? 'dark-theme' : 'light-theme']">
    <main-description
      :class="[dark ? 'dark-theme' : 'light-theme']"
      @theme="changeTheme()"
    ></main-description>
    <div class="app-container">
      <aside-bar :theme="dark"></aside-bar>
      <div
        class="app-container__pages"
        :class="[dark ? 'dark-theme' : 'light-theme']"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import asideBar from "./components/asideBar.vue";
import mainDescription from "./components/mainDescription.vue";
import { ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "App",
  components: {
    "aside-bar": asideBar,
    "main-description": mainDescription,
  },
  setup() {
    const dark = ref(true);
    const changeTheme = () => {
        dark.value = !dark.value;
    };
    onMounted(()=>{
      if(localStorage.dark){
         dark.value = !!localStorage.dark
      }
    })
    return {
      dark,
      changeTheme,
    };
  },
  provide() {
    return {
      themeDark: computed(() => this.dark),
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/deleteArrow.scss";
@import "./assets/scss/variables.scss";
#app {
  height: 100vh;
  min-height: 750px;
}
.dark-theme {
  background-color: $dark-grey !important;
  color: $white !important;
}
.light-theme {
  background-color: $light-grey !important;
  color: $black !important;
}
.app-container {
  padding-top: 85px;
  width: 100%;
  display: flex;
  height: 100%;
  align-items:stretch;
  &__pages {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 10px;
    border: 2px solid ;
  }
  @media (max-width: $media-md) {
    flex-direction: column;
  }
}
</style>
