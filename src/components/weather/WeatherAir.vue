<template>
<div class="container" id="air">
  <a href="https://airtw.epa.gov.tw/CHT/Information/Standard/AirQualityIndicator.aspx#:~:text=%E7%A9%BA%E6%B0%A3%E5%93%81%E8%B3%AA%E6%8C%87%E6%A8%99%20(AQI)%20%E8%88%87%E5%81%A5%E5%BA%B7%E5%BD%B1%E9%9F%BF%E5%8F%8A%E6%B4%BB%E5%8B%95%E5%BB%BA%E8%AD%B0" class="mb-3 d-block" target="_blank">空氣品質指標與健康影響及活動建議</a>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item mb-2" v-for="(area, keys) in aqiAreaData" :key="area">
      <h2 class="accordion-header" :id="`air${keys}`">
        <button class="accordion-button d-flex justify-content-center text-dark" type="button" data-bs-toggle="collapse" :data-bs-target="`#airItem${keys}`" aria-expanded="true" :aria-controls="`airItem${keys}`" :style="`background-color: ${aqiStatusColor[area.Status]}`">
          <span class="mx-auto fs-5">{{ area.SiteName }} 檢測站</span> {{ area.Status }}
        </button>
      </h2>
      <div :id="`airItem${keys}`" class="accordion-collapse collapse" :aria-labelledby="`air${keys}`">
        <div class="accordion-body">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><span class="fw-bold">更新時間：</span><time>{{ getTime(area.ImportDate) }}</time></h5>
              <ul class="px-0">
                <li class="border-bottom-m mb-2"><span class="fw-bold">空氣品質指標 <small>AQI</small>：</span>{{ area.AQI }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">狀態：</span>{{ area.Status }}
                  <span class="ms-1 rounded-circle border" :style="`background-color: ${aqiStatusColor[area.Status]}`" style="padding:0.5px 15px;"></span>
                </li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">空氣污染指標物：</span>{{ area.Pollutant==='' ?   '無' : area.Pollutant }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">一氧化碳 <small>CO(ppm)</small>：</span>{{ area.CO }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">一氧化氮 <small>NO(ppb)</small>：</span>{{ area.NO }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">二氧化氮 <small>NO2(ppb)</small>：</span>{{ area.NO2 }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">氮氧化物 <small>NOx(ppb)</small>：</span>{{ area.NOx }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">臭氧 <small>O3(ppb)</small>：</span>{{ area.O3 }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">細懸浮微粒 <small>PM2.5(μg/m3)</small>：</span>{{ area['PM2.5'] }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">懸浮微粒平均 <small>PM10(μg/m3)</small>：</span>{{ area.PM10_AVG }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">二氧化硫 <small>SO2(ppb)</small>：</span>{{ area.SO2 }}</li>
                <li class="border-bottom-m mb-2"><span class="fw-bold">風向：</span>{{ area.WIND_DIREC ? area.WIND_DIREC: '-' }}</li>
                <li><span class="fw-bold">風速：</span>{{ area.WIND_SPEED ? area.WIND_SPEED: '-' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<h3 class="text-center" v-if="aqiData.length === 0">
  資料若沒顯示，
  <br>
  代表環保署正在更新資料，
  <br>
  稍後一下資料就會出現了。
</h3>

</template>

<script>

export default {

  props: ['isClickCountyName'],

  data () {
    return {
      aqiData: [],
      aqiAreaData: [],
      apiPath: '', //* API 網址
      apiKey: '', //* 驗證碼
      apiQuery: '',
      aqiStatusColor: {
        良好: '#E5F4EF',
        普通: '#FFFFE9',
        對敏感族群不健康: '#FFF4EA',
        對所有族群不健康: '#FAE5EA',
        非常不健康: '#F0E5F5',
        危害: '#F2E5E9'
      }
    }
  },

  watch: {
    isClickCountyName () {
      this.getAllAqiData()
    }
  },

  methods: {
    getAllAqiData () {
      this.$http.get(`${this.apiPath}${this.apiKey}${this.apiQuery}`)
        .then(res => {
          console.log(res)
          this.aqiData = res.data.records
          this.getAreaAiqData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAreaAiqData () {
      this.aqiAreaData = this.aqiData.filter(allAqiCounty => allAqiCounty.County === this.isClickCountyName)
    },
    getTime (time) {
      const newTime = time.split('')
      newTime.splice(-7, newTime.length)
      return newTime.join('')
    }
  },

  mounted () {
    this.apiKey = process.env.VUE_APP_AIR_KEY
    this.apiPath = process.env.VUE_APP_AIR_API
    this.apiQuery = process.env.VUE_APP_AIR_QUERY
    this.$nextTick(() => {
      this.getAllAqiData()
    })
  }

}
</script>
