<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
                :link="{
                  name: 'Latest',
                  path: '/latest',
                  icon: 'ni ni-tag text-success',
                }">
        </sidebar-item>
        
        <sidebar-item
                :link="{
                  name: 'Selected collections',
                  path: '/selected',
                  icon: 'ni ni-favourite-28 text-red',
                }">
        </sidebar-item>
        <sidebar-item
                :link="{
                  name: 'All Bitcoin resources',
                  path: '/resources',
                  icon: 'ni ni-tv-2 text-primary',
                }">
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Contact me</h6>

        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item
               href="https://twitter.com/raul__cano"
               >
              <i class="ni ni-spaceship"></i>
              <b-nav-text class="p-0">Twitter @raul__cano</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view 
            :resources="resources" 
            :sourceURL="sourceURL" 
            :isBusy="isBusy" 
            :totalRows="totalRows"
            :countArticles="countArticles"
            :countBooks="countBooks"
            :countPodcasts="countPodcasts"
            :countAudios="countAudios"
            :countVideos="countVideos"
            :countCollections="countCollections"
            :countGuides="countGuides"
            :countTools="countTools"
            :countLatest="12"
            :resourcesLatest="resourcesLatest"
            ></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition
    },
     data() {
      return {
        sourceURL: 'bitcoin-resources.csv',
        resources: [],
        isBusy: true, 
        totalRows: 1,
        countArticles: 0,
        countBooks: 0,
        countPodcasts: 0,
        countAudios: 0,
        countVideos: 0,
        countCollections: 0,
        countGuides: 0,
        countTools: 0,
        countLatest: 12,
        resourcesLatest: [],
      };
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      },
      countRowsByType(t){
        return this.resources.filter(function(item){
          return item.type.includes(t);
        }).length;
      },
      // returns an array with different elements from a comma separated string
      splitToArray(str){
        return str.split(",").map((item)=>item.trim());
      },
      loadResources(){
        this.$papa.parsePromise = function(file, thisObject) {
          return new Promise(function(complete, error) {
            thisObject.$papa.parse(file, {
                  header: true,
                  download: true,
                  delimiter: ",",
                  quoteChar: '"',
                  escapeChar: '"',
                  skipEmptyLines: true,
                  complete,
                  error,
            });
          });
        };
        return this.$papa.parsePromise(this.sourceURL, this).
          then(results => {
            const items = results.data
            items.map((item) => item.keywords = this.splitToArray(item.keywords))
            items.map((item) => item.author = this.splitToArray(item.author))
            items.map((item) => item.selected_collection = this.splitToArray(item.selected_collection))
            this.isBusy = false;
            this.resources = items
            this.totalRows = items.length

            this.countArticles = this.countRowsByType('article');
            this.countBooks = this.countRowsByType('book');
            this.countPodcasts = this.countRowsByType('podcast');
            this.countVideos = this.countRowsByType('video');
            this.countAudios = this.countRowsByType('audio');
            this.countGuides = this.countRowsByType('guide');
            this.countCollections = this.countRowsByType('collection');
            this.resourcesLatest = this.resources.slice(-this.countLatest).reverse()
          })  
      },
      percentageOfTotal(countResource){
        return ((countResource / this.totalRows) * 100).toFixed(1)
      }
    },
    mounted() {
      this.initScrollbar()
      this.loadResources()
    },
    
  };
</script>
<style lang="scss">
</style>
