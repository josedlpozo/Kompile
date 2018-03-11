<script>
import { HorizontalBar } from 'vue-chartjs'
export default HorizontalBar.extend({
  props: {
    chartData: {
      type: Array | Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          xAxes: [ {
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Minutes',
          borderColor: '#EF9A9A',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#EF9A9A',
          backgroundColor: '#EF9A9A',
          data: this.chartData
        }
      ]
    }, this.options)
  }
})
</script>
