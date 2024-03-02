<template>
    <div class="flex flex-col items-center justify-center py-2">
    <h1 class="text-3xl font-extrabold text-white mb-4">Shared Page</h1>

    <p class="font-bold text-2xl text-white">Bottles Saved: {{ bottlesSaved }} <i class="fa-solid fa-bottle-water"></i></p>
    <p class="font-bold text-2xl text-white">Plastics Saved: {{ plasticsSaved }} <i class="fa-solid fa-sheet-plastic"></i></p>
    <p class="font-bold text-2xl text-white">Carbon Saved: {{ carbonSaved }}  <i class="fa-solid fa-seedling"></i> </p> 
  </div>
  </template>
  
  <script>
  export default {
    name:'SharedLink',
    data() {
    return {
      bottlesSaved: 0,
      plasticsSaved: 0,
      carbonSaved: 0
    };
  },
  created() {
    this.bottlesSaved = this.$route.query.bottlesSaved;
    this.plasticsSaved = this.$route.query.plasticsSaved;
    this.carbonSaved = this.$route.query.carbonSaved;
  }
  };
  </script>