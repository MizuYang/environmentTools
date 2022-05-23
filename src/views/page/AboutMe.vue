<template>
  <div class="about mt-3 mb-4 text-center">
    <div class="container w-low">
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/cat.jpg?raw=true" class="mb-3" alt="貓咪害羞圖" height="180">
      <h2 class="h3">您是第 <strong class="h2 text-danger">{{ visitsCount }}</strong> 位訪客</h2>
      <a href="https://equatorial-alloy-23b.notion.site/f6226e0c3e42458898d5cbdda240f6b6" target="_blank" class="btn btn-outline-primary d-block mb-3">觀看開發紀錄</a>
      <a href="https://equatorial-alloy-23b.notion.site/Mizu_-dc646b31574641de856dd54ac3f6cc1b" target="_blank" class="btn btn-outline-primary d-block mb-3">技術部落格</a>
      <a href="mailto:psdk55052004@gmail.com" class="btn btn-outline-primary d-block mb-3"><i class="bi bi-envelope"></i> 聯絡我</a>
    </div>
    <div class=" mb-2"><h1 class="text-style">你這樣偷看我，我會害羞啦</h1></div>
    <div class=" mb-2"><p class="text-style">此作品為練習使用<br>無任何商業用途</p></div>
    <div class=" mb-2"><a href="https://www.flaticon.com/" class="text-style" target="_blank">icons 來源</a></div>
  </div>

  <h3 class="text-center">小彩蛋</h3>
  <ul class="d-flex justify-content-center flex-wrap w-100 text-center px-2">
    <li class="px-2" v-for="(weatherUrl, keys) in weatherIconsData" :key="keys">
      <img :src="weatherUrl" :alt="`${keys}的 icon 圖`" height="35">
      <p class="my-2">{{ keys }}</p>
    </li>
  </ul>
  <ul class=" mb-10 text-center px-0">
    <li class="mb-1" :class="`uv-lv${index + 1}`" v-for="(ulDangerLv, index) in ulDangerLvData" :key="`ulDangerLv${ulDangerLv}`">紫外線指數：{{ $uvDangerLv(ulDangerLv) }}</li>
  </ul>
</template>

<script>
import WeatherMixins from '@/components/weather/mixins/WeatherMixins.vue'
export default {

  data () {
    return {
      ulDangerLvData: [1, 3, 6, 8, 11],
      apiPath: '',
      visitsCount: ''
    }
  },

  mixins: [WeatherMixins],

  mounted () {
    this.visitsCount = JSON.parse(localStorage.getItem('visitsCount')) //* HomeView
  }

}
</script>

<style lang="scss" scoped>
.text-style {
  font-size: 1.5rem;
  margin: 0 auto;
}
.w-low {
  @media (min-width: 768px) {
    width: 45%;
  }
  @media (min-width: 1024px) {
    width: 30%;
  }
  @media (min-width: 1536px) {
    width: 20%;
  }
  @media (min-width: 1536px) {
    width: 20%;
  }
  @media (min-width: 2752px) {
    width: 10%;
  }
}
</style>
