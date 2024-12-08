<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom :</label>
        <input type="text" v-model="nom" class="form-control" id="nom" required />
      </div>
      <div class="mb-3 position-relative">
        <label for="password" class="form-label">Mot de passe :</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          class="form-control"
          id="password"
          required
        />
        <i
          :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
          class="toggle-password"
          @click="togglePasswordVisibility"
        ></i>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { login } from "@/axios";
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      nom: "",
      password: "",
      showPassword: false,
      error: "",
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      this.error = "";
      try {
        const response = await login(this.nom, this.password);
        this.loginAction(response);
        this.$router.push("/"); // Rediriger vers la page d'accueil
      } catch (error) {
        console.error("Login error:", error);

        if (error.detail) {
          if (Array.isArray(error.detail)) {
            this.error = error.detail.map((e) => e.msg).join(", ");
          } else {
            this.error = error.detail;
          }
        } else {
          this.error = "Nom ou mot de passe incorrect.";
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}
.login div {
  margin-bottom: 1em;
}
.login label {
  margin-bottom: 0.5em;
  color: #333333;
  display: block;
}
.login input {
  border: 1px solid #cccccc;
  padding: 0.5em;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}
.login button {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 1em;
  cursor: pointer;
}
.login button:hover {
  background-color: #0056b3;
}
.login p {
  color: red;
}
.position-relative {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}
.toggle-password:hover {
  color: #333;
}
.text-danger {
  text-align: center;
}
</style>
