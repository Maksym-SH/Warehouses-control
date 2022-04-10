<template>
  <aside class="aside">
    <ul
      class="aside__navigation"
      :class="[theme ? 'dark-theme' : 'light-theme']"
    >
      <li v-for="link in navList" :key="link.id">
        <router-link :to="link.path">
          <b-button class="aside__navigation__item">
            {{ link.name }}
          </b-button>
        </router-link>
      </li>
      <li>
        <b-button class="aside__navigation__item" v-b-modal.instruction>
          Инструкция
        </b-button>
      </li>
    </ul>
    <b-modal id="instruction" title="Инструкция пользования" ok-only hide-header-close>
      <text-instuction></text-instuction>
    </b-modal>
  </aside>
</template>

<script>
import { reactive } from "@vue/composition-api";
import instruction from './textForInstruction.vue';
export default {
  name:'asideBar',
  props: {
    theme: Boolean,
  },
  components:{
    'text-instuction':instruction
  },
  setup() {
    const navList = reactive([
      {
        id: 1,
        name: "Склады",
        path: "/",
      },
      {
        id: 2,
        name: "Клиенты",
        path: "/users",
      },
      {
        id: 3,
        name: "Выдача товара",
        path: "/issue",
      },
      {
        id: 4,
        name: "История транкзакций",
        path: "/payment",
      },
    ]);
    return {
      navList,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.aside {
  width: 100%;
  max-width: 300px;
  left: 0;
  transition: all 0.5s ease;
  &__burger {
    position: absolute;
    right: -45px;
  }
  &__navigation {
    min-height: 300px;
    border: 2px solid ;
    list-style: none;
    border-right: none;
    height: 100%;
    padding: 0 5px;
    &__item {
      margin: 10px 0;
      width: 100%;
      padding: 10px 0;
      &:hover {
        background-color: $hover-color !important;
        color: $white !important;
      }
    }
  }
  @media (max-width: $media-md) {
    max-width: none;
    &__navigation {
      border-right: 2px solid ;
      margin: 0 auto;
      width:100%;
      border-bottom: none;
      padding-bottom: 20px;
      li{
        margin: 0 auto;
        max-width: 300px;
      }
    }
  }
}
</style>
