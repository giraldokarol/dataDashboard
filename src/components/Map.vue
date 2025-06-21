<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
//Library
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

//Variables
const props = defineProps<{
  zoom: number, 
  truckInfo: Array<{
    location: [number, number], 
    licensePlate: string, 
    model: string, 
    battery: number,
    driver:string,
    speed:number
  }>
}>();

//Custom Map
const hasTrucks = computed(() => props.truckInfo.length > 0)
const isMarkerOpen = ref<boolean>(false);
const selectedTruck = ref<any | null>(null);
const emit = defineEmits<{(e: 'seeDetails', truck: any):void}>();

function onMapReady(leafletMap: L.Map) {
  leafletMap.zoomControl.remove();
  L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);
}

function openMarker(truck: any){
    if(!isMarkerOpen.value){
        isMarkerOpen.value = true;
        selectedTruck.value = truck;
    }
}

function createMarkers(truck: any){
    return L.divIcon({
    html: isMarkerOpen.value
     ? `<div class="db_marker_real_position open" aria-expanded="${isMarkerOpen.value}">
            <a role="button" aria-label="Reduce the text" class="db_marker_real_position_close_btn">
                <span aria-hidden=true class="db_icon_close"><span>
            </a>
            <div class="db_marker_real_position_title">
                <span aria-hidden="true" class="db_icon_truck db_marker_real_position_title_icon"></span>
                <p class="db_marker_real_position_title_plate">${truck.licensePlate}</p>
            </div>
            <p class="db_marker_real_position_subtitle">${truck.model}</p>
            <div class="db_marker_real_position_battery">
                <p class="db_marker_real_position_battery_level">${truck.battery}</p>
                <span aria-hidden="true" class="db_icon_low_battery"></span>
            </div>
            <a data-plate="${truck.licensePlate}" class="db_marker_real_position_link" role="button">More details</a>
        <div>`
     :`<div class="db_marker_real_position" aria-expanded="${isMarkerOpen.value}"> <span aria-hidden="true" class="db_icon_truck"></div>`,
    className: "",
    iconSize: [20, 20],
    }) as any;
}

onMounted(()=> {
    watch(isMarkerOpen, () => {
        //SetTimeOut for being sure that the elements are alredy on the DOM
        setTimeout(() =>{
            const markerOpen = document.querySelector(".db_marker_real_position.open");

            if(markerOpen) {
                const closeBtn = document.querySelector('.db_marker_real_position_close_btn');
                const seeDetail = document.querySelector('.db_marker_real_position_link');

                if(closeBtn){
                    closeBtn.addEventListener('click', function(){
                        isMarkerOpen.value = false;
                    });
                }

                if(seeDetail){
                    seeDetail.addEventListener('click', function(){
                        emit('seeDetails', selectedTruck.value);
                    });
                }
            }
            
        });
    });
});
</script>

<template>
    <LMap  v-if="hasTrucks" @ready="onMapReady" :zoom="props.zoom" :center="props.truckInfo[0].location" style="height: 100vh; width: 100%;">
        <LTileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>'/>
        <LMarker v-for="truck in props.truckInfo" @click="openMarker(truck)" :lat-lng="truck.location" :icon="createMarkers(truck)"/>
    </LMap>
</template>

<style lang="scss">
.db_marker_real_position {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $db_marker_pos_background;
    bottom: calc( #{$db_marker_pos_default_size}px - 20px);
    left: 50%;
    transform: translateX(-50%);
    @include rem(border-radius, $default_borderraidus);
    @include rem(width, $db_marker_pos_default_size);
    @include rem(height, $db_marker_pos_default_size);

    [class *= "db_icon"]{
        @include svgColor($offwhite);
        @include svgSize(20);
    }

    &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width:  #{pxToRem(9)}rem;
        border-color:  $db_marker_pos_background transparent  transparent transparent;
        @include rem(bottom, -14);
        left: 50%;
        transform: translateX(-50%);
    }


    &_close_btn{
        align-self: flex-end;
        cursor: pointer;
    }

    &_title {
        justify-content: space-between;
        color: $offwhite;
        
        &_icon{
            @include svgSize(20);
        }
        &_plate {
            margin: 0;
            @include rem(font-size, 10);
        }
    }

    &_subtitle {
        margin: 0;
        color: $offwhite;
        @include rem(font-size, 10);
    }

    &_battery {
        color: $neongreen;
        @include rem(gap, 2);
        &_level {
            font-weight: 600;
            margin: 0;
            @include rem(font-size, 16);
        }
        [class *= "db_icon"]{
            @include svgColor($neongreen);
        }
    }

    &_battery, &_title, &_link {
        display: flex;
        align-items: center;
        width: 100%;
        @include rem(margin-top, 2);
    }

    &_link {
        justify-content: center;
        color: $neongreen !important;
        @include rem(font-size, 12);
        text-decoration: underline;
        cursor: pointer;
    }

    &.open {
        cursor: default;
        flex-direction: column;
        align-items: flex-start;
        @include rem(min-width, $db_marker_pos_open_size);
        @include rem(min-height, $db_marker_pos_open_size);
        @include rem(padding, 24 10 10 10);
        margin-bottom: 0;
        margin-top: calc( -#{$db_marker_pos_open_size}px - -43px);
    }
}

.leaflet-marker-icon {
    position: relative;
    background: $db_marker_pos_background;
    width: #{pxToRem($db_marker_pos_indicator_size)}rem !important;
    height: #{pxToRem($db_marker_pos_indicator_size)}rem !important;
    @include rem(border-radius, 50);
    &::before {
        content: "";
        position: absolute;
        top: 50%;left: 50%;
        transform: translate(-50%, -50%);
        background: #00000039;
        @include rem(border-radius, 50);
        width: calc(#{pxToRem($db_marker_pos_indicator_size)}px + 15px);
        height: calc(#{pxToRem($db_marker_pos_indicator_size)}px + 15px);
    }
}

.leaflet {
    &-container{
        font-family: $font_family;
    }

    &-control{
        &-attribution { display: none;}
        &-zoom.leaflet-bar {
            border: 0 !important;
            @include rem(margin, 0 40 40 0);
            a {
                border: 0;
                background: $lightgray2;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $body_color;
                box-shadow: 0 0 #{pxToRem(16)}rem #{pxToRem(-2)}rem #00000039;
                @include rem(font-size, 18);
                @include rem(width, 38);
                @include rem(height, 38);
                @include rem(margin-top, 12);
                @include rem(border-radius, 50);
                &:first-child, &:last-child {
                    @include rem(border-radius, 50);
                }
            }
        }
    }
}
</style>
