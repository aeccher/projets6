<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />

  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">Les runes</p>
      <img
        src="/src/assets/images/runes.webp"
        alt="Image de lettres runes qui correspondent à l'alphabet français"
        class="m-auto mt-5 w-1/2"
      />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-bleu md:ml-32 md:mt-20 md:h-28 md:w-96">
    <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°6</h2>

    <!-- Zone pour le glisser-déposer de runes -->
    <div class="container mt-24">
      <div class="drop-zone" id="drop-zone-1" @drop="drop" @dragover="allowDrop"></div>
      <div class="drop-zone" id="drop-zone-2" @drop="drop" @dragover="allowDrop"></div>
      <div class="drop-zone" id="drop-zone-3" @drop="drop" @dragover="allowDrop"></div>
      <div class="drop-zone" id="drop-zone-4" @drop="drop" @dragover="allowDrop"></div>
    </div>

    <!-- Lettres à glisser -->
    <div class="container grid grid-cols-7 text-2xl md:flex">
      <div class="draggable" id="draggable-fehu" draggable="true" @dragstart="drag">ᚠ</div>
      <div class="draggable" id="draggable-uruz" draggable="true" @dragstart="drag">ᚢ</div>
      <div class="draggable" id="draggable-thurisaz" draggable="true" @dragstart="drag">ᚦ</div>
      <div class="draggable" id="draggable-ansuz" draggable="true" @dragstart="drag">ᚨ</div>
      <div class="draggable" id="draggable-raidho" draggable="true" @dragstart="drag">ᚱ</div>
      <div class="draggable" id="draggable-kaun" draggable="true" @dragstart="drag">ᚲ</div>
      <div class="draggable" id="draggable-gebo" draggable="true" @dragstart="drag">ᚷ</div>
      <div class="draggable" id="draggable-wunjo" draggable="true" @dragstart="drag">ᚹ</div>
      <div class="draggable" id="draggable-hagalaz" draggable="true" @dragstart="drag">ᚺ</div>
      <div class="draggable" id="draggable-nauthiz" draggable="true" @dragstart="drag">ᚾ</div>
      <div class="draggable" id="draggable-isa" draggable="true" @dragstart="drag">ᛁ</div>
      <div class="draggable" id="draggable-jera" draggable="true" @dragstart="drag">ᛃ</div>
      <div class="draggable" id="draggable-eihwaz" draggable="true" @dragstart="drag">ᛇ</div>
      <div class="draggable" id="draggable-perthro" draggable="true" @dragstart="drag">ᛈ</div>
      <div class="draggable" id="draggable-algiz" draggable="true" @dragstart="drag">ᛉ</div>
      <div class="draggable" id="draggable-sowilo" draggable="true" @dragstart="drag">ᛊ</div>
      <div class="draggable" id="draggable-tiwaz" draggable="true" @dragstart="drag">ᛏ</div>
      <div class="draggable" id="draggable-berkanan" draggable="true" @dragstart="drag">ᛒ</div>
      <div class="draggable" id="draggable-ehwaz" draggable="true" @dragstart="drag">ᛖ</div>
      <div class="draggable" id="draggable-mannaz" draggable="true" @dragstart="drag">ᛗ</div>
      <div class="draggable" id="draggable-laguz" draggable="true" @dragstart="drag">ᛚ</div>
      <div class="draggable" id="draggable-ingwaz" draggable="true" @dragstart="drag">ᛜ</div>
      <div class="draggable" id="draggable-othala" draggable="true" @dragstart="drag">ᛟ</div>
      <div class="draggable" id="draggable-dagaz" draggable="true" @dragstart="drag">ᛞ</div>
    </div>
  </div>

  <p class="mt-10 ml-10 font-lato text-sm md:ml-32">
    Il faut faire glisser les lettres runes dans les cases pour former le mot <span class="font-semibold">rune</span>.
  </p>

  <!-- Affiche le bouton si le mot est correct -->
  <Router-Link to="/enigme7">
    <button
      v-if="motCorrect"
      class="font-Lato m-auto mt-72 flex h-10 items-center justify-center rounded-lg bg-bleu px-20 text-blanc hover:bg-opacity-75"
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
      motCorrect: false, // Ajoutez une propriété pour suivre si le mot est correct
      lettresDeposees: 0, // Ajoutez une propriété pour suivre le nombre de lettres déposées
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
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event) {
      event.dataTransfer.setData("text", event.target.id);
    },
    drop(event) {
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      var draggableElement = document.getElementById(data);
      var dropZone = event.target;

      if (dropZone.classList.contains("drop-zone") && dropZone.innerHTML === "") {
        dropZone.appendChild(draggableElement.cloneNode(true));
        draggableElement.style.display = "none";

        // Augmenter le compteur de lettres déposées
        this.lettresDeposees++;

        // Vérifier si toutes les lettres ont été déposées
        if (this.lettresDeposees === 4) {
          // Ajouter un délai de 100 millisecondes avant d'afficher les alertes
          setTimeout(() => {
            // Vérifier le mot lorsque toutes les cases sont remplies
            this.motCorrect = this.checkWord();
            const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
            EnigmeService.setEnigmeResolue("enigme6", userId);

            // Afficher une alerte selon le résultat
            if (this.motCorrect) {
              Swal.fire({
                icon: "success",
                title: "Félicitations!",
                text: "Bravo ! Le mot est correct.",
                confirmButtonColor: "#30485E",
                customClass: {
                  title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
                  content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
                },
              }).then(() => {
                // Affiche une deuxième alerte après la fermeture de la première
                Swal.fire({
                  icon: "info",
                  title: "Les runes",
                  html: '<div style="text-align: left;">L’écriture runique est utilisée depuis au moins 2000 ans, en particulier dans de nombreux pays germaniques. Elle a été gravée dans la pierre et le bois. Ils servent parfois à prédire l’avenir. </div>',
                  confirmButtonColor: "#30485E",
                  iconColor: "#30485E",
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
                text: "Le mot est incorrect. Veuillez réessayer.",
                confirmButtonColor: "#30485E",
                customClass: {
                  title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
                  content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
                },
              }).then(() => {
                // Rafraîchir la page en cas de code incorrect
                window.location.reload();
              });
            }

            // Réinitialiser le compteur de lettres déposées
            this.lettresDeposees = 0;
          }, 100);
        }
      }
    },
    checkWord() {
      var dropZones = document.querySelectorAll(".drop-zone");
      var word = "";
      dropZones.forEach(function (dropZone) {
        if (dropZone.children.length > 0) {
          word += dropZone.children[0].textContent;
        }
      });

      // Comparer le mot formé avec le mot attendu
      var correctWord = "ᚱᚢᚾᛖ"; // Ajouter les autres lettres runes selon vos besoins
      return word === correctWord;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 50px auto;
}

.drop-zone {
  width: 50px;
  height: 50px;
  border: 2px dashed #ccc;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.draggable {
  cursor: grab;
  user-select: none;
  margin: 5px;
}

.swal-title-custom-class {
  font-family: "Playfair Display", serif;
}
.swal-content-custom-class {
  font-family: "Lato", sans-serif;
}
</style>
