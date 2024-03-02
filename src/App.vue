<script setup>
</script>

<template>
        <nav class="text-white  md:text-2xl p-2 navbar w-[90%] flex justify-around mx-auto rounded-lg mt-2">
            <router-link class="font-bold hover:cursor-pointer hover:text-gray-400 transition-all duration-700" to="/">Dashboard</router-link>
            <router-link class="font-bold hover:cursor-pointer hover:text-gray-400 transition-all duration-700"  to="/details">Details</router-link>
        </nav>
        <router-view /> 
</template>

<style scoped></style>
