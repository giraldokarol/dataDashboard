<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
//Library
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

//Variables
const props = withDefaults(
    defineProps<{
        center?: any;
        zoom?: number;
        truckInfo?: any;
    }>(),{
        center: [0, 0] as [number, number],
        zoom: 30,
        truckInfo: {
            plate: "",
            model: "",
            battery: 0
        }
    }
);

//Custom Map
const isMarkerOpen = ref<boolean>(false);
const marker = computed(() =>{
    return L.divIcon({
    html: isMarkerOpen.value
     ? `<div class="db_marker_real_position open" aria-expanded="${isMarkerOpen.value}">
            <a role="button" aria-label="Reduce the text" class="db_marker_real_position_close_btn" id="db_closeInfo">
                <span aria-hidden=true class="db_icon_close"><span>
            </a>
            <div class="db_marker_real_position_title">
                <span aria-hidden="true" class="db_icon_truck db_marker_real_position_title_icon"></span>
                <p class="db_marker_real_position_title_plate">${props.truckInfo.plate}</p>
            </div>
            <p class="db_marker_real_position_subtitle">${props.truckInfo.model}</p>
            <div class="db_marker_real_position_battery">
                <p class="db_marker_real_position_battery_level">${props.truckInfo.battery}</p>
                <span aria-hidden="true" class="db_icon_low_battery"></span>
            </div>
            <a id="db_openDetail" class="db_marker_real_position_link" role="button">More details</a>
        <div>`
     :`<div class="db_marker_real_position" aria-expanded="${isMarkerOpen.value}"> <span aria-hidden="true" class="db_icon_truck"></div>`,
    className: "",
    iconSize: [20, 20],
    }) as any;
});

function onMapReady(leafletMap: L.Map) {
  leafletMap.zoomControl.remove();
  L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);
}

function openMarker(){
    if(!isMarkerOpen.value){
        isMarkerOpen.value = true;
    }
}

onMounted(()=> {
    watch(isMarkerOpen, () => {
        //SetTimeOut for being sure that the elements are alredy on the DOM
        setTimeout(() =>{
            const closeBtn = document.getElementById('db_closeInfo');
            const seeDetail = document.getElementById('db_openDetail');

            if(closeBtn){
                closeBtn.addEventListener('click', function(){
                    isMarkerOpen.value = false;
                });
            }

            if(seeDetail){
                seeDetail.addEventListener('click', function(){
                    console.log("For now : Click in details")
                });
            }
        });
    });
});
</script>

<template>
  <LMap @ready="onMapReady" :zoom="props.zoom" :center="props.center" style="height: 100vh; width: 100%;">
    <LTileLayer
       url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
       attribution='&copy; <a href="https://carto.com/">CARTO</a>'
    />
    <LMarker @click="openMarker" :lat-lng="props.center" :icon="marker"/>
  </LMap>
</template>

<style lang="scss">
.db_marker_real_position {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $db_marker_pos_background;
    bottom: calc( #{$db_marker_pos_default_size}px - 25px);
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
        content: "jla";
        position: absolute;
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
}

.leaflet-container {
    font-family: $font_family;
}
.leaflet-control {
    &-attribution { display: none;}

    &-zoom.leaflet-bar {
        border: 0 !important;
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
</style>
