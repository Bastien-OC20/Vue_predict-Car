<template>
  <div>
    <h2>Données Protégées</h2>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-if="data">{{ data }}</p>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "ProtectedData",
  data() {
    return {
      data: null,
      error: "",
    };
  },
  async created() {
    try {
      const response = await axios.get("/protected-endpoint");
      this.data = response.data;
    } catch (error) {
      console.error("Fetch protected data error:", error);
      this.error = "Failed to fetch protected data";
    }
  },
};
</script>

<style scoped>
h2 {
  color: #2c3e50;
}
/* Ajoutez des styles si nécessaire */
</style>
