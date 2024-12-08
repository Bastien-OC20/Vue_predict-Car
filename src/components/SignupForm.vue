<template>
  <div class="signup">
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom :</label>
        <input type="text" v-model="nom" class="form-control" id="nom" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email :</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
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
      <div class="mb-3 position-relative">
        <label for="confirmPassword" class="form-label"
          >Confirmer le mot de passe :</label
        >
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          class="form-control"
          id="confirmPassword"
          required
        />
        <i
          :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
          class="toggle-password"
          @click="toggleConfirmPasswordVisibility"
        ></i>
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from "../axios";
export default {
  name: "SignupForm",
  data() {
    return {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      error: "",
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.error = "Les mots de passe ne correspondent pas.";
        return;
      }
      try {
        await axios.post("/signup", {
          nom: this.nom,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        console.error("Signup error:", error);
        this.error = "L'inscription a échoué.";
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 1em;
  background-color: #f9f9f9;
}

.signup h2 {
  text-align: center;
  margin-bottom: 1em;
}

.position-relative {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 75%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}

.toggle-password:hover {
  color: #333;
}

button {
  width: 100%;
}

.text-danger {
  text-align: center;
}
</style>
