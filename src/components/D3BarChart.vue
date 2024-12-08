<!-- src/components/D3BarChart.vue -->
<template>
  <div ref="chart"></div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import * as d3 from "d3";

export default {
  name: "D3BarChart",
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
      // Dimensions et marges
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Supprimer le graphique précédent
      d3.select(chart.value).selectAll("*").remove();

      // Créer le conteneur SVG
      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Échelle X
      const x = d3
        .scaleBand()
        .domain(props.data.map((d) => d.category))
        .range([0, width])
        .padding(0.1);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Échelle Y
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, (d) => d.value)])
        .nice()
        .range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));

      // Barres
      svg
        .selectAll(".bar")
        .data(props.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.category))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .attr("fill", props.options.barColor || "#69b3a2");
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
.bar:hover {
  fill: orange;
}
</style>
