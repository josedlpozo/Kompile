<script>
import { Line } from 'vue-chartjs'
import dates from '../dates/DateFormatter'
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
            },
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        beginAtZero: true,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const value = data.datasets[0].data[tooltipItem.index]
              console.log(value)
              return dates.formatTime(value)
            }
          }
        }
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
          backgroundColor: 'white',
          data: this.chartData
        }
      ]
    }, this.options)
  }
})
</script>
