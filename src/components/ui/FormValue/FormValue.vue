<template>
  <div class="w-[80%] flex items-center justify-center gap-4 p-6 flex-col border-4 border-[#04263A] rounded-lg shadow-2xl shadow-black">
    <input class="w-[80%] p-4  rounded-lg md:w-[80%] text-center font-bold border-2" v-model="numberOfRefills" placeholder="Please indicate the number of bottles you refilled"/>
    <div class="flex items-center justify-center w-full  gap-2 md:flex-row">
      <button class=" bg-[#26D07C] p-2 rounded-lg font-bold w-[80%] md:w-[80%] text-[#04263A] shadow-lg shadow-black" @click="calculateSavings"> Calculate</button>
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
      <button class="bg-[#C7A0CE] p-2 rounded-lg font-bold shadow-black hover:cursor-pointer w-[79%] shadow-lg md:w-[80%] text-[#04263A]" v-if="!linkGenerated" @click="generateLink">
        Generate Link
      </button>
      
      <!-- Botón para copiar el enlace -->
      <button class="bg-[#C7A0CE] p-2 w-[80%] rounded-lg font-bold text-[#04263A] shadow-lg shadow-black" v-else @click="copyLink">
        Copy Link
      </button>
      <div v-if="linkGenerated"
        class="btn-save p-2 w-[80%] rounded-lg font-bold flex flex-col items-center justify-around gap-2">
        <label class="text-2xl text-[#04263A]">Impact link:</label>
        <input class=" bg-[#26D07C] p-2 rounded-lg  text-black text-center w-full" ref="enlaceInput" type="text" v-model="link"
          readonly>
      </div>
      <button class="bg-[#C7A0CE] w-[79%] p-2 rounded-lg font-bold  md:w-[80%]  shadow-lg shadow-black text-[#04263A]" @click="saveResults">Save</button>
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
        resultCalculated: false,
        bottlesSaved: 0,
        plasticsSaved: 0,
        carbonSaved: 0,
        animatedBottles:0,
        animatedPlastics:0,
        animatedCarbon:0,
        linkGenerated: false,
        link: '',
        KG_PLASTIC_PER_BOTTLE: 0.012,
        KG_CARBON_PER_BOTTLE: 0.08
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

      handleError(errorMessage){
        this.$swal({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Close'
    });
      },
      calculateSavings() {
        // Assuming 2 bottles per refill
        const numberOfRefills = parseFloat(this.numberOfRefills);
        if (!isNaN(numberOfRefills)) {
          const calculatedBottles = numberOfRefills * 2;
          const calculatedPlastics = (calculatedBottles * this.KG_PLASTIC_PER_BOTTLE).toFixed(2);
          const calculatedCarbon = (calculatedBottles * this.  KG_CARBON_PER_BOTTLE).toFixed(2);


          this.animateValue('animatedBottles', 0 , calculatedBottles, 1000 );
          this.animateValue('animatedPlastics', 0 , calculatedPlastics, 1000 );
          this.animateValue('animatedCarbon', 0 , calculatedCarbon, 1000 );
        } else {
          this.handleError('Calculated values must be greater than zero')
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
              this.handleError(`Error saving results to Firebase:, ${error}`);

            });
        } else {
          this.handleError('Error, complete the fields');
        }

      },
      generateLink() {
        if (this.resultCalculated) {
          const baseUrl = import.meta.env.VITE_APP_BASE_URL; 
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
          this.handleError('Error, complete the fields')
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
              this.handleError('Error copying link: ', err)
            });
          document.body.removeChild(input);
        } else {
          this.handleError('Error, complete the fields.')
        }
      }
    },
  };
</script>

