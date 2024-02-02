import {supabase} from './supabase.config.js'
import Cookies from "js-cookie"; // importation du module js-cookie

const ENIGMES_COUNT = 10; // Nombre total d'énigmes
const userId = Cookies.get("userId");

const initializeEnigmesResolues = () => {
  const enigmesResolues = JSON.parse(localStorage.getItem('enigmesResolues')) || {};
  for (let i = 1; i <= ENIGMES_COUNT; i++) {
    const enigmeKey = `enigme${i}`;
    if (!(enigmeKey in enigmesResolues)) {
      enigmesResolues[enigmeKey] = false;
    }
  }
  return enigmesResolues;
};

export default {
  enigmesResolues: initializeEnigmesResolues(),
    enigmesResolues: JSON.parse(localStorage.getItem('enigmesResolues')) || {
      enigme1: false,
      enigme2: false,
      enigme2: false,
      enigme4: false,
      enigme5: false,
      enigme6: false,
      enigme7: false,
      enigme8: false,
      enigme9: false,
      enigme10: false,
    },
    
  async setEnigmeResolue(enigme, utilisateurId) {
    try {
      // Vérifiez si l'énigme a déjà été résolue localement
      if (!this.enigmesResolues[enigme]) {
        // Récupérez la valeur actuelle du compteur d'énigmes résolues
        const { data: userData, error: userError } = await supabase
          .from('utilisateurs')
          .select('enigmes_resolues_count')
          .eq('id', userId);

        if (userError) {
          console.error('Erreur lors de la récupération du compteur d\'énigmes résolues', userError.message);
          return { error: userError };
        }

        // Incrémentez le compteur localement
        const newCount = userData[0].enigmes_resolues_count + 1;

        // Mettez à jour le compteur d'énigmes résolues dans la base de données Supabase
        const { data, error } = await supabase
          .from('utilisateurs')
          .update({ enigmes_resolues_count: newCount })
          .eq('id', userId);

        if (error) {
          console.error('Erreur lors de la mise à jour du compteur d\'énigmes résolues', error.message);
        } else {
          // Mettez à jour localement les énigmes résolues
          this.enigmesResolues[enigme] = true;
          localStorage.setItem('enigmesResolues', JSON.stringify(this.enigmesResolues));
        }

        return { data, error };
      } else {
        // L'énigme a déjà été résolue, retournez simplement le succès
        return { data: null, error: null };
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compteur d\'énigmes résolues', error.message);
      return { error };
    }
  },
  
  };