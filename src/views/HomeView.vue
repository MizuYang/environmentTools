<template>
  <header class="bg-color-primary-s">
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
  },

  methods: {
    getVisitsCount () {
      this.$http.get(this.apiPath)
        .then(res => {
          const visitsCount = res.data.value
          localStorage.setItem('visitsCount', visitsCount) //* AboutMe 取出
        })
    }
  },
  mounted () {
    this.apiPath = process.env.VUE_APP_VISITS_COUNT_API
    this.getVisitsCount()
  }
}
</script>
