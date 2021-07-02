/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import VuePapaParse from 'vue-papa-parse'
import VueGoodTablePlugin from 'vue-good-table';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//Vue.config.productionTip = false


// import the styles
import 'vue-good-table/dist/vue-good-table.css'
// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VuePapaParse);
Vue.use(VueGoodTablePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});









