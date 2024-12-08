<!-- src/components/D3LineChart.vue -->
<template>
  <div ref="chart"></div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import * as d3 from "d3";

export default {
  name: "D3LineChart",
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
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Nettoyer le graphique précédent
      d3.select(chart.value).selectAll("*").remove();

      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X Scale
      const x = d3
        .scalePoint()
        .domain(props.data.map((d) => d.year))
        .range([0, width]);

      svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

      // Y Scale
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, (d) => d.value)])
        .nice()
        .range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));

      // Line Generator
      const line = d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y(d.value))
        .curve(d3.curveMonotoneX);

      // Add the line
      svg
        .append("path")
        .datum(props.data)
        .attr("fill", "none")
        .attr("stroke", props.options.lineColor || "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
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
/* Styles pour le graphique linéaire */
</style>
