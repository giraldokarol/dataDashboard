<script setup lang="ts">
const emitChecked = defineEmits(['checkedToggle']);
const props = withDefaults(
    defineProps<{
        isChecked?:boolean
        iconSelected?:string;
        iconDefault?:string;
        values?: any
       
    }>(),{
        isChecked: false,
        iconSelected: "",
        iconDefault: "",
        values: {
            check: "Activated",
            off: "Desactivated"
        }
    }
);
</script>

<template>
    <div class="db_toggle" :class="{'checked' : props.isChecked}">
        <label class="db_toggle_label" >
            <input type="checkbox" class="db_toggle_checkbox" :aria-checked="props.isChecked ? true : false" :checked="props.isChecked"  @click.prevent="emitChecked('checkedToggle')" role="switch">
            <span class="db_toggle_cursor"></span>
            <span v-if="props.iconSelected !== '' || props.iconDefault !== ''" class="db_toggle_icon" aria-hidden="true">
                    <span :class="props.iconDefault" class="db_toggle_icon_default"></span>
                    <span :class="props.iconSelected" class="db_toggle_icon_selected"></span>
                </span>
            <span class="sr_only">
                {{ props.isChecked ? props.values.check : props.values.off}}
            </span>
        </label>
    </div>
</template>

<style scoped lang="scss">
.db_toggle {
    display: inline-block;
    position: relative;
    overflow: hidden;
    background: $lightgray2;
    box-shadow:  0 0 0 #{pxToRem(1)}rem #00000021 inset;
    @include rem(border-radius, 24);
    @include rem(width, 32);
    @include rem(height, 60);

    &_label {
        display: inline-block;
        line-height: 0
    }

    &_checkbox {
        appearance: none;
        margin: 0;
        opacity: 0;
        @include rem(width, 32);
        @include rem(height, 60);
        @include rem(border-radius, 24);
    }

    &_icon {
        position: absolute;
        top: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        @include rem(padding, 10 0);
        @include rem(border-radius, 24);
        cursor: pointer;

        span[class*="db_icon"]{
            @include svgSize(14);
        }
        &_default {@include svgColor($body_color)}
        &_selected {@include svgColor($gray2)}
    }

    &_cursor {
        cursor: pointer;
        display: block;
        position: absolute;
        background: $offwhite;
        transition: all .2s ease 0s;
        z-index: 1;
        box-shadow: 0 0 #{pxToRem(4)}rem 0 #E6E7E8;
        left: 50%;
        transform: translateX(-50%);
        @include rem(top, 5);
        @include rem(border-radius, 50);
        @include rem(width, 24);
        @include rem(height, 24);
    }

    &.checked {
        background: $lightgray2;
        .db_toggle_cursor {
            @include rem(top, 30);
        }
    }
}
</style>