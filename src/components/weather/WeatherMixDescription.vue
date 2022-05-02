<template>
<div class="card mb-2" v-for="(todayInfo, todayKeys) in todayWeather" :key="todayInfo" :class="{'bg-Night': todayKeys==='晚上'}">
  <div class="card-body">
    <h5 class="card-title d-flex justify-content-end align-items-center hover-color-s">{{ getDate() }} {{ todayKeys }}
      <span class="ms-auto p-1">{{ todayInfo['天氣現象'].elementValue[0].value }}</span>
      <!-- <img :src="`@/assets/image/icons/${weatherIconsStatus(todayInfo['天氣現象'].elementValue[0].value)}.png`" -->
      <img :scr="weatherIconsStatus(todayInfo['天氣現象'].elementValue[0].value)"
      :class="weatherIconsStatus(todayInfo['天氣現象'].elementValue[0].value)" alt="天氣圖" height="35">
<!-- {{ weatherIconsStatus(todayInfo['天氣現象'].elementValue[0].value) }} -->
    </h5>
    <ul class="px-0">
      <li class="hover-color-s mb-2"><span class="fw-bold">溫度：</span>{{ todayInfo['最低溫度'].elementValue[0].value }} ~
          {{ todayInfo['最高溫度'].elementValue[0].value }} {{ unitChange(todayInfo['最高溫度'].elementValue[0].measures) }}
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
    <h5 class="card-title d-flex justify-content-end align-items-center hover-color-s">{{ getDate('tomorrow') }} {{ tomorrowKeys }}
      <span class="ms-auto p-1">{{ tomorrowInfo['天氣現象'].elementValue[0].value }}</span>
      <img src="@/assets/image/icons/多雲.png" :class="tomorrowInfo['天氣現象'].elementValue[0].value" alt="天氣圖" height="35">
    </h5>
    <ul class="px-0">
      <li class="hover-color-s mb-2"><span class="fw-bold">溫度：</span>{{ tomorrowInfo['最低溫度'].elementValue[0].value }} ~
          {{ tomorrowInfo['最高溫度'].elementValue[0].value }} {{ unitChange(tomorrowInfo['最高溫度'].elementValue[0].measures) }}
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
<!-- <div class="card mb-5">
  <div class="card-body">
    <h5 class="card-title d-flex justify-content-between align-items-center">{{ getDate('tomorrow') }}
      <img src="@/assets/image/icons/clouds.png" alt="" height="35">
      <span class="bg-color-primary p-1">多雲時陰短暫陣雨</span>
    </h5>
    <ul>
      <h6>白天</h6>
      <li class="text-color-primary-m"></li>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </ul>
  </div>
</div> -->

  <!-- <div class="card border-primary mb-3">
    <div class="card-header mb-1 text-center">
      <h5 class="card-title">天氣預報綜合描述</h5>
      <time class="fst-italic">{{ todayDate }}</time>
    </div>
    <div class="card-body text-primary text-center d-Legion-flex">
      <article class="card-text w-100 mb-2" v-for="mixReport in todayMixReportData" :key="mixReport">
        <div v-for="content in mixReport.elementValue[0]" :key="content" :class="{'d-none': content === 'NA'}">
          <div class="card" >
            <details class="card-body details px-0">
              <summary class="card-title fs-3">
                <time class="bg-color-primary">
                  {{ sortDate(mixReport.startTime) }} ~ {{ sortDate(mixReport.endTime) }}
                </time>
              </summary>
              <p class="card-text">{{ content }}</p>
            </details>
          </div>
        </div>
      </article>
    </div>
  </div> -->
</template>

<script>
export default {
  // inject: ['emitter'],

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
        雨天: '@/assets/image/icons/雨天.png',
        晴天: '@/assets/image/icons/晴天.png',
        陰天: '@/assets/image/icons/陰天.png',
        多雲: '@/assets/image/icons/多雲.png',
        高溫: '@/assets/image/icons/高溫.png',
        低溫: '@/assets/image/icons/低溫.png',
        多雲時晴: '@/assets/image/icons/多雲時晴.png'
      }
      // weatherIconSrc: ''
      // weatherIcons: {
      //   陰: '',
      //   晴: '',
      //   陰天: '',
      //   陣雨: '',
      //   多雲: '',
      //   陰陣雨: '',
      //   短暫雨: '',
      //   短暫陣雨: '',
      //   陰時多雲: '',
      //   多雲時陰: '',
      //   陰短暫陣雨: '',
      //   陰時多雲陣雨: ''
      // }
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
      console.log(weather)
      console.log(weather.indexOf('陰'))

      // if (weather.indexOf('雨') !== -1) {
      //   this.weatherIconsSrc('雨天')
      //   return '陰天'
      // } else if (weather.indexOf('陰') !== -1) {
      //   this.weatherIconsSrc('陰天')
      //   return '陰天'
      // }
      return '@/assets/image/icons/晴天.png'

      // this.$nextTick(() => {
      //   const icons = document.querySelectorAll('.icon-陰陣雨')
      //   console.log(icons)
      // })
      // if (weather.indexOf('陰')) {
      //   const icons = document.querySelectorAll('.icon')
      //   console.log(icons)
      // }

      //       weatherIconsData: {
      //   雨天: '@/assets/image/icons/雨天.png',
      //   晴天: '@/assets/image/icons/晴天.png',
      //   陰天: '@/assets/image/icons/陰天.png',
      //   多雲: '@/assets/image/icons/多雲.png',
      //   高溫: '@/assets/image/icons/高溫.png',
      //   低溫: '@/assets/image/icons/低溫.png',
      //   多雲時晴: '@/assets/image/icons/多雲時晴.png'

      // }
    },
    weatherIconsSrc (weatherStatus) {
      console.log(weatherStatus)
      this.$nextTick(() => {
        const icons = document.querySelectorAll(`.${weatherStatus}`)
        console.log(icons)
      })
    }
  },

  mounted () {
    // setTimeout(() => {
    //   this.getTodayMixReport()
    // }, 2000)

    // this.$nextTick(() => {
    //   this.getTodayMixReport()
    // })
    // this.emitter.on('getTodayMixReport', (weatherData) => { //* WeatherView 頁面 emitter
    //   console.log(weatherData)
    //   // this.weatherData = weatherData
    //   this.getTodayMixReport(weatherData)
    //   // this.todayWeather = weatherData
    //   // this.$nextTick(() => {
    //   //   this.getTodayMixReport(weatherData)
    //   // })
    // })
  }

  // unmounted () {
  //   this.emitter.off('getTodayMixReport')
  // }
}
</script>
