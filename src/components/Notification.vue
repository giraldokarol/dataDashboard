<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        isOpen?:boolean,
        notificationList?:any //Normally, this object should be retrieved from the database, but since it doesn't exist and due to time and practicality constraints it wasn’t created, I’m going to create a manual example just to show how it would look.
    }>(),
    {
        isOpen: false,
        notificationList: [
            {
                isNew: true,
                title: "New truck assigned",
                description: "You have a new truck assigned to your fleet.",
            },
            {
                isNew: false,
                title: "Maintenance required",
                description: "Truck 24 needs maintenance within 7 days.",
            }
        ]
    }
);
const titleAttribute = computed(() => props.isOpen ? "Hide notification list" : "Show notification list");
const newNotifications = computed(() => {return props.notificationList.some((n: { isNew: boolean; }) => n.isNew === true);});
const emitOpen = defineEmits(['isOpened']);
</script>

<template>
    <div class="db_notification_container" :class="{'open' : props.isOpen}">
        <button :title="titleAttribute" :aria-expanded="props.isOpen" @click.prevent="emitOpen('isOpened')" class="db_notification">
            <span class="sr_only">{{ titleAttribute }}</span>
            <span aria-hidden="true" class="db_icon_notifications"></span>
            <span v-if="newNotifications" class="db_notification_badge"></span>
        </button>
        <div class="db_notification_list" v-if="props.isOpen">
            <ul>
                <li v-for="notif in props.notificationList" :class="{'new': notif.isNew}">
                    <p class="db_notification_title">{{ notif.title }}</p>
                    <p class="db_notification_description"> {{ notif.description }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.db_notification {
    cursor: pointer;
    position: relative;
    background: $offwhite;
    border: 0;
    box-shadow:  0 0 0 #{pxToRem(1)}rem #00000015 inset;
    @include rem(width, 38);
    @include rem(height, 38);
    @include rem(border-radius, 50);

    span[class="db_icon"]{
        @include svgSize(18);
        @include svgColor($black);
    }

    &_badge {
        display: inline-block;
        background: $neongreen;
        position: absolute;
        @include rem(left, 20);
        @include rem(border-radius, 50);
        @include rem(width, 8);
        @include rem(height, 8);
    }

    &_list {
        background: $offwhite;
        position: absolute;
        right: 0;
        box-shadow: 0 0 #{pxToRem(11)}rem #{pxToRem(6)}rem #00000012;
        @include rem(margin-top, 10);
        @include rem(min-width, 200);
        @include rem(border-radius, $default_borderraidus);

        ul {
            display: flex;
            flex-direction: column;

            li {
                border-bottom: #{pxToRem(1)}rem solid $lightgray;
                @include rem(padding, 8 10);
                &:first-child{
                    @include rem(border-radius, $default_borderraidus $default_borderraidus 0 0);
                }
                &:last-child {
                    border-bottom: 0;
                    @include rem(border-radius, 0 0 $default_borderraidus $default_borderraidus);
                }

                &.new {
                    background: $neongreen3;
                }
            }
        }
    }

    &_title {
        font-weight: 600;
    }

    &_description {
        color: $gray;
    }

    &_description, &_title {
        margin: 0;
        @include rem(font-size, 12);
    }

    &_container.open {
        position: relative;
    }
}
</style>