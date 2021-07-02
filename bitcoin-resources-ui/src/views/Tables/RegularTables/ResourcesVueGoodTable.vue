<template>

    <b-card no-body v-if="isBusy">
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
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
                    <div slot="table-actions">
                      <b-button
                        class="mt-1 mb-1 mr-2"
                        variant='outline-danger'
                        :hidden="isGroupedBy ? false : true"
                        title="Removes the grouping of rows and returns the table to its original state"
                        @click="ungroup()"
                        >Clear row groups</b-button>

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
                      </span>
                      
                      <b-button variant="outline-secondary" class="ml-3 float-right"
                      title="Removes the grouping of rows and returns the table to its original state"
                      @click="ungroup()">
                      <i class="ni ni-fat-remove"/>Clear</b-button>
                       
                    </template>


                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'title'">
                        <b-link :href="props.row.link" target="_blank">{{props.row.title}}</b-link>
                        <br>
                        <span class="text-light">
                          {{props.row.description}} 
                        </span>
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
        currentGrouping: { field: null, value: null}
      };
    },
    mounted() {
    },
    computed: {
      groupByButtonText(){
        return (this.isGroupedBy === true) ? 'Ungroup rows' : 'Group rows by keyword';
      }
    },
    methods: {
      getTypeVariant(value){
        return types.filter((function(type){
                            return type.value === value; 
                        }))[0].variant
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
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
                label: uniqueValue === "" ? '<< no ' + field + ' found >>' : uniqueValue,
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
    },
  }
</script>
<style scoped>
td.date-cell span{
  font-size: 10px;
}

td.title-cell span{
  font-size: 13px;
}
</style>
