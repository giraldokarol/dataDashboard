<script setup lang="ts">
import { ref } from 'vue';
//Library
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

//Custom Map
const marker = L.divIcon({
    html: '<div class="db_marker_real_position"></div>',
    className: "",
    iconSize: [20, 20],
}) as any;

function onMapReady(leafletMap: L.Map) {
  leafletMap.zoomControl.remove();
  L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);
}

//Variables
const props = withDefaults(
    defineProps<{
        center?: any;
        zoom?: number;
    }>(),{
        center: [0, 0] as [number, number],
        zoom: 30
    }
);
</script>

<template>
  <LMap @ready="onMapReady" :zoom="props.zoom" :center="props.center" style="height: 100vh; width: 100%;">
    <LTileLayer
       url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
       attribution='&copy; <a href="https://carto.com/">CARTO</a>'
    />
    <LMarker :lat-lng="center" :icon="marker"/>
  </LMap>
</template>

<style lang="scss">
.db_marker_real_position {
    background: $body_color;
    @include rem(border-radius, 80);
    @include rem(width, 20);
    @include rem(height, 20);
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
