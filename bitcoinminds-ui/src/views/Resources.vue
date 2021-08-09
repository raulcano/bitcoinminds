<template>

  <div>
    <!-- <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-translucent-darker"> -->
    <base-header class="pt-5 pb-8 bg-translucent-darker">
      <!-- Card stats -->
      <!-- <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Articles"
                      type="gradient-red"
                      :sub-title="countArticles.toString()"
                      icon="ni ni-single-copy-04"
                      link="#/resources?filter_type=article"
                      tooltip="This includes all written articles, except if they are a guide"
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
                      link="#/resources?filter_type=book"
                      tooltip="This includes books"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countBooks)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Podcasts and episodes"
                      type="gradient-green"
                      :sub-title="(countPodcasts + countAudios + countVideos).toString()"
                      icon="ni ni-headphones"
                      link="#/resources?filter_type=podcast"
                      tooltip="This includes podcasts (as show) and all individual episodes we have collected both in audio and video"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countPodcasts)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Guides and Tools"
                      type="gradient-info"
                      :sub-title="(countGuides + countTools).toString()"
                      icon="ni ni-tv-2"
                      link="#/resources?filter_type=guide"
                      tooltip="This includes how-to guides and other links with tools for particular stuff (e.g. blockchain explorers)"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countGuides + countTools)}} %</span>
              <span class="text-nowrap">of {{totalRows}} resources</span>
            </template>
          </stats-card>
        </b-col>
      </b-row> -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <resources-vue-good-table :resources="resources" :sourceURL="sourceURL" :isBusy="isBusy" :totalRows="totalRows"></resources-vue-good-table>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
  import ResourcesVueGoodTable from "./Tables/RegularTables/ResourcesVueGoodTable";
  export default {
    props: ['resources', 
    'sourceURL',
    'isBusy',
    'totalRows',
    'countArticles',
    'countBooks',
    'countPodcasts',
    'countAudios',
    'countVideos',
    'countCollections',
    'countGuides',
    'countTools'],
    components: {
      ResourcesVueGoodTable,
    },
    methods: {
      percentageOfTotal(countResource){
        return ((countResource / this.totalRows) * 100).toFixed(1)
      }
    }
  };
</script>
<style>
</style>
