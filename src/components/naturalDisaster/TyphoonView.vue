<template>
<h2 class="position-sticky top-0 z-index-1 border-primary-m">
  <a href="#" class="d-block w-100 bg-color-primary text-center text-dark h2 mb-0 py-2" @click.prevent="goToPosition('typhoon')">颱風</a>
</h2>
<div class="container mb-10">
  <small class="text-center w-100 d-inline-block py-2 px-2">
    西北太平洋地區及南海
    <br class="d-lg-none">
    所有活動中熱帶氣旋
    熱帶性低氣壓及颱風過去、現在及未來預報資訊
  </small>

  <article id="typhoon">
    <header class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item" v-for="typhoon in typhoonData" :key="typhoon">
        <h2 class="accordion-header" :id="`typhoon${typhoon.cwbTyphoonName}`">
          <button class="accordion-button bg-color-primary btnHover text-dark fs-5" type="button" :class="{'active-accordion-button-color': accordionButtonClickColor[typhoon.cwbTyphoonName] === typhoon.cwbTyphoonName}"
              data-bs-toggle="collapse" :data-bs-target="`#typhoonItem${typhoon.cwbTyphoonName}`" aria-expanded="true" :aria-controls="`typhoonItem${typhoon.cwbTyphoonName}`"  @click="$openAccordionColor(typhoon.cwbTyphoonName)">
              {{ typhoon.cwbTyphoonName }}颱風 {{ getDate(typhoon.analysisData.fix[0].fixTime) }}
          </button>
        </h2>
        <div :id="`typhoonItem${typhoon.cwbTyphoonName}`" class="accordion-collapse collapse" :aria-labelledby="`typhoon${typhoon.cwbTyphoonName}`">
          <div class="accordion-body">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between">{{ typhoon.cwbTyphoonName }}颱風 <i class="card-subtitle mb-2 my-auto text-muted">分析數據</i></h5>
                <ul class="px-0">
                  <li class="mb-2 border-bottom"><span class="fw-bold">更新時間：</span>{{ getDate(typhoon.analysisData.fix[typhoonDataLength -1].fixTime) }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">座標：</span>{{ typhoon.analysisData.fix[typhoonDataLength -1].coordinate }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">移動方向：</span>{{ directionEnToZh(typhoon.analysisData.fix[typhoonDataLength -1].movingDirection) }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">移動速度：</span>{{ typhoon.analysisData.fix[typhoonDataLength -1].movingSpeed }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">最大風速：</span>{{ typhoon.analysisData.fix[typhoonDataLength -1].maxWindSpeed }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">最大陣風速度：</span>{{ typhoon.analysisData.fix[typhoonDataLength -1].maxGustSpeed }}</li>
                  <li class="mb-2 border-bottom"><span class="fw-bold">移動預測：</span>{{ typhoon.analysisData.fix[typhoonDataLength -1].movingPrediction[0].value }}</li>
                  <li class="border-bottom"><span class="fw-bold">狀態：</span>{{ typhoon.forecastData.fix[1].stateTransfers[0].value }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </article>
</div>

</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      accordionButtonClickColor: {},
      typhoonData: [],
      typhoonDataLength: '',
      directionEnToZhData: {
        E: '東',
        W: '西',
        S: '南',
        N: '北'
      }
    }
  },

  watch: {
  },

  methods: {
    goToPosition (id) {
      const el = document.getElementById(`${id}`)
      //* chrome
      document.body.scrollTop = el.offsetTop
      //* firefox
      document.documentElement.scrollTop = el.offsetTop
      //* safari
      window.pageYOffset = el.offsetTop
    },
    getTyphoonData () {
      this.$http.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0034-005?Authorization=CWB-195F56AD-9C94-459C-8C06-55DA964337F9')
        .then(res => {
          console.log(res.data.records.tropicalCyclones.tropicalCyclone)
          this.typhoonData = res.data.records.tropicalCyclones.tropicalCyclone
          this.typhoonDataLength = res.data.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix.length
        })
        .catch(err => {
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
    this.getTyphoonData()
  }

}
</script>

<style lang='scss' scope></style>
