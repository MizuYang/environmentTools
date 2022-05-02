<template>
  <figure class="container d-flex py-1 mb-0">
    <router-link to="/aboutMe">
    <img
      :src="logoImageSrc"
      class="logoImage"
      alt="LOGO"
      height="80"
      width="135"/></router-link>
    <ul class="d-flex flex-wrap justify-content-center align-items-center m-auto">
      <li>
        <a
          href="https://github.com/MizuYang"
          target="_blank"
          class="me-2 px-2"
          title="連到 github"
        >
          <i class="bi bi-github icon"></i>
        </a>
      </li>
      <li>
        <a
          href="https://equatorial-alloy-23b.notion.site/Mizu_-dc646b31574641de856dd54ac3f6cc1b"
          target="_blank"
          class="me-3"
          title="連到個人部落格"
        >
          <i class="bi bi-facebook icon"></i>
        </a>
      </li>
      <li>
        <a href="mailto:psdk55052004@gmail.com"
          ><i class="bi bi-envelope icon"></i>
        </a>
      </li>
      <time class="ms-md-4">
        {{ getToday() }}
      </time>
    </ul>
  </figure>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      logoImageSrc: '',
      logoImageData: {
        '/': 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/weather.png?raw=true',
        '/covid': 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/covid.png?raw=true',
        '/naturalDisaster': 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/naturalDisaster.png?raw=true',
        '/aboutMe': 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/about.png?raw=true'
      },
      date: ['日', '一', '二', '三', '四', '五', '六']
    }
  },

  watch: {
    $route (to) {
      const currentPage = to.path
      this.logoImageSrc = this.logoImageData[currentPage]
    }
  },

  methods: {
    getToday () {
      const date = new Date()
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${this.date[date.getDay()]})`
    }
  },

  mounted () {
    const currentPage = this.$route.path
    this.logoImageSrc = this.logoImageData[currentPage]
  }
}
</script>
