<template>
  <main class="grid h-[2000Px] bg-bleu md:h-[900px]">
    <!-- Affichez le compteur d'énigmes résolues -->
    <div class="mr-8 mt-4 text-right font-lato text-xl text-white">Énigmes résolues : {{ enigmesResoluesCount }}</div>
    <Router-Link :to="{ name: 'Consignes', params: { utilisateurId: utilisateurId } }"
      ><IconRetour class="absolute left-10 top-10 cursor-pointer" :color="'white'"
    /></Router-Link>

    <div class="md:-mt-80 md:flex md:justify-center md:gap-10">
      <Router-Link to="/enigme1"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme1')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme1')">1</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme2"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme2')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme2')">2</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme3"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme3')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme3')">3</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme4"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme4')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme4')">4</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme5"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme5')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme5')">5</p>
          </div>
        </div></Router-Link
      >
    </div>
    <div class="md:-mt-64 md:flex md:justify-center md:gap-10">
      <Router-Link to="/enigme6"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme6')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme6')">6</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme7"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme7')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme7')">7</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme8"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme8')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme8')">8</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme9"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme9')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme9')">9</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme10"
        ><div class="relative flex items-center justify-center">
          <IconBulle class="pt-10" :style="getEnigmeStyle('enigme10')" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc" :style="getEnigmeStyle('enigme10')">10</p>
          </div>
        </div></Router-Link
      >
    </div>
  </main>
</template>

<script>
import IconBulle from "/src/components/icons/IconBulle.vue";
import IconRetour from "/src/components/icons/IconRetour.vue";
import EnigmeService from "../EnigmeService.js";
import { ref } from "vue";
import { supabase } from "../supabase.config.js";
import Cookies from "js-cookie"; // importation du module js-cookie

export default {
  components: { IconRetour, IconBulle },
  data() {
    return {
      enigmeService: EnigmeService,
      enigmesResoluesCount: ref(0),
    };
  },
  created() {
    this.enigmeService = EnigmeService;
    this.fetchEnigmesResoluesCount();
  },
  methods: {
    getEnigmeStyle(enigme) {
      const isResolue = this.enigmeService.enigmesResolues[enigme];
      return {
        color: isResolue ? "#30485E" : "#D9D9D9",
        fill: isResolue ? "#D9D9D9" : "#30485E",
      };
    },
    async fetchEnigmesResoluesCount() {
      const userId = Cookies.get("userId");
      if (userId) {
        const { data, error } = await supabase.from("utilisateurs").select("enigmes_resolues_count").eq("id", userId);

        if (error) {
          console.error("Erreur lors de la récupération du compteur dans Supabase:", error.message);
        } else if (data.length > 0) {
          // Mettez à jour le compteur dans le composant
          this.enigmesResoluesCount = ref(data[0].enigmes_resolues_count);
        }
      }
    },
  },
};
</script>
