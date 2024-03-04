<script setup>
</script>

<template>
        <nav class="navbar text-[#00BC70]  md:text-2xl p-2 w-full flex justify-around mx-auto ">
            <router-link class="font-bold hover:cursor-pointer"  to="/" active-class="active-link">Dashboard</router-link>
            <router-link class="font-bold hover:cursor-pointer"    to="/details" active-class="active-link">Details</router-link>
        </nav>
        <router-view /> 
</template>

<style scoped></style>
