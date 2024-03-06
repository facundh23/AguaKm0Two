<template>
    <div class="flex flex-col justify-center w-[70%]  items-center py-4 rounded-lg mx-auto mt-2 gap-4 " >
      <p class="font-bold text-2xl md:text-4xl  text-[#04263A] animate-bounce animate-once animate-duration-100 animate-delay-100 animate-ease-in animate-normal animate-fill-forwards">Bottles Saved: {{ bottlesSaved }} <i class="fa-solid fa-bottle-water"></i></p>
      <p class="font-bold text-2xl md:text-4xl text-[#04263A] animate-bounce animate-once animate-duration-100 animate-delay-100 animate-ease-in animate-normal animate-fill-forwards">Plastics Saved: {{ plasticsSaved }} <i class="fa-solid fa-sheet-plastic"></i></p>
      <p class="font-bold text-2xl md:text-4xl text-[#04263A] animate-bounce animate-once animate-duration-100 animate-delay-100 animate-ease-in animate-normal animate-fill-forwards">Carbon Saved: {{ carbonSaved }}  <i class="fa-solid fa-seedling"></i> </p>   
  </div>
  </template>
  
  <script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';

  export default {
    name:'SharedLink',
    methods: {
        handleError(errorMessage){
            this.$swal({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Close'
          });
      }
    },
    data() {
    return {
      bottlesSaved: 0,
      plasticsSaved: 0,
      carbonSaved: 0, 
      loading:true,
      error: null,
    };
  },
  async created() {
    /**
     * This lifecycle is executed after the Vue instance has been created.
     *  Here, values are assigned to bottlesSaved, plasticsSaved, and carbonSaved based on the URL parameters (accessed through this.$route.query).
     */
    try {
      const docRef = doc(db,'savings', this.$route.params.id);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()){
        const data = docSnap.data();
        const {bottlesSaved, plasticsSaved, carbonSaved} = data;
        this.bottlesSaved = bottlesSaved;
        this.plasticsSaved = plasticsSaved;
        this.carbonSaved = carbonSaved;
      } else {
        this.handleError(this.error)
      }

    } catch (error) {
        this.handleError(this.error)
    } finally {
      this.loading = false;
    }

  }
  };
  </script>