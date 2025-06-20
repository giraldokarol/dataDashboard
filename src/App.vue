<script setup lang="ts">
import { onMounted, ref } from 'vue';
//Services
import { vehicleService } from './services/vehicleService';
//Components
import Map from './components/Map.vue';

//Data Map
const realTimePosition = ref<[number, number]>([0, 0]);
const truckInfo = ref<{plate:string, model:string, battery:number} | null>(null);

onMounted(async ()=>{
    const dataVehicule = await vehicleService.getVehicule("FRS850");
    if(dataVehicule.location && dataVehicule.licensePlate && dataVehicule.battery && dataVehicule.model){
        realTimePosition.value = [dataVehicule.location.lat?? 0, dataVehicule.location.lng?? 0];
        truckInfo.value = {
            plate: dataVehicule.licensePlate,
            model: dataVehicule.model,
            battery: dataVehicule.battery.level?? 0
        }
    }
});
</script>

<template>
    <Map :center="realTimePosition" :truckInfo="truckInfo"></Map>
</template>
