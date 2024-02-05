<template>
  <main class="h-[900px] bg-vert">
    <div class="relative pt-40 md:pt-0">
      <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="m-auto w-4/6 md:pt-10" />
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="pt-32 font-playfair text-4xl text-blanc md:pt-0 md:text-9xl">Eni’com</h1>
      </div>
    </div>

    <Router-Link to="/connexion">
      <button
        @click="showAlert"
        class="font-Lato m-auto mt-40 flex h-10 items-center justify-center rounded-lg bg-orange px-20 text-blanc hover:bg-opacity-75 md:mt-0"
      >
        Commencer
      </button></Router-Link
    >
  </main>
</template>

<script>
import Swal from "sweetalert2"; // Utilisation de SweetAlert2

export default {
  methods: {
    showAlert() {
      Swal.fire({
        icon: "info",
        title: "Cookies",
        html: '<div style="text-align: left;"> Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre utilisation des cookies.</div>',
        confirmButtonColor: "#E47E52",
        iconColor: "#E47E52",
        customClass: {
          title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
          content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
        },
      });
    },
  },
};
</script>

<style>
.swal-title-custom-class {
  font-family: "Playfair Display", serif;
}
.swal-content-custom-class {
  font-family: "Lato", sans-serif;
}
</style>
