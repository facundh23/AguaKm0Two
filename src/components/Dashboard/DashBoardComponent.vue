<template>
    <div class="w-[100%]  md:w-[90%] flex flex-col items-center justify-start md:mt-10  p-2 mx-auto gap-2 ">
        <h1 class="font-bold text-[#26D07C] mb-2 text-3xl italic text-center">Refill Impact Dashboard</h1>
        <p class="text-[#26D07C] font-bold text-center  w-[80%]">This application that allows users to input a number of water refills and calculates the environmental impact</p>
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