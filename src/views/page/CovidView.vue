<template>
<div class="container mt-3 mb-10">
  <article class="card text-white bg-color-primary mb-3">
    <header class="card-header d-flex align-items-center justify-content-between bg-color-primary text-center">
      <a href="#" class="position-absolute d-block" @click.prevent="$openTipModal('covid')">
        <img src="@/assets/image/icons/weather-icons/燈泡.png" alt="功能提示的燈泡圖片" height="35">
      </a>
      <h2 class="mb-0 mx-auto">COVID-19</h2>
    </header>
    <h2 class="mx-auto my-3">
      <figure class="img-fluid countyImage" :style="{backgroundImage: `url(${postCovidInfo.countyImage})`}"></figure>
      <figcaption><span class="fw-bold"> {{ countyNameEnToZhTw[postCovidInfo.currentCounty] || postCovidInfo.currentCounty }} </span> {{ today }}</figcaption>
    </h2>
    <div class="d-flex justify-content-center">
      <button type="button" class="bg-color-primary" :class="{'bg-color-primary-m': activeBtn===2, 'text-color-primary': activeBtn===2}"
              @click="getCovidData(postCovidInfo.currentCounty, 2)">前天</button>
      <button type="button" class="bg-color-primary mx-4" :class="{'bg-color-primary-m': activeBtn===1, 'text-color-primary': activeBtn===1}"
              @click="getCovidData(postCovidInfo.currentCounty, 1)">昨天</button>
      <button type="button" class="bg-color-primary" :class="{'bg-color-primary-m': activeBtn===0, 'text-color-primary': activeBtn===0}"
              @click="getCovidData(postCovidInfo.currentCounty, 0)">今天</button>
    </div>
    <details class="card-body" open>
      <summary><i class="text-danger">依照該國家公告時間更新</i></summary>
      <ul class="card-list">
        <li class="mb-1 border-bottom"><span class="fw-bold">公告的日期</span>：{{ postDate(postCovidInfo.公告的日期) }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">今日確診數</span>：{{ postCovidInfo.今日確診數 }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">今日死亡數</span>：{{ postCovidInfo.今日死亡數 }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">累計確診數</span>：{{ postCovidInfo.累計確診數 }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">累計死亡數</span>：{{ postCovidInfo.累計死亡數 }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">康復個案數</span>：{{ postCovidInfo.康復個案數 }}</li>
        <li class="mb-1 border-bottom"><span class="fw-bold">活躍個案數</span>：{{ postCovidInfo.活躍個案數 }}</li>
        <li class="border-bottom"><span class="fw-bold">已測試人數</span>：{{ postCovidInfo.已測試人數 }}</li>
      </ul>
    </details>
  </article>
  <footer class="text-center">
    <h2 class="mb-4">查詢其他國家疫情狀況</h2>
    <div class="mb-5">
      <select name="" id="" class="form-select bg-color-primary" @change="getCovidData(postCovidInfo.currentCounty)" v-model="postCovidInfo.currentCounty">
        <option :value="keys" v-for="(countyName, keys) in countyNameEnToZhTw" :key="keys">
          {{ countyName }}
          {{ keys }}
        </option>
      </select>
    </div>
    <div class="d-flex mb-3">
      <input type="search" class="form-control bg-color-primary border" v-model="postCovidInfo.currentCounty" placeholder="輸入國家'英文'名稱">
      <button type="button" class="form-control w-25 text-color-primary bg-color-primary-m btnHover border" @click="getCovidData(postCovidInfo.currentCounty)">查詢</button>
    </div>
      <span v-if="showSearchErrorNull"><i class="text-danger fw-bold">*您未輸入國家名稱，或輸入錯誤! <br> *請輸入國家名稱的"英文"(不分大小寫)</i></span>
  </footer>
</div>
<TipModal />
<IsLoading v-model:active="isLoading">
  <div class="cssload-battery">
    <div class="cssload-liquid"></div>
  </div>
</IsLoading>

</template>

<script>
import TipModal from '@/components/modal/TipModal.vue'
import emitter from '@/methods/emitter.js'
export default {

  components: {
    TipModal
  },

  provide () {
    return {
      emitter
    }
  },

  data () {
    return {
      apiPath: '',
      today: '',
      postCovidInfo: {
        currentCounty: 'taiwan',
        countyImage: '',
        公告的日期: '該國家尚未更新資料',
        今日確診數: '該國家尚未更新資料',
        今日死亡數: '該國家尚未更新資料',
        累計確診數: '該國家尚未更新資料',
        累計死亡數: '該國家尚未更新資料',
        康復個案數: '該國家尚未更新資料',
        活躍個案數: '該國家尚未更新資料',
        已測試人數: '該國家尚未更新資料'
      },
      countyNameEnToZhTw: {
        taiwan: '台灣',
        japan: '日本',
        's. korea': '南韓',
        thailand: '泰國',
        philippines: '菲律賓',
        usa: '美國',
        indonesia: '印尼',
        india: '印度',
        china: '中國'
      },
      showSearchErrorNull: false,
      isLoading: false,
      activeBtn: '',
      dayData: ['', '?yesterday=true', '?twoDaysAgo=true']
    }
  },

  methods: {
    getCovidData (country = 'taiwan', day = 0) { //* day：今天是 0、昨天是 1、前天是 2
      this.isLoading = true
      this.activeBtn = day
      if (!this.postCovidInfo.currentCounty) {
        this.showSearchErrorNull = true
        this.isLoading = false
        return
      }
      this.postCovidInfo.currentCounty = this.postCovidInfo.currentCounty.toLowerCase()
      const api = `${this.apiPath}${country}${this.dayData[day]}`
      const oneDay = 86400 //* 一天的秒數
      this.$http.get(api)
        .then(res => {
          this.isLoading = false
          this.postCovidInfo['公告的日期'] = res.data.updated - oneDay * day * 1000
          this.postCovidInfo['今日確診數'] = res.data.todayCases
          this.postCovidInfo['今日死亡數'] = res.data.todayDeaths
          this.postCovidInfo['累計確診數'] = res.data.cases
          this.postCovidInfo['累計死亡數'] = res.data.deaths
          this.postCovidInfo['康復個案數'] = res.data.recovered
          this.postCovidInfo['活躍個案數'] = res.data.active
          this.postCovidInfo['已測試人數'] = res.data.tests
          this.postCovidInfo.countyImage = res.data.countryInfo.flag
          this.showSearchErrorNull = false
        })
        .catch(() => {
          this.showSearchErrorNull = true
          this.isLoading = false
        })
    },
    postDate (unixTimestamp) {
      const date = new Date(unixTimestamp)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    getToday () {
      const date = new Date()
      this.today = `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_COVID_API
    this.getCovidData()
    this.getToday()
  }

}
</script>
