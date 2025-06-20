<script setup lang="ts">
import { ref } from 'vue';
import LinkMenu from './LinkMenu.vue';

const linkSelected = ref<string>('Fleet Location');

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

    <div class="db_main_menu_actions"></div>
  </div>
</template>

<style scoped lang="scss"></style>