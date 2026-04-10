<template>
  <div>
    <base-header class="pt-5 pb-8 bg-translucent-darker">
      <b-row>
        <b-col>
          <h1 class="text-white">Perpetual Loan Calculator</h1>
          <p class="text-white">Model a strategy of living off Bitcoin-collateralized loans indefinitely, without selling your BTC.</p>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">

      <!-- Summary cards -->
      <b-row class="mb-4">
        <b-col md="3" sm="6" class="mb-3">
          <b-card class="text-center shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-1">BTC needed (year 1)</div>
            <div class="h3 mb-0">{{ fmt(table[0] && table[0].btcNeeded, 3) }} BTC</div>
          </b-card>
        </b-col>
        <b-col md="3" sm="6" class="mb-3">
          <b-card class="text-center shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-1">Yrs collateral insufficient</div>
            <div class="h3 mb-0" :class="yearsInsufficient > 0 ? 'text-danger' : 'text-success'">
              {{ yearsInsufficient }}
            </div>
          </b-card>
        </b-col>
        <b-col md="3" sm="6" class="mb-3">
          <b-card class="text-center shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-1">Sustainable long-term?</div>
            <div class="h3 mb-0" :class="sustainable ? 'text-success' : 'text-danger'">
              {{ sustainable ? 'YES :)' : 'NO :(' }}
            </div>
          </b-card>
        </b-col>
        <b-col md="3" sm="6" class="mb-3">
          <b-card class="text-center shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-1">BTC price yr 40</div>
            <div class="h3 mb-0">{{ fmtCurrency(table[39] && table[39].btcPrice) }}</div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Charts -->
      <b-row class="mb-4">
        <b-col xl="6" class="mb-4">
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0 pb-0">
              <h5 class="mb-0">BTC needed as collateral vs. your max BTC</h5>
              <small class="text-muted">Make sure that the 'BTC needed as collateral' (orange line) is always below 'Your max BTC' (red line). Otherwise, you'll be liquidated</small>
            </b-card-header>
            <b-card-body>
              <div style="position:relative;height:300px;">
                <canvas ref="chartBtc"></canvas>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col xl="6" class="mb-4">
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0 pb-0">
              <h5 class="mb-0">Loan balance &amp; required collateral value</h5>
              <small class="text-muted">In {{ currency }}</small>
            </b-card-header>
            <b-card-body>
              <div style="position:relative;height:300px;">
                <canvas ref="chartLoan"></canvas>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <!-- Parameters -->
      <b-row>
        <b-col>
          <b-card class="shadow">
            <h5 class="mb-4">Parameters</h5>
            <b-row>
              <!-- Left column -->
              <b-col md="6">

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Desired yearly income</span>
                    <div class="text-muted small">New loan taken each year (yr 1)</div>
                  </template>
                  <b-input-group :prepend="currency">
                    <b-form-input v-model.number="params.income" type="number" min="1000" step="1000" @change="clampIncome"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.income"
                    min="10000" max="5000000" step="10000">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">LTV ratio</span>
                    <div class="text-muted small">Loan / collateral value</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="params.ltvPct" type="number" min="1" max="99" step="1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.ltvPct"
                    min="1" max="99" step="1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">BTC starting price</span>
                    <div class="text-muted small">Price in year 1</div>
                  </template>
                  <b-input-group :prepend="currency">
                    <b-form-input v-model.number="params.btcPrice" type="number" min="1000" step="1000"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.btcPrice"
                    min="10000" max="1000000" step="1000">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Max BTC as collateral</span>
                    <div class="text-muted small">BTC you can lock up</div>
                  </template>
                  <b-input-group append="BTC">
                    <b-form-input v-model.number="params.maxBtc" type="number" min="0.01" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.maxBtc"
                    min="0.1" max="200" step="0.1">
                </b-form-group>

              </b-col>

              <!-- Right column -->
              <b-col md="6">

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Loan interest rate</span>
                    <div class="text-muted small">Yearly, on outstanding balance</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="params.interestPct" type="number" min="0.1" max="50" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.interestPct"
                    min="0.1" max="30" step="0.1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Inflation rate</span>
                    <div class="text-muted small">Adjusts annual loan amount</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="params.inflationPct" type="number" min="0" max="20" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.inflationPct"
                    min="0" max="20" step="0.1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Bitcoin NgU (yr growth)</span>
                    <div class="text-muted small">Estimated yearly BTC/fiat growth</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="params.nguPct" type="number" min="0" max="200" step="1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="params.nguPct"
                    min="0" max="200" step="1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Flattening</span>
                    <div class="text-muted small">How much NgU decays yearly (1 = no decay)</div>
                  </template>
                  <b-form-input v-model.number="params.flattening" type="number" min="0.5" max="1" step="0.01"></b-form-input>
                  <input type="range" class="custom-range mt-2" v-model.number="params.flattening"
                    min="0.5" max="1" step="0.01">
                </b-form-group>

              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Data table -->
      <b-row class="mt-4 mb-5">
        <b-col>
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0">
              <h5 class="mb-0">Year-by-year breakdown</h5>
            </b-card-header>
            <div class="table-responsive">
              <b-table
                :items="table"
                :fields="tableFields"
                small
                hover
                striped
                :tbody-tr-class="rowClass"
              >
                <template #cell(loan)="data">{{ fmtCurrency(data.value) }}</template>
                <template #cell(repayment)="data">{{ fmtCurrency(data.value) }}</template>
                <template #cell(btcPrice)="data">{{ fmtCurrency(data.value) }}</template>
                <template #cell(collateralValue)="data">{{ fmtCurrency(data.value) }}</template>
                <template #cell(btcNeeded)="data">
                  <span :class="data.value > params.maxBtc ? 'text-danger font-weight-bold' : 'text-success'">
                    {{ fmt(data.value, 3) }}
                  </span>
                </template>
              </b-table>
            </div>
          </b-card>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import Chart from 'chart.js';

const YEARS = 40;

export default {
  name: 'Calculator',
  data() {
    return {
      currency: '€',
      params: {
        income: 350000,
        ltvPct: 50,
        btcPrice: 103000,
        maxBtc: 10,
        interestPct: 10,
        inflationPct: 2,
        nguPct: 30,
        flattening: 0.98,
      },
      chartBtcInstance: null,
      chartLoanInstance: null,
      tableFields: [
        { key: 'year',           label: 'Year',              sortable: false },
        { key: 'loan',           label: 'Loan (start of yr)',sortable: false },
        { key: 'repayment',      label: 'End-yr repayment',  sortable: false },
        { key: 'btcPrice',       label: 'BTC price',         sortable: false },
        { key: 'btcNeeded',      label: 'BTC needed',        sortable: false },
        { key: 'maxBtcCol',      label: 'Max BTC',           sortable: false },
        { key: 'collateralValue',label: 'Collateral value',  sortable: false },
      ],
    };
  },

  computed: {
    p() {
      const { income, ltvPct, btcPrice, maxBtc, interestPct, inflationPct, nguPct, flattening } = this.params;
      return {
        income,
        ltv: ltvPct / 100,
        btcPrice0: btcPrice,
        maxBtc,
        interest: interestPct / 100,
        inflation: inflationPct / 100,
        ngu: nguPct / 100,
        flattening,
      };
    },

    table() {
      const { income, ltv, btcPrice0, maxBtc, interest, inflation, ngu, flattening } = this.p;
      const annualNewLoan = income * (1 + inflation);
      const rows = [];

      for (let i = 0; i < YEARS; i++) {
        const year = i + 1;
        let loan, nguRate, btcPrice, repayment, btcNeeded, collateralValue;

        if (i === 0) {
          loan = income;
          nguRate = 0;
          btcPrice = btcPrice0;
        } else {
          loan = rows[i - 1].repayment + annualNewLoan;
          nguRate = i === 1 ? ngu : rows[i - 1].nguRate * flattening;
          btcPrice = rows[i - 1].btcPrice * (1 + nguRate);
        }

        repayment = loan * (1 + interest);
        btcNeeded = loan / (ltv * btcPrice);
        collateralValue = loan / ltv;

        rows.push({
          year,
          loan,
          repayment,
          nguRate,
          btcPrice,
          btcNeeded,
          maxBtcCol: maxBtc,
          collateralValue,
        });
      }
      return rows;
    },

    yearsInsufficient() {
      return this.table.filter(r => r.btcNeeded > this.params.maxBtc).length;
    },

    sustainable() {
      return this.yearsInsufficient === 0;
    },
  },

  watch: {
    table() {
      this.updateCharts();
    },
  },

  mounted() {
    this.initCharts();
  },

  beforeDestroy() {
    if (this.chartBtcInstance) this.chartBtcInstance.destroy();
    if (this.chartLoanInstance) this.chartLoanInstance.destroy();
  },

  methods: {
    clampIncome(v) {
      if (v < 1000) this.params.income = 1000;
    },

    fmt(v, decimals = 2) {
      if (v == null || isNaN(v)) return '—';
      return Number(v).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    },

    fmtCurrency(v) {
      if (v == null || isNaN(v)) return '—';
      if (Math.abs(v) >= 1e9) return this.currency + (v / 1e9).toFixed(2) + 'B';
      if (Math.abs(v) >= 1e6) return this.currency + (v / 1e6).toFixed(2) + 'M';
      if (Math.abs(v) >= 1e3) return this.currency + (v / 1e3).toFixed(1) + 'K';
      return this.currency + v.toFixed(0);
    },

    rowClass(item) {
      if (!item) return '';
      return item.btcNeeded > this.params.maxBtc ? 'table-danger' : '';
    },

    labels() {
      return this.table.map(r => `Y${r.year}`);
    },

    initCharts() {
      const btcData = this.buildBtcChartData();
      const loanData = this.buildLoanChartData();

      this.chartBtcInstance = new Chart(this.$refs.chartBtc, {
        type: 'line',
        data: btcData,
        options: this.btcChartOptions(),
      });

      this.chartLoanInstance = new Chart(this.$refs.chartLoan, {
        type: 'line',
        data: loanData,
        options: this.loanChartOptions(),
      });
    },

    updateCharts() {
      if (!this.chartBtcInstance || !this.chartLoanInstance) return;

      const btcData = this.buildBtcChartData();
      this.chartBtcInstance.data.labels = btcData.labels;
      this.chartBtcInstance.data.datasets[0].data = btcData.datasets[0].data;
      this.chartBtcInstance.data.datasets[1].data = btcData.datasets[1].data;
      this.chartBtcInstance.update();

      const loanData = this.buildLoanChartData();
      this.chartLoanInstance.data.labels = loanData.labels;
      this.chartLoanInstance.data.datasets[0].data = loanData.datasets[0].data;
      this.chartLoanInstance.data.datasets[1].data = loanData.datasets[1].data;
      this.chartLoanInstance.update();
    },

    buildBtcChartData() {
      return {
        labels: this.labels(),
        datasets: [
          {
            label: 'BTC needed as collateral',
            data: this.table.map(r => parseFloat(r.btcNeeded.toFixed(4))),
            borderColor: '#fb6340',
            backgroundColor: 'rgba(251,99,64,0.08)',
            borderWidth: 2,
            fill: true,
            pointRadius: 2,
          },
          {
            label: 'Your max BTC',
            data: this.table.map(() => this.params.maxBtc),
            borderColor: '#f5365c',
            borderDash: [6, 4],
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
        ],
      };
    },

    buildLoanChartData() {
      return {
        labels: this.labels(),
        datasets: [
          {
            label: 'Loan balance',
            data: this.table.map(r => parseFloat(r.loan.toFixed(2))),
            borderColor: '#5e72e4',
            backgroundColor: 'rgba(94,114,228,0.08)',
            borderWidth: 2,
            fill: true,
            pointRadius: 2,
          },
          {
            label: 'Required collateral value',
            data: this.table.map(r => parseFloat(r.collateralValue.toFixed(2))),
            borderColor: '#2dce89',
            backgroundColor: 'rgba(45,206,137,0.05)',
            borderWidth: 2,
            fill: true,
            pointRadius: 2,
          },
        ],
      };
    },

    btcChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true, position: 'bottom' },
        tooltips: { mode: 'index', intersect: false },
        scales: {
          xAxes: [{ ticks: { maxTicksLimit: 10, fontColor: '#8898aa' }, gridLines: { drawOnChartArea: false } }],
          yAxes: [{ ticks: { fontColor: '#8898aa', callback: v => v + ' BTC' }, gridLines: { color: '#e9ecef' } }],
        },
      };
    },

    loanChartOptions() {
      const self = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true, position: 'bottom' },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label(item, data) {
              const label = data.datasets[item.datasetIndex].label;
              return label + ': ' + self.fmtCurrency(item.yLabel);
            },
          },
        },
        scales: {
          xAxes: [{ ticks: { maxTicksLimit: 10, fontColor: '#8898aa' }, gridLines: { drawOnChartArea: false } }],
          yAxes: [{
            ticks: {
              fontColor: '#8898aa',
              callback(v) {
                if (v >= 1e9) return self.currency + (v / 1e9).toFixed(1) + 'B';
                if (v >= 1e6) return self.currency + (v / 1e6).toFixed(1) + 'M';
                if (v >= 1e3) return self.currency + (v / 1e3).toFixed(0) + 'K';
                return self.currency + v;
              },
            },
            gridLines: { color: '#e9ecef' },
          }],
        },
      };
    },
  },
};
</script>

<style scoped>
.custom-range {
  width: 100%;
  accent-color: #5e72e4;
}
</style>
