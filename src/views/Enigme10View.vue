<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />
  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">L'alphabet militaire de l'OTAN</p>
      <img src="/src/assets/images/alphabet_otan.webp" alt="Image de l'alphabet militaire de l'OTAN" class="m-auto mt-5 w-1/2" />
    </div>
  </div>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-bleu">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°10</h2>
  </div>

  <p class="my-10 ml-32 font-lato text-sm">
    India Lima Tango Echo Sierra Uniform Foxtrot Foxtrot India Tango Delta Echo Charlie Romeo India Romeo Echo Oscar Tango Alpha November
  </p>

  <!-- Champ texte pour la validation -->
  <label for="mot" class="ml-32 font-lato text-sm text-bleu">Entrez le mot :</label>
  <input type="text" id="mot" v-model="mot" class="ml-4 rounded-md border-2 border-bleu" />
  <button @click="validermot" class="ml-4 cursor-pointer rounded-xl bg-bleu py-2 px-4 text-blanc">Valider</button>
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2

export default {
  components: { IconIndice },
  data() {
    return {
      isPopupOpen: false,
      mot: "", // Variable pour stocker la valeur du champ texte
    };
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
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Mot correct. Bravo! Vous avez résolu l'énigme.",
          confirmButtonColor: "#3e9399",
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
            confirmButtonColor: "#3e9399",
            iconColor: "#3e9399",
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
          confirmButtonColor: "#3e9399",
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
