<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />
  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">L'alphabet militaire de l'OTAN</p>
      <img src="/src/assets/images/alphabet_otan.webp" alt="Image de l'alphabet militaire de l'OTAN" class="mt-5md:w-1/2 m-auto" />
    </div>
  </div>

  <Router-Link to="/enigmes"><IconRetour class="absolute left-10 top-10 w-14 cursor-pointer" /></Router-Link>

  <div class="mt-40 ml-10 h-14 w-44 rounded-xl border-2 border-bleu md:ml-32 md:mt-20 md:h-28 md:w-96">
    <h2 class="pt-2 text-center font-playfair text-3xl text-noir md:py-6 md:text-6xl">Énigme n°10</h2>
  </div>

  <p class="my-10 ml-10 font-lato text-sm md:ml-32">
    India Lima Tango Echo Sierra Uniform Foxtrot Foxtrot India Tango Delta Echo Charlie Romeo India Romeo Echo Oscar Tango Alpha November
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2">
    <div>
      <!-- Champ texte pour la validation -->
      <label for="mot" class="ml-10 font-lato text-sm text-bleu md:ml-32">Entrez le mot :</label>
      <input type="text" id="mot" v-model="mot" class="ml-4 rounded-md border-2 border-bleu" />
      <button @click="validermot" class="ml-10 cursor-pointer rounded-xl bg-bleu py-2 px-4 text-blanc md:ml-4">Valider</button>
    </div>
    <div class="ml-10 mt-10 grid md:mt-0">
      <label for="notes" class="font-lato text-sm">Zone pour prendre des notes :</label>
      <textarea id="notes" name="notes" class="mt-2 h-36 w-72 rounded-lg border border-noir font-lato text-lg md:w-96"></textarea>
    </div>
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
      mot: "", // Variable pour stocker la valeur du champ texte
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
    validermot() {
      // Définir le mot correct
      var motCorrect = "otan";

      // Vérifier si la valeur correspond au mot correct
      if (this.mot.toLowerCase() === motCorrect) {
        const userId = Cookies.get("userId"); // Récupérer l'ID de l'utilisateur depuis le cookie
        EnigmeService.setEnigmeResolue("enigme10", userId);
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Mot correct. Bravo! Vous avez résolu l'énigme.",
          confirmButtonColor: "#30485E",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Afficher une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "L'alphabet militaire de l'OTAN",
            html: "<div style=\"text-align: left;\">L'alphabet militaire de l'OTAN est un ensemble de mots distincts utilisés pour coder et décoder les messages. Il est utilisé par les forces armées de nombreux pays, ainsi que par les radioamateurs et d'autres professionnels qui doivent communiquer de manière claire et concise.</div>",
            confirmButtonColor: "#30485E",
            iconColor: "#30485E",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          }).then(() => {
            // Redirection vers '/fin' après la fermeture de la deuxième alerte
            this.$router.push("/fin");
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Mot incorrect! Veuillez réessayer pour entrer le mot correct.",
          confirmButtonColor: "#30485E",
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
