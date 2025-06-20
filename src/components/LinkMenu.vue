<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        iconClass?: string,
        text?: string,
        route?: string,
        isActive?:boolean
    }>(),
    {
        iconClass: 'db_icon_dashboard',
        text: 'Dashboard Page',
        route: '#',
        isActive: false
    }
);

//Selected
const emitIsActive = defineEmits(['selected']);
</script>

<template>
    <li class="db_menu_item" :class="{'selected' : props.isActive}">
        <a :href="props.route" role="button" class="db_menu_item_link" @click.prevent="emitIsActive('selected')">
            <span aria-hidden="true" :class="props.iconClass"></span>
            <span class="sr_only db_menu_item_link_text">{{ props.text }}</span>
        </a>
    </li>
</template>

<style scoped lang="scss">
.db_menu_item {
    list-style: none;
    display: inline-flex;
    justify-content: center;
    @include rem(width, 36);
    @include rem(height, 36);

    &_link{
        display: flex;
        align-items: center;
        justify-content: center;
        background: $offwhite;
        transition: background 0.2s ease-in;
        @include rem(padding, 8);
        @include rem(border-radius, $default_borderraidus);
        [class*='db_icon']{
            display: flex;
            @include svgSize(20);
            @include svgColor($gray);
        }
    }

    &.selected {
        .db_menu_item_link {
            background: $lightgray2;
            box-shadow: 0 0 0 #{pxToRem(1)}rem #00000030 inset;
            [class*='db_icon']{
                @include svgColor($body_color);
            }
        }
    }
}
</style>