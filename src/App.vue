<script setup>
</script>

<template>
        <nav class="text-white p-2 navbar w-[90%]  flex justify-around mx-auto rounded-lg mt-2">
            <router-link class="font-bold" to="/">Dashboard</router-link>
            <router-link class="font-bold"  to="/details">Details</router-link>
        </nav>
        <router-view /> 
</template>

<style scoped></style>
