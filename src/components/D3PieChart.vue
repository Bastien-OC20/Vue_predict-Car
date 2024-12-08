<!-- src/components/D3PieChart.vue -->
<template>
  <div ref="chart"></div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import * as d3 from "d3";

export default {
  name: "D3PieChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const chart = ref(null);

    const drawChart = () => {
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      // Nettoyer le graphique précédent
      d3.select(chart.value).selectAll("*").remove();

      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const color = d3
        .scaleOrdinal()
        .domain(props.data.map((d) => d.category))
        .range(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.value);
      const data_ready = pie(props.data);

      const arc = d3
        .arc()
        .innerRadius(props.options.innerRadius || 0)
        .outerRadius(props.options.outerRadius || radius);

      svg
        .selectAll("path")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.category))
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);
    };

    onMounted(() => {
      drawChart();
    });

    watch(
      () => props.data,
      () => {
        drawChart();
      }
    );

    return { chart };
  },
};
</script>

<style scoped>
/* Styles pour le graphique en secteurs */
</style>
