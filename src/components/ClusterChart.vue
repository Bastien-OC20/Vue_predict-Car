<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ClusterChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d.x))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d.y))
        .range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 10)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text("Kilométrage"); // Remplacez par le titre approprié pour l'axe x

      svg
        .append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text("Prix"); // Remplacez par le titre approprié pour l'axe y

      svg
        .append("g")
        .selectAll("dot")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 3)
        .style("fill", "#69b3a2");
    },
  },
};
</script>

<style scoped>
.chart-container {
  margin: auto;
  height: 600px;
  width: 800px;
}
</style>
