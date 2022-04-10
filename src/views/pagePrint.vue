<template>
  <div class="page-print">
    <h1>Квитанция</h1>
    <b-button variant="success" class="page-print__print" v-if="!isPrintActive" @click="print">
      Напечатать
    </b-button>
    <router-link to="/issue">
        <b-button variant="primary"  class="page-print__leave" v-if="!isPrintActive">
          Вернуться
        </b-button>
    </router-link>
    <div class="container">
     <div class="page-print__info">
       <h2>Данные квитанции</h2>
       <h4>Номер сделки: #{{$route.query.id}}</h4>
       <h4>Товар: {{$route.query.product}}</h4>
       <h4>Цена: {{$route.query.price}} ₴</h4>
       <h4>Имя получателя: {{$route.query.user}}</h4>
       <h4>Дата отправки: {{$route.query.dataSend}}</h4>
       <h4>Город получателя: {{$route.query.citySend}}</h4>
     </div>
     <div class="page-print__seal">
       <img src="../assets/icons/seal.svg" alt="">
       <h6>Сделка совершенна</h6>
     </div>
    </div>
    <h2 class="page-print__productName">©Warehouse products</h2>
  </div>
</template>
<script>
import {ref, onMounted} from '@vue/composition-api';
export default {
  name:'pagePrint',
  setup(){
    const isPrintActive = ref(false)
    const print = ()=>{
      isPrintActive.value = true;
      setTimeout(()=>{
        window.print();
      },500)
    }
    const stopPrint = ()=>{
      isPrintActive.value = false;
    };
    onMounted(()=>{
      window.addEventListener('afterprint', stopPrint)
    })
    return{
      print,
      isPrintActive,
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
.page-print{
  position: absolute;
  height: 100vh;
  min-height: 800px;
  inset: 0;
  z-index: 10;
  background-color: $white;
  color: $black;
  h1{
    text-align: center;
  }
  &__print{
    position: absolute;
    top: 90px;
    right: 10px;
  }
  &__productName{
    margin-top: 500px;
    text-align: center;
  }
  &__leave{
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 10;
    width: 110px;
  }
  &__seal{
    pointer-events: none;
    user-select: none;
    float: right;
    img{
      width: 150px;
      height: 150px;
    }
    margin-top: 30px;
  }
  &__info{
    h2{
      text-align: center;
      margin-bottom: 20px;
    }
    padding:0 20px 20px 20px;
    font-size: 25px;
    margin-top: 150px;
    border:1px solid $black;
    border-radius: 10px;
  }
}
</style>