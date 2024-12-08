<template>
  <div class="prediction-card">
    <!-- Contenu Visible -->
    <div>
      <h3>Résultat de la Prédiction</h3>
      <p>
        <strong>Prix Estimé :</strong>
        {{ formatNumber(prediction.catboost_prediction) }} €
      </p>
      <p><strong>Évaluation :</strong> {{ evaluation }}</p>
      <button @click="displayDetails" class="btn btn-info">Afficher les détails</button>
      <button @click="downloadReportPDF" class="btn btn-success">
        Télécharger le Rapport en PDF
      </button>
    </div>

    <!-- Contenu Caché pour le PDF -->
    <div ref="reportContent" class="report-content">
      <img :src="logo" alt="Logo" />
      <h3>Rapport de Prédiction</h3>
      <p><strong>Année :</strong> {{ reportData.annee }}</p>
      <p><strong>Carburant :</strong> {{ reportData.carburant }}</p>
      <p><strong>État :</strong> {{ reportData.etat }}</p>
      <p><strong>Finition :</strong> {{ reportData.finition }}</p>
      <p><strong>Kilométrage :</strong> {{ reportData.kilometrage }} km</p>
      <p><strong>Marque :</strong> {{ reportData.marque }}</p>
      <p><strong>Modèle :</strong> {{ reportData.modele }}</p>
      <p><strong>Transmission :</strong> {{ reportData.transmission }}</p>
      <hr />
      <p>
        <strong>Prix Estimé :</strong>
        {{ formatNumber(prediction.catboost_prediction) }} €
      </p>
      <p><strong>Évaluation :</strong> {{ prediction.Logistic_Regression_evaluation }}</p>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "PredictionCard",
  data() {
    return {
      logo: "../assets/img/logo.png",
    };
  },
  props: {
    prediction: {
      type: Object,
      required: true,
    },
    evaluation: {
      type: String,
      default: "",
    },
    reportUrl: {
      type: String,
      default: "",
    },
    reportData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downloadReportPDF() {
      const element = this.$refs.reportContent;

      if (!element) {
        console.error("L'élément reportContent n'a pas été trouvé.");
        return;
      }

      html2canvas(element, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
          });
          pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
          pdf.save("rapport_prediction.pdf");
        })
        .catch((error) => {
          console.error("Erreur lors de la génération du PDF :", error);
        });
    },
    displayDetails() {
      alert(
        `Prix estimé : ${this.formatNumber(this.prediction.catboost_prediction)} €\n` +
          ` Evaluation : ${this.prediction.Logistic_Regression_evaluation}`
      );
    },
    formatNumber(number) {
      return number.toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
};
</script>

<style scoped>
.prediction-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
}

.report-content {
  position: absolute;
  left: -9999px;
  top: -9999px;
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 800px; /* Ajustez selon vos besoins */
}

.report-content h2 {
  text-align: center;
  color: #333;
}

.report-content p {
  font-size: 14px;
  margin: 5px 0;
}

.report-content hr {
  margin: 20px 0;
}
</style>
