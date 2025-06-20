<script setup lang="ts">
import { onMounted, ref } from 'vue';
//Services
import { vehicleService } from './services/vehicleService';
//Components
import Map from './components/Map.vue';
import Menu from './components/Menu.vue';
import SeachBar from './components/SeachBar.vue';
import Notification from './components/Notification.vue';
import PanelLocation from './components/PanelLocation.vue';

//Data Map
const truckInfo = ref([{ position: [0, 0], plate: "", model: "", battery: 0 }]);
const showDetails = ref<boolean>(false);
const vehicleSelected = ref<string>("")

function handleSeeDetails(plate:string){
    showDetails.value = true;
    vehicleSelected.value = plate;
}
function handleCloseDetails(){showDetails.value = false}

//Notifications
const isOpen = ref<boolean>(false);

function openHandling(){
    if(!isOpen.value) {
        isOpen.value = true
    }else{
        isOpen.value = false;
    }
}

onMounted(async ()=>{
    const dataVehicule = await vehicleService.getVehicule("FRS850");
    if(dataVehicule.location && dataVehicule.licensePlate && dataVehicule.battery && dataVehicule.model){
        truckInfo.value = [
            {
                position: [dataVehicule.location.lat?? 0, dataVehicule.location.lng?? 0],
                plate: dataVehicule.licensePlate,
                model: dataVehicule.model,
                battery: dataVehicule.battery.level?? 0
            }
        ]
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
                <Notification  :isOpen="isOpen" @isOpened="openHandling"></Notification>
                <div class="db_profil_management_container">
                    <button class="db_profil_management" aria-expanded="false" title="Show Profil Options">
                        <div class="db_profil_management_photo">
                            <img src="./images/profile_image.webp" alt="Profil Photo" lazy-loading>
                        </div>
                        <span aria-hidden="true" class="db_icon_chevron_bottom"></span>
                    </button>
                </div>
            </header>
            <main role="main" class="db_map_layout">
                <PanelLocation v-if="showDetails" @closePanel="handleCloseDetails" :idTruck="vehicleSelected"></PanelLocation>
                <Map :truckInfo="truckInfo" @seeDetails="handleSeeDetails"></Map>
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
    display: flex;
    align-items: center;
    @include rem(padding, 48 40 0 0);
    @include rem(gap, 16);
}

.db_profil_management {
    display: flex;
    align-items: center;
    @include rem(gap, 8);
    background: transparent;
    border: 0;
    cursor: pointer;

    span[class*="db_icon"]{
        @include svgSize(20);
        @include svgColor($black);
    }

    &_photo {
        overflow: hidden;
        @include rem(width, 38);
        @include rem(height, 38);
        @include rem(border-radius, 50);
        img {
            width: 100%;
        }
    }
}
</style>
