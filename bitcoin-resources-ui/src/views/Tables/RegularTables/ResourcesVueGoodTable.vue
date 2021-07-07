<template>

    <b-card no-body v-if="isBusy">
        <div class="text-center text-danger my-2">
          <strong>Loading...</strong>
        </div>
    </b-card>
    <b-card no-body v-else>
        <b-card-header class="border-0">
          <b-row>
            <b-col>
              <div>
                <vue-good-table
                  ref="resourcesTable"
                  :columns="columns"
                  :rows="isGroupedBy ? resourcesGrouped : resources"
                  styleClass="vgt-table condensed"
                  :group-options="isGroupedBy ? {enabled: true, collapsable: true} : {enabled: false}"
                   >
                    <div slot="emptystate">
                      <div class="text-center mb-3">
                        <b-img src="/img/empty.jpg" width="300px"></b-img>
                        <h2>No results found with for those filters :(</h2>
                      </div>
                    </div>
                    <div slot="table-actions">
                          <!-- <span class="text-sm mr-2 mt-1">
                            Showing {{ 'xxx' }} results
                          </span> -->

                          <b-button
                          class="mt-1 mb-1 mr-2"
                          variant='outline-danger'
                          :hidden="isGroupedBy ? false : true"
                          title="Removes the grouping of rows and returns the table to its original state"
                          @click="ungroup()"
                          >Clear row groups</b-button>

                        <!-- <b-button
                          class="mt-1 mb-1 mr-2"
                          variant='outline-warning'
                          title="Checks the status of links"
                          @click="checkStatusAll()"
                          >
                          <span v-if="isLoadingStatus">loading...</span>
                          <span v-else>Check status of links</span>
                          </b-button> -->
                        
                        <a
                          :href="sourceURL"
                          class="mt-1 mb-1 mr-2 btn btn-success"
                          title="Download the CSV file with all the data in this table"
                          >DOWNLOAD</a>

                        <b-button
                          class="mt-1 mb-1 mr-2"
                          variant='outline-info'
                          title="Group the rows by type"
                          @click="groupBy('type')"
                          >Group by type</b-button>
                      
                        <b-button
                          class="mt-1 mb-1 mr-2"
                          variant='outline-info'
                          title="Group the rows by authors"
                          @click="groupBy('author')"
                          >Group by authors</b-button>
                          
                        <b-button
                          class="mt-1 mb-1 mr-2"
                          variant='outline-info'
                          title="Group the rows by keywords"
                          @click="groupBy('keywords')"
                          >Group by keywords</b-button>

                        
                          <b-button
                          class="mt-1 mb-1 mr-2"
                          :disabled="isGroupedBy ? false : true"
                          :title="isGroupedBy ? null : 'Group the table by clicking on any of the available tags (type, author, keywords)'"
                          @click="$refs.resourcesTable.expandAll()"
                          >Expand all</b-button>

                          <b-button
                          class="mt-1 mb-1 mr-2"
                          :disabled="isGroupedBy ? false : true"
                          :title="isGroupedBy ? null : 'Group the table by clicking on any of the available tags (type, author, keywords)'"
                          @click="$refs.resourcesTable.collapseAll()"
                          >Collapse all</b-button>
                    </div>

                    <template slot="table-header-row" slot-scope="props">
                      <span class="ml-3 float-left">
                        {{ props.row.label }} 
                        <span class="text-sm text-light"
                        :title="'Found ' + props.row.children.length + ' entries in this category that match the filter applied'"
                        >({{ props.row.children.length }})</span>
                      </span>
                      
                      <b-button variant="outline-secondary" class="ml-3 float-right"
                      title="Removes the grouping of rows and returns the table to its original state"
                      @click="ungroup()">
                      <i class="ni ni-fat-remove"/>Clear</b-button>
                       
                    </template>


                    <template slot="table-row" slot-scope="props">

                      <span v-if="props.column.field == 'title'">

                        
                        <b-badge pill class="mr-1"
                        :id="'status-' + props.row.id"
                        style="display: none"
                        ></b-badge>

                        <b-link :href="props.row.link" target="_blank">{{props.row.title}}</b-link>
                        <br>
                        <div class="description">
                          {{props.row.description.substring(0, maxCharsDescription)}}
                          <span class="readmore" v-if="props.row.description.length > maxCharsDescription">
                            <span class="readmore-text" v-show="false" :id="'readmore-' + props.row.id">
                              {{props.row.description.substring(maxCharsDescription, props.row.description.length-1)}}
                              <span class="text-light show-less" @click="collapseDescription(props.row.id)">&laquo; less</span>
                            </span>

                            <span class="text-light show-more" @click="expandDescription(props.row.id)" :id="'readless-' + props.row.id">... more &raquo;</span>
                          </span>
                        </div>
                        
                      </span>

                      <span v-else-if="props.column.field == 'type'">
                        <b-button pill 
                        :variant="getTypeVariant(props.row.type)"
                        size="sm"
                        :title="'Click here to group the rows by ' + props.column.field"
                        @click="groupBy(props.column.field,props.row.type)"
                        >{{props.row.type}}</b-button>
                      </span>
                      <span v-else-if="props.column.field == 'language'">
                        <b-img fluid v-bind="flagProps" :src="'/img/flags/' + flags_dict[props.row.language]" :alt="props.row.language" :title="props.row.language"></b-img>
                      </span>
                      <span v-else-if="props.column.field == 'author'">
                        <b-button pill variant="secondary" size="sm" class="mt-1" v-for="author in props.row.author" :key="author"
                        :title="'Click here to group the rows by ' + props.column.field"
                        @click="groupBy(props.column.field,props.row.author)"
                        >{{author}}</b-button>
                      </span>
                      <span v-else-if="props.column.field == 'keywords'">
                        <b-button pill variant="secondary" size="sm" class="mt-1" v-for="k in props.row.keywords" :key="k"
                        :title="'Click here to group the rows by ' + props.column.field"
                        @click="groupBy(props.column.field,k)">{{k}}</b-button>
                      </span>
                      <span v-else>
                        {{props.formattedRow[props.column.field]}}
                      </span>
                    </template>

                </vue-good-table>
              </div>
            </b-col>
          </b-row>



          <b-row>
            <b-col>
            </b-col>
          </b-row>
        </b-card-header>
        
        
        <b-card-footer class="py-4 d-flex justify-content-end">

        </b-card-footer>
    </b-card>
</template>
<script>
  import axios from 'axios'
  import flags_dict from '@/assets/language-flags-mapping.js'
  import types from '@/assets/types.js'
  export default {
    name: 'resources-vue-good-table',
    props: ['resources','sourceURL','isBusy','totalRows'],
    components: {
    },
    data() {
      return {
        columns: [
          {
            label: 'Date',
            field: 'date',
            type: 'date',
            tdClass: 'align-middle date-cell',
            dateInputFormat: 'yyyy-MM-dd',
            dateOutputFormat: 'MMM do yy',
          },
          {
            label: 'Title',
            field: 'title',
            tdClass: 'text-sm align-middle title-cell',
            filterOptions: {
              enabled: true,
              placeholder: 'Filter by title',
            },
          },
          {
            label: 'Type',
            field: 'type',
            tdClass: 'text-center align-middle',
            tooltip: 'For a description of each type, visit https://github.com/raulcano/bitcoin-resources',
            filterOptions: {
              enabled: true,
              placeholder: 'Select ...',
              filterDropdownItems: types,
            },
          },
          {
            label: 'Language',
            field: 'language',
            tdClass: 'text-center align-middle',
            filterOptions: {
              enabled: true, 
              placeholder: 'Select ...',
              filterDropdownItems: [  
                { value: 'en', text: 'English' },  
                { value: 'es', text: 'Español' },  
              ],
            },
          },
          {
            label: 'Author(s)',
            field: 'author',
            tdClass: 'align-middle',
            filterOptions: {
              enabled: true,
              placeholder: 'Filter by author',
            },
          },
          {
            label: 'Keyword(s)',
            field: 'keywords',
            // tooltip: 'A simple tooltip',
            tdClass: 'align-middle',
            filterOptions: {
              enabled: true,
              placeholder: 'Filter by keyword',
            },
          },
          // {
          //   label: 'Other',
          //   field: 'other',
          // },
        ],
        flags_dict,
        flagProps: { width: 20, height: 20, class: 'm1' },
        isGroupedBy: false,
        resourcesGrouped: [],
        currentGrouping: { field: null, value: null},
        maxCharsDescription: 200,
        isLoadingStatus: false,
      };
    },
    methods: {
      getTypeVariant(value){
        return types.filter((function(type){
                            return type.value === value; 
                        }))[0].variant
      },
      groupBy(field, value = null){
        // all the logic to group and ungroup the rows goes here
        if(
          this.isGroupedBy &&
          field == this.currentGrouping.field
        ){
          // Do nothing
        }else{
          // Get a list of the unique values in the field to group by 
          var uniqueValues = []
          if (this.resources.length > 0){
            if (this.resources[0][field] instanceof Array){
              var tempArray = []
              this.resources.map(item => tempArray.push(...item[field]))
              uniqueValues = [...new Set(tempArray)]
            }else{
              uniqueValues = [...new Set(this.resources.map(item => item[field]))];
            }
          }

          // For each value, add the corresponding object in the arrays of grouped rows
          this.resourcesGrouped = []
          var group = {}
          uniqueValues.forEach((uniqueValue, index) => {
            let children  = this.resources.filter(function(item){
                      return item[field].includes(uniqueValue); 
                    });

            group = {
                mode: 'span',
                label: uniqueValue === "" ? '<< no ' + field + ' found for these resources >>' : uniqueValue,
                html: false, // if this is true, label will be rendered as html
                children: children,
              }
            // Make the selected value by the user the first in the array of grouped rows
            if (value instanceof Array) {
              value.includes(uniqueValue) ? this.resourcesGrouped.unshift(group) : this.resourcesGrouped.push(group)
            }else{
              uniqueValue === value ? this.resourcesGrouped.unshift(group) : this.resourcesGrouped.push(group)
            }
          });
          this.currentGrouping.field = field
          this.currentGrouping.value = value
        }
        this.isGroupedBy = true;
      },
      ungroup(){
        this.isGroupedBy = false;
      },

      expandDescription(id){
        document.getElementById("readmore-" + id).style.setProperty('display', '')
        document.getElementById("readless-" + id).style.setProperty('display', 'none')
      },
      collapseDescription(id){
        document.getElementById("readmore-" + id).style.setProperty('display', 'none')
        document.getElementById("readless-" + id).style.setProperty('display', '')
      },

      // checkStatusAll(){
      //   this.isLoadingStatus = true
      //   var promiseArray = new Array() 
      //   this.resources.forEach(function(item){
      //     var statusClass, statusLinkTooltip, statusText
      //     promiseArray.push(
      //       axios.get(item.link)
      //       .then(function (response) {
              
      //         if(response.status == 200){
      //           statusClass = 'badge-success'
      //           statusLinkTooltip = 'We reached successfully the URL. It seems working fine'
                
      //         } else {
      //           statusClass = 'badge-secondary'
      //           statusLinkTooltip = 'The URL returned a status different from OK, please check manually'
      //         }
      //         statusText = response.statusText
      //       })
      //       .catch(error => {
      //         statusClass = 'badge-info'
      //         statusText = '?'
      //         statusLinkTooltip = 'Could not reach the source. Please check manually'
      //       })
      //       .finally(() => {
      //         document.getElementById("status-" + item.id).style.setProperty('display', '')
      //         document.getElementById("status-" + item.id).setAttribute('title', statusLinkTooltip)
      //         document.getElementById("status-" + item.id).innerHTML = statusText
      //         document.getElementById("status-" + item.id).classList.add(statusClass)
      //       })
      //     )
      //   })
      //   Promise.all(promiseArray).then((values) => {
      //     console.log(values);
      //     this.isLoadingStatus = false
      //   });
      // }
    }
  }
</script>
<style scoped>
td.date-cell span{
  font-size: 10px;
}

td.title-cell span{
  font-size: 13px;
}

td.title-cell .description{
  font-size: 13px;
  color: #ced4da !important;
}

td.title-cell .description:hover{
  color: dimgray !important;
}
.show-more, .show-less {
  cursor: pointer;
}
</style>