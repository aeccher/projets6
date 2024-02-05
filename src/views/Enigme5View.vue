<template>
  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>
  <div>
    <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-vert md:ml-32 md:mt-20 md:h-28 md:w-96">
      <h2 class="py-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°5</h2>
    </div>

    <p class="mt-10 ml-10 font-lato text-sm md:ml-32">Un clic sur le mot puis sur la langue qui lui correspond et c’est gagné.</p>

    <div class="game-container ml-10 grid md:ml-0 md:flex">
      <ul class="word-list" id="wordList">
        <!-- Liste de mots -->
        <li data-language="fr">Chien</li>
        <li data-language="es">Gato</li>
        <li data-language="de">Hund</li>
        <li data-language="it">Gatto</li>
        <li data-language="en">Dog</li>
      </ul>

      <ul class="language-list" id="languageList">
        <!-- Liste de langues -->
        <li data-language="fr">Français</li>
        <li data-language="es">Espagnol</li>
        <li data-language="de">Allemand</li>
        <li data-language="it">Italien</li>
        <li data-language="en">Anglais</li>
      </ul>
    </div>
  </div>

  <!-- Affiche le bouton si c'est correct -->
  <Router-Link to="/enigme6">
    <button
      v-if="correct"
      class="font-Lato m-auto mt-52 flex h-10 items-center justify-center rounded-lg bg-vert px-20 text-blanc hover:bg-opacity-75"
    >
      Énigme suivante
    </button></Router-Link
  >
</template>

<script>
import IconRetour from "/src/components/icons/IconRetour.vue";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2
import EnigmeService from "../EnigmeService.js";
import Cookies from "js-cookie"; // importation du module js-cookie

export default {
  components: { IconRetour },
  data() {
    return {
      selectedWord: null,
      selectedLanguage: null,
      allResponses: [],
      correct: false, // Variable pour suivre l'état de la validation
      selectedWordElement: null,
      selectedLanguageElement: null,
    };
  },
  created() {
    this.enigmeService = EnigmeService;
  },
  computed: {
    allCorrect() {
      return this.allResponses.every((response) => response);
    },
  },
  methods: {
    checkMatch() {
      if (this.selectedWord && this.selectedLanguage) {
        const wordLanguagePairs = {
          Chien: "fr",
          Gato: "es",
          Hund: "de",
          Gatto: "it",
          Dog: "en",
        };

        const correctMatch = wordLanguagePairs[this.selectedWord] === this.selectedLanguage;
        this.allResponses.push(correctMatch);
        this.resetSelection();
      }
    },
    resetSelection() {
      this.selectedWord = null;
      this.selectedLanguage = null;
      this.selectedWordElement = null;
      this.selectedLanguageElement = null;

      // Vérifier si toutes les réponses ont été données
      if (this.allResponses.length === 5) {
        if (this.allCorrect) {
          this.correct = true; // Met à jour l'état de la validation
          const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
          EnigmeService.setEnigmeResolue("enigme5", userId);
          Swal.fire({
            icon: "success",
            title: "Félicitations!",
            text: "Vous avez résolu l'énigme.",
            confirmButtonColor: "#3e9399",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Veuillez réessayer.",
            confirmButtonColor: "#3e9399",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          }).then(() => {
            // Recharger la page après la fermeture de l'alerte d'erreur
            location.reload();
          });
        }
      }
    },
  },
  mounted() {
    const wordList = document.getElementById("wordList");
    const languageList = document.getElementById("languageList");

    // Mélanger les éléments de la liste de mots
    const words = Array.from(wordList.children);
    words.sort(() => Math.random() - 0.5);
    words.forEach((word) => wordList.appendChild(word));

    // Gérer le clic sur un mot
    wordList.addEventListener("click", (event) => {
      const clickedWord = event.target;
      if (clickedWord.tagName === "LI") {
        if (this.selectedWordElement) {
          this.selectedWordElement.style.backgroundColor = "#e0e0e0";
          this.selectedWordElement.style.color = "#000";
        }
        clickedWord.style.backgroundColor = "#3e9399";
        clickedWord.style.color = "#FFF";
        this.selectedWord = clickedWord.textContent;
        this.selectedWordElement = clickedWord;
        this.checkMatch();
      }
    });

    // Gérer le clic sur une langue
    languageList.addEventListener("click", (event) => {
      const clickedLanguage = event.target;
      if (clickedLanguage.tagName === "LI") {
        if (this.selectedLanguageElement) {
          this.selectedLanguageElement.style.backgroundColor = "#3e9399";
          this.selectedLanguageElement.style.color = "#fff";
        }
        clickedLanguage.style.backgroundColor = "#e0e0e0";
        clickedLanguage.style.color = "#000";
        this.selectedLanguage = clickedLanguage.dataset.language;
        this.selectedLanguageElement = clickedLanguage;
        this.checkMatch();
      }
    });
  },
};
</script>

<style>
.game-container {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.word-list,
.language-list {
  list-style: none;
  padding: 0;
  font-family: "Lato", sans-serif;
}

.word-list li,
.language-list li {
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  background-color: #e0e0e0;
  display: inline-block;
}

.language-list li {
  background-color: #3e9399;
  color: #fff;
}

.swal-title-custom-class {
  font-family: "Playfair Display", serif;
}

.swal-content-custom-class {
  font-family: "Lato", sans-serif;
}
</style>
