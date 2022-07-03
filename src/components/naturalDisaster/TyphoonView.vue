<template>
<header class="position-sticky top-0 z-index-1 border-primary-m">
  <a href="#" class="bg-color-primary text-dark d-flex justify-content-center align-items-center h2 mb-0 py-2"
    @click.prevent="$goToPosition('typhoon')">颱風
    <img src="@/assets/image/icons/naturalDisaster-icons/颱風.png" class="shadowStyle ms-2" alt="颱風圖片" height="35">
  </a>
</header>
<div class="container" id="typhoon">
  <small class="text-center w-100 d-inline-block py-2 px-2">
    西北太平洋地區及南海
    <br class="d-lg-none">
    所有活動中熱帶氣旋
    熱帶性低氣壓及颱風過去、現在及未來預報資訊
  </small>

  <article class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item" v-for="typhoon in typhoonData" :key="typhoon">
      <h2 class="accordion-header" :id="`typhoon${typhoon.cwbTyphoonName}`">
        <button class="accordion-button bg-color-primary btnHover text-dark" type="button" @click="$openAccordionColor(typhoon.cwbTyphoonName)"
            :class="{'active-accordion-button-color': accordionButtonClickColor[typhoon.cwbTyphoonName] === typhoon.cwbTyphoonName}"
            data-bs-toggle="collapse" :data-bs-target="`#typhoonItem${typhoon.cwbTyphoonName}`" aria-expanded="true" :aria-controls="`typhoonItem${typhoon.cwbTyphoonName}`">
            <time class="mx-auto">{{ getDate(typhoon.analysisData.fix[0].fixTime) }}</time> <span class="fs-5">{{ typhoon.cwbTyphoonName }}颱風</span>
        </button>
      </h2>
      <div :id="`typhoonItem${typhoon.cwbTyphoonName}`" class="accordion-collapse collapse" :aria-labelledby="`typhoon${typhoon.cwbTyphoonName}`">
        <div class="accordion-body">
          <div class="card">
            <div class="card-body">
              <!--//* 分析數據 -->
              <h5 class="card-title d-flex justify-content-between">
                <time>{{ getDate(typhoonAnalyzeData[typhoonAnalyzeLen -1].fixTime) }}</time>
                <i class="card-subtitle mb-2 my-auto text-muted">分析數據</i></h5>
              <ul class="px-0">
                <li class="mb-2 border-bottom"><span class="fw-bold">座標：</span>{{ typhoonAnalyzeData[typhoonAnalyzeLen -1].coordinate }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">移動方向：</span>{{ directionEnToZh(typhoonAnalyzeData[typhoonAnalyzeLen -1].movingDirection) }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">移動速度：</span>{{ typhoonAnalyzeData[typhoonAnalyzeLen -1].movingSpeed }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">最大風速：</span>{{ typhoonAnalyzeData[typhoonAnalyzeLen -1].maxWindSpeed }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">最大陣風速度：</span>{{ typhoonAnalyzeData[typhoonAnalyzeLen -1].maxGustSpeed }}</li>
                <li><span class="fw-bold">移動預測：</span>{{ typhoonAnalyzeData[typhoonAnalyzeLen -1].movingPrediction[0].value }}</li>
              </ul>
              <hr />
              <!--//* 預測數據  -->
              <h5 class="card-title d-flex justify-content-between">
                <time>{{ getDate(typhoonForecastData[typhoonForecastLen -1].initTime) }}</time>
                <i class="card-subtitle mb-2 my-auto text-muted">預測數據</i></h5>
              <ul class="px-0">
                <li class="mb-2 border-bottom"><span class="fw-bold">座標：</span>{{ typhoonForecastData[typhoonForecastLen -1].coordinate }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">移動方向：</span>{{ directionEnToZh(typhoonForecastData[typhoonForecastLen -1].movingDirection) }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">移動速度：</span>{{ typhoonForecastData[typhoonForecastLen -1].movingSpeed }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">最大風速：</span>{{ typhoonForecastData[typhoonForecastLen -1].maxWindSpeed }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">最大陣風速度：</span>{{ typhoonForecastData[typhoonForecastLen -1].maxGustSpeed }}</li>
                <li class="mb-2 border-bottom"><span class="fw-bold">狀態：</span>{{ typhoonForecastData[typhoonForecastLen -1].stateTransfers[0].value }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</div>
  <IsLoading v-model:active="isLoading">
    <div class="cssload-battery">
      <div class="cssload-liquid"></div>
    </div>
  </IsLoading>
</template>

<script>

export default {

  data () {
    return {
      accordionButtonClickColor: {},
      typhoonData: [],
      typhoonDataLength: '',
      typhoonAnalyzeData: [], //* 分析數據
      typhoonAnalyzeLen: '',
      typhoonForecastData: [], //* 預測數據
      typhoonForecastLen: '',
      isLoading: false,
      directionEnToZhData: {
        E: '東',
        W: '西',
        S: '南',
        N: '北'
      },
      apiPath: ''
    }
  },

  methods: {
    getTyphoonData () {
      this.isLoading = true
      this.$http.get(this.apiPath)
        .then(res => {
          this.isLoading = false
          this.typhoonData = res.data.records.tropicalCyclones.tropicalCyclone
          this.typhoonDataLength = res.data.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix.length
          this.typhoonAnalyzeData = res.data.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix
          this.typhoonAnalyzeLen = res.data.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix.length
          this.typhoonForecastData = res.data.records.tropicalCyclones.tropicalCyclone[0].forecastData.fix
          this.typhoonForecastLen = res.data.records.tropicalCyclones.tropicalCyclone[0].forecastData.fix.length
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    //* 處理日期
    getDate (date) {
      const newDate = date.split('')
      const deleteIndex = date.split('').indexOf('T')
      newDate.splice(deleteIndex, date.length)
      return newDate.join('')
    },
    //* 東西南北方向英翻中
    directionEnToZh (dir) {
      const dirArr = []
      dir.split('').forEach(item => {
        dirArr.unshift(this.directionEnToZhData[item])
      })
      return dirArr.join('')
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_TYPHOON_API
    this.getTyphoonData()
  }

}
</script>
