<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Les émojis</p>
      <img src="/src/assets/images/emojis.webp" alt="Image d'émojis correspondant à l'alphabet" class="m-auto mt-5 md:w-1/2" />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-jaune md:ml-32 md:mt-20 md:h-28 md:w-96">
    <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°8</h2>
  </div>

  <p class="mt-10 ml-10 font-lato text-sm md:ml-32">
    Il faut trouver le mot <span class="font-semibold">SMILEY</span> dans cette grille en cliquant sur les bonnes cases.
  </p>

  <div class="mt-10 ml-10 text-center md:ml-32 md:max-w-[600px]">
    <div>
      <div v-for="(row, rowIndex) in crossemoji" :key="rowIndex" class="grid grid-cols-4 md:flex">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :class="{ cell: true, found: cell.found }"
          @click="cell.type === 'emoji' ? validateLetter(rowIndex, colIndex) : null"
        >
          <span v-if="cell.type === 'emoji'" class="text-4xl">
            {{ cell.letter }}
          </span>
          <span v-else class="text-sm">{{ cell.emoji }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme9">
    <button
      v-if="correct"
      class="font-Lato m-auto mt-40 flex h-10 items-center justify-center rounded-lg bg-jaune px-20 text-noir hover:bg-opacity-75"
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
      correct: false,
      crossemoji: [
        [
          { type: "emoji", letter: "😀", found: false },
          { type: "emoji", letter: "😃", found: false },
          { type: "emoji", letter: "😄", found: false },
          { type: "emoji", letter: "😁", found: false },
          { type: "emoji", letter: "😆", found: false },
          { type: "emoji", letter: "🥹", found: false },
          { type: "emoji", letter: "😅", found: false },
          { type: "emoji", letter: "😂", found: false },
          { type: "emoji", letter: "🤣", found: false },
          { type: "emoji", letter: "🥲", found: false },
          { type: "emoji", letter: "🧐", found: false },
          { type: "emoji", letter: "😊", found: false },
          { type: "emoji", letter: "😇", found: false },
        ],
        [
          { type: "emoji", letter: "🙂", found: false },
          { type: "emoji", letter: "🙃", found: false },
          { type: "emoji", letter: "😉", found: false },
          { type: "emoji", letter: "😌", found: false },
          { type: "emoji", letter: "😍", found: false },
          { type: "emoji", letter: "🥰", found: false },
          { type: "emoji", letter: "😘", found: false },
          { type: "emoji", letter: "😗", found: false },
          { type: "emoji", letter: "😙", found: false },
          { type: "emoji", letter: "😚", found: false },
          { type: "emoji", letter: "😋", found: false },
          { type: "emoji", letter: "😛", found: false },
          { type: "emoji", letter: "😝", found: false },
        ],
      ],
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

    validateLetter(rowIndex, colIndex) {
      const clickedCell = this.crossemoji[rowIndex][colIndex];

      // Inverser l'état 'found' de la cellule
      clickedCell.found = !clickedCell.found;

      // Vérifier si solution trouvée
      const requiredEmojis = ["🥰", "😇", "🤣", "😊", "😆", "😛"];

      const emojiFound = this.crossemoji
        .flat()
        .filter((cell) => cell.type === "emoji" && cell.found)
        .map((cell) => cell.letter);

      const allRequiredEmojisFound = requiredEmojis.every((emoji) => emojiFound.includes(emoji));

      if (allRequiredEmojisFound) {
        this.correct = true;
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme8", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Vous avez trouvé la bonne combinaison!",
          confirmButtonColor: "#FCD283",
          confirmButtonText: '<span style="color: black;">OK</span>',
          customClass: {
            title: "swal-title-custom-class",
            content: "swal-content-custom-class",
          },
        });
      }
    },
  },
};
</script>

<style>
.cell {
  width: 50px !important;
  height: 50px !important;
  max-width: 50px !important;
  max-height: 50px !important;
  border: 1px solid #2d3748;
}

.found {
  background-color: #d9d9d9;
}

.cell:hover {
  background-color: #cbd5e0;
}
.swal-title-custom-class {
  font-family: "Playfair Display", serif;
}
.swal-content-custom-class {
  font-family: "Lato", sans-serif;
}
</style>
