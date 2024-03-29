<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />
  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Dactylographie de la Langue des signes française (LSF)</p>
      <img
        src="/src/assets/images/indice_lsf.webp"
        alt="Image de la dactylographie de la Langue des signes française"
        class="m-auto mt-5"
      />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-vert md:ml-32 md:mt-20 md:h-28 md:w-96">
    <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°1</h2>
  </div>

  <p class="mt-10 ml-10 font-lato text-sm md:ml-32">
    Il faut trouver le mot suivant, écrit en utilisant la dactylographie de la Langue des signes française (LSF) :
  </p>
  <img
    src="/src/assets/images/mot_lsf.webp"
    alt="Image d'un mot écrit en dactylographie de la Langue des signes française"
    class="m-auto mt-5 mb-20 md:w-1/4"
  />
  <!-- Champ texte pour la validation -->
  <label for="motLSF" class="ml-10 font-lato text-sm text-vert md:ml-32">Entrez le mot :</label>
  <input type="text" id="motLSF" v-model="motLSF" class="ml-4 rounded-md border-2 border-vert" />
  <button @click="validerMotLSF" class="ml-10 cursor-pointer rounded-xl bg-vert py-2 px-4 text-blanc md:ml-4">Valider</button>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme2">
    <button
      v-if="motCorrect"
      class="font-Lato m-auto mt-20 flex h-10 items-center justify-center rounded-lg bg-vert px-20 text-blanc hover:bg-opacity-75"
    >
      Énigme suivante
    </button></Router-Link
  >
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2
import EnigmeService from "../EnigmeService.js";
import Cookies from "js-cookie"; // importation du module js-cookie

export default {
  components: { IconIndice, IconRetour },
  data() {
    return {
      isPopupOpen: false,
      motLSF: "", // Variable pour stocker la valeur du champ texte
      motCorrect: false, // Variable pour suivre l'état de la validation
    };
  },
  created() {
    this.enigmeService = EnigmeService;
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    validerMotLSF() {
      // Définir le mot correct
      var motCorrectLSF = "sourd";

      // Vérifier si la valeur correspond au mot correct
      if (this.motLSF.toLowerCase() === motCorrectLSF) {
        this.motCorrect = true; // Met à jour l'état de la validation
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme1", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Mot correct. Bravo! Vous avez résolu l'énigme.",
          confirmButtonColor: "#3e9399",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Afficher une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "Langue des signes française",
            html: '<div style="text-align: left;">La langue des signes française (LSF) est une langue à part entière. Elle est utilisée par les personnes sourdes en France et dans les pays francophones. C’est un code qui fait appel à des gestes et à des mimiques. S’exprimer à l’aide de ces signes s’appelle “signer”. Cette langue varie d’un pays à l’autre. </div>',
            confirmButtonColor: "#3e9399",
            iconColor: "#3e9399",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Mot incorrect! Veuillez réessayer pour entrer le mot correct.",
          confirmButtonColor: "#3e9399",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        });
      }
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
