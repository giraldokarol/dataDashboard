<script setup lang="ts"></script>

<template>
    <div class="db_search_container">
        <form name="db_search_form" class="db_search_form" role="search" id="db_search_form">
            <label for="db_search" class="sr_only">Your research</label>
            <input type="text" id="db_search" placeholder="Search" title="Search" required class="db_search_input">
            <button type="submit" class="db_search_btn" title="Execute the research">
                <span class="sr_only">Execute the research</span>
                <span aria-hidden="true" class="db_icon_search"></span>
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.db_search{
    display: flex;
    &_form {
        display: flex;
        align-items: center;
        @include rem(min-width, 225);
        position: relative;
    }

    &_input {
        @include rem(min-height, 38);
        @include rem(border-radius, 24);
        @include rem(padding, 0 16);
        background: $offwhite;
        border: #{pxToRem(1)}rem solid $gray2;
        width: 100%;
        font-family: $font_family;

        &:focus{
            outline: #{pxToRem(2)}rem solid $black;
            @include rem(outline-offset, -1);
        }
    }

    &_btn {
        background: $offwhite;
        border: 0;
        cursor: pointer;
        position: absolute;
        @include rem(right, 12);
        @include rem(border-radius, 50);
        @include rem(padding, 5);
        transition: background 0.2s ease-in;
        span[class*="db_icon"]{
            @include svgColor($gray);
            @include svgSize(18);
        }

        &:hover {
            background: $black;
            span[class*="db_icon"]{
                @include svgColor($offwhite);
            }
        }
    }
}
</style>