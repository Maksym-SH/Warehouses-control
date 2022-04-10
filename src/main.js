import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueCompositionAPI from "@vue/composition-api";
import router from "./router";
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCompositionAPI);

new Vue({
  axios,
  router,
  render: (h) => h(App),
}).$mount("#app");
