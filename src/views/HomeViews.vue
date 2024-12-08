<template>
  <div class="home-views">
    <div class="container">
      <h1 class="homeAccueil text-left">Accueil</h1>
      <p class="lead text-left">
        Bienvenue sur notre projet : Prédiction du prix des voitures d'occasion
      </p>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <p class="text-left">
            Découvrez une solution innovante pour estimer rapidement le prix des voitures
            d’occasion grâce à la puissance des données et du Machine Learning.
          </p>
          <ul class="list-unstyled">
            <li class="mb-3 text-left">
              <span class="fw-bold">💡 Source d'apprentissage :</span> Les données
              proviennent du site d'annonces de voitures d'occasions
              <span
                ><a
                  href="https://www.aramisauto.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Aramis auto"
                  alt="logo aramis auto"
                  ><img
                    src="../assets/img/aramis.svg"
                    alt="logo aramis auto"
                    title="Aramis auto"
                    class="logo_paternaire"
                  /> </a
              ></span>
              .
            </li>
            <li class="mb-3 text-left">
              <span class="fw-bold">📊 Machine learning :</span> Exploration et
              visualisation des données pour l'entrainement à la prediction du prix.
            </li>
          </ul>
          <p class="text-left">
            Rejoignez-nous pour révolutionner la vente de voitures d'occasion! 🚗
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeViews",
  mounted() {
    this.handleLogin();
  },
  methods: {
    async handleLogin() {
      try {
        const nom = "Sebastien"; // Utilisez 'nom' au lieu de 'username'
        const password = ":Sebast1en13;";

        // Créer un objet URLSearchParams pour form-data
        const formData = new URLSearchParams();
        formData.append("nom", nom); // Remplacez 'username' par 'nom'
        formData.append("password", password);

        const response = await axios.post(
          "https://fastapi-predict-car.onrender.com/login",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // Récupérer 'access_token' au lieu de 'token'
        const token = response.data.access_token;
        localStorage.setItem("authToken", token);
        console.log("Connexion réussie, token stocké :", token);

        // Rediriger vers PredictViews après succès
        this.$router.push("/predict");
      } catch (error) {
        console.error(
          "Erreur lors de la connexion :",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
};
</script>

<style scoped>
.homeAccueil {
  color: #2c3e50;
  font-size: 2.5rem;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}

.text-left {
  text-align: left;
}

.fw-bold {
  font-weight: bold;
}

.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10vh;
  margin-bottom: 2vh;
}

ul.list-unstyled {
  padding-left: 0;
}

li.mb-3 {
  margin-bottom: 1rem;
}

p.text-left {
  margin-bottom: 1rem;
}

.logo_paternaire {
  width: 100px;
  margin-left: 5px;
  margin-bottom: 5px;
}
</style>
