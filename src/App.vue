<template>
  <header></header>

  <RouterView />
</template>

<script>
export default {
  created() {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) {
      this.$router.push(lastVisitedPage);
    }
  },
};
</script>
