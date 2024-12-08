<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </a>
      <div class="collapse navbar-collapse justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-house-door-fill"></i>
              Accueil</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/predict">
              <i class="bi bi-bar-chart-fill"></i>
              Predict</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/donnees">
              <i class="bi bi-table"></i>
              Données</router-link
            >
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="btn btn-outline-primary me-2" to="/login">
              <i class="bi bi-box-arrow-in-right"></i> Login
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="btn btn-outline-success" to="/signup">
              <i class="bi bi-person-plus"></i> Signup
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-outline-danger" @click="handleLogout">
              <i class="bi bi-box-arrow-right"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logoutAction"]),
    handleLogout() {
      this.logoutAction();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.logo {
  margin-top: 7px;
  padding: 2px;
  height: 50px;
  margin-right: 10px;
}
.nav-item {
  margin-right: 10px;
  font-size: 20px;
  padding: 10px;
  
}

a {
  text-decoration: none;
  color: #ffffff;
  /* Texte blanc */
}

a.router-link-exact-active {
  color: #000000;
  /* Texte noir lorsqu'il est sélectionné */
}

a:hover {
  color: #000000;
  /* Texte noir lorsqu'il est survolé */
}
</style>
