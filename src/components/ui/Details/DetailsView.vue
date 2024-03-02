<template>
    <div class="flex flex-col items-center justify-center">

        <ul class="flex items-center flex-col justify-center">
            <li class="mt-2 border-b-4" v-for="doc in documents" :key="doc.id">
                <div class="flex flex-col text-center justify-center mx-auto">
                   <p class="text-white">ID: <span class=" text-white font-bold">{{ doc.id }}</span></p>
                    <p class="text-white">Bottles Saved: <span class="font-bold text-white">{{ doc.bottlesSaved }}</span> </p>
                    <p class="text-white">Plastic Saved: <span class="font-bold text-white">{{ doc.plasticsSaved
                    }} KG</span> </p>
                    <p class="text-white">Carbon Saved: <span class="font-bold text-white">{{ doc.carbonSaved }}</span> </p>
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
