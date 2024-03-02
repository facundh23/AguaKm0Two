<script setup>
</script>

<template>
    <div>
        <nav class="text-black p-2 bg-green-500 w-full flex justify-around">
            <router-link class="font-bold" to="/">Dashboard</router-link>
            <router-link class="font-bold"  to="/details">Details</router-link>
            
        </nav>
        <router-view />
    </div>
</template>

<style scoped></style>
