<template>
  <header class="header position-sticky top-0 z-index-1 border-primary-m py-2 mb-3">
    <div class="container d-flex">
      <button type="button" class="header-link btnHover" data-tools="menu" @click="menuShow = !menuShow">
        <img src="@/assets/image/icons/weather-icons/設定.png" data-tools="menu" alt="設定工具的圖示" height="35">
      </button>
      <h2 class="m-auto">
        <a href="#" class="d-block" @click.prevent="$goToPosition('countyCard')">
          <span class="h2">{{ isClickCountyName }}天氣</span>
        </a>
      </h2>
    </div>
    <aside class="aside text-center bg-color-primary-s d-flex" :class="{'d-none': openSelectCountyBtn}">
      <button
        type="button"
        class="btn btn-style hover-btn active-btn fs-5 m-1"
        :class="{'active-county-color': keys === isClickCountyName}"
        v-for="(county, keys) in countyAPINumData"
        :key="keys"
        :data-api-num="county"
        @click="getSelectCountyWeather($event)"
      >
        {{ keys }}
      </button>
  </aside>
  </header>
  <main class="container">
    <section>
      <WeatherCounty :isClickCountyWeatherData="isClickCountyWeatherData" :mixReportData="mixReportData" />
    </section>
    <hr>
    <h2 class=" position-sticky bottom-m text-center bg-color-primary border-primary-m py-2">
      <a href="#" class="d-block" @click.prevent="$goToPosition('areaAccordion')">
        <span class="h2">{{ isClickCountyName }}各地區天氣</span>
      </a>
    </h2>
    <section class="mb-10">
      <WeatherArea :areaApiNum="areaApiNum" :apiPath="apiPath" :apiKey="apiKey" />
    </section>
  </main>
  <aside>
    <ul class="menu ps-1 p-2" data-tools="menu" :class="{'show': menuShow}">
      <li><button type="button" class="menu-link menu-link-hover mb-2" data-tools="menu" @click="openSelectCountyBtn= !openSelectCountyBtn">更換縣市</button></li>
      <li><button type="button" class="menu-link menu-link-hover mb-2" data-tools="menu">收藏地區</button></li>
      <li><button type="button" class="menu-link menu-link-hover" data-tools="menu" @click="closeAccordion">關閉折疊</button></li>
    </ul>
  </aside>
  <IsLoading v-model:active="isLoading">
    <div class="cssload-battery">
      <div class="cssload-liquid"></div>
    </div>
  </IsLoading>
</template>

<script>
import WeatherCounty from '@/components/weather/WeatherCounty.vue'
import WeatherArea from '@/components/weather/WeatherArea.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    WeatherCounty,
    WeatherArea
  },

  provide () {
    return {
      emitter
    }
  },

  data () {
    return {
      allCountyWeatherData: [],
      isClickCountyName: '新北市', //* 使用者選擇縣市
      isClickCountyWeatherData: [], //* 選擇縣市的data
      isShowDescriptionName: ['12小時降雨機率', '最低溫度', '最高溫度', '天氣現象', '紫外線指數'],
      mixReportData: [], //* 綜合天氣報告
      areaApiNum: '',
      openSelectCountyBtn: true,
      countyAPINumData: {
        基隆市: 'F-D0047-049',
        臺北市: 'F-D0047-061',
        新北市: 'F-D0047-069',
        桃園市: 'F-D0047-005',
        宜蘭縣: 'F-D0047-001',
        新竹縣: 'F-D0047-009',
        新竹市: 'F-D0047-053',
        苗栗縣: 'F-D0047-013',
        臺中市: 'F-D0047-073',
        彰化縣: 'F-D0047-017',
        南投縣: 'F-D0047-021',
        雲林縣: 'F-D0047-025',
        嘉義市: 'F-D0047-057',
        嘉義縣: 'F-D0047-029',
        臺南市: 'F-D0047-077',
        高雄市: 'F-D0047-065',
        屏東縣: 'F-D0047-033',
        臺東縣: 'F-D0047-037',
        花蓮縣: 'F-D0047-041',
        澎湖縣: 'F-D0047-045',
        連江縣: 'F-D0047-081',
        金門縣: 'F-D0047-085'
      },
      apiPath: '', //* API 網址
      apiKey: '', //* 驗證碼,
      isLoading: false,
      menuShow: false
    }
  },

  methods: {
    //* 取得選取的縣市天氣
    getSelectCountyWeather (e) {
      this.isClickCountyName = e.target.textContent
      const isClickCountyWeatherData = this.allCountyWeatherData.filter(county => {
        return county.locationName === this.isClickCountyName
      })
      this.isClickCountyWeatherData = []
      this.isShowDescription(isClickCountyWeatherData[0].weatherElement)
      this.areaApiNum = e.target.dataset.apiNum
    },
    //* 只取出自己要的氣象資訊
    isShowDescription (isClickCountyWeatherData) {
      this.isShowDescriptionName.forEach(descriptionName => {
        const allWeatherData = isClickCountyWeatherData
        const isShowDescriptionNameIndex = allWeatherData.findIndex(allWeatherData => {
          return allWeatherData.description === descriptionName
        })
        this.isClickCountyWeatherData.push(isClickCountyWeatherData[isShowDescriptionNameIndex])
        //* 只留近兩天的資料
        this.isClickCountyWeatherData.forEach(item => {
          item.time.splice(7, 100)
        })
      })
      this.getMixReport(isClickCountyWeatherData)
    },
    //* 取得所有縣市天氣，不可以選地區，預設為取得新北市
    getAllCountyWeather () {
      this.isLoading = true
      const apiStr = `${this.apiPath}F-D0047-091${this.apiKey}`
      this.$http
        .get(apiStr)
        .then((res) => {
          this.isLoading = false
          this.allCountyWeatherData = res.data.records.locations[0].location
          const newTaipeiCityWeatherData = res.data.records.locations[0].location[3].weatherElement
          this.isShowDescription(newTaipeiCityWeatherData)
        })
    },
    //* 取得綜合報告
    getMixReport (isClickCountyWeatherData) {
      const mixReport = isClickCountyWeatherData[10].time
      this.mixReportData = mixReport
    },
    //* 關閉所有手風琴
    closeAccordion () {
      const allDetails = document.querySelectorAll('.details')
      allDetails.forEach(el => {
        el.removeAttribute('open')
      })
      const allOpenAccordion = document.querySelectorAll('.show')
      allOpenAccordion.forEach(el => {
        el.classList.remove('show')
      })
      const allOpenAccordionColor = document.querySelectorAll('.active-accordion-button-color')
      allOpenAccordionColor.forEach(el => {
        el.classList.remove('active-accordion-button-color')
      })
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_WEATHER_API
    this.apiKey = process.env.VUE_APP_WEATHER_KEY
    this.getAllCountyWeather()
    //* 如果不是點 menu 的話，就自動收合 menu / 如果點了 menu 上的按鈕也會收合
    window.addEventListener('click', (e) => {
      if (e.target.dataset.tools !== 'menu') {
        this.menuShow = false
      } else if (e.target.type === 'button') {
        this.menuShow = false
      }
    })
  }
}
</script>
