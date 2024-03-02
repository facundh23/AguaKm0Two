<template>
    <div class="container w-full h-screen flex flex-col items-center p-2 mx-auto">
        <h1 class="font-bold underline text-white mb-3 text-3xl text-center">Refill Impact Dashboard</h1>
        <InputValue />
    </div>
</template>


<script>
import InputValue from '../ui/InputValue/InputValue.vue';

export default {

    name: 'DashboarComponent',
    components: { InputValue },

}

</script>

<style>
    .container {
        background-color:#00263A
    }

</style>