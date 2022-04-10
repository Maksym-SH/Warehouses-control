<template>
  <div class="warehouse-page">
    <b-button
      @click="showTable = false"
      v-if="showTable"
      class="warehouse-page__show-warehouse"
      title="Вернуться к складам"
      variant="info"
      :disabled="funcButtonDisabled"
    >
      <b-icon icon="arrow-counterclockwise" scale="1.5"></b-icon>
    </b-button>
    <div v-if="!showTable">
      <h2>Доступные склады</h2>
      <b-button
        v-b-modal.add-warehouse
        variant="success"
        class="warehouse-page__show-warehouse"
        title="Добавить новый склад"
        :disabled="funcButtonDisabled"
      >
        <b-icon icon="plus" scale="1.5"></b-icon>
      </b-button>
      <div>
        <b-modal
          id="add-warehouse"
          title="Добавить новый склад"
          :ok-disabled="okDisabled"
          @ok="postWarehouse"
          hide-header-close
        >
          <div class="mb-3">
            <label for="name" class="popap-label">Имя склада</label>
            <input type="text" v-model="nameWarehouse" class="popap-input" />
          </div>
          <div class="pb-4">
            <label for="inside" class="popap-label">Содержание склада</label>
            <input type="text" v-model="addDesc" class="popap-input" />
            <div class="mt-3">
              <label for="price" class="popap-label">Цена содержания</label>
              <input
                type="number"
                v-model.number="addPrice"
                class="popap-input"
              />
            </div>
            <div class="mt-3">
              <label for="city" class="popap-label">
                Поступление из города
              </label>
              <b-form-select
                name="city"
                class="popap-input"
                v-model="cityGet"
                :options="cities"
              ></b-form-select>
            </div>
            <div class="mt-3">
              <label for="city" class="popap-input">Дата поступления</label>
              <input type="date" class="popap-input" v-model="dataInsideGet" />
            </div>
            <div class="mt-3">
              <label for="city" class="popap-input">Количество товара</label>
              <input
                type="number"
                class="popap-input"
                v-model="dataInsideCount"
              />
            </div>
            <b-button
              variant="success"
              class="add-inside"
              :disabled="addDescDisabled"
              @click="addDescArr"
            >
              <b-icon icon="plus"></b-icon>
              добавить содержание
            </b-button>
          </div>
          <ul class="popap-list">
            <li v-for="(list, index) in newArrDesc" :key="index">
              Содержание: {{ list.name }}, цена: {{ list.price }}, город:
              {{ list.cityGet }}, дата поступления: {{ list.dateGet }},
              количество:
              {{ list.count }}
            </li>
          </ul>
        </b-modal>
      </div>
      <div class="warehouse-page__empty" v-if="warehouseIsAbsent">
        <p>Склады отсутствуют</p>
      </div>
      <b-spinner type="grow" class="warehouse-page__loader" v-if="preloaderActive"></b-spinner>
      <div class="warehouse-page__empty" v-if="wrongGetData && !preloaderActive">
        <p>Не удалось получить данные, повторите попытку</p>
      </div>
      <div class="warehouse-page__wrapper" v-else>
        <div
          class="warehouse-page__wrapper__item"
          v-for="item in warehouseItems"
          :key="item.id"
          @click="selectWarehouse(item.id)"
        >
          <b-button
            class="warehouse-page__wrapper__item--edit"
            variant="success"
            v-b-modal.edit-warehouse
            @click.stop="editWareHouse(item.id)"
            title="Редактировать склад"
          >
            <b-icon icon="brush" scale="1"></b-icon>
          </b-button>
          <b-button
            variant="danger"
            class="warehouse-page__wrapper__item--delete"
            @click.stop="deleteWareHouse(item.id)"
            title="Удалить склад"
          >
            <b-icon icon="x-circle"></b-icon>
          </b-button>
          <b-icon icon="house-fill" scale="3"></b-icon>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <b-modal id="edit-warehouse" title="Редактор склада" :ok-disabled="editDisabled" hide-header-close @ok="changeWarehouse">
      <div class="mb-3">
        <label for="name" class="popap-label">Новое имя склада</label>
        <input type="text" v-model="nameWarehouse" />
      </div>
      <div class="pb-4">
        <label for="inside" class="popap-label">Содержание склада</label>
        <input type="text" v-model="addDesc" />
        <div class="mt-3">
          <label for="price" class="popap-label">Цена содержания</label>
          <input type="number" v-model.number="addPrice" />
        </div>
        <div class="mt-3">
          <label for="city" class="popap-label">Поступление из города</label>
          <b-form-select
            name="city"
            class="popap-input"
            v-model="cityGet"
            :options="cities"
          ></b-form-select>
        </div>
        <div class="mt-3">
          <label for="city" class="popap-input">Дата поступления</label>
          <input type="date" class="popap-input" v-model="dataInsideGet" />
        </div>
        <div class="mt-3">
          <label for="city" class="popap-input">Количество товара</label>
          <input type="number" class="popap-input" v-model="dataInsideCount" />
        </div>
        <b-button
          variant="success"
          class="add-inside"
          @click="addDescArr('edit')"
          :disabled="addDescDisabled"
        >
          <b-icon icon="plus"></b-icon>
          добавить содержание
        </b-button>
        <p class="warning-info" v-if="isEditActive || editProducActive">Что бы сохранить изменения нажмите кнопку ОК</p>
        <ul class="popap-list popap-list-edit">
          <li
            v-for="(list, index) in selectwareHouseItem.composition"
            :key="index"
          >
          <b-button title="Редактировать товар" v-b-modal.edit-product @click="createEditProduct(index)" variant="primary"><b-icon icon="brush" scale="0.7"></b-icon></b-button>
            Содержание: {{ list.name }}, цена: {{ list.price }}, город:
            {{ list.cityGet }}, дата поступления: {{ list.dateGet }},
            количество:
            {{ list.count }}
          </li>
        </ul>
      </div>
    </b-modal>
    <b-modal id="edit-product" ref="edit" title="Редактирование товара" hide-header-close @ok="changeProduct" :ok-disabled="editProductDisabled">
          <div class="pb-4">
            <label for="inside" class="popap-label">Содержание склада</label>
            <input type="text" v-model="editProduct.name" class="popap-input" />
            </div>
            <div>
              <label for="price" class="popap-label">Цена содержания</label>
              <input
                type="number"
                v-model.number="editProduct.price"
                class="popap-input"
              />
            </div>
            <div class="mt-3">
              <label for="city" class="popap-label">
                Поступление из города
              </label>
              <b-form-select
                name="city"
                class="popap-input"
                v-model="editProduct.cityGet"
                :options="cities"
              ></b-form-select>
            </div>
            <div class="mt-3">
              <label for="city" class="popap-input">Дата поступления</label>
              <input type="date" class="popap-input" v-model="editProduct.dateGet" />
            </div>
            <div class="mt-3">
              <label for="city" class="popap-input">Количество товара</label>
              <input
                type="number"
                class="popap-input"
                v-model="editProduct.count"
              />
            </div>
            <b-button variant="danger" class="popap-delete-button"  @click="deleteProduct">Удалить товар</b-button>
    </b-modal>
    <table-component
      v-if="showTable"
      :field="nameField"
      :items="selectwareHouseItem"
      :type="'warehouse'"
    ></table-component>
  </div>
</template>

<script>
import table from "../components/customTable.vue";
import { ref, onMounted, computed } from "@vue/composition-api";
import axios from "axios";
export default {
  name:'warehousePage',
  components: {
    "table-component": table,
  },
  setup() {
    const nameField = [
      "Идентификатор",
      "Название склада",
      "Содержание",
      "Цена",
      "Город",
      "Дата поступления",
      "Количество",
    ];
    const nameWarehouse = ref("");
    const insideWarehouse = ref("");
    const dataInsideGet = ref("");
    const cityGet = ref("");
    const warehouseItems = ref([]);
    const addDesc = ref("");
    const addPrice = ref("");
    const edit = ref(null);
    const dataInsideCount = ref(1);
    const isEditActive = ref(false);
    const editProducActive = ref(false);
    const preloaderActive = ref(true);
    const wrongGetData = ref(false);
    const editProduct = ref({});
    const cities = ref([
      "Херсон",
      "Киев",
      "Харьков",
      "Запорожье",
      "Кривой Рог",
      "Львов",
      "Николаев",
      "Мелитополь",
      "Донецк",
      "Луганск",
      "Днепр",
      "Одесса"
    ]);
    const newArrDesc = ref([]);
    const selectwareHouseItem = ref("");
    const showTable = ref(false);
    const deleteWareHouse = (id) => {
      selectwareHouseItem.value = warehouseItems.value.find(
        (item) => item.id === id
      );
      warehouseItems.value.splice(
        warehouseItems.value.indexOf(selectwareHouseItem.value),1
      );
      axios.delete(
        `http://localhost:3000/warehouseItems/${selectwareHouseItem.value.id}`
      );
    };
    const changeWarehouse = () => {
      nameWarehouse.value
        ? (selectwareHouseItem.value.name = nameWarehouse.value)
        : null;
      axios.put(
        `http://localhost:3000/warehouseItems/${selectwareHouseItem.value.id}`,
        selectwareHouseItem.value
      );
      nameWarehouse.value = "";
      isEditActive.value = false;
      editProducActive.value = false;
    };
    const selectWarehouse = (id) => {
      selectwareHouseItem.value = warehouseItems.value.find(
        (item) => item.id === id
      );
      showTable.value = true;
    };
    const editWareHouse = (id) => {
      selectwareHouseItem.value = warehouseItems.value.find(
        (item) => item.id === id
      );
    };
    const getData = () => {
      axios
        .get("http://localhost:3000/warehouseItems")
        .then((array) => {
          warehouseItems.value = array.data;
          preloaderActive.value = false;
          wrongGetData.value = false;
        })
        .catch((error) => {
          console.log(error);
          preloaderActive.value = false;
          wrongGetData.value = true;
        });
    };
    const addDescArr = (method = "") => {
      const postArray = {
        name: addDesc.value,
        price: addPrice.value,
        dateGet: dataInsideGet.value.split("-").reverse().join("."),
        cityGet: cityGet.value,
        count: dataInsideCount.value,
      };
      newArrDesc.value.push(postArray);
      if (method === "edit") {
        selectwareHouseItem.value.composition.push(postArray);
        isEditActive.value = true;
        newArrDesc.value = []
      }
      addDesc.value = addPrice.value = dataInsideGet.value = cityGet.value = "";
      dataInsideCount.value = 0;
    };
    const createEditProduct = (index)=>{
        editProduct.value = Object.assign({}, selectwareHouseItem.value.composition[index])
        editProduct.value.dateGet = editProduct.value.dateGet.split('.').reverse().join('-');
        editProduct.value.index = index;
    };
    const deleteProduct = ()=>{
      let index = editProduct.value.index;
      selectwareHouseItem.value.composition.splice(index,1);
      editProducActive.value = true;
      edit.value.hide();
    };
    const changeProduct = ()=>{
      let index = editProduct.value.index;
      delete editProduct.value.index;
      let objectToSwap = Object.assign({}, editProduct.value);
      objectToSwap.dateGet = objectToSwap.dateGet.split("-").reverse().join(".");
      selectwareHouseItem.value.composition.splice(index,1,objectToSwap);
      editProducActive.value = true;
    };
    const postWarehouse = () => {
      const newWareHouse = {
        id:
          warehouseItems.value[warehouseItems.value.length - 1].id +
          1,
        name: nameWarehouse.value,
        composition: newArrDesc.value,
      };
      axios
        .post("http://localhost:3000/warehouseItems", newWareHouse)
        .catch((error) => {
          console.log(error);
        });
      setTimeout(()=>{
        warehouseItems.value.push(newWareHouse);
        nameWarehouse.value = "";
        newArrDesc.value = []
      }, 100)
    };
    const warehouseIsPresent = computed(()=>{
      return warehouseItems.value.length
    })
    const warehouseIsAbsent = computed(()=>{
      return !warehouseIsPresent.value && !preloaderActive.value && !wrongGetData.value
    })
    const showTableAfterGet = computed(()=>{
      return !wrongGetData.value && !preloaderActive.value && warehouseIsPresent.value
    })
    const wrongData = computed(()=>{
      return wrongGetData.value && !preloaderActive.value
    })
    const funcButtonDisabled = computed(()=>{
      return wrongGetData.value || preloaderActive.value
    })
    const okDisabled = computed(() => {
      return (
        !nameWarehouse.value
      );
    });
    const editProductDisabled = computed(()=>{
      return Object.values(editProduct.value).some(item=> item === "")
    })
    const editDisabled = computed(()=>{
      if(nameWarehouse.value || isEditActive.value || editProducActive.value){
        return false
      }
      else{
        return true
      }
    })
    const addDescDisabled = computed(() => {
      return (
        !addDesc.value ||
        !addPrice.value ||
        !cityGet.value ||
        !dataInsideGet.value
      );
    });
    onMounted(() => {
      getData();
    });
    return {
      warehouseIsAbsent,
      showTableAfterGet,
      wrongData,
      funcButtonDisabled,
      postWarehouse,
      createEditProduct,
      addDescArr,
      selectWarehouse,
      changeWarehouse,
      editWareHouse,
      warehouseIsPresent,
      deleteProduct,
      changeProduct,
      deleteWareHouse,
      editProductDisabled,
      isEditActive,
      editProducActive,
      okDisabled,
      editProduct,
      addDescDisabled,
      cityGet,
      edit,
      editDisabled,
      cities,
      dataInsideGet,
      dataInsideCount,
      showTable,
      addPrice,
      newArrDesc,
      addDesc,
      nameWarehouse,
      insideWarehouse,
      warehouseItems,
      wrongGetData,
      nameField,
      selectwareHouseItem,
      preloaderActive,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.warehouse-page {
  padding: 50px 5px 5px;
  position: relative;
  &__show-warehouse {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  h2 {
    text-align: center;
  }
  &__loader{
    position: absolute;
    top: 100%;
    left: 48%;
  }
  &__empty{
    margin-top: 40px !important;
    width: 50%;
    margin: 0 auto;
    user-select: none;
    border:1px solid $black;
    border-radius: 10px;
    box-shadow: 0 0 5px $white;
    p{
      margin-top: 10px;
      text-align: center;
    }
  }
  &__wrapper {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    flex-wrap: wrap;
    &__item {
      border: 1px solid $black;
      text-align: center;
      padding-top: 60px !important;
      cursor: pointer;
      border-radius: 10px;
      position: relative;
      width: 40%;
      margin-top: 15px;
      max-width: 200px;
      box-shadow: 0 0 10px $white;
      padding-top: 25px;
      p {
        margin-top: 10px;
      }
      &--edit {
        position: absolute;
        top: -1px;
        left: -1px;
        border-top-left-radius: 8px;
      }
      &--delete {
        position: absolute;
        top: -1px;
        right: -1px;
        border-top-right-radius: 8px;
      }
    }
  }
}
.popap-label {
  width: 40%;
}
.add-inside {
  margin-top: 10px;
  display: block;
  padding: 0 10px;
}
.popap-input {
  width: 188px;
}
.popap-list-edit{
  list-style: none;
  padding-left: 30px !important;
  li{
    position: relative;
    &:last-child {
      margin: 0;
    }
     button{
      position: absolute;
      top: 12px;
      left: -38px;
      width: 30px;
      height: 30px;
      padding: 0;
    }
  }
}
.popap-delete-button{
  position: absolute;
  bottom: -57px;
}
.warning-info{
  width: 100%;
  padding-top: 20px;
  text-align: center;
  color: $red;
}
.popap-list {
  margin-top: 20px;
  list-style: none;
  padding: 0;
  li {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid $black;
    margin-bottom: 5px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
