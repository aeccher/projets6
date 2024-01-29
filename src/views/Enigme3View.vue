<template>
  <div>
    <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

    <!-- Fenêtre pop-up -->
    <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
      <div class="relative rounded-xl bg-blanc p-8">
        <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
        <!-- Contenu de la fenêtre pop-up -->
        <p class="text-center font-playfair text-xl text-noir">Hiéroglyphes</p>
        <img src="/src/assets/images/hieroglyphes.webp" alt="Image de l'alphabet hiéroglyphes" class="m-auto mt-5 w-1/2" />
        <p class="mt-10 font-lato text-sm">
          Début à la 2ème colonne 9ème ligne. 8 cases vers le haut / 7 cases vers la droite / 7 cases vers le bas / 3 cases à gauche / 5
          cases vers le haut
        </p>
      </div>
    </div>

    <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-orange">
      <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°3</h2>
    </div>

    <p class="mt-10 ml-32 font-lato text-sm">
      Il suffit, en utilisant les hiéroglyphes, de reproduire la première lettre du mot hiéroglyphe en noircissant au clic les cases de la
      grille.
    </p>
    <!-- Grille -->
    <div id="grille" class="mt-12 ml-32">
      <div class="row-numbers">
        <!-- Numéros de ligne -->
        <div v-for="i in 10" :key="i" class="cell number-cell">{{ i }}</div>
      </div>
      <div class="column-numbers">
        <!-- Numéros de colonne -->
        <div v-for="i in 10" :key="i" class="cell number-cell">{{ i }}</div>
      </div>
    </div>

    <!-- Affiche le bouton si c'est correct -->
    <Router-Link to="/enigme4">
      <button v-if="correct" class="font-Lato m-auto mt-5 flex h-10 items-center justify-center rounded-lg bg-orange px-20 text-blanc">
        Énigme suivante
      </button>
    </Router-Link>
  </div>
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2

export default {
  components: { IconIndice },
  data() {
    return {
      isPopupOpen: false,
      correct: false,
      correctPattern: [
        // 1 pour les cellules noires et 0 pour les cellules blanches
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      clickedPattern: Array(10)
        .fill()
        .map(() => Array(10).fill(0)),
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    toggleCellColor(cell) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      const isCellClicked = cell.classList.contains("clicked");

      // Si la cellule a déjà été cliquée, enlevez la classe et changez la couleur à blanc
      if (isCellClicked) {
        cell.classList.remove("clicked");
        cell.style.backgroundColor = "rgb(255, 255, 255)";
        this.clickedPattern[row][col] = 0;
      } else {
        // Sinon, ajoutez la classe et changez la couleur à noir
        cell.classList.add("clicked");
        cell.style.backgroundColor = "rgb(0, 0, 0)";
        this.clickedPattern[row][col] = 1;
      }

      this.checkCompletion();
    },
    checkCompletion() {
      if (this.arrayEquals(this.clickedPattern, this.correctPattern)) {
        this.correct = true;
        setTimeout(function () {
          Swal.fire({
            icon: "success",
            title: "Félicitations!",
            text: "Combinaison correcte !",
            confirmButtonColor: "#E47E52",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          }).then(() => {
            // Affiche une deuxième alerte après la fermeture de la première
            Swal.fire({
              icon: "info",
              title: "Hiéroglyphes",
              html: '<div style="text-align: left;">Pour écrire, les anciens Égyptiens utilisaient des hiéroglyphe. Dans ce système d’écriture, les dessins tiennent lieu de lettres. Il y a des centaines de hiéroglyphes différents : seulement une sélection est utilisée ici et n\'est pas basée sur un alphabet officiel. </div>',
              confirmButtonColor: "#E47E52",
              iconColor: "#E47E52",
              customClass: {
                title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
                content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
              },
            });
          });
        }, 100);
      }
    },
    arrayEquals(arr1, arr2) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    },
    creategrille() {
      const grilleContainer = document.getElementById("grille");

      // Création de la grille
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener("click", () => this.toggleCellColor(cell));
          grilleContainer.appendChild(cell);
        }
      }
    },
  },
  mounted() {
    this.creategrille(); // Appel à la fonction pour créer le grille
  },
};
</script>

<style>
#grille {
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(10, 30px);
  gap: 1px;
}

.cell {
  width: 30px;
  height: 30px;
  max-width: 30px;
  max-height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.cell.clicked {
  background-color: rgb(0, 0, 0);
}

.number-cell {
  width: 30px;
  height: 30px;
  max-width: 30px;
  max-height: 30px;
  border: 1px solid #ccc;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.row-numbers {
  display: grid;
  grid-template-columns: 30px;
  grid-template-rows: repeat(10, 30px);
  gap: 1px;
  position: absolute;
  margin-left: -30px;
}

.column-numbers {
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: 30px;
  gap: 1px;
  position: absolute;
  margin-top: -30px;
}

.swal-title-custom-class {
  font-family: "Playfair Display", serif;
}
.swal-content-custom-class {
  font-family: "Lato", sans-serif;
}
</style>
