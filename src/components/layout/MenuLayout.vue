<template>
  <nav class="nav">
    <ul class="nav-menu d-flex justify-content-between list-unstyled bg-color-primary w-100">
      <li class="nav-item border-style border-start-solid border-end-solid" :class="{ 'active-menu-color' : currentPage === '/'}">
        <router-link to="/" class="nav-link btnHover text-dark fs-3">
          <i class="fa-solid fa-cloud-sun-rain icon-lg"></i>
          <br>天氣查詢
        </router-link>
      </li>
      <li class="nav-item border-style border-start-solid border-end-solid" :class="{ 'active-menu-color' : currentPage === '/covid'}">
        <router-link to="/covid" class="nav-link btnHover text-dark fs-3">
          <i class="fa-solid fa-virus-covid icon-lg"></i>
          <br>疫情查詢
        </router-link>
      </li>
      <li class="nav-item border-style border-start-solid border-end-solid btnHover" :class="{ 'active-menu-color' : currentPage === '/about'}">
        <router-link to="/about" class="nav-link  text-dark fs-3">
          <i class="fa-solid fa-address-card icon-lg"></i>
          <br>關於我
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

  data () {
    return {
      currentPage: ''
    }
  },

  watch: {
    $route (to) {
      this.currentPage = to.path
    }
  },

  mounted () {
    this.currentPage = this.$route.path
  }

}
</script>
