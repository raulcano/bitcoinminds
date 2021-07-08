<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-translucent-darker">
      <!-- Card stats -->
      <b-row>
        <b-col xl="4" md="6">
          <stats-card title="Beginners"
                      type="gradient-red"
                      :sub-title="'MUST READ'"
                      icon="ni ni-books"
                      class="mb-4">

            <template slot="footer">
              <span class="">A collection of my favorite articles and books, for those starting their Bitcoin journey</span><br>
              <b-button class="btn-outline-primary mt-2"
              @click="loadSelection(1)">
              <span v-if="loadedSelection == 1">Hide</span>
              <span v-else>Show</span>
              </b-button>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="4" md="6">
          <stats-card title="Beginners / intermediate"
                      type="gradient-green"
                      :sub-title="'MUST LISTEN'"
                      icon="ni ni-headphones"
                      class="mb-4">

            <template slot="footer">
              <span class="">Some of the best podcast episodes every bitcoiner should know. Perfect for your commute, the gym...</span><br>
              <b-button class="btn-outline-primary mt-2"
              @click="loadSelection(2)">
              <span v-if="loadedSelection == 2">Hide</span>
              <span v-else>Show</span>
              </b-button>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="4" md="12">
          <stats-card title="Advanced"
                      type="gradient-orange"
                      :sub-title="'HOW-TO BITCOIN'"
                      icon="ni ni-settings"
                      class="mb-4">
            
            <template slot="footer">
              <span class="">A selection of technical guides for those who enjoy a bit of DIY and trying out stuff on their own</span><br>
              <b-button class="btn-outline-primary mt-2"
              @click="loadSelection(3)">
              <span v-if="loadedSelection == 3">Hide</span>
              <span v-else>Show</span>
              </b-button>
            </template>
          </stats-card>
        </b-col>

        
        
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col class="col-md-6 col-xl-3" v-for="resource in selectedResources" :key="resource.id">
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
      <b-row>
        <b-col class="col-md-12 col-xl-12">
          <b-card
            title="What is this section?"
            img-src="img/lighthouse.jpg"
            img-alt="Image"
            img-bottom
            tag="article"
            style="max-width: 100%;"
            class="mb-2 mr-2"
          >
            <b-card-text class="text-sm">
              I have collected here the resources that I liked or helped me the most in my own Bitcoin journey. That's why this is the most personal 
              section in this website, and hence, likely more biased. As you have seen already, there are thousands of amazing Bitcoin resources and it can be overwhelming to know where 
              to start. With this curated lists, maybe I can help you navigate through the sea of Bitcoin knowledge out there.
            </b-card-text>
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
    ],
    components: {
    },
    data() {
      return {
        selectedResources: [],
        loadedSelection: 0,
        maxCharsDescription: 100,
      };
    },
    methods: {
      loadSelection(selection){
        if(this.loadedSelection == selection){
          this.loadedSelection = 0
          this.selectedResources = []
        }else{
          this.selectedResources = this.resources.filter(function(item){
                      return item.selected_collection.includes(selection.toString());
                    });
          this.loadedSelection = selection
          console.log(this.resources.length)
        }
      },
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
