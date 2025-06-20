<script setup lang="ts">
import { onMounted } from 'vue';
//Services
import { vehicleService } from '../services/vehicleService';
//Components
import Chip from './Chip.vue';

const emit = defineEmits(['closePanel']);
const props = withDefaults(
    defineProps<{
        idTruck?: string;
    }>(),{
        idTruck: ""
    }
)

onMounted(async() =>{
    if(props.idTruck){
        const route = await vehicleService.getRoute(props.idTruck);
        console.log(route);
    }
});
</script>

<template>
    <div class="db_panel_loc_container">
        <div class="db_panel_loc_header">
            <button title="Close Location Panel" class="db_panel_loc_close" @click.prevent="emit('closePanel')">
                <span class="sr_only"> Close Location Panel</span>
                <span class="db_icon_close" aria-hidden="true"></span>
            </button>
            <div class="db_panel_loc_status">
                <Chip type="active" text="Real time track"></Chip>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
.db_panel_loc {
    &_container {
        position: fixed;
        z-index: 1000;
        background: $offwhite;
    }
}
</style>