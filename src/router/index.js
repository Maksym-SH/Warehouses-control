import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import warehouse from "../views/warehousePage.vue";
import users from "../views/usersPage.vue";
import issuePage from '../views/issuePage.vue';
import paymentPage from '../views/paymentPage.vue';
import pagePrint from '../views/pagePrint.vue';
const routes = [
  {
    path: "/",
    name: "warehouse",
    component: warehouse,
  },
  {
    path: "/users",
    name: 'users',
    component: users,
  },
  {
    path:'/issue',
    name:'issue',
    component: issuePage,
  },
  {
    path:'/payment',
    name:'payment',
    component:paymentPage,
  },
  {
    path:'/pagePrint',
    name:'print',
    component:pagePrint,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
export default router;
