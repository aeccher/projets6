<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">L'alphabet Matoran</p>
      <img
        src="/src/assets/images/matoran.webp"
        alt="Image de lettres matoran qui correspondent à l'alphabet français"
        class="m-auto mt-5 md:w-1/2"
      />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-orange md:ml-32 md:mt-20 md:h-28 md:w-96">
    <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°7</h2>
  </div>

  <p class="mt-10 ml-10 font-lato text-sm md:ml-32">
    Il faut déchiffrer les lettres et trouve le mot en remettant dans l’ordre les lettres.
  </p>

  <div class="container mt-10 ml-10 grid md:ml-32">
    <div class="flex items-center justify-center" @dragover.prevent="dragOver" @drop="drop">
      <div
        v-for="(letter, index) in shuffledWord"
        :key="index"
        class="m-2"
        @touchstart.prevent="touchStart(index, $event)"
        @touchmove.prevent="touchMove(index, $event)"
        @touchend.prevent="touchEnd"
      >
        <div class="cursor-move rounded-lg border border-noir p-4" @dragstart="dragStart(index)" draggable="true">
          <img :src="getImagePath(letter)" alt="Lettre Matoran" class="h-6 w-6 md:h-12 md:w-12" />
        </div>
      </div>
    </div>

    <button @click="checkOrder" class="rounded bg-orange px-4 py-2 font-lato text-sm text-white">Vérifier</button>
  </div>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme8">
    <button
      v-if="correct"
      class="font-Lato m-auto mt-40 flex h-10 items-center justify-center rounded-lg bg-orange px-20 text-blanc hover:bg-opacity-75"
    >
      Énigme suivante
    </button>
  </Router-Link>
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";
import Swal from "sweetalert2";
import EnigmeService from "../EnigmeService.js";
import Cookies from "js-cookie"; // importation du module js-cookie

export default {
  components: { IconIndice, IconRetour },
  data() {
    return {
      isPopupOpen: false,
      correct: false,
      originalWord: "LEGO",
      shuffledWord: this.shuffleArray("LEGO".split("")),
      imageExtension: ".webp", // Extension des images
      dragIndex: -1,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
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
    shuffleArray(array) {
      // Shuffling the array while ensuring that it is not in the order "LEGO"
      let shuffledArray = array.slice();
      while (shuffledArray.join("") === "LEGO") {
        shuffledArray = array.slice().sort(() => Math.random() - 0.5);
      }
      return shuffledArray;
    },

    dragStart(index) {
      event.dataTransfer.setData("text/plain", index.toString());
    },
    dragOver(event) {
      event.preventDefault();
    },
    drop(event) {
      event.preventDefault();

      const fromIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
      const toIndex = this.getDropIndex(event);

      if (fromIndex !== toIndex) {
        this.moveLetter(fromIndex, toIndex);
      }
    },
    moveLetter(fromIndex, toIndex) {
      const letterToMove = this.shuffledWord[fromIndex];
      this.shuffledWord.splice(fromIndex, 1);
      this.shuffledWord.splice(toIndex, 0, letterToMove);
    },
    getDropIndex(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const index = Math.floor(x / (rect.width / this.shuffledWord.length));
      return Math.min(index, this.shuffledWord.length - 1);
    },
    touchStart(index, event) {
      this.dragIndex = index;
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    touchMove(index, event) {
      if (this.dragIndex === -1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - this.startX;
      const dy = touch.clientY - this.startY;
      this.offsetX = dx;
      this.offsetY = dy;
      const newIndex = this.calculateNewIndex(index);
      if (newIndex !== this.dragIndex) {
        this.moveLetter(this.dragIndex, newIndex);
        this.dragIndex = newIndex;
      }
    },
    touchEnd() {
      this.dragIndex = -1;
    },
    calculateNewIndex(index) {
      const newIndex = Math.round(index + this.offsetX / 50); // Adjust the divisor to control sensitivity
      return Math.max(0, Math.min(this.shuffledWord.length - 1, newIndex));
    },
    checkOrder() {
      const currentOrder = this.shuffledWord.join("");
      const expectedOrder = this.originalWord;

      if (currentOrder === expectedOrder) {
        this.correct = true;
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme7", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Vous avez correctement replacé les lettres.",
          confirmButtonColor: "#E47E52",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Afficher une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "L'alphabet Matoran",
            html: "<div style=\"text-align: left;\">L'alphabet Matoran est un système d'écriture utilisé par les Matoran, un peuple de créatures humanoïdes dans l'univers Bionicle (LEGO). L'alphabet est basé sur un système de cercles, de points et de lignes. Chaque lettre représente un son distinct dans la langue Matoran.</div>",
            confirmButtonColor: "#E47E52",
            iconColor: "#E47E52",
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
          text: "Désolé, veuillez réessayer...",
          confirmButtonColor: "#E47E52",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        });
      }
    },
    getImagePath(letter) {
      return `/${letter.toUpperCase()}${this.imageExtension}`;
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
