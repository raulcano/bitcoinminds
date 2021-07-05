<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Articles"
                      type="gradient-red"
                      :sub-title="countArticles.toString()"
                      icon="ni ni-single-copy-04"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countArticles)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Books"
                      type="gradient-orange"
                      :sub-title="countBooks.toString()"
                      icon="ni ni-books"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countBooks)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Podcasts"
                      type="gradient-green"
                      :sub-title="countPodcasts.toString()"
                      icon="ni ni-headphones"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countPodcasts)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Video and audio episodes"
                      type="gradient-info"
                      :sub-title="(countVideos + countAudios).toString()"
                      icon="ni ni-tv-2"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countVideos + countAudios)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <!-- <resources-table :resources="resources" :sourceURL="sourceURL" :isBusy="isBusy" :totalRows="totalRows"></resources-table> -->
          <resources-vue-good-table :resources="resources" :sourceURL="sourceURL" :isBusy="isBusy" :totalRows="totalRows"></resources-vue-good-table>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
  import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
  // import ResourcesTable from "./Tables/RegularTables/ResourcesTable";
  import ResourcesVueGoodTable from "./Tables/RegularTables/ResourcesVueGoodTable";
  

  export default {
    components: {
      // ResourcesTable,
      ResourcesVueGoodTable,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        sourceURL: 'bitcoin-resources.csv',
        isBusy: true, 
        resources: [],
        totalRows: 1,
        countArticles: 0,
        countBooks: 0,
        countPodcasts: 0,
        countAudios: 0,
        countVideos: 0,
      };
    },
    mounted() {
      this.loadResources();
    },
    methods: {
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
            this.isBusy = false;
            this.resources = items
            this.totalRows = items.length

            this.countArticles = this.countRowsByType('article');
            this.countBooks = this.countRowsByType('book');
            this.countPodcasts = this.countRowsByType('podcast');
            this.countVideos = this.countRowsByType('video');
            this.countAudios = this.countRowsByType('audio');
            // return items || []
          })  
      },
      percentageOfTotal(countResource){
        return ((countResource / this.totalRows) * 100).toFixed(1)
      }
    }
  };
</script>
<style>
</style>
