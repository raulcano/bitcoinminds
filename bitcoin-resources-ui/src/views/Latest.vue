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
        <b-col class="col-md-6 col-xl-3" v-for="resource in resourcesLatest" :key="resource.id">
          <b-card 

            :title="resource.title"
            :sub-title="'By ' + resource.author.join(',') + ', published on ' + resource.date"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 24rem;"
            class="mb-2 mr-2"
          >
            <b-card-text>
              {{resource.description}}
            </b-card-text>

            <b-button :href="resource.link" target="_blank" variant="primary">Read more</b-button>
          </b-card>
        </b-col>
          
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
  

  export default {
    components: {
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
        countLatest: 12,
        resourcesLatest: []
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

            this.resourcesLatest = this.resources.splice(-this.countLatest)
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
