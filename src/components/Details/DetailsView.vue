<template>
    <div class="flex flex-col items-center justify-center bg-[#E6FBED] ">
    
        <ul  class="flex items-center flex-col justify-center w-[100%] gap-4 p-2">
            <li  class="w-[100%] flex justify-center gap-4" v-for="link in savedLinks" :key="'link.id'">
                <a 
                    class="text-[#04263A] bg-[#26D07C] w-[100%] md:w-[70%] text-center p-2 rounded-lg" 
                    :href="`${baseUrl}/saved/${link.id}`" 
                    target="_blank">
                    <span class="hover:cursor-pointer font-bold ml-2">{{ `${baseUrl}/saved/${link.id}` }} -   {{ link.createdAt }}</span>
                </a>
                    
               
            </li>
        </ul>
    </div>
</template>
  
<script>
import { db } from '../../services/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';


export default {
    name: 'DetailsView',
    computed: {
        baseUrl() {
            return import.meta.env.VITE_APP_BASE_URL;
        }
    },
  
    methods: {
        handleError(errorMessage){
            this.$swal({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Close'
          });
          },
          async fetchSavedLinks(){
              try {
                  const savingsCollections = collection(db, 'savings');
                  const q = query(savingsCollections, orderBy('createdAt'))
                  const querySnapshot = await getDocs(q);
                  this.savedLinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              } catch (error) {
                  this.handleError('Error getting documents', error)
              } finally {
                this.isLoading = false
              }
          },
          getFullLink(linkId){
            const baseUrl = import.meta.env.VITE_APP_BASE_URL; 
            return `${baseUrl}saved/${linkId}`
          },
    },
    data() {
        return {
            savedLinks: [],
            isLoading:true
        };
    },
    mounted() {
        this.fetchSavedLinks();    
    },
  
};

</script>
