<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-translucent-darker">
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
          <stats-card title="Podcasts and episodes"
                      type="gradient-green"
                      :sub-title="(countPodcasts + countAudios + countVideos).toString()"
                      icon="ni ni-headphones"
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
                      :sub-title="(countTools + countGuides).toString()"
                      icon="ni ni-tv-2"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">{{ percentageOfTotal(countTools + countGuides)}} %</span>
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
            :sub-title="generateSubTitle(resource)"
            :img-src="resource.image ? '/latest/'+ resource.image : 'https://picsum.photos/600/300/?image=25'"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 24rem;"
            class="mb-2 mr-2"
          >
            <b-card-text>
              {{resource.description.substring(0, maxCharsDescription)}}
              <span v-if="resource.description.length > maxCharsDescription">
              ...
              </span>
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
    props: ['resources', 
    'sourceURL',
    'isBusy',
    'totalRows',
    'countArticles',
    'countBooks',
    'countPodcasts',
    'countAudios',
    'countVideos',
    'countLatest',
    'countGuides',
    'countCollections',
    'resourcesLatest',
    'countTools'
    ],
    components: {
    },
    data() {
      return {
        maxCharsDescription: 100,
      };
    },
    methods: {
      percentageOfTotal(countResource){
        return ((countResource / this.totalRows) * 100).toFixed(1)
      },
      generateSubTitle(resource){
        var authors, date
        var result = ''
        authors = (resource.author.length > 0) ? resource.author.join(', ') : ''
        date = (resource.date != '') ? resource.date : ''

        if(authors != '') {
          result = 'By ' + authors
          if (date != '') {
            result += ', published on ' + date
          }
        } else {
          if (date != '') {
            result = 'Published on ' + date
          }
        }
        return result
      }
    }
  };
</script>
<style>
</style>
