<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Le code ASCII</p>
      <img src="/src/assets/images/ascii.webp" alt="Image d'extrait du code ASCII" class="m-auto mt-5 w-1/2" />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-vert">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°9</h2>
  </div>

  <p class="mt-10 ml-32 font-lato text-sm">C'est un jeu de memory. Il te suffit de former les bonnes paires.</p>
  <div>
    <div class="ml-32 mt-5 flex max-w-[600px] flex-wrap">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="m-2 h-[70px] w-[70px] cursor-pointer"
        :class="{ flipped: card.isFlipped, matched: card.isMatched }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">{{ card.displayValue }}</div>
          <div class="card-back"></div>
        </div>
      </div>
    </div>
    <!-- Affiche le bouton si c'est correct -->
    <Router-Link to="/enigme10">
      <button
        v-if="correct"
        class="font-Lato m-auto mt-10 flex h-10 items-center justify-center rounded-lg bg-vert px-20 text-blanc hover:bg-opacity-75"
      >
        Énigme suivante
      </button></Router-Link
    >
  </div>
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
      cards: [
        { value: "A", displayValue: "A", isFlipped: false, isMatched: false },
        { value: "A", displayValue: "65", isFlipped: false, isMatched: false },
        { value: "C", displayValue: "C", isFlipped: false, isMatched: false },
        { value: "C", displayValue: "67", isFlipped: false, isMatched: false },
        { value: "D", displayValue: "D", isFlipped: false, isMatched: false },
        { value: "D", displayValue: "68", isFlipped: false, isMatched: false },
        { value: "E", displayValue: "E", isFlipped: false, isMatched: false },
        { value: "E", displayValue: "69", isFlipped: false, isMatched: false },
        { value: "H", displayValue: "H", isFlipped: false, isMatched: false },
        { value: "H", displayValue: "72", isFlipped: false, isMatched: false },
        { value: "K", displayValue: "K", isFlipped: false, isMatched: false },
        { value: "K", displayValue: "75", isFlipped: false, isMatched: false },
        { value: "M", displayValue: "M", isFlipped: false, isMatched: false },
        { value: "M", displayValue: "77", isFlipped: false, isMatched: false },
        { value: "P", displayValue: "P", isFlipped: false, isMatched: false },
        { value: "P", displayValue: "80", isFlipped: false, isMatched: false },
        { value: "R", displayValue: "R", isFlipped: false, isMatched: false },
        { value: "R", displayValue: "82", isFlipped: false, isMatched: false },
        { value: "T", displayValue: "T", isFlipped: false, isMatched: false },
        { value: "T", displayValue: "84", isFlipped: false, isMatched: false },
        { value: "V", displayValue: "V", isFlipped: false, isMatched: false },
        { value: "V", displayValue: "86", isFlipped: false, isMatched: false },
        { value: "W", displayValue: "W", isFlipped: false, isMatched: false },
        { value: "W", displayValue: "87", isFlipped: false, isMatched: false },
      ],
      flippedCards: [],
      correct: false,
    };
  },
  created() {
    this.enigmeService = EnigmeService;
  },
  computed: {
    shuffledCards() {
      return this.shuffle([...this.cards]);
    },
  },
  created() {
    // Shuffling the cards
    this.cards = this.shuffle(this.cards);
  },

  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    shuffle(array) {
      let currentIndex = array.length;
      let randomIndex, tempValue;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
      }

      return array;
    },
    flipCard(index) {
      if (this.flippedCards.length < 2 && !this.cards[index].isFlipped && !this.cards[index].isMatched) {
        this.cards[index].isFlipped = true;
        this.flippedCards.push({ index, value: this.cards[index].value });

        if (this.flippedCards.length === 2) {
          this.checkMatch();
        }
      }
    },
    checkMatch() {
      const [card1, card2] = this.flippedCards;
      if (card1.value === card2.value) {
        this.cards[card1.index].isMatched = true;
        this.cards[card2.index].isMatched = true;
        this.checkWin();
      } else {
        setTimeout(() => {
          this.cards[card1.index].isFlipped = false;
          this.cards[card2.index].isFlipped = false;
        }, 1000);
      }
      this.flippedCards = [];
    },
    checkWin() {
      if (this.cards.every((card) => card.isMatched)) {
        this.correct = true;
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme9", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Vous avez résolu l'énigme.",
          confirmButtonColor: "#3e9399",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Afficher une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "Le code ASCII",
            html: "<div style=\"text-align: left;\">L'American Standard Code for Information Interchange (ASCII), est une norme informatique de codage des caractères.Les premiers 32 caractères de l'ASCII sont des caractères de contrôle, qui sont utilisés pour contrôler les périphériques d'entréesortie, tels que les imprimantes et les terminaux. Les 96 caractères suivants représentent les lettres de l'alphabet latin, les chiffres arabes, les signes de ponctuation et quelques symboles divers.</div>",
            confirmButtonColor: "#3e9399",
            iconColor: "#3e9399",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.card-front {
  background-color: #d9d9d9;
  font-family: "Lato", sans-serif;
}

.card-back {
  background-color: #3e9399;
  transform: rotateY(180deg);
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.matched {
  background-color: #3e9399;
}
</style>
