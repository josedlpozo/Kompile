<script>
import { Line } from 'vue-chartjs'
export default Line.extend({
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
          label: 'Total time',
          borderColor: '#EF9A9A',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#EF9A9A',
          backgroundColor: 'white',
          data: this.chartData
        }
      ]
    }, this.options)
  }
})
</script>
