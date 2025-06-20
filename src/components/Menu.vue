<script setup lang="ts">
import { ref } from 'vue';
import LinkMenu from './LinkMenu.vue';
import ToggleBtn from './ToggleBtn.vue';

const linkSelected = ref<string>('Fleet Location'); // Default value
const isChecked = ref<boolean>(false);

function toggleValue() {
  if(!isChecked.value){
    isChecked.value = true;
  } else {
    isChecked.value = false;
  }
}

</script>

<template>
  <div class="db_main_menu_container">
    <div class="db_main_menu_logo">
      <a href="#" class="db_logo" title="Dashboard Truck Tracking (Home)">
        <img src="../images/logo.svg" alt="Dashboard Truck Tracking" width="43" height="43">
      </a>
    </div>
    
    <div class="db_main_menu">
      <nav role="navigation" aria-label="Principal Menu" class="db_main_menu_nav">
        <ul class="db_main_menu_nav_space">
          <LinkMenu :isActive="linkSelected === 'Dashboard Page'" @selected="linkSelected = 'Dashboard Page'"></LinkMenu>
          <LinkMenu iconClass="db_icon_location" text="Fleet Location" :isActive="linkSelected === 'Fleet Location'" @selected="linkSelected = 'Fleet Location'"></LinkMenu>
          <LinkMenu iconClass="db_icon_history" text="Data Fleet History" :isActive="linkSelected === 'Data Fleet History'" @selected="linkSelected = 'Data Fleet History'"></LinkMenu>
          <LinkMenu iconClass="db_icon_stats" text="Data Fleet Graphics" :isActive="linkSelected === 'Data Fleet Graphics'" @selected="linkSelected = 'Data Fleet Graphics'"></LinkMenu>
          <LinkMenu iconClass="db_icon_energy" text="Batery Handling" :isActive="linkSelected === 'Batery Handling'" @selected="linkSelected = 'Batery Handling'"></LinkMenu>
        </ul>
        <div class="db_main_menu_profil">
          <a href="#" class="db_main_menu_profil_icon" title="Go to profil settings">
            <span aria-hidden="true" class="db_icon_manage_accounts"></span>
          </a>
        </div>
      </nav>
    </div>

    <div class="db_main_menu_actions">
      <ToggleBtn :values="{ check: 'Dark Mode', off: 'Light Mode' }" iconDefault="db_icon_sun" iconSelected="db_icon_moon" :isChecked="isChecked" @checkedToggle="toggleValue"></ToggleBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.db_main_menu {
  flex: 1;
  @include rem(margin, 62 0 10);

  &_container {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 1000;
    background: $offwhite;
    border-right: #{pxToRem(1)}rem solid $lightgray;
    @include rem(width, 100);
    @include rem(padding, 40 0);
  }

  &_container, &_nav, &_nav_space {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &_nav {
    height: 100%;
  }

  &_nav_space{
    @include rem(gap, 20);
  }

  &_profil {
    margin-top: auto;
    &_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease-in;
      @include rem(width, 32);
      @include rem(border-radius, $default_borderraidus);
      @include rem(height, 32);
      [class *="db_icon"]{
        @include svgSize(20);
        @include svgColor($body_color);
      }

      &:hover {
        background: $lightgray2;
      }
    }
  }

  &_actions{
    margin-top: auto;
  }
}
</style>