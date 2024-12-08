// src/components/ChartsGraph.js

import { defineComponent } from 'vue';
import {
  Bar,
  Pie,
  Doughnut,
  Line as LineChartBase,
} from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des éléments nécessaires de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Composant BarChart
export const BarChart = defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `<Bar :data="chartData" :options="options" />`,
});

// Composant PieChart
export const PieChart = defineComponent({
  name: 'PieChart',
  components: { Pie },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `<Pie :data="chartData" :options="options" />`,
});

// Composant DoughnutChart
export const DoughnutChart = defineComponent({
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `<Doughnut :data="chartData" :options="options" />`,
});

// Composant LineChart
export const LineChart = defineComponent({
  name: 'LineChart',
  components: { LineChartBase },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `<LineChartBase :data="chartData" :options="options" />`,
});