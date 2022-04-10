<template>
  <div class="main-description">
    <h3>&copy;Warehouse products</h3>
    <b-button
      title="Переключить тему"
      class="change-theme"
      :variant="darkTheme ? 'dark' : 'warning'"
      @click="changeTheme"
    >
      <b-icon :icon="darkTheme ? 'moon' : 'sun'" scale="1.5"></b-icon>
    </b-button>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  name:'mainDescription',
  emits: ["theme"],
  setup(_, { emit }) {
    const darkTheme = ref(true);
    const changeTheme = () => {
      darkTheme.value = !darkTheme.value;
      emit("theme", darkTheme);
    };
    return {
      darkTheme,
      changeTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-description {
  position: fixed;
  inset: 0;
  z-index: 10;
  width: 100%;
  max-height: 85px;
  h3 {
    text-align: center;
  }
  .change-theme {
    width: 100px;
    display: block;
    margin: 0 auto;
  }
}
</style>
