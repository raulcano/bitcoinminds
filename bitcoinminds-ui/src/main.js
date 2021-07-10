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

// import the styles
import 'vue-good-table/dist/vue-good-table.css'
////////////////////////////
// import the tooltip library
// if this is somehow problematic, we can remove these imports and import the two things in each component
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // for styling
Vue.prototype.$tippy = tippy // // global variable to make tippy accessible from components with this.$tippy
/////////////////////////////
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
////////////////////////////
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)


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
  router,
});









