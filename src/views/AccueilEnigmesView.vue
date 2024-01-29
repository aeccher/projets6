<template>
  <main class="grid h-[900px] bg-bleu">
    <Router-Link to="/consignes"><IconRetour class="absolute left-10 top-10 cursor-pointer" :color="'white'" /></Router-Link>
    <div class="-mt-20 flex justify-center">
      <Router-Link to="/enigme1"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">1</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme2"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">2</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme3"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">3</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme4"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">4</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme5"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">5</p>
          </div>
        </div></Router-Link
      >
    </div>
    <div class="-mt-40 flex justify-center">
      <Router-Link to="/enigme6"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">6</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme7"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">7</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme8"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">8</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme9"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">9</p>
          </div>
        </div></Router-Link
      >
      <Router-Link to="/enigme10"
        ><div class="relative flex items-center justify-center">
          <img src="/src/assets/images/Bulle.webp" alt="Image d'une bulle de conversation" class="w-1/2 pt-10" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="mt-4 font-playfair text-5xl text-blanc">10</p>
          </div>
        </div></Router-Link
      >
    </div>
  </main>
</template>

<script>
import IconRetour from "/src/components/icons/IconRetour.vue";

export default {
  components: { IconRetour },
};
</script>
