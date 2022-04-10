<template>
<div class="table-wrapper">
 <table
    class="table"
    :class="[themeDark.value ? 'dark-theme' : 'light-theme']"
  >
    <tbody>
      <tr :class="setClass">
        <th v-for="(item, index) in field" :key="index" :class="setClass">
          {{ item }}
        </th>
      </tr>
      <template v-if="type === 'warehouse'">
        <td
          v-for="(item, index) in onlyWarehouseData"
          :key="index"
          :class="setClass"
        >
        <span>
            {{ item }}
        </span>
        </td>
        <td :class="setClass">
          <span
            v-for="(item, index) in warehouseComposition"
            :key="index"
            :class="setClass"
          >
            {{ item.name }}
          </span>
        </td>
        <td :class="setClass">
          <span
            v-for="(item, index) in warehouseComposition"
            :key="index"
            :class="setClass"
          >
            {{ item.price }} ₴
          </span>
        </td>
        <td :class="setClass">
          <span
            v-for="(item, index) in warehouseComposition"
            :key="index"
            :class="setClass"
          >
            {{ item.cityGet }}
          </span>
        </td>
        <td :class="setClass">
          <span
            v-for="(item, index) in warehouseComposition"
            :key="index"
            :class="setClass"
          >
            {{ item.dateGet }}
          </span>
        </td>
        <td :class="setClass">
          <span
            v-for="(item, index) in warehouseComposition"
            :key="index"
            :class="setClass"
          >
            {{ item.count }}
          </span>
        </td>
      </template>
      <template v-else>
        <tr v-for="(item, index) in items" :key="index" :class="setClass">
          <td :class="setClass" v-for="(text, index) in item" :key="index">
            {{ text }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "tableComponent",
  props: ["items", "field", "type"],
  inject:['themeDark'],
  setup(props) {
    const onlyWarehouseData = computed(() => {
      const { id, name } = props.items;
      return [id, name];
    });
    const warehouseComposition = computed(() => {
      const { composition } = props.items;
      return composition;
    });
    return {
      onlyWarehouseData,
      warehouseComposition,
    };
  },
  computed: {
    setClass() {
      return this.themeDark.value ? "border-white" : "border-dark";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.table-wrapper{
  width: 100%;
  overflow: auto;
}
.table {
  width: 100%;
  border-radius: 10px;
  th {
    min-width: 150px;
  }
  tr,
  th,
  td {
    text-align: center;
    white-space: nowrap;
  }
  td {
    span {
      display: block;
    }
  }
}
.border-white {
  border: 1px solid $white;
}
.border-dark {
  border: 1px solid $black;
}
</style>
