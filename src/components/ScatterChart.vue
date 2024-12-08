<template>
  <div>
    <scatter-chart :chart-data="chartData" :options="chartOptions"></scatter-chart>
  </div>
</template>

<script>
import { Scatter } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

export default {
  name: "ScatterChart",
  components: {
    ScatterChart: Scatter,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
.chart-container {
  position: relative;
  margin: auto;
  height: 400px;
  width: 600px;
}
</style>
