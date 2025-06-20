<script setup lang="ts">
import { onMounted, ref } from 'vue';
//Services
import { vehicleService } from './services/vehicleService';
//Components
import Map from './components/Map.vue';

//Data Map
const realTimePosition = ref<[number, number]>([0, 0]);

onMounted(async ()=>{
    const dataRealLocation = await vehicleService.getLocation("FRS850");
    if(dataRealLocation.location){
        realTimePosition.value = [dataRealLocation.location.lat?? 0, dataRealLocation.location.lng?? 0];
    }
});
</script>

<template>
    <Map :center="realTimePosition"></Map>
</template>
