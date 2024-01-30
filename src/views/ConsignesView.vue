<template>
  <main class="">
    <div class="m-auto mt-10 w-11/12 border-2 border-jaune">
      <h2 class="px-8 pt-10 font-playfair text-6xl text-noir">Explication et consignes pour vous aider à résoudre les énigmes</h2>
      <p class="px-8 pt-10 font-lato text-sm">
        Depuis des milliers d’années, les hommes utilisent des codes et des alphabets spéciaux pour communiquer entre eux. Bien que ces
        codes soient tous différents, ils visent tous à améliorer la communication entre les êtres humains.
      </p>
      <p class="px-8 pt-2 font-lato text-sm">
        Ce jeu vous permettra de faire connaissance avec certains codes différents. En effet, en jouant à ce jeu votre mission va consister
        à résoudre des énigmes en décryptant des textes codés, trouver un code secret, associer des mots à leur langue ...
      </p>
      <p class="px-8 pt-2 font-lato text-sm">Dans chaque énigme, vous trouverez un indice qui vous aidera à la résoudre.</p>
      <div class="flex">
        <p class="px-8 pt-2 font-lato text-sm">Pour obtenir un indice il faudra cliquer sur :</p>
        <IconIndice class="pt-2" />
      </div>
      <div class="flex">
        <p class="px-8 pt-4 font-lato text-sm">Pour revenir à la page qui donne accès à toute les énigmes, il faudra cliquer sur :</p>
        <IconRetour />
      </div>
      <p class="px-8 pt-4 font-lato text-sm">N'hésitez pas à utliser les zones pour écrire si besoin.</p>
      <Router-Link to="/enigmes">
        <button
          class="font-Lato m-auto mb-10 mt-20 flex h-10 items-center justify-center rounded-lg bg-jaune px-20 text-noir hover:bg-opacity-75"
        >
          Jouer
        </button></Router-Link
      >
    </div>
  </main>
</template>

<script>
import IconIndice from "/src/components/icons/IconIndice.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";

export default {
  components: { IconIndice, IconRetour },
};
</script>
