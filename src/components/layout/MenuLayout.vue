<template>
  <nav class="nav">
    <ul class="nav-menu d-flex justify-content-between list-unstyled bg-color-primary w-100">
      <li class="nav-item border-style border-start-solid border-end-solid" :class="{ 'active-menu-color' : currentPage === '/'}">
        <router-link to="/" class="nav-link btnHover text-dark fs-3">
          <img src="@/assets/image/icons/menu-icons/天氣.png" height="50" alt="天氣圖片">
          <br />天氣
        </router-link>
      </li>
      <li class="nav-item border-style border-start-solid border-end-solid" :class="{ 'active-menu-color' : currentPage === '/covid'}">
        <router-link to="/covid" class="nav-link btnHover text-dark fs-3">
          <img src="@/assets/image/icons/menu-icons/疫情.png" height="50" alt="COVID 病毒圖片">
          <br />疫情
        </router-link>
      </li>
      <li class="nav-item border-style border-start-solid border-end-solid" :class="{ 'active-menu-color' : currentPage === '/rapidTest'}">
        <router-link to="/rapidTest" class="nav-link btnHover text-dark fs-3">
          <img src="@/assets/image/icons/menu-icons/快篩.png" height="50" alt="COVID 快篩圖片">
          <br />快篩
        </router-link>
      </li>
      <li class="nav-item border-style border-start-solid border-end-solid btnHover" :class="{ 'active-menu-color' : currentPage === '/naturalDisaster'}">
        <router-link to="/naturalDisaster" class="nav-link  text-dark fs-3">
          <img src="@/assets/image/icons/menu-icons/天災.png" height="50" alt="天災示意圖">
          <br />天災
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
