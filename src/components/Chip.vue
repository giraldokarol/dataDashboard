<script setup lang="ts">
/*There can only be four types: active, blocked, pause and default. 
Due to time constraints and just for the exercise, only the styles for the active class were created.*/
const props = withDefaults(
    defineProps<{
        type?:string;
        text?:string;
    }>(),{
        type: "default",
        text: "Generique text"
    }
);
</script>

<template>
    <span class="db_chip" role="note" :aria-label="props.text"  :class="props.type"> {{ props.text }}</span>
</template>

<style scoped lang="scss">
.db_chip {
    background: $lightgray2;
    color: $body_color;
    font-weight: 500;
    @include rem(border-radius, 24);
    @include rem(font-size, 12);
    @include rem(padding, 8 16);

    &.active {
        background: $neongreen;
    }
}
</style>

