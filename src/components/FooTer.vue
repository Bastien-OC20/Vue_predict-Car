<template>
  <footer class="footer bg-light text-center text-lg-start">
    <div class="container p-4">
      <div class="row">
        <!-- Partie 1 : Liens GitHub -->
        <div class="col-md-4">
          <h5>Nos GitHub</h5>
          <ul class="list-unstyled">
            <li
              v-for="(github, index) in githubAccounts"
              :key="index"
              class="d-flex align-items-center mb-2"
            >
              <img :src="github.avatar_url" alt="Avatar" class="avatar me-2" />
              <a
                class="text-dark gitName"
                :href="`https://github.com/${github.username}`"
                target="_blank"
              >
                {{ github.name || github.username }}
              </a>
            </li>
          </ul>
        </div>
        <!-- Partie 2 : Simplon Sud -->
        <div class="col-md-4 m-auto">
          <h5>Simplon Sud</h5>
          <div>
            <span class="flex justify-content-space-around">
              <a
                href="https://www.linkedin.com/company/simplon-sud/posts/?feedView=all"
                title="LinkedIn"
                alt="LinkedIn"
                ><i class="bi bi-linkedin me-3"></i
              ></a>
              <a href="https://x.com/SimplonPaca" title="Twitter or X" alt="Twitter or X"
                ><i class="bi bi-twitter-x me-3"></i
              ></a>
              <a
                href="https://www.facebook.com/simplonSud"
                title="Facebook"
                alt="Facebook"
                ><i class="bi bi-facebook"></i
              ></a>
            </span>
          </div>
          <a
            href="https://www.simplon.co/"
            title="Simplon"
            alt="Simplon centre de formation"
            ><img src="../assets/img/simplon-logo.png" alt="Simplon Sud" class="logo"
          /></a>
        </div>
        <!-- Partie 3 : Nous contacter -->
        <div class="col-md-4">
          <h5>Nous contacter</h5>
          <p>Adresse : 123 Rue Fictive, 13000 Marseille</p>
          <p>Téléphone : 04 91 00 00 00</p>
        </div>
      </div>
      <div class="text-center p-3">© Site développé en 2024</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooTer",
  data() {
    return {
      githubAccounts: [
        { username: "Mathieu-Soussignan" },
        { username: "Yamine3" },
        { username: "Bastien-OC20" },
      ],
    };
  },
  mounted() {
    this.fetchGitHubNames();
  },
  methods: {
    async fetchGitHubNames() {
      const promises = this.githubAccounts.map(async (account) => {
        try {
          const response = await fetch(
            `https://api.github.com/users/${account.username}`
          );
          const data = await response.json();
          account.name = data.name;
          account.avatar_url = data.avatar_url;
        } catch (error) {
          console.error(
            `Erreur lors de la récupération des données GitHub pour ${account.username}:`,
            error
          );
        }
      });

      await Promise.all(promises);
      this.$forceUpdate(); // Forcer la mise à jour du composant pour afficher les noms et avatars récupérés
    },
  },
};
</script>

<style>
.footer {
  text-align: center;
  background-color: #f8f9fa;
  padding: 10px 0;
  margin-top: 100px;
  width: 100%;
  position: relative;
  bottom: 0;
}

.avatar {
  width: 5%;
  border-radius: 50%;
  margin-right: 5px;
}

.gitName {
  font-size: 1rem;
  margin-top: 10px;
}

.footer .logo {
  height: 40px;
  margin-top: 10px;
}

.footer h5 {
  font-weight: bold;
  margin-bottom: 15px;
}

.footer p,
.footer a {
  margin-bottom: 10px;
  color: #2c3e50;
}

.footer a:hover {
  text-decoration: none;
  color: #007bff;
}
</style>
