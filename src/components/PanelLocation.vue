<script setup lang="ts">
import { onMounted, ref } from 'vue';
//Services
import type { Route } from '../models/Route'
import { vehicleService } from '../services/vehicleService';
//Components
import Chip from './Chip.vue';
import InfoCard from './InfoCard.vue';

const emit = defineEmits(['closePanel']);
const selectRoute = ref<Route>();
const props = defineProps<{truck:{location: [], licensePlate:string, model:string, battery: number, driver:string, speed:number}}>()

onMounted(async() =>{
    if(props.truck){
        const idTruck = props.truck.licensePlate.replace(/ /g, '');
        const route = await vehicleService.getRoute(idTruck);
        selectRoute.value = route;
    }
});
</script>

<template>
    <div class="db_panel_loc_container">
        <div class="db_panel_loc_header">
            <div class="db_panel_loc_close_container">
                <button title="Close Location Panel" class="db_panel_loc_close" @click.prevent="emit('closePanel')">
                    <span class="sr_only"> Close Location Panel</span>
                    <span class="db_icon_close" aria-hidden="true"></span>
                </button>
            </div>
            <div class="db_panel_loc_status">
                <Chip type="active" text="Real time track"></Chip>
            </div>
            <div class="db_panel_loc_title_container">
                <h1 class="db_panel_loc_title">
                    <span aria-hidden="true" class="db_icon_truck"></span>
                    {{ props.truck.licensePlate }}
                </h1>
                <div class="db_panel_loc_description">
                    <p class="db_panel_loc_truckmodel"> {{ props.truck.model }}</p>
                    <p class="db_panel_loc_truckdriver">
                        <span aria-hidden="true" class="db_icon_card_user"></span>
                        {{ props.truck.driver }}
                    </p>
                </div>
            </div>
            <div class="db_panel_loc_info">
                <InfoCard type="percent" iconClass="db_icon_low_battery" :valueInfo="props.truck.battery" descriptionInfo="Battery"></InfoCard>
                <InfoCard type="speed" :valueInfo="props.truck.speed" descriptionInfo="Speed"></InfoCard>
            </div>
        </div>

        <div class="db_panel_loc_body">
            <h2 class="db_panel_loc_body_title"> Track Route </h2>
            <div class="db_panel_loc_timeline">
                <ul class="db_timeline" :class="{'break': selectRoute?.currentStopIndex === 1}">
                    <li v-for="route in selectRoute?.stops" class="db_timeline_item" >
                        <p class="db_timeline_title">{{ route.address }}</p>
                        <div class="db_timeline_info">
                            <p class="db_timeline_description">{{ route.type }}</p>
                            <p class="db_timeline_value"> {{ route.duration }}min</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>   
    </div>
</template>

<style scoped lang="scss">
.db_panel_loc {
    &_container {
        position: fixed;
        z-index: 1000;;
        background: $offwhite;
        height: 100vh;
        display: flex;
        flex-direction: column;
        @include rem(padding, 20 30);
        overflow-x: hidden;
        overflow-y: auto;
    }

    &_header {
        display: flex;
        flex-direction: column;
        border-bottom: #{pxToRem(1)}rem solid $lightgray;
        @include rem(padding-bottom, 20);
    }

    &_close_container {
        align-self: flex-end;
    }

    &_close {
        cursor: pointer;
        background: transparent;
        border: 0;
        span[class*="db_icon"]{
            @include svgSize(24);
            @include svgColor($body_color);
        }
    }

    &_status {
        display: flex;
        @include rem(gap, 8);
        @include rem(margin-top, 20);
    }

    &_title_container {
        @include rem(margin, 16 0 20);
    }

    &_title {
        margin: 0;
        display: flex;
        align-items: center;
        @include rem(gap, 12);
        @include rem(font-size, 32);
        span[class*="db_icon"] {
            @include svgSize(40);
        }
    }

    &_description {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin: 0;
            color: $gray;
            @include rem(font-size, 14);
            span[class*="db_icon"] {
                @include svgColor($gray);
                @include svgSize(18);
            }
        }
    }

    &_truckdriver {
        display: flex;
        align-items: center;
        @include rem(gap, 2);
    }

    &_info {
        display: flex;
        align-items: center;
        @include rem(gap, 12);
        > div {
            flex: auto;
        }
    }

    &_body {
        display: flex;
        flex-direction: column;
        @include rem(margin-top, 20);
        &_title {
            margin: 0;
            @include rem(font-size, 18);
        }
    }

    &_timeline {
        @include rem(margin-top, 16);

        //Timeline
        .db_timeline {
            position: relative;
            display: flex;
            flex-direction: column;
            @include rem(padding-left, 40);

            &::before {
                content: "";
                height: 80%;
                background: $lightgray;
                position: absolute;
                @include rem(top, 4);
                @include rem(left, 22);
                @include rem(width, 1);
            }
            p {
                margin: 0;
                @include rem(font-size, 12);
            }

            &_item {
                display: flex;
                flex-direction: column;
                @include rem(padding-bottom, 16);
            }

            &_title {
                position: relative;
                color: $gray;

                &::before, &::after{
                    content: "";
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    @include rem(border-radius, 50);
                }

                &::before {
                    background: $gray2;
                    @include rem(left, -24);
                    @include rem(width, 12);
                    @include rem(height, 12);
                }

                &::after {
                    background: #91919130;
                    @include rem(left, -28);
                    @include rem(width, 20);
                    @include rem(height, 20);
                }
            }

            &.break {
                .db_timeline_item:last-child .db_timeline_title::before {background: $neongreen;}
                .db_timeline_item:last-child .db_timeline_title::after {background: #84F22130;}
            }

            &_info{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &_description, &_value {
                font-weight: 500;
            }

            &_value{
                color: $gray;
            }

        }
    }
}
</style>