<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        iconClass?:string;
        valueInfo?: number;
        descriptionInfo?:string;
        type?:string; // Define four types : Default, Energy, Percent, Speed
    }>(), {
        iconClass: "db_icon_location",
        valueInfo: 0,
        descriptionInfo: "Speed",
        type: "default"
    }
);
const textType = computed(() => {
    if(props.type === "energy"){
        return "KwH";
    } else if( props.type === "percent") {
        return "%";
    }else if(props.type === "speed") {
        return "Km/h";
    }else { return ""}
})
</script>

<template>
    <div class="db_infocard">
        <div class="db_infocard_icon">
            <span :class="iconClass" aria-hidden="true"></span>
        </div>
        <div class="db_infocard_body">
            <p class="db_infocard_value">{{ props.valueInfo }}{{ textType }}</p>
            <p class="db_infocard_description">{{ props.descriptionInfo }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.db_infocard {
    display: inline-flex;
    align-items: center;
    @include rem(min-width, 140);
    @include rem(border-radius, $default_borderraidus);
    @include rem(padding, 16);
    @include rem(gap, 16);
    box-shadow:  0 0 0 #{pxToRem(1)}rem #7FA38520 inset;
    background: $offwhite2;

    &_icon {
        @include rem(width, 32);
        span[class*="db_icon"]{
            @include svgColor($body_color);
            @include svgSize(32);
        }
    }

    &_body{
        display: flex;
        flex-direction: column;
    }

    &_value {
        font-weight: 600;
        margin: 0;
        @include rem(font-size, 24);
    }

    &_description {
        margin: 0;
        @include rem(font-size, 14);
    }
}
</style>