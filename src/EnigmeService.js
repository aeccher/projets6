export default {
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
  
    setEnigmeResolue(enigme) {
      this.enigmesResolues[enigme] = true;
      localStorage.setItem('enigmesResolues', JSON.stringify(this.enigmesResolues));
    },
  
  };