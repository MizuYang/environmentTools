<template>
  <header class="bg-color-primary-s mb-3">
    <NavbarLayout />
  </header>
  <MenuView />
  <router-view />
</template>

<script>
import NavbarLayout from '@/components/layout/NavbarLayout.vue'
import MenuView from '@/components/layout/MenuLayout.vue'
export default {
  components: {
    NavbarLayout,
    MenuView
  }
}
</script>
