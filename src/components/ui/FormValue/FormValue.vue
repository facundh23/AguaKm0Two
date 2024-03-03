<template>
  <div class="w-[80%] flex items-center justify-center gap-4 p-6 flex-col border-4 border-[#04263A] rounded-lg shadow-2xl shadow-black">
    <input class="w-[80%] p-4  rounded-lg md:w-[80%] text-center font-bold border-2" v-model="refills" placeholder="Please indicate the number of bottles you refilled"/>
    <div class="flex items-center justify-center w-full  gap-2 md:flex-row">
      <button class="bg-[#C7A0CE] p-2 rounded-lg font-bold w-[80%] md:w-[80%] text-[#04263A] shadow-lg shadow-black" @click="calculateSavings"> Calculate</button>
    </div>
    <div class="flex gap-4 flex-col w-[80%]">
      <div class=" p-4 bg-[#04263A] text-[#26D07C] border-4 border-[#04263A] rounded-lg flex flex-col justify-center items-center font-bold ">
        <h3 class="bold">Results</h3>
        <div class="flex items-center w-[100%] justify-center gap-2 ">
          <p>Bottles</p>
          <i class="fa-solid fa-arrow-right"></i>
          <p>{{ animatedBottles }}</p>
        </div>
        <div class="flex items-center w-[100%] justify-center gap-2 ">
          <p>Kg Plastic</p>
          <i class="fa-solid fa-arrow-right"></i>
          <p>{{ animatedPlastics }}</p>
        </div>
        <div class="flex items-center w-[100%] justify-center gap-2">
          <p>Kg Carbon</p>
          <i class="fa-solid fa-arrow-right"></i>
          <p>{{ animatedCarbon }}</p>
        </div>
      </div>
      
    </div>
    <div class="flex items-center justify-center gap-4 flex-col w-full">
      <!-- Botón para generar el enlace -->
      <button class="bg-[#26D07C] p-2 rounded-lg font-bold shadow-black hover:cursor-pointer w-[79%] shadow-lg md:w-[80%] text-[#04263A]" v-if="!linkGenerated" @click="generateLink">
        Generate Link
      </button>
      
      <!-- Botón para copiar el enlace -->
      <button class="bg-[#26D07C] p-2 w-[80%] rounded-lg font-bold text-[#04263A] shadow-lg shadow-black" v-else @click="copyLink">
        Copy Link
      </button>
      <div v-if="linkGenerated"
        class="btn-save p-2 w-[80%] rounded-lg font-bold flex flex-col items-center justify-around gap-2">
        <label class="text-2xl text-[#04263A]">Impact link:</label>
        <input class=" bg-[#26D07C]p-2 rounded-lg w-[79%] text-black text-center bg-[#26D07C] p-2 w-full" ref="enlaceInput" type="text" v-model="link"
          readonly>
      </div>
      <button class="bg-[#26D07C] w-[79%] p-2 rounded-lg font-bold  md:w-[80%]  shadow-lg shadow-black text-[#04263A]" @click="saveResults">Save</button>
      <!-- División para mostrar el enlace generado -->
    </div>

  </div>
</template>
  
<script>


import { db, collection, addDoc } from '../../../services/firebase';
import CountUp from 'vue-countup-v3'
export default {
  components: {
    CountUp,
  },
  name: 'InputValue',

  data() {

    return {
      reloads: 0,
      resultCalculated: false,
      bottlesSaved: 0,
      plasticsSaved: 0,
      carbonSaved: 0,
      animatedBottles:0,
      animatedPlastics:0,
      animatedCarbon:0,
      linkGenerated: false,
      link: ''
    };
  },
  methods: {
    animateValue(ref, start, end, duration, decimalPlaces = 2) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this[ref] = (progress * (end - start) + start).toFixed(decimalPlaces);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  
  },
    calculateSavings() {
      // Assuming 2 bottles per refill
      const refills = parseFloat(this.refills);
      if (!isNaN(refills)) {
        const calculatedBottles = refills * 2;
        const calculatedPlastics = (calculatedBottles * 0.012).toFixed(2);
        const calculatedCarbon = (calculatedBottles * 0.08).toFixed(2);


        this.animateValue('animatedBottles', 0 , calculatedBottles, 8000 );
        this.animateValue('animatedPlastics', 0 , calculatedPlastics, 8000 );
        this.animateValue('animatedCarbon', 0 , calculatedCarbon, 8000 );
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
          bottlesSaved: this.animatedBottles,
          plasticsSaved: parseFloat(this.animatedPlastics),
          carbonSaved: parseFloat(this.animatedCarbon),
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
          bottlesSaved: this.animatedBottles,
          plasticsSaved: this.animatedPlastics,
          carbonSaved: this.animatedCarbon
        });
        this.link = `${baseUrl}?${queryParams.toString()}`;
        this.linkGenerated = true;

        // Navegar a la página de detalles
        this.$router.push({name:SharedLink, query:queryParams})
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
  },
  mounted(){
    this.animateValue('an')
  }
};


</script>

