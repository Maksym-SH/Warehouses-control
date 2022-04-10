<template>
  <div class="issue-page">
    <b-button variant="warning" title="Распечатать квитанцию" class="issue-page__print-statement" v-b-modal.print :disabled="funcButtonDisabled">
      <b-icon icon="file-earmark-break" scale="1.5">
      </b-icon>
    </b-button>
    <b-button variant="success" title="Создать новую заяву" class="issue-page__add-statement" v-b-modal.add-receipts :disabled="funcButtonDisabled">
      <b-icon icon="plus" scale="1.5">
      </b-icon>
    </b-button>
    <h2>Выдача товара</h2>
    <div class="issue-page__empty" v-if="receiptsIsAbsent">
      <p>Заказы на выдачу отсутствуют</p>
    </div>
     <div class="issue-page__empty" v-if="wrongData">
        <p>Не удалось получить данные, повторите попытку</p>
      </div>
    <b-spinner type="grow" class="issue-page__loader" v-if="preloaderActive"></b-spinner>
    <custom-table v-else-if="showTableAfterGet" :field="fields" :items="receipts"></custom-table>
    <b-modal id="print" title="Распечатать квитанцию" :ok-disabled="okDisabledPrint" @ok="printPage" hide-header-close>
      <div class="pt-2">
          <label for="id-statement" >Номер квитанции</label>
          <input type="number" class="popap-input" v-model.number="idForPrint">
      </div>
      <router-link :to="{path:'/pagePrint', query:dataForPrint}">
        <b-button @click="printPage" variant="primary" :disabled="okDisabledPrint" class="show-button">OK</b-button>
      </router-link>
    </b-modal>
    <b-modal id="add-receipts" title="Добавить новую квитанцию" :ok-disabled='okDisabledAdd' @ok="sendReceipts" hide-header-close>
      <div class="pt-2">
          <label for="id-statement" >Товар</label>
        <b-form-select class="popap-input" v-model="selectProduct" :options="avaliableProduct"></b-form-select>
      </div>
        <div class="pt-2">
          <label for="id-statement" >Клиент</label>
          <b-form-select class="popap-input" v-model="selectUser" :options="users"></b-form-select>
      </div>
        <div class="pt-2">
          <label for="id-statement">Дата отправки</label>
          <input type="date" class="popap-input" v-model="selectDate">
      </div>
      <div class="pt-2 pb-5">
          <label for="id-statement">Город отправителя</label>
          <b-form-select class="popap-input" v-model="selectCity" :options="cities"></b-form-select>
      </div>
      <p class="issue-page__info-select-product" v-if="selectProduct">
        <span> Товар есть на складе:</span>
            <ol class="mb-0">
              <li v-for="(item, index) in ownProduct" :key="index">
                {{item}}
              </li>
          </ol>
          <span>Количество на cкладах:
            <ul class="mb-0">
              <li v-for="(count,index) in countSelectProduct" :key="index">
                На {{index + 1}} складе {{count}} единиц товара
              </li>
            </ul>
          </span>
          <span> Товар: {{selectProduct}}</span>
          <span> Цена: {{selectProductPrice}} ₴</span>
      </p>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios';
import {ref, onMounted,computed } from '@vue/composition-api';
import customTable from '../components/customTable.vue';
export default {
  name:'issuePage',
  components:{
    'custom-table':customTable,
  },
  setup(){
    const fields = ref(['Номер выдачи','Товар', "Покупатель", "Дата отправки", "Город покупателя"]);
    const idForPrint = ref('');
    const warehouses = ref([]);
    const users = ref([]);
    const avaliableProduct = ref([]);
    const selectProduct = ref('');
    const selectUser = ref('');
    const warehouseItem = ref([]);
    const selectProductPrice = ref('');
    const countSelectProduct = ref([]);
    const selectDate = ref('');
    const preloaderActive = ref(true);
    const wrongGetData = ref(false);
    const receipts = ref([]);
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
    const selectCity = ref('');
    const historyPayLength = ref(0);
    const receiptsLenght = ref(0);
    const dataForPrint = ref({});
    onMounted(()=>{
        axios.get('http://localhost:3000/warehouseItems')
        .then(array=>{
         warehouses.value = array;
          avaliableProduct.value = [...new Set(warehouses.value.data.flatMap(item =>item.composition)
          .map(item=>item.name))]
        })
        .catch(error => console.log(error))
        axios.get('http://localhost:3000/users').then(array=>{
           users.value =  array.data.map(item => item.firstName + " " + item.secondName)});
        axios.get('http://localhost:3000/receipts').then(array =>{
          receiptsLenght.value = array.data.length;
          receipts.value = array.data;
            preloaderActive.value = false;
            wrongGetData.value = false;
          }).catch(error=>{
            console.log(error);
            preloaderActive.value = false;
            wrongGetData.value = true;
          })
        axios.get('http://localhost:3000/historyPayment')
        .then(array => {
          historyPayLength.value = array.data.length
          })
    });
    const sendReceipts = ()=>{
      const objectToSend = {
        id: receiptsLenght.value + 1,
        product:selectProduct.value,
        user:selectUser.value,
        dataSend: selectDate.value.split('-').reverse().join('.'),
        citySend:selectCity.value
      }
      const historyPay = {
        id:historyPayLength.value + 1,
        product:selectProduct.value,
        price:selectProductPrice.value,
        user:selectUser.value,
        dataSend: selectDate.value.split('-').reverse().join('.'),
        citySend:selectCity.value
      }
      receipts.value.push(objectToSend)
      selectProduct.value =
      selectProductPrice.value =
      selectUser.value =
      selectDate.value =
       selectDate.value =
       selectCity.value = ''
      axios.post('http://localhost:3000/receipts', objectToSend).catch(error=>console.log(error));
      axios.post('http://localhost:3000/historyPayment',historyPay)
    };
    const findOwProduct = ()=>{
      countSelectProduct.value = [];
      selectProductPrice.value = '';
      warehouseItem.value = []
      for(let item of warehouses.value.data){
        for(let index = 0; index< item.composition.length;index++){
          if(item.composition[index].name === selectProduct.value){
            countSelectProduct.value.push(item.composition[index].count);
            selectProductPrice.value = item.composition[index].price;
            warehouseItem.value.push(item.name);
          }
        }
      }
    }
    const receiptsIsPresent = computed(()=>{
      return receipts.value.length
    })
    const receiptsIsAbsent = computed(()=>{
      return !receiptsIsPresent.value && !preloaderActive.value && !wrongGetData.value
    })
    const showTableAfterGet = computed(()=>{
      return !wrongGetData.value && !preloaderActive.value && receiptsIsPresent.value
    })
    const wrongData = computed(()=>{
      return wrongGetData.value && !preloaderActive.value
    })
    const funcButtonDisabled = computed(()=>{
      return wrongGetData.value || preloaderActive.value
    })
    const ownProduct = computed(()=>{
      selectProduct.value ? findOwProduct():null;
      return warehouseItem.value;
    })
    const okDisabledAdd = computed(()=>{
      return !selectUser.value ||  !selectDate.value || !selectProduct.value || !selectCity.value
    })
    const printPage = () =>{
      dataForPrint.value = receipts.value.find(item => item.id === idForPrint.value)
      for(let item of warehouses.value.data){
        for(let index = 0; index< item.composition.length;index++){
          if(item.composition[index].name === dataForPrint.value.product){
            dataForPrint.value.price = item.composition[index].price;
          }
        }
      }
    };
    const okDisabledPrint = computed(()=>{
      let isPresent = false;
      if(receipts.value.find(item => item.id === idForPrint.value)){
        isPresent = true
      }
      return !idForPrint.value || !isPresent
    })
    return{
      receiptsIsAbsent,
      showTableAfterGet,
      wrongData,
      funcButtonDisabled,
      sendReceipts,
      okDisabledPrint,
      okDisabledAdd,
      idForPrint,
      avaliableProduct,
      preloaderActive,
      selectProduct,
      warehouses,
      ownProduct,
      selectProductPrice,
      users,
      selectUser,
      selectDate,
      cities,
      selectCity,
      receipts,
      countSelectProduct,
      fields,
      printPage,
      dataForPrint,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.issue-page{
  position: relative;
  padding:50px 5px 20px 5px;
  h2{
    text-align: center;
  }
  &__loader{
    position: absolute;
    top: 100%;
    left: 48%;
  }
  &__info-select-product{
    span{
      display: block;
    }
  }
  &__add-statement{
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &__print-statement{
    position: absolute;
    top: 5px;
    left: 5px;
  }
  &__loader{
    position: absolute;
    top: 100%;
    left: 48%;
    transform: translate(-50% -50%);
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
}
.popap-input{
  width: 100%;
}
.show-button{
  position: absolute;
  bottom:-55px;
  right: 15px;
  z-index: 3;
}
</style>