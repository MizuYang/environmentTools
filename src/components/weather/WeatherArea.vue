<template>
<div class="accordion" id="accordionExample">
  <div class="accordion-item mb-1" v-for="(areaWeather, keys) in renderAreaWeatherData" :key="keys" >
    <h2 class="accordion-header" :id="`areaWeather${keys}`">
      <button class="accordion-button btnHover text-dark fs-5" :class="{'active-accordion-button-color': accordionButtonClickColor[keys] === keys}" type="button" data-bs-toggle="collapse" :data-bs-target="`#area${keys}`" aria-expanded="true" :aria-controls="`area${keys}`" @click="openAccordionColor(keys)">
        {{ keys }}
      </button>
    </h2>
    <div :id="`area${keys}`" class="accordion-collapse collapse " :aria-labelledby="`areaWeather${keys}`">
      <div class="accordion-body" v-for="weatherTimeInfo in areaWeather" :key="weatherTimeInfo">
        <details class="details">
          <summary class="fs-4 my-3 ms-4 hover-color">
            {{ weatherTimeInfo.description }}
          </summary>
          <div v-for="time in weatherTimeInfo.time" :key="time" class="border-bottom hover-color d-flex justify-content-between justify-content-lg-evenly align-items-center">
            <time v-if="weatherTimeInfo.description !== '溫度'">{{ sortDate(time.startTime) }}</time>
            <time v-if="weatherTimeInfo.description === '溫度'">{{ sortDate(time.dataTime) }}</time>
            <mark v-if="weatherTimeInfo.description !== '天氣現象'">
              {{ time.elementValue[0].value }} {{ unitChange(time.elementValue[0].measures) }}
            </mark>
            <mark class="text-center rwdWord-s" v-if="weatherTimeInfo.description === '天氣現象'">
              {{ time.elementValue[0].value }}
            </mark>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>
<IsLoading v-model:active="isLoading">
  <div class="cssload-battery">
    <div class="cssload-liquid"></div>
  </div>
</IsLoading>
</template>

<script>
export default {

  props: ['areaApiNum', 'apiPath', 'apiKey'],

  data () {
    return {
      allAreaName: [],
      allAreaWeatherData: [], //* 選擇的縣市中所有地區的天氣
      renderAreaWeatherData: {},
      accordionButtonClickColor: {},
      symbol: {
        百分比: '%',
        攝氏度: '℃'
      },
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
        const tempArr = []
        tempArr.push(weatherElement[locationName][0])
        tempArr.push(weatherElement[locationName][3])
        tempArr.push(weatherElement[locationName][1])
        this.renderAreaWeatherData[locationName] = tempArr
      })
    },
    sortDate (date) {
      if (date) {
        const splitDate = date.split('')
        return `${splitDate[5]}${splitDate[6]}/${splitDate[8]}${splitDate[9]}  -  ${splitDate[11]}${splitDate[12]}:${splitDate[17]}${splitDate[18]}`
      }
    },
    //* 單位轉換符號
    unitChange (unit) {
      return this.symbol[unit]
    },
    //* 打開的手風琴顏色
    openAccordionColor (description) {
      if (this.accordionButtonClickColor[description]) {
        this.accordionButtonClickColor[description] = ''
      } else {
        this.accordionButtonClickColor[description] = description
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
