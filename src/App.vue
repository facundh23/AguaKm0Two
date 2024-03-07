<script setup>
</script>

<template>
        <nav class="navbar text-[#00BC70] text-sm w-full flex justify-around">
            <router-link class="font-bold hover:cursor-pointer"  to="/" active-class="active-link">Dashboard</router-link>
            <router-link class="font-bold hover:cursor-pointer"  to="/details" active-class="active-link">List Shared Links</router-link>
        </nav>
        <router-view /> 
</template>

<style scoped></style>
