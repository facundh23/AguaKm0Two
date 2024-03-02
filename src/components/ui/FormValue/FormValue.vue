<template>
  <div class="w-[80%] flex items-center justify-center gap-2 py-2 flex-col ">
    <input class="w-[80%] p-4  rounded-lg md:w-[80%] text-center font-bold" v-model="refills" placeholder="Number of water refills"/>
    <div class="flex items-center justify-center w-full  gap-2 md:flex-row">
      <button class="bg-stone-500 p-2 rounded-lg font-bold w-[80%] md:w-[80%] hover:bg-stone-700 hover:scale-105 hover:transition-all hover:duration-700" @click="calculateSavings">Calculate</button>
    </div>
    <div class="flex gap-4 flex-col w-[80%]">
      <div class=" p-4   bg-green-300 border-4 border-white rounded-lg flex flex-col justify-center items-center font-bold">
        <div class="flex items-center w-[100%] justify-center gap-2">
          <p>Bottles</p>
          <i class="fa-solid fa-arrow-right"></i>
          <p>{{ parseFloat(bottlesSaved) }}</p>
        </div>
        <div class="flex items-center w-[100%] justify-center gap-2">
          <p>Kg Plastic</p>
          <i class="fa-solid fa-arrow-right"></i><p>{{ parseFloat(plasticsSaved) }}</p>
        </div>
        <div class="flex items-center w-[100%] justify-center gap-2">
          <p>Kg Carbon</p>
          <i class="fa-solid fa-arrow-right"></i><p>{{ parseFloat(carbonSaved) }}</p>
        </div>
      </div>
      
    </div>
    <div class="flex items-center justify-center gap-4 flex-col w-full">
      <!-- Botón para generar el enlace -->
      <button class="bg-lime-600 p-2 rounded-lg font-bold shadow-black shadow-2xl hover:cursor-pointer w-[79%] hover:bg-lime-700 hover:scale-105 hover:transition-all hover:duration-700 md:w-[80%]" v-if="!linkGenerated" @click="generateLink">
        Generate Link
      </button>
      
      <!-- Botón para copiar el enlace -->
      <button class="bg-yellow-600 p-2 w-[80%] rounded-lg font-bold" v-else @click="copyLink">
        Copy Link
      </button>
      <div v-if="linkGenerated"
        class="bg-lime-600 p-2 w-[80%] rounded-lg font-bold flex flex-col items-center justify-around gap-2">
        <label class="text-2xl">Impact link:</label>
        <input class="p-2 rounded-lg w-[79%] text-black text-center" ref="enlaceInput" type="text" v-model="link"
          readonly>
      </div>
      <button class="bg-lime-600 w-[79%] p-2 rounded-lg font-bold  md:w-[80%] hover:bg-lime-700 hover:scale-105 hover:transition-all hover:duration-700" @click="saveResults">Save</button>
      <!-- División para mostrar el enlace generado -->
    </div>

  </div>
</template>
  
<script>


import { db, collection, addDoc } from '../../../services/firebase';

export default {

  name: 'InputValue',

  data() {
    return {
      reloads: 0,
      resultCalculated: false,
      bottlesSaved: 0,
      plasticsSaved: 0,
      carbonSaved: 0,
      linkGenerated: false,
      link: ''
    };
  },



  methods: {
    calculateSavings() {

      // Assuming 2 bottles per refill
      const refills = parseFloat(this.refills);
      if (!isNaN(refills)) {

        this.bottlesSaved = this.refills * 2;

        // Approximating 0.012 kg of plastic per bottle
        this.plasticsSaved = (this.bottlesSaved * 0.012).toFixed(2);

        // Approximation of 0.08 kg of CO2 per bottle
        this.carbonSaved = (this.bottlesSaved * 0.08).toFixed(2);
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Error, complete the fields',
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }

      this.resultCalculated = true;

    },
    saveResults() {
      if (this.resultCalculated) {
        addDoc(collection(db, "savings"), {
          bottlesSaved: this.bottlesSaved,
          plasticsSaved: parseFloat(this.plasticsSaved),
          carbonSaved: parseFloat(this.carbonSaved),
        })
          .then(docRef => {
            this.refills = 0;
            this.$swal({
              title: 'OK!',
              text: `Results saved in Firebase with ID:, ${docRef.id}`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
          })
          .catch(error => {
            this.$swal({
              title: 'Error!',
              text: `Error saving results to Firebase:, ${error}`,
              icon: 'error',
              confirmButtonText: 'Close'
            })

          });
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Error, complete the fields',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
      }

    },
    generateLink() {
      if (this.resultCalculated) {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL; // Cambia esto por tu URL de producción
        const queryParams = new URLSearchParams({
          bottlesSaved: this.bottlesSaved,
          plasticsSaved: this.plasticsSaved,
          carbonSaved: this.carbonSaved
        });
        let fullLink = `${baseUrl}?${queryParams.toString()}`;
     if (fullLink.length > 25) {
      this.link = fullLink.substring(0, 25) + '...';
      } else {
      this.link = fullLink;
      }
     this.linkGenerated = true;

      // Navegar a la página de detalles
      this.$router.push({name: 'SharedLink', query: queryParams})
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Error, complete the fields',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
      }
    },

    copyLink() {
      if (this.linkGenerated) {
        const input = document.createElement('input');
        input.setAttribute('value', this.link);
        document.body.appendChild(input);
        input.select();
        navigator.clipboard.writeText(this.link)
          .then(() => {
            this.$swal({
              title: 'OK!',
              text: 'Link copied to clipboard.',
              icon: 'success',
              confirmButtonText: 'Cool'
            })

          })
          .catch(err => {
            // Manejar el error
            console.error('Error copying link: ', err);
          });
        document.body.removeChild(input);
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Error, complete the fields.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
      }
    }

  }
};


</script>

<style>

  .btn-generator:hover{
    cursor: pointer;
  }

</style>