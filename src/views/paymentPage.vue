<template>
  <div class="payment-page">
     <h2>История транкзаций</h2>
      <b-spinner type="grow" class="payment-page__loader" v-if="preloaderActive"></b-spinner>
      <div class="payment-page__empty" v-if="paymentIsEmpty">
        <p>Заказы на выдачу отсутствуют</p>
      </div>
      <div class="payment-page__empty" v-if="wrongData">
        <p>Не удалось получить данные, повторите попытку</p>
      </div>
      <custom-table v-else-if="showTable" :field="field" :items="history"></custom-table>
  </div>
</template>

<script>
import axios from 'axios'
import CustomTable from '../components/customTable.vue';
import {ref, onMounted, computed} from '@vue/composition-api';
export default {
  name:'paymentPage',
  components:{
    'custom-table':CustomTable
  },
  setup(){
    const history = ref([]);
    const preloaderActive = ref(true);
    const wrongGetData = ref(false);
    const field = ref(['Идентификатор платежа',"Товар", "Цена (₴)", "Покупатель", "Дата отправки", "Город покупателя"])
    const historyIsPresent = computed(()=>{
      return history.value.length
    })
    const paymentIsEmpty = computed(()=>{
      return !historyIsPresent.value && !preloaderActive.value && !wrongGetData.value
    })
    const showTable = computed(()=>{
      return !wrongGetData.value && !preloaderActive.value && historyIsPresent.value
    })
    const wrongData = computed(()=>{
      return wrongGetData.value && !preloaderActive.value
    })
    onMounted(()=>{
      axios.get('http://localhost:3000/historyPayment').then(array=>{
        history.value = array.data,
        wrongGetData.value = false;
        preloaderActive.value = false;
        }).catch(error=>{
          console.log(error)
          wrongGetData.value = true;
          preloaderActive.value = false;
        })
    })
    return {
      history,
      field,
      preloaderActive,
      showTable,
      wrongGetData,
      historyIsPresent,
      paymentIsEmpty,
      wrongData
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.payment-page{
  position: relative;
  padding: 50px 5px 5px;
  h2{
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
}
</style>