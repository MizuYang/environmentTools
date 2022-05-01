<template>
  <div class="card border-primary mb-3">
    <div class="card-header mb-1 text-center">
      <h5 class="card-title">天氣預報綜合描述</h5>
      <time class="fst-italic">{{ today }}</time>
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
  </div>
</template>

<script>
export default {
  inject: ['emitter'],

  data () {
    return {
      today: '',
      todayMixReportData: []
    }
  },

  methods: {
    getToday () {
      const date = new Date()
      this.today = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}點${date.getMinutes()}分`
    },
    //* 取得今天天氣的綜合報告
    getTodayMixReport (mixReportData) {
      this.todayMixReportData = []
      this.todayMixReportData.push(mixReportData[0])
      this.todayMixReportData.push(mixReportData[1])
      this.todayMixReportData.push(mixReportData[2])
    },
    sortDate (date) {
      const splitDate = date.split('')
      return `${splitDate[5]}${splitDate[6]}/${splitDate[8]}${splitDate[9]} - ${splitDate[11]}${splitDate[12]}${splitDate[13]}${splitDate[14]}${splitDate[15]}`
    }
  },

  mounted () {
    this.getToday()
    this.emitter.on('getTodayMixReport', (mixReportData) => { //* WeatherView 頁面 emitter
      this.getTodayMixReport(mixReportData)
    })
  },

  unmounted () {
    this.emitter.off('getTodayMixReport')
  }
}
</script>
