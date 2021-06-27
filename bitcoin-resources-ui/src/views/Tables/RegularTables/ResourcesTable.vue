<template>
    <b-card no-body>
        <b-card-header class="border-0">
        <b-row>
            <b-col>
                <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Search..."></b-form-input>
            </b-col>
            


            <!-- <b-col>
                <b-form-group
                v-model="sortDirection"
                label="Filter On"
                description="Leave all unchecked to filter on all data"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
                >
                <b-form-checkbox-group
                    v-model="filterOn"
                    :aria-describedby="ariaDescribedby"
                    class="mt-1"
                >
                    <b-form-checkbox value="name">Name</b-form-checkbox>
                    <b-form-checkbox value="age">Age</b-form-checkbox>
                    <b-form-checkbox value="isActive">Active</b-form-checkbox>
                </b-form-checkbox-group>
                </b-form-group>
            </b-col> -->


            <!-- Download CSV file -->
            <b-col text-right>
                <b-button variant='outline-primary'>
                <b-link :href="sourceURL" target="_blank">
                    Download CSV file
                </b-link>
                </b-button>
            </b-col>
        </b-row>


        </b-card-header>
        
        <b-table 
          hover 
          :items="resources" 
          :per-page="perPage" 
          :current-page="currentPage"
          :fields="fields"
          :filter="filter" 
          head-variant="light"
          sort-icon-left
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          responsive="sm"
          @filtered="onFiltered"
        >
        <template v-slot:cell(title)="data">
            <b-link :href="data.item.link" target="_blank">{{data.item.title}}</b-link>
          </template>

          <template v-slot:cell(type)="data">
             <b-button pill variant="primary" size="sm">{{data.item.type}}</b-button>
          </template>

          <template v-slot:cell(language)="data">
              <b-img fluid v-bind="flagProps" :src="'/img/flags/' + flags_dict[data.item.language]" :alt="data.item.language" :title="data.item.language"></b-img>
          </template>

          <template v-slot:cell(keywords)="data">
             <b-button pill variant="secondary" size="sm" v-for="keyword in data.item.keywords" :key="keyword">{{keyword}}</b-button>
          </template>
        </b-table>
        <b-card-footer class="py-4 d-flex justify-content-end">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import { Table, TableColumn} from 'element-ui'
  import flags_dict from '@/assets/language-flags-mapping.js'
  export default {
    name: 'resources-table',
    props: ['resources', 'sourceURL'],
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        filter: null,
        filterOn: [],
        fields: [
            { key: "date", label: 'Publication date', sortable: true }, 
            { key: "title", sortable: true }, 
            { key: "type", sortable: true }, 
            { key: "language", sortable: true }, 
            { key: "author", sortable: true }, 
            { key: "keywords", sortable: true }, 
            { key: "other", sortable: true }
            ],
        perPage: 7,
        currentPage: 1,
        sortDesc: false,
        sortBy: 'date',
        totalRows: 1,
        flags_dict,
        flagProps: { width: 20, height: 20, class: 'm1' }
      };
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.resources.length
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      getImage(image) {
        // return "/assets/" + image
        // return require('@/assets/' + image)
      }
    }
  }
</script>
