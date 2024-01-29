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
        class="m-auto mt-5 w-1/2"
      />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-orange">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°7</h2>
  </div>

  <p class="mt-10 ml-32 font-lato text-sm">Il faut déchiffrer les lettres et trouve le mot en remettant dans l’ordre les lettres.</p>

  <div class="container mt-10 ml-32 grid">
    <div class="flex items-center justify-center" @dragover.prevent="dragOver" @drop="drop">
      <div v-for="(letter, index) in shuffledWord" :key="index" class="m-2">
        <div class="cursor-move rounded-lg border border-noir p-4" @dragstart="dragStart(index)" draggable="true">
          <img :src="getImagePath(letter)" alt="Lettre Matoran" class="h-12 w-12" />
        </div>
      </div>
    </div>

    <button @click="checkOrder" class="rounded bg-orange px-4 py-2 font-lato text-sm text-white">Vérifier</button>
  </div>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme8">
    <button v-if="correct" class="font-Lato m-auto mt-40 flex h-10 items-center justify-center rounded-lg bg-orange px-20 text-blanc">
      Énigme suivante
    </button>
  </Router-Link>
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";
import Swal from "sweetalert2";

export default {
  components: { IconIndice, IconRetour },
  data() {
    return {
      isPopupOpen: false,
      correct: false,
      originalWord: "LEGO",
      shuffledWord: this.shuffleArray("LEGO".split("")),
      imageFolderPath: "/src/assets/images/",
      imageExtension: ".webp", // Extension des images
    };
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
    checkOrder() {
      const currentOrder = this.shuffledWord.join("");
      const expectedOrder = this.originalWord;

      if (currentOrder === expectedOrder) {
        this.correct = true;
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
      return `${this.imageFolderPath}${letter.toUpperCase()}${this.imageExtension}`;
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
