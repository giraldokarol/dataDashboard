<script setup lang="ts">
import { onMounted, ref } from 'vue';
//Services
import { vehicleService } from './services/vehicleService';
//Components
import Map from './components/Map.vue';
import Menu from './components/Menu.vue';
import SeachBar from './components/SeachBar.vue';

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
    <div class="db_layout">
        <aside class="db_sidebar">
            <Menu></Menu>
        </aside>

        <div class="db_maincontent">
            <header class="db_topbar">
                <SeachBar></SeachBar>
            </header>
            <main role="main" class="db_map_layout">
                <Map :center="realTimePosition" :truckInfo="truckInfo"></Map>
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
.db_maincontent {
    @include rem(margin-left, 100);
}

.db_topbar {
    position: fixed;
    right: 0;
    z-index: 1000;
    @include rem(padding, 48 40 0 0);
}
</style>
