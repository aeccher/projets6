<template>
  <div>
    <div class="m-auto mt-10 h-[600px] w-11/12 border-2 border-orange">
      <h2 class="px-8 pt-40 text-center font-playfair text-6xl text-noir">Connexion</h2>

      <form @submit.prevent="submitForm" class="mt-20 grid items-center justify-center gap-4 sm:flex">
        <label class="font-lato text-sm text-noir" for="pseudo">Entrez un pseudo :</label>
        <input v-model="pseudo" type="text" id="pseudo" required class="rounded-lg border border-orange p-2" />
        <button type="submit" class="rounded-lg bg-orange p-2 font-lato text-sm text-blanc">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2"; // Utilisation de SweetAlert2
import Cookies from "js-cookie"; // importation du module js-cookie

const supabaseUrl = "https://nhgheoiccbmykckowsom.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZ2hlb2ljY2JteWtja293c29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NjUzOTMsImV4cCI6MjAyMjA0MTM5M30.IIxxIONUubJSeQo4U_V9AK1vmTBJZK-6vVg3eGJ-5ek";

const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  data() {
    return {
      pseudo: "", // Pour stocker la valeur du pseudo saisi par l'utilisateur
    };
  },
  methods: {
    async submitForm() {
      try {
        const { data, error } = await supabase
          .from("utilisateurs")
          .upsert([{ pseudo: this.pseudo }], { onConflict: ["pseudo"] })
          .select("*");

        //console.log("Réponse de Supabase:", data, error); // Ajoutez cette ligne pour inspecter la réponse

        if (error) {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de l'enregistrement du pseudo. Veuillez réessayer...",
            confirmButtonColor: "#E47E52",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Félicitations!",
            text: "Pseudo enregistré avec succès",
            confirmButtonColor: "#E47E52",
            customClass: {
              title: "swal-title-custom-class", // Classe pour personnaliser le style du titre
              content: "swal-content-custom-class", // Classe pour personnaliser le style du contenu/texte
            },
          }).then(() => {
            if (data && Array.isArray(data) && data.length > 0 && data[0].id) {
              const userId = data[0].id; // Récupérer l'ID de l'utilisateur depuis la réponse de Supabase
              //console.log(userId);
              Cookies.set("userId", userId); // Enregistrez l'ID de l'utilisateur dans un cookie
              this.$router.push("/consignes"); // Redirection vers '/consignes'
            }
          });
        }
      } catch (error) {
        console.error("Erreur inattendue :", error.message);
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
