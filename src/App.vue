<script setup>
</script>

<template>
    <div class="w-full flex flex-col items-center justify-center ">
        <nav class="navbar text-[#00BC70] text-sm flex justify-around w-[100vw]">
            <router-link class="font-bold hover:cursor-pointer"  to="/" active-class="active-link">Dashboard</router-link>
            <router-link class="font-bold hover:cursor-pointer"  to="/details" active-class="active-link">Details</router-link>
        </nav>
        <router-view /> 
    </div>
</template>

<style scoped></style>
