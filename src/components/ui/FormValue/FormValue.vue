
 <!-- InputValue component
 
 This component allows users to input the number of bottle refills,
 calculate and display the savings in bottles, plastic and carbon, and generate a link with this data for sharing.
 with this data for sharing. It also allows to save the results in Firebase. -->
 
<template>
  <div class="">
    <!-- Button to calculate savings based on the number of refills-->
    
    <div class="flex flex-col md:flex-col items-center justify-center w-full p-4 gap-2 md:h-[30vh] ">
      <input class="w-[100%] p-4 text-sm md:text-base rounded-lg md:w-[50%] text-center font-bold border-2" id="calculate" v-model="numberOfRefills" />
      <button class=" bg-[#26D07C] p-2 rounded-lg font-bold w-[100%] md:w-[40%] text-[#04263A] md:text-2xl shadow-lg shadow-black" @click="calculateSavings"> Calculate</button>
    </div>
    <div class="grid grid-cols-1 gap-2 justify-center items-center sm:grid-cols-3 md:grid md:grid-cols-3 md:gap-4 p-2">
        <div class="h-30 flex  items-center flex-col w-[100%] justify-center gap-2 text-[#26D07C] bg-[#04263A] md:text-3xl md:h-72 rounded-lg">
          <p>Bottles</p>
          <i class="fa-solid fa-arrow-down"></i>
          <p>{{ animatedBottles }}</p>
        </div>

        <div class=" h-30 flex items-center flex-col w-[100%] justify-center gap-2 text-[#26D07C] bg-[#04263A] md:text-3xl md:h-72 rounded-lg">
          <p>Kg Plastic</p>
          <i class="fa-solid fa-arrow-down"></i>
          <p>{{ animatedPlastics }}</p>
        </div>

        <div class="h-30 flex items-center flex-col  justify-center gap-2 text-[#26D07C] bg-[#04263A] md:text-3xl md:h-72 rounded-lg">
          <p>Kg Carbon</p>
          <i class="fa-solid fa-arrow-down"></i>
          <p>{{ animatedCarbon }}</p>
        </div>
      </div>
      
      <div class="flex items-center justify-center gap-4 flex-col w-full">
        <!-- Botón para generar el enlace -->
        <button class="bg-[#C7A0CE] p-2 rounded-lg font-bold shadow-black hover:cursor-pointer w-[100%] shadow-lg md:w-[40%] text-[#04263A] md:text-2xl" v-if="!linkGenerated" @click="generateLink">
          Share Link 
        </button>
        
      </div>
    </div>

 
</template>
  
<script>
  import { format } from 'date-fns';
  import { db, collection, addDoc } from '../../../services/firebase';

  export default {

    name: 'InputValue',
    data() {
      return {
        numberOfRefills: 0, // Number of recharges made by the user
        resultCalculated: false, // Boolean to check if the bottle refill calculation was performed.
        bottlesSaved: 0, // Stores number of saved bottles
        plasticsSaved: 0, // Stores weight of plastic saved (in kg)
        carbonSaved: 0, // Number of KG of carbon saved
        animatedBottles:0, // Stores the animated number of saved bottles
        animatedPlastics:0, // Stores the animated weight of plastic saved (in kg)
        animatedCarbon:0, // Stores the animated weight of carbon saved (in kg)
        linkGenerated: false, // Flag to indicate if a link has been generated
        link: '', // Stores the generated link to share the results
        KG_PLASTIC_PER_BOTTLE: 0.012, // Constant representing the weight of plastic saved per bottle (in kg)
        KG_CARBON_PER_BOTTLE: 0.08, // Constant representing the weight of carbon saved per bottle (in kg)
      };
    },
      watch: {
        /**
          * Notes changes to numberOfRefills and saves them to localStorage.
          * @param {number} newVal - The new value of numberOfRefills.
        */
        numberOfRefills(newVal){
          localStorage.setItem('numberOfRefills', JSON.stringify(newVal))
        }
      },
      mounted(){
        // Retrieves the number of saved reloads from localStorage when starting the component.
        const savedRefills = localStorage.getItem('numberOfRefills');
        if(savedRefills !== null){
          this.numberOfRefills = JSON.parse(savedRefills)
        }
      },

    methods: {
      animateValue(ref, start, end, duration, decimalPlaces = 2) {
        /**
          * Animates the numeric value of a property from an initial value to a final value.
          * @param {string} ref - The data property to animate.
          * @param {number} start - Initial value of the animation.
          * @param {number} end - The end value of the animation.
          * @param {number} duration - Animation duration in milliseconds.
          * @param {number} [decimalPlaces=2] - Number of decimal places to display.
        */
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

      resetValues(){

        this.numberOfRefills = 0;
        this.animatedBottles = 0;
        this.animatedPlastics = 0;
        this.animatedCarbon = 0;
        this.resultCalculated = false;
        this.linkGenerated = false;
        this.link = '';

        localStorage.removeItem("numberOfRefills")
      },
    
      calculateSavings() {
        // Assuming 2 bottles per refill
        const numberOfRefills = parseFloat(this.numberOfRefills);
        if (!isNaN(numberOfRefills && numberOfRefills > 0)) {
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
          const currentDate = new Date();
          const formatedDate = format(currentDate, 'dd/MM/yyyy')
          addDoc(collection(db, "savings"), {
            bottlesSaved: this.animatedBottles,
            plasticsSaved: parseFloat(this.animatedPlastics),
            carbonSaved: parseFloat(this.animatedCarbon),
            createdAt: formatedDate
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
            this.resetValues()
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
            this.resetValues()
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

