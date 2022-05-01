<template>
  <main class="container">
    <header>
      <h2 class="text-center"><span class="h2 border-bottom">{{ isClickCountyName }}</span> 天氣預報</h2>
      <WeatherMixDescription />
    </header>
    <details class="details mb-3 text-center" open>
      <summary class="fs-3 mb-2"><span class="h2 border-bottom">{{ isClickCountyName }}</span> 天氣資訊 </summary>
      <section>
        <WeatherCounty :isClickCountyWeatherData="isClickCountyWeatherData" />
      </section>
    </details>
    <hr>
    <section class="mb-11">
      <h2 class="text-center"><span class="h2 border-bottom">{{ isClickCountyName }}</span> 各地區天氣</h2>
      <WeatherArea :areaApiNum="areaApiNum" :apiPath="apiPath" :apiKey="apiKey" />
    </section>

  </main>
  <aside class="aside text-center bg-color-primary-s">
      <button
        type="button"
        class="btn btn-style hover-btn active-btn fs-5 mt-2 m-1"
        :class="{'active-county-color': keys === isClickCountyName}"
        v-for="(county, keys) in countyAPINumData"
        :key="keys"
        :data-api-num="county"
        @click="getSelectCountyWeather($event)"
      >
        {{ keys }}
      </button>
  </aside>
  <button type="button" class="closeAccordion" @click="closeAccordion">關閉折疊</button>
  <IsLoading v-model:active="isLoading">
    <div class="cssload-battery">
      <div class="cssload-liquid"></div>
    </div>
  </IsLoading>
</template>

<script>
import WeatherMixDescription from '@/components/weather/WeatherMixDescription.vue'
import WeatherCounty from '@/components/weather/WeatherCounty.vue'
import WeatherArea from '@/components/weather/WeatherArea.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    WeatherMixDescription,
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
      isShowDescriptionName: ['12小時降雨機率', '最低溫度', '最高溫度', '紫外線指數'],
      mixReportData: [], //* 綜合天氣報告
      areaApiNum: '',
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
      isLoading: false
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
        const allDescriptionName = isClickCountyWeatherData
        const isShowDescriptionNameIndex = allDescriptionName.findIndex(allDescriptionName => {
          return allDescriptionName.description === descriptionName
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
      emitter.emit('getTodayMixReport', this.mixReportData) //* WeatherMixDescription 頁面 .on
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
  }
}
</script>
