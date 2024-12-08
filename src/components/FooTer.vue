<template>
  <footer class="footer bg-light text-center text-lg-start">
    <div class="container p-4">
      <div class="row">
        <!-- Partie 1 : Liens GitHub -->
        <div class="col-md-4">
          <h5>Nos GitHub</h5>
          <ul class="list-unstyled">
            <li><a class="text-dark" href="#">GitHub Développeur 1</a></li>
            <li><a class="text-dark" href="#">GitHub Développeur 2</a></li>
            <li><a class="text-dark" href="#">GitHub Développeur 3</a></li>
          </ul>
        </div>
        <!-- Partie 2 : Simplon Sud -->
        <div class="col-md-4">
          <h5>Simplon Sud</h5>
          <img src="../assets/img/simplon-logo.png" alt="Simplon Sud" class="logo" />
        </div>
        <!-- Partie 3 : Nous contacter -->
        <div class="col-md-4">
          <h5>Nous contacter</h5>
          <p>Adresse : 123 Rue Fictive, 13000 Marseille</p>
          <p>Téléphone : 04 91 00 00 00</p>
        </div>
      </div>
      <div class="text-center p-3">
        © 2023 Votre Nom ou Entreprise:
        <a class="text-dark" href="https://votre-site.com/">votre-site.com</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooTer",
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 10px 0;
  margin-top: 100px;
  width: 100%;
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
