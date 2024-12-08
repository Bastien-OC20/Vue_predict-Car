<template>
  <div id="app">
    <NavBar />
    <div class="content">
      <router-view />
    </div>
    <FooTer />
  </div>
</template>

<script>
import { SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES } from "@/config";
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooTer,
  },
  mounted() {
    console.log("SECRET_KEY:", SECRET_KEY);
    console.log("ALGORITHM:", ALGORITHM);
    console.log("ACCESS_TOKEN_EXPIRE_MINUTES:", ACCESS_TOKEN_EXPIRE_MINUTES);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

html,
body,
#app {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  font-family: "Roboto", sans-serif;
}

.content {
  padding: 20px;
  max-height: 120vh;
}
</style>
