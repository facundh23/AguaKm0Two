<template>
    <div class="container w-full h-screen flex flex-col items-center p-2 mx-auto">
        <h1 class="font-bold text-white mb-3 text-3xl italic text-center">Refill Impact Dashboard</h1>
        <FormValue />
    </div>
</template>


<script>
import FormValue from '../ui/FormValue/FormValue.vue';

export default {

    name: 'DashboarComponent',
    components: { FormValue },

}

</script>

<style>
    .container {
        background-color:#00263A
    }

</style>../ui/InputValue/FormValue.vue