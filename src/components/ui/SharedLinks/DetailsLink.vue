<template>
  <div class="flex flex-col justify-center w-[70%] items-center py-4 rounded-lg mx-auto mt-2 gap-4">
    <p class="font-bold text-2xl md:text-4xl text-[#04263A] animate-bounce">
      Bottles Saved: {{ bottlesSaved }} <i class="fa-solid fa-bottle-water"></i>
    </p>
    <p class="font-bold text-2xl md:text-4xl text-[#04263A] animate-bounce">
      Plastics Saved: {{ plasticsSaved }} <i class="fa-solid fa-sheet-plastic"></i>
    </p>
    <p class="font-bold text-2xl md:text-4xl text-[#04263A] animate-bounce">
      Carbon Saved: {{ carbonSaved }} <i class="fa-solid fa-seedling"></i>
    </p>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  name: 'DetailsLink',
  data() {
    return {
      bottlesSaved: 0,
      plasticsSaved: 0,
      carbonSaved: 0,
      loading: true,
      error: null,
    };
  },
  methods: {
    handleError(errorMessage) {
      this.$swal({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  },
  async created() {
    try {
      const docRef = doc(db, 'savings', this.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.bottlesSaved = data.bottlesSaved;
        this.plasticsSaved = data.plasticsSaved;
        this.carbonSaved = data.carbonSaved;
      } else {
        this.handleError('No data found for the given ID');
      }
    } catch (error) {
      this.handleError(error.message);
    } finally {
      this.loading = false;
    }
  }
};
</script>