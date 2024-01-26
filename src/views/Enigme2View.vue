<template>
  <IconIndice @click="openPopup" class="absolute top-10 right-10 cursor-pointer" />
  <!-- Fenêtre pop-up -->
  <div v-if="isPopupOpen" class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-noir bg-opacity-50">
    <div class="relative rounded-xl bg-blanc p-8">
      <span @click="closePopup" class="absolute top-4 right-4 cursor-pointer">&times;</span>
      <!-- Contenu de la fenêtre pop-up -->
      <p class="font-playfair text-xl text-noir">Dactolygraphie de la Langue des signes française (LSF)</p>
      <img
        src="/src/assets/images/indice_lsf.webp"
        alt="Image de la dactolygraphie de la Langue des signes française"
        class="m-auto mt-5"
      />
    </div>
  </div>

  <div class="ml-32 mt-20 h-28 w-96 rounded-xl border-2 border-vert">
    <h2 class="py-6 text-center font-playfair text-6xl text-noir">Énigme n°2</h2>
  </div>

  <p class="mt-10 ml-32 font-lato text-sm">
    Il faut trouver le mot suivant, écrit en utilisant la dactolygraphie de la Langue des signes française (LSF) :
  </p>
  <img
    src="/src/assets/images/mot_lsf.webp"
    alt="Image d'un mot écrit en dactolygraphie de la Langue des signes française"
    class="m-auto mt-5 mb-20 w-1/4"
  />
</template>
<script>
import IconIndice from "/src/components/icons/IconIndice.vue";

export default {
  components: { IconIndice },
  data() {
    return {
      isPopupOpen: false,
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
  },
};
</script>
