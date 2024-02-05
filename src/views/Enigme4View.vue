<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Le code Morse</p>
      <img src="/src/assets/images/morse.webp" alt="Image du code morse" class="m-auto mt-5 md:w-1/2" />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-jaune md:mt-20 md:ml-32 md:h-28 md:w-96">
    <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°4</h2>
  </div>

  <p class="mt-10 ml-10 font-lato text-sm md:ml-32">
    La vidéo permet de retrouver le mot secret. Un clin d'oeil vaut un point dans le morse écrit. Les deux yeux fermés valent un trait.
  </p>
  <p class="ml-10 font-lato text-sm md:ml-32">
    Traduit déjà le clignement de l'oeil en point et les yeux fermés en tiret puis regarde le morse écrit.
  </p>
  <div class="grid md:grid-cols-2">
    <video v-if="!isPopupOpen" src="/src/assets/video/morse.mp4" controls class="my-10 ml-10 h-48 w-72 md:ml-32 md:w-auto"></video>

    <div class="ml-10 grid">
      <label for="notes" class="mt-10 font-lato text-sm">Zone pour prendre des notes :</label>
      <textarea
        id="notes"
        name="notes"
        class="mb-10 h-36 w-72 rounded-lg border border-noir font-lato text-lg md:mb-0 md:-mt-10 md:w-96"
      ></textarea>
    </div>
  </div>

  <!-- Champ texte pour la validation -->
  <label for="motMorse" class="mt-10 ml-10 font-lato text-sm text-noir md:ml-32">Entrez le mot :</label>
  <input type="text" id="motMorse" v-model="motMorse" class="ml-4 rounded-md border-2 border-jaune" />
  <button @click="validermotMorse" class="ml-10 cursor-pointer rounded-xl bg-jaune py-2 px-4 text-noir md:ml-4">Valider</button>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme5">
    <button
      v-if="motCorrect"
      class="font-Lato m-auto mt-10 flex h-10 items-center justify-center rounded-lg bg-jaune px-20 text-noir hover:bg-opacity-75"
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
      motMorse: "", // Variable pour stocker la valeur du champ texte
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
    validermotMorse() {
      // Définir le mot correct
      var motCorrectLSF = "codage";

      // Vérifier si la valeur correspond au mot correct
      if (this.motMorse.toLowerCase() === motCorrectLSF) {
        this.motCorrect = true; // Met à jour l'état de la validation
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme4", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Mot correct. Bravo! Vous avez résolu l'énigme.",
          confirmButtonColor: "#FCD283",
          confirmButtonText: '<span style="color: black;">OK</span>',
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Afficher une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "Le code Morse",
            html: '<div style="text-align: left;">Autrefois, il n’y avait ni téléphone, ni fax, ni internet. Les communications entre les gens étaient donc beaucoup plus lentes. Le code Morse a été inventé pour les accélérer. Ce système d’écriture se compose de tirets et de points.</div>',
            confirmButtonColor: "#FCD283",
            confirmButtonText: '<span style="color: black;">OK</span>',
            iconColor: "#FCD283",
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
          confirmButtonColor: "#FCD283",
          confirmButtonText: '<span style="color: black;">OK</span>',
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
