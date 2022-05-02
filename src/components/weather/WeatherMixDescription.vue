<template>
<div class="card mb-2" v-for="(todayInfo, todayKeys) in todayWeather" :key="todayInfo" :class="{'bg-Night': todayKeys==='晚上'}">
  <div class="card-body">
    <h5 class="card-title d-flex justify-content-end align-items-center hover-color-s"><span>{{ getDate() }} {{ todayKeys }}</span>
      <span class="ms-auto p-1">{{ todayInfo['天氣現象'].elementValue[0].value }}</span>
      <img :src="weatherIconsStatus(todayInfo['天氣現象'].elementValue[0].value)"
        :alt="todayInfo['天氣現象'].elementValue[0].value" height="35">
    </h5>
    <ul class="px-0">
      <li class="hover-color-s mb-2"><span class="fw-bold">溫度：</span>{{ todayInfo['最低溫度'].elementValue[0].value }} ~
          {{ todayInfo['最高溫度'].elementValue[0].value }} {{ unitChange(todayInfo['最高溫度'].elementValue[0].measures) }}
          <img :src="temperatureWarnIcon(todayInfo)" :class="{'d-none': !temperatureWarnIcon(todayInfo)}" class="ms-2" alt="溫度警告" height="35">
      </li>
      <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>
        {{ todayInfo['降雨率'].elementValue[0].value }} {{ unitChange(todayInfo['降雨率'].elementValue[0].measures) }}
      </li>
      <li class="hover-color-s mb-2"><span class="fw-bold">紫外線：</span>{{ todayInfo['紫外線'].elementValue[0].value }}
        <span :class="`uv${todayInfo['紫外線'].elementValue[1].value}`">
          {{ uvDangerLv(todayInfo['紫外線'].elementValue[0].value, todayInfo['紫外線'].elementValue[1].value) }}
        </span>
      </li>
      <li class="hover-color-s mb-2">
        <details class="details">
          <summary class="fw-bold"> 綜合報告</summary>{{ todayInfo['綜合報告'].elementValue[0].value }}
        </details>
      </li>
    </ul>
  </div>
</div>

<div class="card mb-2" v-for="(tomorrowInfo, tomorrowKeys) in tomorrowWeather" :key="tomorrowInfo" :class="{'bg-Night': tomorrowKeys==='晚上'}">
  <div class="card-body">
    <h5 class="card-title d-flex justify-content-end align-items-center hover-color-s"><span>{{ getDate('tomorrow') }} {{ tomorrowKeys }}</span>
      <span class="ms-auto p-1">{{ tomorrowInfo['天氣現象'].elementValue[0].value }}</span>
      <img :src="weatherIconsStatus(tomorrowInfo['天氣現象'].elementValue[0].value)" :alt="tomorrowInfo['天氣現象'].elementValue[0].value" height="35">
    </h5>
    <ul class="px-0">
      <li class="hover-color-s mb-2"><span class="fw-bold">溫度：</span>{{ tomorrowInfo['最低溫度'].elementValue[0].value }} ~
          {{ tomorrowInfo['最高溫度'].elementValue[0].value }} {{ unitChange(tomorrowInfo['最高溫度'].elementValue[0].measures) }}
          <img :src="temperatureWarnIcon(tomorrowInfo)" :class="{'d-none': !temperatureWarnIcon(tomorrowInfo)}" class="ms-2" alt="溫度警告" height="35">
      </li>
      <li class="hover-color-s mb-2"><span class="fw-bold">降雨率：</span>
        {{ tomorrowInfo['降雨率'].elementValue[0].value }} {{ unitChange(tomorrowInfo['降雨率'].elementValue[0].measures) }}
      </li>
      <li class="hover-color-s mb-2"><span class="fw-bold">紫外線：</span>{{ tomorrowInfo['紫外線'].elementValue[0].value }}
        <span :class="`uv${tomorrowInfo['紫外線'].elementValue[1].value}`">
          {{ uvDangerLv(tomorrowInfo['紫外線'].elementValue[0].value, tomorrowInfo['紫外線'].elementValue[1].value) }}
        </span>
      </li>
      <li class="hover-color-s mb-2">
        <details class="details">
          <summary class="fw-bold"> 綜合報告</summary>{{ tomorrowInfo['綜合報告'].elementValue[0].value }}
        </details>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {

  props: ['isClickCountyWeatherData', 'mixReportData'],

  data () {
    return {
      data: {},
      todayMixReportData: [],
      todayWeather: {},
      tomorrowWeather: {},
      accordionButtonClickColor: {},
      date: ['日', '一', '二', '三', '四', '五', '六'],
      symbol: {
        百分比: '%',
        攝氏度: '℃',
        紫外線: ''
      },
      weatherIconsData: {
        雨天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%9B%A8%E5%A4%A9.png?raw=true',
        雷雨: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%9B%B7%E9%9B%A8.png?raw=true',
        晴天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E6%99%B4%E5%A4%A9.png?raw=true',
        陰天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%99%B0%E5%A4%A9.png?raw=true',
        多雲: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E5%A4%9A%E9%9B%B2.png?raw=true',
        多雲時晴: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E5%A4%9A%E9%9B%B2%E6%99%82%E6%99%B4.png?raw=true',
        高溫: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%AB%98%E6%BA%AB.png?raw=true',
        低溫: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E4%BD%8E%E6%BA%AB.png?raw=true',
        溫度適中: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E6%BA%AB%E5%BA%A6%E9%81%A9%E4%B8%AD.png?raw=true'
      }
    }
  },

  watch: {
    isClickCountyWeatherData () {
      this.getTodayMixReport()
    },
    mixReportData () {
      this.getTodayMixReport()
    }
  },

  methods: {
    getDate (day) {
      const date = new Date()
      //* 取得明天的日期
      if (day === 'tomorrow') date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
      return `${date.getMonth() + 1}/${date.getDate()} (${this.date[date.getDay()]})`
    },
    //* 取得今天天氣的綜合報告
    getTodayMixReport () {
      const todayMorning = []
      const todayEvenly = []
      const tomorrowMorning = []
      const tomorrowEvenly = []
      const description = ['降雨率', '最低溫度', '最高溫度', '天氣現象']
      //* 今明兩天氣象
      description.forEach((description, i) => {
        todayMorning[description] = this.isClickCountyWeatherData[i].time[0]
        todayEvenly[description] = this.isClickCountyWeatherData[i].time[1]
        tomorrowMorning[description] = this.isClickCountyWeatherData[i].time[2]
        tomorrowEvenly[description] = this.isClickCountyWeatherData[i].time[3]
      })
      //* 紫外線資料是 24小時的，不分白天黑夜，所以另外處理
      todayMorning['紫外線'] = this.isClickCountyWeatherData[4]?.time[0]
      todayEvenly['紫外線'] = this.isClickCountyWeatherData[4]?.time[0]
      tomorrowMorning['紫外線'] = this.isClickCountyWeatherData[4]?.time[1]
      tomorrowEvenly['紫外線'] = this.isClickCountyWeatherData[4]?.time[1]

      //* 今明兩天綜合報告
      todayMorning['綜合報告'] = this.mixReportData[0]
      todayEvenly['綜合報告'] = this.mixReportData[1]
      tomorrowMorning['綜合報告'] = this.mixReportData[2]
      tomorrowEvenly['綜合報告'] = this.mixReportData[3]

      this.todayWeather.白天 = { ...todayMorning }
      this.todayWeather.晚上 = { ...todayEvenly }
      this.tomorrowWeather.白天 = { ...tomorrowMorning }
      this.tomorrowWeather.晚上 = { ...tomorrowEvenly }
    },
    sortDate (date) {
      const splitDate = date.split('')
      return `${splitDate[5]}${splitDate[6]}/${splitDate[8]}${splitDate[9]} - ${splitDate[11]}${splitDate[12]}${splitDate[13]}${splitDate[14]}${splitDate[15]}`
    },
    //* 打開的手風琴顏色
    openAccordionColor (description) {
      if (this.accordionButtonClickColor[description]) {
        this.accordionButtonClickColor[description] = ''
      } else {
        this.accordionButtonClickColor[description] = description
      }
    },
    //* 單位轉換符號
    unitChange (unit) {
      return this.symbol[unit]
    },
    //* 紫外線危險程度
    uvDangerLv (dangerNum, classNameUvLv) {
      if (dangerNum <= 2) {
        this.uvLvColor(classNameUvLv, 1)
        return '低量級'
      } else if (dangerNum >= 3 && dangerNum <= 5) {
        this.uvLvColor(classNameUvLv, 2)
        return '中量級'
      } else if (dangerNum >= 6 && dangerNum <= 7) {
        this.uvLvColor(classNameUvLv, 3)
        return '高量級'
      } else if (dangerNum >= 8 && dangerNum <= 10) {
        this.uvLvColor(classNameUvLv, 4)
        return '過量級'
      } else if (dangerNum >= 11) {
        this.uvLvColor(classNameUvLv, 5)
        return '危險級'
      }
    },
    //* 紫外線強度顏色
    uvLvColor (classNameUvLv, lv) {
      this.$nextTick(() => {
        const el = document.querySelectorAll(`.uv${classNameUvLv}`)
        el.forEach(el => el.classList.add(`uv-lv${lv}`))
      })
    },
    //* 天氣 icons 轉換
    weatherIconsStatus (weather) {
      let src = ''
      if (weather === '多雲時晴' || weather === '晴時多雲') {
        src = '多雲時晴'
      } else if (weather === '多雲') {
        src = '多雲'
      } else if (weather.indexOf('雷雨') !== -1) {
        src = '雷雨'
      } else if (weather.indexOf('雨') !== -1) {
        src = '雨天'
      } else if (weather.indexOf('晴') !== -1) {
        src = '晴天'
      } else if (weather.indexOf('陰') !== -1) {
        src = '陰天'
      }
      return this.weatherIconsData[src]
    },
    //* 高溫、低溫 icons
    temperatureWarnIcon (temperature) {
      let temperatureTotal = ''
      if (temperature) {
        temperatureTotal = (parseInt(temperature['最低溫度'].elementValue[0].value) + parseInt(temperature['最高溫度'].elementValue[0].value)) / 2
        console.log(temperatureTotal)
        if (temperatureTotal <= 15) {
          return this.weatherIconsData['低溫']
        } else if (temperatureTotal >= 30) {
          return this.weatherIconsData['高溫']
        } else if (temperatureTotal < 30 && temperatureTotal > 15) {
          return this.weatherIconsData['溫度適中']
        } else {
          return false
        }
      }
    }
  }

}
</script>
