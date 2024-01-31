<template>
  <main class="grid h-[900px] bg-bleu">
    <Router-Link :to="{ name: 'Consignes', params: { utilisateurId: utilisateurId } }"
      ><IconRetour class="absolute left-10 top-10 cursor-pointer" :color="'white'"
    /></Router-Link>

    <div class="-mt-32 flex justify-center gap-10">
      <Router-Link :to="{ name: 'Enigme1', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">1</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme2', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">2</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme3', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">3</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme4', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">4</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme5', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">5</p>
          </div>
        </div></Router-Link
      >
    </div>
    <div class="-mt-52 flex justify-center gap-10">
      <Router-Link :to="{ name: 'Enigme6', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">6</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme7', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">7</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme8', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">8</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme9', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">9</p>
          </div>
        </div></Router-Link
      >
      <Router-Link :to="{ name: 'Enigme10', params: { utilisateurId: utilisateurId } }"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">10</p>
          </div>
        </div></Router-Link
      >
    </div>
  </main>
</template>

<script>
import IconBulle from "/src/components/icons/IconBulle.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";

export default {
  components: { IconRetour, IconBulle },
  created() {
    this.utilisateurId = this.$route.params.utilisateurId;
  },
};
</script>
