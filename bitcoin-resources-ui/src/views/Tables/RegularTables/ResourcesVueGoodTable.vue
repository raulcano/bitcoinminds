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
                  :columns="columns"
                  :rows="resources"
                  styleClass="vgt-table condensed"
                   >

                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'title'">
                        <b-link :href="props.row.link" target="_blank">{{props.row.title}}</b-link>
                      </span>
                      <span v-else-if="props.column.field == 'type'">
                        <b-button pill variant="primary" size="sm">{{props.row.type}}</b-button>
                      </span>
                      <span v-else-if="props.column.field == 'language'">
                        <b-img fluid v-bind="flagProps" :src="'/img/flags/' + flags_dict[props.row.language]" :alt="props.row.language" :title="props.row.language"></b-img>
                      </span>
                      <span v-else-if="props.column.field == 'author'">
                        <b-button pill variant="secondary" size="sm" class="mt-1" v-for="author in props.row.author" :key="author">{{author}}</b-button>
                      </span>
                      <span v-else-if="props.column.field == 'keywords'">
                        <b-button pill variant="secondary" size="sm" class="mt-1" v-for="k in props.row.keywords" :key="k">{{k}}</b-button>
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
            tdClass: 'text-sm align-middle',
            dateInputFormat: 'yyyy-MM-dd',
            dateOutputFormat: 'MMM do yy',
          },
          {
            label: 'Title',
            field: 'title',
            tdClass: 'text-sm align-middle',
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
              placeholder: 'Filter by type',
            },
          },
          {
            label: 'Language',
            field: 'language',
            tdClass: 'text-center align-middle',
            filterOptions: {
              enabled: true, 
              placeholder: 'Select one',
              filterDropdownItems: [  
                { value: 'en', text: 'English' },  
                { value: 'es', text: 'Español' },  
              ],
            },
          },
          {
            label: 'Author',
            field: 'author',
            tdClass: 'align-middle',
            filterOptions: {
              enabled: true,
              placeholder: 'Filter by author',
            },
          },
          {
            label: 'Keywords',
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
        groupByIsActive: false,
      };
    },
    mounted() {
    },
    computed: {
      groupByButtonText(){
        return (this.groupByIsActive === true) ? 'Ungroup rows' : 'Group rows by keyword';
      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      groupBy(){
        // TODO 
        // all the logic to group and ungroup the rows goes here
        this.groupByIsActive = !this.groupByIsActive;
      },
    },
  }
</script>
