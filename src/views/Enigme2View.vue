<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />
  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="text-center font-playfair text-xl text-noir">L’alphabet de l’écriture braille</p>
      <img src="/src/assets/images/braille.webp" alt="Image de l'alphabet braille" class="m-auto mt-5 w-1/2" />
    </div>
  </div>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-bleu">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°2</h2>
  </div>

  <div class="grid grid-cols-2">
    <ul class="mt-10 ml-32 font-lato text-sm">
      <li class="flex items-center">Il te faut ici déchiffrer ce mot <span class="text-7xl">⠧⠕⠊⠗</span></li>
      <li class="mt-5">
        Une fois le mot trouvé, il te suffit de reporter l’addition si besoin du numéro de chaque lettre dans l’ordre alphabétique pour
        trouver le code secret à entrer.
      </li>
      <li class="mt-2"><span class="underline underline-offset-2">Exemple</span>: M est la 13ème lettre de l’alphabet donc 1+3 = 4</li>
    </ul>
    <div class="m-auto">
      <div id="affichage" class="mb-4 h-12 w-96 border border-gris p-2 text-2xl"></div>
      <div class="grid w-96 grid-cols-3 gap-2">
        <button v-for="chiffre in chiffres" :key="chiffre" @click="ajouterChiffre(chiffre)" class="border border-gris p-2 text-xl">
          {{ chiffre }}
        </button>
        <button @click="resetCombinaison" class="border border-gris p-2 text-xl">Reset</button>
        <button @click="effacerDernierNumero" class="border border-gris p-2 text-xl">Effacer</button>
      </div>
    </div>
  </div>

  <!-- Affiche le bouton si le code est correct -->
  <Router-Link to="/enigme3">
    <button v-if="codeCorrect" class="font-Lato m-auto mt-20 flex h-10 items-center justify-center rounded-lg bg-bleu px-20 text-blanc">
      Énigme suivante
    </button></Router-Link
  >
</template>
<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2

export default {
  components: { IconIndice },
  data() {
    return {
      isPopupOpen: false,
      combinaisonAttendue: "4699",
      combinaisonActuelle: "",
      chiffres: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      codeCorrect: false, // Variable pour suivre l'état de la validation
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    ajouterChiffre(chiffre) {
      this.combinaisonActuelle += chiffre.toString();
      this.afficherCombinaison();

      if (this.combinaisonActuelle.length === this.combinaisonAttendue.length) {
        setTimeout(this.verifierCombinaison, 100);
      }
    },
    afficherCombinaison() {
      document.getElementById("affichage").innerText = this.combinaisonActuelle;
    },
    resetCombinaison() {
      this.combinaisonActuelle = "";
      this.afficherCombinaison();
    },
    effacerDernierNumero() {
      this.combinaisonActuelle = this.combinaisonActuelle.slice(0, -1);
      this.afficherCombinaison();
    },
    verifierCombinaison() {
      if (this.combinaisonActuelle === this.combinaisonAttendue) {
        this.codeCorrect = true; // Met à jour l'état de la validation
        Swal.fire({
          icon: "success",
          title: "Félicitations!",
          text: "Combinaison correcte !",
          confirmButtonColor: "#30485E",
          customClass: {
            title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
            content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
          },
        }).then(() => {
          // Affiche une deuxième alerte après la fermeture de la première
          Swal.fire({
            icon: "info",
            title: "L’écriture braille",
            html: '<div style="text-align: left;">Les non-voyants lisent à l’aide de l’écriture braille. Les lettres et les chiffres sont représentés par des points en relief. En effet, ne pouvant lire avec les yeux, les aveugles lisent du bout des doigts les lettres en relief.</div>',
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
          text: "Combinaison incorrecte. Réessayez.",
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
    },
    reinitialiserCoffreFort() {
      this.combinaisonActuelle = "";
      this.afficherCombinaison();
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
