<template>
    <div class="flex flex-col items-center justify-center bg-[#E6FBED] ">
        <ul class="flex items-center flex-col justify-center w-[100%] ">
            <li class="mt-2 border-4 border-[#04263A] p-2 w-[70%] md:w-[50%] bg-[#E6FBED]" v-for="doc in documents" :key="doc.id">
                <div class="flex flex-col text-center justify-center mx-auto ">
                   <p class="text-[#04263A] ">ID: <span class=" text-[#04263A] font-bold">{{ doc.id }}</span></p>
                    <p class="text-[#04263A]">Bottles Saved: <span class="font-bold text-[#04263A]">{{ doc.bottlesSaved }}</span> </p>
                    <p class="text-[#04263A]">Plastic Saved: <span class="font-bold text-[#04263A]">{{ doc.plasticsSaved
                    }} KG</span> </p>
                    <p class="text-[#04263A]">Carbon Saved: <span class="font-bold text-[#04263A]">{{ doc.carbonSaved }}</span> </p>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { db } from '../../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
    name: 'DetailsView',
    data() {
        return {
            documents: [],
        };
    },
    async mounted() {
        const querySnapshot = await getDocs(collection(db, "savings"));
        this.documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(this.documents.map())
    },
};

</script>
<style>
    .detailBoxColor {
        background-color:#00263A;
        
    }

</style>
