<template>
<!-- 今天氣象 -->
<div class="accordion mt-4" id="areaAccordion">
  <div class="accordion-item mb-1" v-for="(areaWeather, keys) in renderAreaWeatherData" :key="keys" >
    <h2 class="accordion-header" :id="`areaWeather${keys}`">
      <button class="accordion-button btnHover text-dark fs-5" :class="{'active-accordion-button-color': accordionButtonClickColor[keys] === keys}" type="button" data-bs-toggle="collapse" :data-bs-target="`#area${keys}`" aria-expanded="true" :aria-controls="`area${keys}`" @click="$openAccordionColor(keys)">
        {{ keys }}
      </button>
    </h2>
    <article :id="`area${keys}`" class="accordion-collapse collapse " :aria-labelledby="`areaWeather${keys}`">
      <details class="accordion-body m-2" open>
        <summary class="card-title">{{ $getDate() }}</summary>
        <div class="card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end align-items-center">
              <span>白天</span>
              <p class="ms-auto my-auto">{{ areaWeather.today.白天.天氣現象.elementValue[0].value }}</p>
              <img :src="$weatherIconsStatus(areaWeather.today.白天.天氣現象.elementValue[0].value)" class="ms-2" alt="天氣示意圖" height="35">
            </h6>
            <ul class="px-0">
              <li class="hover-color-s mb-2">
                <span class="fw-bold">溫度：</span>
                {{ areaWeather.today.白天.溫度.elementValue[0].value }} {{ $unitChange(areaWeather.today.白天.溫度.elementValue[0].measures) }}
                <img :src="temperatureWarnIcon(areaWeather.today.白天.溫度.elementValue[0].value)"
                    :class="{'d-none': !temperatureWarnIcon(areaWeather.today.白天.溫度.elementValue[0].value)}" class="ms-2" alt="溫度警告" height="35">
              </li>
              <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>{{ areaWeather.today.白天.降雨率.elementValue[0].value }} {{ $unitChange(areaWeather.today.白天.降雨率.elementValue[0].measures) }}</li>
              <li class="hover-color-s mb-2">
                <details>
                  <summary class="fw-bold">天氣預報綜合描述</summary>
                  {{ areaWeather.today.白天.天氣預報綜合描述.elementValue[0].value }}
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-body" :class="{'bg-Night': true}">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end align-items-center">
              <span>晚上</span>
              <p class="ms-auto my-auto">{{ areaWeather.today.晚上.天氣現象.elementValue[0].value }}</p>
              <img :src="$weatherIconsStatus(areaWeather.today.晚上.天氣現象.elementValue[0].value)" class="ms-2" alt="天氣示意圖" height="35">
            </h6>
            <ul class="px-0">
              <li class="hover-color-s mb-2">
                <span class="fw-bold">溫度：</span>
                {{ areaWeather.today.晚上.溫度.elementValue[0].value }} {{ $unitChange(areaWeather.today.晚上.溫度.elementValue[0].measures) }}
                <img :src="temperatureWarnIcon(areaWeather.today.晚上.溫度.elementValue[0].value)"
                    :class="{'d-none': !temperatureWarnIcon(areaWeather.today.晚上.溫度.elementValue[0].value)}" class="ms-2" alt="溫度警告" height="35">
              </li>
              <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>{{ areaWeather.today.晚上.降雨率.elementValue[0].value }} {{ $unitChange(areaWeather.today.晚上.降雨率.elementValue[0].measures) }}</li>
              <li class="hover-color-s mb-2">
                <details>
                  <summary class="fw-bold">天氣預報綜合描述</summary>
                  {{ areaWeather.today.晚上.天氣預報綜合描述.elementValue[0].value }}
                </details>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </article>
<!-- 明天氣象 -->
    <article :id="`area${keys}`" class="accordion-collapse collapse" :aria-labelledby="`areaWeather${keys}`">
      <details class="accordion-body m-2">
        <summary class="card-title">{{ $getDate('tomorrow') }}</summary>
        <div class="card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end align-items-center">
              <span>白天</span>
              <p class="ms-auto my-auto">{{ areaWeather.tomorrow.白天.天氣現象.elementValue[0].value }}</p>
              <img :src="$weatherIconsStatus(areaWeather.tomorrow.白天.天氣現象.elementValue[0].value)" class="ms-2" alt="天氣示意圖" height="35">
            </h6>
            <ul class="px-0">
              <li class="hover-color-s mb-2">
                <span class="fw-bold">溫度：</span>
                {{ areaWeather.tomorrow.白天.溫度.elementValue[0].value }} {{ $unitChange(areaWeather.tomorrow.白天.溫度.elementValue[0].measures) }}
                <img :src="temperatureWarnIcon(areaWeather.tomorrow.白天.溫度.elementValue[0].value)"
                    :class="{'d-none': !temperatureWarnIcon(areaWeather.tomorrow.白天.溫度.elementValue[0].value)}" class="ms-2" alt="溫度警告" height="35">
              </li>
              <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>{{ areaWeather.tomorrow.白天.降雨率.elementValue[0].value }} {{ $unitChange(areaWeather.tomorrow.白天.降雨率.elementValue[0].measures) }}</li>
              <li class="hover-color-s mb-2">
                <details>
                  <summary class="fw-bold">天氣預報綜合描述</summary>
                  {{ areaWeather.tomorrow.白天.天氣預報綜合描述.elementValue[0].value }}
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-body" :class="{'bg-Night': true}">
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end align-items-center">
              <span>晚上</span>
              <p class="ms-auto my-auto">{{ areaWeather.tomorrow.晚上.天氣現象.elementValue[0].value }}</p>
              <img :src="$weatherIconsStatus(areaWeather.tomorrow.晚上.天氣現象.elementValue[0].value)" class="ms-2" alt="天氣示意圖" height="35">
            </h6>
            <ul class="px-0">
              <li class="hover-color-s mb-2">
                <span class="fw-bold">溫度：</span>
                {{ areaWeather.tomorrow.晚上.溫度.elementValue[0].value }} {{ $unitChange(areaWeather.tomorrow.晚上.溫度.elementValue[0].measures) }}
                <img :src="temperatureWarnIcon(areaWeather.tomorrow.晚上.溫度.elementValue[0].value)"
                    :class="{'d-none': !temperatureWarnIcon(areaWeather.tomorrow.晚上.溫度.elementValue[0].value)}" class="ms-2" alt="溫度警告" height="35">
              </li>
              <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>{{ areaWeather.tomorrow.晚上.降雨率.elementValue[0].value }} {{ $unitChange(areaWeather.tomorrow.晚上.降雨率.elementValue[0].measures) }}</li>
              <li class="hover-color-s mb-2">
                <details>
                  <summary class="fw-bold">天氣預報綜合描述</summary>
                  {{ areaWeather.tomorrow.晚上.天氣預報綜合描述.elementValue[0].value }}
                </details>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </article>
  </div>
</div>
<IsLoading v-model:active="isLoading">
  <div class="cssload-battery">
    <div class="cssload-liquid"></div>
  </div>
</IsLoading>
</template>

<script>
import WeatherMixins from '@/components/weather/mixins/WeatherMixins.vue'
export default {

  props: ['areaApiNum', 'apiPath', 'apiKey'],

  mixins: [WeatherMixins],

  data () {
    return {
      allAreaName: [],
      allAreaWeatherData: [], //* 選擇的縣市中所有地區的天氣
      renderAreaWeatherData: {},
      isLoading: false
    }
  },

  watch: {
    //* 當前地區名稱改變就觸發取得地區
    areaApiNum () {
      this.allAreaName = []
      this.renderAreaWeatherData = {}
      this.getAllAreaWeather(this.areaApiNum)
    }
  },

  methods: {
    getAllAreaWeather (apiNum = 'F-D0047-069') {
      this.isLoading = true
      const apiStr = `${this.apiPath}${apiNum}${this.apiKey}`
      this.$http.get(apiStr)
        .then(res => {
          this.isLoading = false
          this.allAreaWeatherData = res.data.records.locations[0].location
          this.sortAreaName()
          this.getAllAreaName()
          this.isShowDescription()
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    getAllAreaName () {
      this.allAreaWeatherData.forEach(area => {
        this.allAreaName.push(area.locationName)
      })
    },
    sortAreaName () {
      this.allAreaWeatherData.sort((a, b) => {
        return a.geocode - b.geocode
      })
    },
    //* 只取出自己要的氣象資訊
    isShowDescription () {
      const weatherElement = {}
      const locationName = []
      this.allAreaWeatherData.forEach(allArea => {
        weatherElement[allArea.locationName] = allArea.weatherElement
        locationName.push(allArea.locationName)
      })
      locationName.forEach(locationName => {
        //* 地區 > 今天 > 白天 > 氣象 ：三重區: {today: {白天: {…}, 晚上: {…}}, tomorrow: {白天: {…}, 晚上: {…}}}
        //* 取抓氣象時間 / 今、明天 白天 6:00 / 晚上 18:00
        const todayMorning = []
        const todayEvenly = []
        todayMorning['降雨率'] = weatherElement[locationName][0].time[0]
        todayEvenly['降雨率'] = weatherElement[locationName][0].time[1]
        todayMorning['溫度'] = weatherElement[locationName][3].time[0]
        todayEvenly['溫度'] = weatherElement[locationName][3].time[4]
        todayMorning['天氣現象'] = weatherElement[locationName][1].time[0]
        todayEvenly['天氣現象'] = weatherElement[locationName][1].time[4]
        todayMorning['天氣預報綜合描述'] = weatherElement[locationName][6].time[0]
        todayEvenly['天氣預報綜合描述'] = weatherElement[locationName][6].time[4]

        //* 今天白天、晚上氣象
        const todayWeather = { 白天: { ...todayMorning }, 晚上: { ...todayEvenly } }
        this.renderAreaWeatherData[locationName] = { today: {}, tomorrow: {} }
        this.renderAreaWeatherData[locationName].today = todayWeather

        const tomorrowMorning = []
        const tomorrowEvenly = []
        tomorrowMorning['降雨率'] = weatherElement[locationName][0].time[2]
        tomorrowEvenly['降雨率'] = weatherElement[locationName][0].time[3]
        tomorrowMorning['溫度'] = weatherElement[locationName][3].time[8]
        tomorrowEvenly['溫度'] = weatherElement[locationName][3].time[12]
        tomorrowMorning['天氣現象'] = weatherElement[locationName][1].time[8]
        tomorrowEvenly['天氣現象'] = weatherElement[locationName][1].time[12]
        tomorrowMorning['天氣預報綜合描述'] = weatherElement[locationName][6].time[8]
        tomorrowEvenly['天氣預報綜合描述'] = weatherElement[locationName][6].time[12]

        //* 明天白天、晚上氣象
        const tomorrowWeather = { 白天: { ...tomorrowMorning }, 晚上: { ...tomorrowEvenly } }
        this.renderAreaWeatherData[locationName].tomorrow = tomorrowWeather
      })
    },
    sortDate (date) {
      if (date) {
        const splitDate = date.split('')
        return `${splitDate[5]}${splitDate[6]}/${splitDate[8]}${splitDate[9]}  -  ${splitDate[11]}${splitDate[12]}:${splitDate[17]}${splitDate[18]}`
      }
    },
    //* 高溫、低溫 icons
    temperatureWarnIcon (temperature) {
      if (temperature <= 15) {
        return this.weatherIconsData['低溫']
      } else if (temperature >= 30) {
        return this.weatherIconsData['高溫']
      } else if (temperature < 30 && temperature > 15) {
        return this.weatherIconsData['溫度適中']
      } else {
        return false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getAllAreaWeather()
    })
  }
}
</script>
