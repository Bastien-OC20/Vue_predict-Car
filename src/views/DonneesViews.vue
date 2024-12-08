<template>
  <div class="donnees-container">
    <h1>Données</h1>
    <p>Page des données.</p>

    <div>
      <!-- Répartition des Voitures par Marque -->
      <D3BarChart :data="marqueChartData" :options="chartOptions" />

      <!-- Répartition des Types de Carburant -->
      <D3PieChart :data="carburantChartData" :options="chartOptions" />

      <!-- Distribution des Transmissions -->
      <D3DoughnutChart :data="transmissionChartData" :options="chartOptions" />

      <!-- Prix Moyen par Année -->
      <D3LineChart :data="prixAnneeChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import D3BarChart from "@/components/D3BarChart.vue";
import D3PieChart from "@/components/D3PieChart.vue";
import D3DoughnutChart from "@/components/D3DoughnutChart.vue";
import D3LineChart from "@/components/D3LineChart.vue";

export default defineComponent({
  components: {
    D3BarChart,
    D3PieChart,
    D3DoughnutChart,
    D3LineChart,
  },
  setup() {
    const marqueChartData = ref([
      { category: "Ford", value: 10 },
      { category: "Toyota", value: 20 },
      { category: "Honda", value: 30 },
    ]);

    const carburantChartData = ref([
      { category: "Essence", value: 50 },
      { category: "Diesel", value: 30 },
      { category: "Électrique", value: 20 },
    ]);

    const transmissionChartData = ref([
      { category: "Manuelle", value: 40 },
      { category: "Automatique", value: 60 },
    ]);

    const prixAnneeChartData = ref([
      { year: "2018", value: 20000 },
      { year: "2019", value: 21000 },
      { year: "2020", value: 22000 },
      { year: "2021", value: 23000 },
      { year: "2022", value: 24000 },
    ]);

    const chartOptions = ref({
      // Options globales pour les graphiques
      barColor: "#69b3a2",
      lineColor: "steelblue",
      // Vous pouvez ajouter d'autres options spécifiques
    });

    return {
      marqueChartData,
      carburantChartData,
      transmissionChartData,
      prixAnneeChartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
.donnees-container {
  padding: 20px;
  text-align: center;
}

.donnees-container div {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.donnees-container div > * {
  flex: 1 1 45%;
  min-width: 300px;
  height: 400px;
}
</style>
