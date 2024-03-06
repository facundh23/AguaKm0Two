<template>
    <div class="flex flex-col items-center justify-center bg-[#E6FBED]">
        <ul class="flex items-center flex-col justify-center w-full gap-4 p-2">
            <li v-for="link in savedLinks" :key="link.id" class="w-full flex justify-center gap-4">
                <router-link 
                    :to="`/saved/${link.id}`"
                    class="text-[#04263A] bg-[#26D07C] w-full md:w-[70%] text-center p-2 rounded-lg">
                    <span class="hover:cursor-pointer font-bold ml-2">{{ getFullLink(link.id) }} - {{ link.createdAt }}</span>
                </router-link>
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
        handleError(errorMessage, error) {
            console.error(errorMessage, error);
            this.$swal({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        },
        async fetchSavedLinks() {
            try {
                const savingsCollection = collection(db, 'savings');
                const q = query(savingsCollection, orderBy('createdAt'));
                const querySnapshot = await getDocs(q);
                this.savedLinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                this.handleError('Error getting documents', error);
            } finally {
                this.isLoading = false;
            }
        },
        getFullLink(linkId) {
            return `${this.baseUrl}/saved/${linkId}`;
        }
    },
    data() {
        return {
            savedLinks: [],
            isLoading: true
        };
    },
    mounted() {
        this.fetchSavedLinks();
    }
};
</script>