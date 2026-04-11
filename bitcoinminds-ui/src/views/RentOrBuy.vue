<template>
  <div>
    <base-header class="pt-5 pb-8 bg-translucent-darker">
      <b-row>
        <b-col>
          <h1 class="text-white">Rent or Buy?</h1>
          <p class="text-white">Compare the financial outcome of renting (and investing the difference) versus buying a home.</p>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">

      <!-- Summary cards -->
      <b-row class="mb-4">
        <b-col md="4" sm="6" class="mb-3">
          <b-card class="shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-2">Buy — Monthly costs</div>
            <div class="mb-1"><span class="text-muted small">Mortgage only:</span> <strong>{{ fmtCurrency(derived.monthlyMortgage) }}</strong></div>
            <div class="mb-1"><span class="text-muted small">Mortgage + extras:</span> <strong>{{ fmtCurrency(derived.monthlyTotal) }}</strong></div>
            <div class="mb-1"><span class="text-muted small">Total paid:</span> <strong>{{ fmtCurrency(derived.totalPaid) }}</strong></div>
            <div><span class="text-muted small">Interest paid:</span> <strong>{{ fmtCurrency(derived.interestPaid) }}</strong></div>
          </b-card>
        </b-col>
        <b-col md="4" sm="6" class="mb-3">
          <b-card class="shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-2">Buy — Property outcome</div>
            <div class="mb-1"><span class="text-muted small">Purchase price:</span> <strong>{{ fmtCurrency(derived.purchasePrice) }}</strong></div>
            <div class="mb-1"><span class="text-muted small">Loan amount:</span> <strong>{{ fmtCurrency(derived.loan) }}</strong></div>
            <div><span class="text-muted small">House value at end:</span> <strong>{{ fmtCurrency(derived.houseValueEnd) }}</strong></div>
          </b-card>
        </b-col>
        <b-col md="4" sm="6" class="mb-3">
          <b-card class="shadow h-100">
            <div class="text-muted text-uppercase small font-weight-bold mb-2">Rent — Outcome</div>
            <div class="mb-1"><span class="text-muted small">Total rent paid:</span> <strong>{{ fmtCurrency(derived.totalRentPaid) }}</strong></div>
            <div class="mb-1"><span class="text-muted small">Monthly diff (mortgage − rent):</span> <strong :class="derived.monthlyDiffDisplay >= 0 ? 'text-danger' : 'text-success'">{{ fmtCurrency(derived.monthlyDiffDisplay) }}</strong></div>
            <div>
              <span class="text-muted small">Renter savings portfolio:</span>
              <strong :class="derived.renterSavings >= 0 ? 'text-success' : 'text-danger'">
                {{ fmtCurrency(derived.renterSavings) }}
              </strong>
            </div>
            <div class="mt-2">
              <b-badge :variant="derived.renterSavings >= 0 ? 'success' : 'danger'" class="px-3 py-2">
                {{ derived.renterSavings >= 0 ? 'Renting is better' : 'Buying is better' }}
              </b-badge>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Charts -->
      <b-row class="mb-4">
        <b-col xl="4" class="mb-4">
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0 pb-0">
              <h5 class="mb-0">Renter savings vs Mortgage rate</h5>
              <small class="text-muted">How the mortgage interest rate affects the outcome (savings rate &amp; downpayment fixed)</small>
            </b-card-header>
            <b-card-body>
              <div style="position:relative;height:280px;">
                <canvas ref="chartMortgage"></canvas>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col xl="4" class="mb-4">
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0 pb-0">
              <h5 class="mb-0">Renter savings vs Savings rate</h5>
              <small class="text-muted">How the return on invested savings affects the outcome (mortgage rate &amp; downpayment fixed)</small>
            </b-card-header>
            <b-card-body>
              <div style="position:relative;height:280px;">
                <canvas ref="chartSavings"></canvas>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col xl="4" class="mb-4">
          <b-card class="shadow" no-body>
            <b-card-header class="bg-transparent border-0 pb-0">
              <h5 class="mb-0">Renter savings vs Initial savings</h5>
              <small class="text-muted">How the downpayment / initial savings amount affects the outcome (both rates fixed)</small>
            </b-card-header>
            <b-card-body>
              <div style="position:relative;height:280px;">
                <canvas ref="chartDownpayment"></canvas>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <!-- Parameters -->
      <b-row class="mb-5">
        <b-col>
          <b-card class="shadow">
            <h5 class="mb-4">Parameters</h5>
            <b-row>
              <!-- BUY column -->
              <b-col md="6">
                <h6 class="text-muted text-uppercase mb-3">Buying</h6>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Listing price</span>
                    <div class="text-muted small">Asking price of the property</div>
                  </template>
                  <b-input-group prepend="€">
                    <b-form-input v-model.number="p.listingPrice" type="number" min="10000" step="5000"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.listingPrice" min="50000" max="2000000" step="5000">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Downpayment</span>
                    <div class="text-muted small">Initial savings / downpayment</div>
                  </template>
                  <b-input-group prepend="€">
                    <b-form-input v-model.number="p.downpayment" type="number" min="0" step="5000"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.downpayment" min="0" max="500000" step="5000">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Side costs</span>
                    <div class="text-muted small">Taxes, notary, etc.</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="p.sideCostsPct" type="number" min="0" max="30" step="0.5"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.sideCostsPct" min="0" max="30" step="0.5">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Mortgage rate</span>
                    <div class="text-muted small">Yearly interest rate</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="p.mortgageRatePct" type="number" min="0" max="15" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.mortgageRatePct" min="0" max="15" step="0.1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Extra yearly costs</span>
                    <div class="text-muted small">Property tax, repairs, etc.</div>
                  </template>
                  <b-input-group prepend="€">
                    <b-form-input v-model.number="p.extraYearly" type="number" min="0" step="100"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.extraYearly" min="0" max="20000" step="100">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Market appreciation</span>
                    <div class="text-muted small">Yearly property value growth</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="p.appreciationPct" type="number" min="0" max="20" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.appreciationPct" min="0" max="20" step="0.1">
                </b-form-group>
              </b-col>

              <!-- RENT column -->
              <b-col md="6">
                <h6 class="text-muted text-uppercase mb-3">Renting</h6>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Monthly rent</span>
                    <div class="text-muted small">Rent paid per month</div>
                  </template>
                  <b-input-group prepend="€">
                    <b-form-input v-model.number="p.monthlyRent" type="number" min="100" step="50"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.monthlyRent" min="100" max="10000" step="50">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Savings rate</span>
                    <div class="text-muted small">Yearly return on invested savings</div>
                  </template>
                  <b-input-group append="%">
                    <b-form-input v-model.number="p.savingsRatePct" type="number" min="0" max="30" step="0.1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.savingsRatePct" min="0" max="30" step="0.1">
                </b-form-group>

                <b-form-group label-cols="5">
                  <template #label>
                    <span class="font-weight-bold">Years</span>
                    <div class="text-muted small">Comparison period</div>
                  </template>
                  <b-input-group append="yrs">
                    <b-form-input v-model.number="p.years" type="number" min="1" max="50" step="1"></b-form-input>
                  </b-input-group>
                  <input type="range" class="custom-range mt-2" v-model.number="p.years" min="1" max="50" step="1">
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'RentOrBuy',

  data() {
    return {
      p: {
        downpayment: 100000,
        years: 25,
        listingPrice: 330000,
        sideCostsPct: 12,
        mortgageRatePct: 3,
        extraYearly: 2000,
        appreciationPct: 4,
        monthlyRent: 2000,
        savingsRatePct: 7,
      },
      charts: { mortgage: null, savings: null, downpayment: null },
    };
  },

  computed: {
    derived() {
      const { downpayment, years, listingPrice, sideCostsPct, mortgageRatePct,
              extraYearly, appreciationPct, monthlyRent, savingsRatePct } = this.p;

      const periods = years * 12;
      const purchasePrice = listingPrice * (1 + sideCostsPct / 100);
      const loan = Math.max(0, purchasePrice - downpayment);
      const mr = mortgageRatePct / 100 / 12;
      const sr = savingsRatePct / 100 / 12;

      const monthlyMortgage = this.pmt(mr, periods, loan);
      const monthlyTotal = monthlyMortgage + extraYearly / 12;
      const monthlyDiffDisplay = monthlyTotal - monthlyRent;
      const totalPaid = monthlyMortgage * periods;
      const interestPaid = totalPaid - loan;
      const houseValueEnd = listingPrice * Math.pow(1 + appreciationPct / 100, years);
      const totalRentPaid = monthlyRent * periods;

      const renterSavings = this.calcRenterSavings(downpayment, monthlyMortgage, monthlyRent, sr, periods);

      return { purchasePrice, loan, monthlyMortgage, monthlyTotal, monthlyDiffDisplay,
               totalPaid, interestPaid, houseValueEnd, totalRentPaid, renterSavings };
    },
  },

  watch: {
    derived() {
      this.updateCharts();
    },
  },

  mounted() {
    this.initCharts();
  },

  beforeDestroy() {
    Object.values(this.charts).forEach(c => c && c.destroy());
  },

  methods: {
    pmt(rate, n, pv) {
      if (pv === 0) return 0;
      if (rate === 0) return pv / n;
      const f = Math.pow(1 + rate, n);
      return pv * rate * f / (f - 1);
    },

    calcRenterSavings(initSavings, monthlyMortgage, monthlyRent, savingsMonthlyRate, periods) {
      const r = savingsMonthlyRate;
      const FV = r === 0 ? 1 : Math.pow(1 + r, periods);
      const FV_annuity = r === 0 ? periods : (FV - 1) / r;
      const monthlyDiff = monthlyMortgage - monthlyRent;
      return initSavings * FV + monthlyDiff * FV_annuity;
    },

    // Chart 1: renter savings vs mortgage rate (0% to 10%)
    buildMortgageChartData() {
      const { downpayment, years, listingPrice, sideCostsPct, monthlyRent, savingsRatePct } = this.p;
      const periods = years * 12;
      const purchasePrice = listingPrice * (1 + sideCostsPct / 100);
      const loan = Math.max(0, purchasePrice - downpayment);
      const sr = savingsRatePct / 100 / 12;

      const rates = Array.from({ length: 21 }, (_, i) => i * 0.5); // 0% to 10% step 0.5%
      const labels = rates.map(r => r.toFixed(1) + '%');
      const data = rates.map(rPct => {
        const mr = rPct / 100 / 12;
        const mm = this.pmt(mr, periods, loan);
        return this.calcRenterSavings(downpayment, mm, monthlyRent, sr, periods);
      });
      const currentX = this.p.mortgageRatePct;

      return { labels, data, currentX };
    },

    // Chart 2: renter savings vs savings rate (0% to 15%)
    buildSavingsChartData() {
      const { downpayment, years, listingPrice, sideCostsPct, mortgageRatePct, monthlyRent } = this.p;
      const periods = years * 12;
      const purchasePrice = listingPrice * (1 + sideCostsPct / 100);
      const loan = Math.max(0, purchasePrice - downpayment);
      const mr = mortgageRatePct / 100 / 12;
      const mm = this.pmt(mr, periods, loan);

      const rates = Array.from({ length: 21 }, (_, i) => i * 0.75); // 0% to 15% step 0.75%
      const labels = rates.map(r => r.toFixed(2) + '%');
      const data = rates.map(rPct => {
        const sr = rPct / 100 / 12;
        return this.calcRenterSavings(downpayment, mm, monthlyRent, sr, periods);
      });

      return { labels, data };
    },

    // Chart 3: renter savings vs downpayment (0 to 500K)
    buildDownpaymentChartData() {
      const { years, listingPrice, sideCostsPct, mortgageRatePct, monthlyRent, savingsRatePct } = this.p;
      const periods = years * 12;
      const purchasePrice = listingPrice * (1 + sideCostsPct / 100);
      // Loan is fixed (based on base downpayment = 100K per Excel), only initial savings changes
      const baseLoan = Math.max(0, purchasePrice - this.p.downpayment);
      const mr = mortgageRatePct / 100 / 12;
      const mm = this.pmt(mr, periods, baseLoan);
      const sr = savingsRatePct / 100 / 12;

      const maxDp = Math.max(500000, this.p.downpayment * 3);
      const step = maxDp / 20;
      const values = Array.from({ length: 21 }, (_, i) => Math.round(i * step));
      const labels = values.map(v => this.fmtCurrencyShort(v));
      const data = values.map(dp => this.calcRenterSavings(dp, mm, monthlyRent, sr, periods));

      return { labels, data };
    },

    makeChartOptions() {
      const self = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontSize: 11, boxWidth: 14 },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label(item, data) {
              const label = data.datasets[item.datasetIndex].label || '';
              return ' ' + label + ': ' + self.fmtCurrency(item.yLabel);
            },
          },
        },
        scales: {
          xAxes: [{
            ticks: { maxTicksLimit: 7, fontColor: '#8898aa', maxRotation: 0 },
            gridLines: { drawOnChartArea: false },
          }],
          yAxes: [{
            ticks: {
              fontColor: '#8898aa',
              callback(v) {
                if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
                if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(0) + 'K';
                return v;
              },
            },
            gridLines: { color: '#e9ecef' },
          }],
        },
      };
    },

    houseLineDataset(length) {
      const hv = this.derived.houseValueEnd;
      return {
        label: 'House value (end)',
        data: Array(length).fill(hv),
        borderColor: '#5e72e4',
        borderWidth: 2,
        borderDash: [6, 4],
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
      };
    },

    coloredDataset(data) {
      const colors = data.map(v => v >= 0 ? 'rgba(45,206,137,0.7)' : 'rgba(245,54,92,0.7)');
      return {
        label: 'Renter savings portfolio',
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: colors,
        fill: false,
        lineTension: 0.3,
      };
    },

    initCharts() {
      const { labels: ml, data: md } = this.buildMortgageChartData();
      const { labels: sl, data: sd } = this.buildSavingsChartData();
      const { labels: dl, data: dd } = this.buildDownpaymentChartData();

      this.charts.mortgage = new Chart(this.$refs.chartMortgage, {
        type: 'line',
        data: { labels: ml, datasets: [this.coloredDataset(md), this.houseLineDataset(ml.length)] },
        options: this.makeChartOptions(),
      });

      this.charts.savings = new Chart(this.$refs.chartSavings, {
        type: 'line',
        data: { labels: sl, datasets: [this.coloredDataset(sd), this.houseLineDataset(sl.length)] },
        options: this.makeChartOptions(),
      });

      this.charts.downpayment = new Chart(this.$refs.chartDownpayment, {
        type: 'line',
        data: { labels: dl, datasets: [this.coloredDataset(dd), this.houseLineDataset(dl.length)] },
        options: this.makeChartOptions(),
      });
    },

    updateCharts() {
      if (!this.charts.mortgage) return;

      const { labels: ml, data: md } = this.buildMortgageChartData();
      this.charts.mortgage.data.labels = ml;
      this.charts.mortgage.data.datasets[0] = this.coloredDataset(md);
      this.charts.mortgage.data.datasets[1] = this.houseLineDataset(ml.length);
      this.charts.mortgage.update();

      const { labels: sl, data: sd } = this.buildSavingsChartData();
      this.charts.savings.data.labels = sl;
      this.charts.savings.data.datasets[0] = this.coloredDataset(sd);
      this.charts.savings.data.datasets[1] = this.houseLineDataset(sl.length);
      this.charts.savings.update();

      const { labels: dl, data: dd } = this.buildDownpaymentChartData();
      this.charts.downpayment.data.labels = dl;
      this.charts.downpayment.data.datasets[0] = this.coloredDataset(dd);
      this.charts.downpayment.data.datasets[1] = this.houseLineDataset(dl.length);
      this.charts.downpayment.update();
    },

    fmtCurrency(v) {
      if (v == null || isNaN(v)) return '—';
      const abs = Math.abs(v);
      const sign = v < 0 ? '-' : '';
      if (abs >= 1e9) return sign + '€' + (abs / 1e9).toFixed(2) + 'B';
      if (abs >= 1e6) return sign + '€' + (abs / 1e6).toFixed(2) + 'M';
      if (abs >= 1e3) return sign + '€' + (abs / 1e3).toFixed(1) + 'K';
      return sign + '€' + abs.toFixed(0);
    },

    fmtCurrencyShort(v) {
      if (v >= 1e6) return '€' + (v / 1e6).toFixed(1) + 'M';
      if (v >= 1e3) return '€' + (v / 1e3).toFixed(0) + 'K';
      return '€' + v;
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
