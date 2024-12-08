<template>
  <div class="container">
    <h1>Données</h1>
    <h3 class="mt-5">Utilisation de CatBoost et de la Régression Logistique</h3>
    <div class="explanation">
      <p>
        CatBoost est un algorithme de gradient boosting développé par Yandex. Il est
        particulièrement performant pour les données catégorielles et offre plusieurs
        avantages :
      </p>
      <ul>
        <li>
          Gestion efficace des variables catégorielles sans besoin de prétraitement
          complexe.
        </li>
        <li>
          Réduction du surapprentissage grâce à des techniques de régularisation
          intégrées.
        </li>
        <li>
          Optimisation pour les calculs parallèles, ce qui améliore les performances.
        </li>
      </ul>
      <p>
        La régression logistique est un modèle statistique utilisé pour prédire la
        probabilité d'un événement binaire. Ses avantages incluent :
      </p>
      <ul>
        <li>Simplicité et interprétabilité des résultats.</li>
        <li>Bonne performance pour les problèmes de classification binaire.</li>
        <li>Facilité d'implémentation et de mise à jour avec de nouvelles données.</li>
      </ul>
      <p>
        Pour garantir un modèle performant et stable, il est essentiel de suivre certaines
        bonnes pratiques :
      </p>
      <ul>
        <li>
          Effectuer une analyse exploratoire des données pour comprendre les distributions
          et les relations entre les variables.
        </li>
        <li>
          Utiliser des techniques de validation croisée pour éviter le surapprentissage.
        </li>
      </ul>
    </div>
    <div>
      <div>
        <div class="table-responsive mx-auto" style="max-width: 70%">
          <h3>Exemple des données du csv</h3>
          <table class="table table-striped mt-3" v-if="csvData.length">
            <thead>
              <tr>
                <th v-for="(header, index) in csvHeaders" :key="index">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in csvData.slice(0, 5)" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Papa from "papaparse";

export default {
  name: "DonneesViews",
  components: {},
  setup() {
    const csvData = ref([]);
    const csvHeaders = ref([]);
    const uniqueValues = ref({});
    const chartData = ref([]);

    const loadCSV = () => {
      const csvFilePath = "/data/voitures_aramisauto_cleaned_new.csv";
      fetch(csvFilePath)
        .then((response) => response.text())
        .then((data) => {
          Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
              csvHeaders.value = results.meta.fields;
              csvData.value = results.data;
              extractUniqueValues(results.data);
              prepareChartData(results.data);
            },
            error: function (error) {
              console.error("Erreur lors de la lecture du fichier CSV:", error);
            },
          });
        })
        .catch((error) => {
          console.error("Erreur lors du chargement du fichier CSV:", error);
        });
    };

    const extractUniqueValues = (data) => {
      const uniqueValuesMap = {};
      csvHeaders.value.forEach((header) => {
        uniqueValuesMap[header] = [
          ...new Set(
            data
              .map((row) => row[header])
              .filter((value) => value !== null && value !== undefined)
          ),
        ];
      });
      uniqueValues.value = uniqueValuesMap;
    };

    const prepareChartData = (data) => {
      chartData.value = data.map((row) => ({
        x: row["Kilométrage"], // Remplacez par la colonne appropriée
        y: row["Prix"], // Remplacez par la colonne appropriée
      }));
    };

    onMounted(() => {
      loadCSV();
    });

    return {
      csvData,
      csvHeaders,
      uniqueValues,
      chartData,
    };
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.unique-values-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.unique-values-list {
  max-height: 150px;
  overflow-y: auto;
  padding-left: 20px;
}

.chart-container {
  position: relative;
  margin: auto;
  height: 600px;
  width: 800px;
}

.explanation {
  margin-top: 20px;
}
</style>
