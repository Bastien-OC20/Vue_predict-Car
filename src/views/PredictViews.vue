<template>
  <div class="predict-views">
    <h2>Prédiction de Véhicule</h2>

    <form @submit.prevent="makePrediction">
      <!-- Sélection de la marque -->
      <div class="mb-3">
        <label for="marque" class="form-label">Marque :</label>
        <select
          v-model="formData.marque"
          @change="filterModeles"
          class="form-control"
          id="marque"
          required
        >
          <option disabled value="">Sélectionnez une marque</option>
          <option v-for="marque in marques" :key="marque.id" :value="marque.name">
            {{ marque.name }}
          </option>
        </select>
      </div>

      <!-- Sélection du modèle -->
      <div class="mb-3" v-if="modeles.length">
        <label for="modele" class="form-label">Modèle :</label>
        <select
          v-model="formData.modele"
          @change="filterFinitions"
          class="form-control"
          id="modele"
          required
        >
          <option disabled value="">Sélectionnez un modèle</option>
          <option v-for="modele in modeles" :key="modele.id" :value="modele.name">
            {{ modele.name }}
          </option>
        </select>
      </div>

      <!-- Sélection de la finition -->
      <div class="mb-3" v-if="finitions.length">
        <label for="finition" class="form-label">Finition :</label>
        <select v-model="formData.finition" class="form-control" id="finition" required>
          <option disabled value="">Sélectionnez une finition</option>
          <option v-for="finition in finitions" :key="finition.id" :value="finition.name">
            {{ finition.name }}
          </option>
        </select>
      </div>

      <!-- Sélection du carburant -->
      <div class="mb-3">
        <label for="carburant" class="form-label">Carburant :</label>
        <select v-model="formData.carburant" class="form-control" id="carburant" required>
          <option disabled value="">Sélectionnez un carburant</option>
          <option
            v-for="carburant in carburants"
            :key="carburant.id"
            :value="carburant.type"
          >
            {{ carburant.type }}
          </option>
        </select>
      </div>

      <!-- Sélection de la transmission -->
      <div class="mb-3">
        <label for="transmission" class="form-label">Transmission :</label>
        <select
          v-model="formData.transmission"
          class="form-control"
          id="transmission"
          required
        >
          <option disabled value="">Sélectionnez une transmission</option>
          <option
            v-for="transmission in transmissions"
            :key="transmission.id"
            :value="transmission.type"
          >
            {{ transmission.type }}
          </option>
        </select>
      </div>

      <!-- État -->
      <div class="mb-3">
        <label for="etat" class="form-label">État :</label>
        <select v-model="formData.etat" class="form-control" id="etat" required>
          <option disabled value="">Sélectionnez un état</option>
          <option value="Neuf">Neuf</option>
          <option value="Occasion">Occasion</option>
        </select>
      </div>

      <!-- Kilométrage -->
      <div class="mb-3">
        <label for="kilometrage" class="form-label">Kilométrage :</label>
        <input
          type="number"
          v-model.number="formData.kilometrage"
          class="form-control"
          id="kilometrage"
          required
        />
      </div>

      <!-- Année -->
      <div class="mb-3">
        <label for="annee" class="form-label">Année :</label>
        <input
          type="number"
          v-model.number="formData.annee"
          class="form-control"
          id="annee"
          required
        />
      </div>

      <!-- Bouton de prédiction -->
      <button type="submit" class="btn btn-primary">Prédire le prix</button>
    </form>

    <!-- Affichage du résultat -->
    <div v-if="prediction" class="mt-3">
      <PredictionCard
        :prediction="prediction"
        :evaluation="prediction.Logistic_Regression_evaluation"
        :reportData="formData"
        :reportUrl="reportUrl"
        class="predictCard mt-4"
      />
    </div>

    <!-- Affichage des erreurs -->
    <div v-if="error" class="alert alert-danger mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import PredictionCard from "@/components/PredictionCard.vue";

export default {
  name: "PredictViews",
  components: {
    PredictionCard,
  },
  data() {
    return {
      vehicules: [],
      marques: [],
      modeles: [],
      finitions: [],
      carburants: [],
      transmissions: [],
      formData: {
        marque: "", // Nom de la marque
        modele: "", // Nom du modèle
        finition: "", // Nom de la finition
        carburant: "", // Type de carburant
        transmission: "", // Type de transmission
        kilometrage: 0,
        annee: 0,
        etat: "",
      },
      prediction: null,
      reportUrl: "",
      error: null,
    };
  },
  methods: {
    async fetchVehicules() {
      try {
        const response = await fetch(
          "https://fastapi-predict-car.onrender.com/vehicules/?skip=0&limit=100000"
        );
        if (!response.ok) throw new Error("Erreur lors de la récupération des véhicules");
        this.vehicules = await response.json();
        this.extractOptions();
      } catch (err) {
        this.error = err.message;
      }
    },
    extractOptions() {
      const marquesSet = new Set();
      const carburantsSet = new Set();
      const transmissionsSet = new Set();

      this.vehicules.forEach((v) => {
        marquesSet.add(JSON.stringify(v.marque));
        carburantsSet.add(JSON.stringify(v.carburant));
        transmissionsSet.add(JSON.stringify(v.transmission));
      });

      this.marques = Array.from(marquesSet).map((item) => JSON.parse(item));
      this.carburants = Array.from(carburantsSet).map((item) => JSON.parse(item));
      this.transmissions = Array.from(transmissionsSet).map((item) => JSON.parse(item));
    },
    filterModeles() {
      this.modeles = this.vehicules
        .filter((v) => v.marque.name === this.formData.marque)
        .map((v) => v.modele)
        .filter(
          (modele, index, self) => index === self.findIndex((m) => m.name === modele.name)
        );
      this.finitions = [];
      this.formData.modele = "";
      this.formData.finition = "";
    },
    filterFinitions() {
      this.finitions = this.vehicules
        .filter((v) => v.modele.name === this.formData.modele)
        .map((v) => v.finition)
        .filter(
          (finition, index, self) =>
            index === self.findIndex((f) => f.name === finition.name)
        );
      this.formData.finition = "";
    },
    async makePrediction() {
      try {
        const payload = {
          marque: this.formData.marque, // Nom de la marque
          modele: this.formData.modele, // Nom du modèle
          finition: this.formData.finition, // Nom de la finition
          carburant: this.formData.carburant, // Type de carburant
          transmission: this.formData.transmission, // Type de transmission
          kilometrage: this.formData.kilometrage,
          annee: this.formData.annee,
          etat: this.formData.etat,
        };

        const response = await fetch("https://fastapi-predict-car.onrender.com/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Erreur lors de la prédiction");
        }

        const data = await response.json();
        this.prediction = data;
        this.error = null;
      } catch (err) {
        this.error = err.message;
        this.prediction = null;
      }
    },
  },
  mounted() {
    this.fetchVehicules();
  },
};
</script>

<style scoped>
.predict-views {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 1em;
  background-color: #f9f9f9;
}
.predict-views h2 {
  text-align: center;
}
.text-danger {
  text-align: center;
}
.text-success {
  text-align: center;
}
.text-info {
  text-align: center;
}
.btn-secondary {
  margin-top: 1em;
}

.predictCard {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 1em;
}
</style>
