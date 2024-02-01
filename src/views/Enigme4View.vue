<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Le code Morse</p>
      <img src="/src/assets/images/morse.webp" alt="Image du code morse" class="m-auto mt-5 w-1/2" />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-jaune">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°4</h2>
  </div>

  <p class="mt-10 ml-32 font-lato text-sm">
    La vidéo permet de retrouver le mot secret. Un clin d'oeil vaut un point dans le morse écrit. Les deux yeux fermés valent un trait.
  </p>
  <p class="ml-32 font-lato text-sm">
    Traduit déjà le clignement de l'oeil en point et les yeux fermés en tiret puis regarde le morse écrit.
  </p>
  <div class="grid grid-cols-2">
    <video v-if="!isPopupOpen" src="/src/assets/video/morse.mp4" controls class="my-10 ml-32 h-48"></video>

    <div class="ml-10 grid">
      <label for="notes" class="mt-10 font-lato text-sm">Zone pour prendre des notes :</label>
      <textarea id="notes" name="notes" class="-mt-10 h-36 w-96 rounded-lg border border-noir font-lato text-lg"></textarea>
    </div>
  </div>

  <!-- Champ texte pour la validation -->
  <label for="motMorse" class="ml-32 font-lato text-sm text-noir">Entrez le mot :</label>
  <input type="text" id="motMorse" v-model="motMorse" class="ml-4 rounded-md border-2 border-jaune" />
  <button @click="validermotMorse" class="ml-4 cursor-pointer rounded-xl bg-jaune py-2 px-4 text-noir">Valider</button>

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
        EnigmeService.setEnigmeResolue("enigme4");
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
