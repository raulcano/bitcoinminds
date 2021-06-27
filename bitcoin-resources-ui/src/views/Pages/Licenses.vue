<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card>
            This platform runs on the free template "BootstrapVue Argon" by <b-link href="https://www.creative-tim.com/">Creative Tim</b-link> which is licensed under the <b-link href="https://github.com/timcreative/freebies/blob/master/LICENSE.md">MIT license</b-link>. Thanks a lot, Tim!
          </b-card>
        </b-col>
      </b-row>
        <b-row class="mt-2">
          <b-col>
          <b-card>
            The Bitcoin logo was created by <a href='https://www.freepik.com/free-photos-vectors/business'>by rawpixel.com - www.freepik.com</a>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import BaseDropdown from '../../components/BaseDropdown.vue';

  export default {
    components: {
        BaseDropdown
    },
    data() {
      return {
      };
    }
  };
</script>
<style>
</style>
