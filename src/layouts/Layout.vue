<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Contactos App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item
          clickable
          v-ripple
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
        >
          <q-item-section avatar>
            <q-icon color="primary" :name="item.icon" />
          </q-item-section>

          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const icono = ref("menu");
    const menuItems = ref([
      {
        label: "Home",
        to: "/home",
        icon: "home",
      },
      {
        label: "Usuarios",
        to: "/usuarios",
        icon: "person_outline",
      },
    ]);
    return {
      icono,
      menuItems,
      leftDrawerOpen,
      toggleLeftDrawer() {
        icono.value = "blur_circular";
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
