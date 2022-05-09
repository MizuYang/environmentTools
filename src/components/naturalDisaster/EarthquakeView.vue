<template>
<header class="position-sticky top-0 z-index-2 bottom-m border-primary-m">
  <a href="#" class="bg-color-primary text-dark d-flex justify-content-center align-items-center h2 mb-0 py-2" @click.prevent="$goToPosition('earthquake')">地震
    <img src="@/assets/image/icons/naturalDisaster-icons/地震.png" class="shadowStyle ms-2" alt="地震圖片" height="35">
  </a>
</header>
<div class="container" id="earthquake">
<!-- 有感地震 -->
  <h2 class="text-center py-2">顯著有感地震報告</h2>
  <div class="accordion mb-4" id="accordionPanelsStayOpenExample">
    <div class="accordion-item mb-2 " v-for="earthquake in bigEarthquakeData" :key="earthquake.earthquakeNo">
      <h2 class="accordion-header" :id="`${earthquake.earthquakeNo}`">
        <button class="accordion-button bg-color-primary btnHover text-dark" type="button" data-bs-toggle="collapse"
          :data-bs-target="`#earthquake${earthquake.earthquakeNo}`" aria-expanded="true" :aria-controls="`earthquake${earthquake.earthquakeNo}`">
          <time class="mx-auto">{{ getDate(earthquake.earthquakeInfo.originTime) }}</time> {{ earthquake.earthquakeInfo.magnitude.magnitudeType }} {{ earthquake.earthquakeInfo.magnitude.magnitudeValue }}
        </button>
      </h2>
      <div :id="`earthquake${earthquake.earthquakeNo}`" class="accordion-collapse collapse" :aria-labelledby="`${earthquake.earthquakeNo}`">
        <div class="accordion-body p-3">
          <ul class="px-0">
            <li class="mb-2 border-bottom"><span class="fw-bold">時間：</span>{{ earthquake.earthquakeInfo.originTime }}</li>
            <li class="mb-2  border-bottom"><span class="fw-bold">地點：</span>{{ earthquake.earthquakeInfo.epiCenter.location }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">震級：</span>{{ earthquake.earthquakeInfo.magnitude.magnitudeType }} {{ earthquake.earthquakeInfo.magnitude.magnitudeValue }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">深度：</span>{{ earthquake.earthquakeInfo.depth.value }} {{ earthquake.earthquakeInfo.depth.unit }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">報告：</span>{{ earthquake.reportContent }}</li>
            <li><img :src="earthquake.reportImageURI" class="earthquakeReportImage mb-2" alt="地震報告圖"></li>
            <li class="d-flex">
              <a :href="earthquake.reportImageURI" target="_blank" class="btn btn-outline-primary d-block me-2 w-50">地震報告圖片</a>
              <a :href="earthquake.web" target="_blank" class="btn btn-outline-primary d-block w-50">地震測報中心</a>
            </li>
          </ul>
          <h3 class="text-center">影響地區</h3>
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item mb-2" v-for="(area, index) in earthquake.intensity.shakingArea" :key="area.areaName" :class="{'d-none': area.areaName.length > 6}">
              <h2 class="accordion-header" :id="`${area.areaName}${index}`">
                <button class="accordion-button bg-color-primary btnHover text-dark" type="button" data-bs-toggle="collapse" :data-bs-target="`#${area.areaName}Earthquake${index}`" aria-expanded="true"
                  :aria-controls="`${area.areaName}Earthquake${index}`">
                  <span class="ms-auto fs-5 me-auto">{{ area.areaName }}</span> <span>震度{{ area.areaIntensity.value }}{{ area.areaIntensity.unit }}</span>
                </button>
              </h2>
              <div :id="`${area.areaName}Earthquake${index}`" class="accordion-collapse collapse" :aria-labelledby="`${area.areaName}${index}`">
                <div class="accordion-body">
                  <ul class="card-body">
                    <li class="border-bottom text-center mb-2"><h3>{{ area.areaDesc }}</h3></li>
                    <article>
                      <p class="text-center mb-2" :class="{'d-none': area.eqStation.length == 0}">測量站觀測紀錄</p>
                      <details class="mb-3" v-for="station in area.eqStation" :key="station.stationName" :class="{'d-none': station.waveImageURI === undefined}">
                        <summary><span class="fw-bold">{{ station.stationName }}</span> 距離：{{ station.distance.value }}{{ station.distance.unit }}</summary>
                        <div :style="{ backgroundImage: `url(${station.waveImageURI})`}" class="stationViewEarthquakeViewImg"></div>
                      </details>
                    </article>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr>
<!-- 小區域有感地震報告 -->
  <h2 class="text-center py-2">小區域有感地震報告</h2>
  <div class="accordion mb-10" id="accordionPanelsStayOpenExample">
    <div class="accordion-item mb-2 " v-for="(earthquake,keys) in smallEarthquakeData" :key="`keys${keys}smallEarthquake`">
      <h2 class="accordion-header" :id="`${keys}smallEarthquake`">
        <button class="accordion-button bg-color-primary btnHover text-dark" type="button" data-bs-toggle="collapse"
          :data-bs-target="`#smallEarthquake${keys}`" aria-expanded="true" :aria-controls="`smallEarthquake${keys}`">
          <time class="mx-auto">{{ getDate(earthquake.earthquakeInfo.originTime) }}</time> {{ earthquake.earthquakeInfo.magnitude.magnitudeType }} {{ earthquake.earthquakeInfo.magnitude.magnitudeValue }}
        </button>
      </h2>
      <div :id="`smallEarthquake${keys}`" class="accordion-collapse collapse" :aria-labelledby="`${keys}smallEarthquake`">
        <div class="accordion-body p-3">
          <ul class="px-0">
            <li class="mb-2 border-bottom"><span class="fw-bold">時間：</span>{{ earthquake.earthquakeInfo.originTime }}</li>
            <li class="mb-2  border-bottom"><span class="fw-bold">地點：</span>{{ earthquake.earthquakeInfo.epiCenter.location }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">震級：</span>{{ earthquake.earthquakeInfo.magnitude.magnitudeType }} {{ earthquake.earthquakeInfo.magnitude.magnitudeValue }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">深度：</span>{{ earthquake.earthquakeInfo.depth.value }} {{ earthquake.earthquakeInfo.depth.unit }}</li>
            <li class="mb-2 border-bottom"><span class="fw-bold">報告：</span>{{ earthquake.reportContent }}</li>
            <li><img :src="earthquake.reportImageURI" class="earthquakeReportImage mb-2" alt="地震報告圖"></li>
            <li class="d-flex">
              <a :href="earthquake.reportImageURI" target="_blank" class="btn btn-outline-primary d-block me-2 w-50">地震報告圖片</a>
              <a :href="earthquake.web" target="_blank" class="btn btn-outline-primary d-block w-50">地震測報中心</a>
            </li>
          </ul>
          <h3 class="text-center">影響地區</h3>
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item mb-2" v-for="(area, index) in earthquake.intensity.shakingArea" :key="area.areaName" :class="{'d-none': area.areaName.length > 6}">
              <h2 class="accordion-header" :id="`smallQuake${area.areaName}${index}`">
                <button class="accordion-button bg-color-primary btnHover text-dark" type="button" data-bs-toggle="collapse" :data-bs-target="`#${area.areaName}SmallEarthquake${index}`" aria-expanded="true"
                  :aria-controls="`${area.areaName}SmallEarthquake${index}`">
                  <span class="ms-auto fs-5 me-auto">{{ area.areaName }}</span> <span>震度{{ area.areaIntensity.value }}{{ area.areaIntensity.unit }}</span>
                </button>
              </h2>
              <div :id="`${area.areaName}SmallEarthquake${index}`" class="accordion-collapse collapse" :aria-labelledby="`smallQuake${area.areaName}${index}`">
                <div class="accordion-body">
                  <ul class="card-body">
                    <li class="border-bottom text-center mb-2"><h3>{{ area.areaDesc }}</h3></li>
                    <article>
                      <p class="text-center mb-2" v-if="area.eqStation.length > 0">測量站觀測紀錄</p>
                      <div v-for="station in area.eqStation" :key="station.stationName" >
                        <p class=" text-center mx-auto"><span class="fw-bold">{{ station.stationName }}</span> 距離：{{ station.distance.value }}{{ station.distance.unit }}</p>
                      </div>
                    </article>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  data () {
    return {
      bigEarthquakeApiPath: '',
      smallEarthquakeApiPath: '',
      bigEarthquakeData: [],
      smallEarthquakeData: [],
      isLoading: false
    }
  },

  methods: {
    getBigEarthquakeData () {
      this.isLoading = true
      this.$http.get(this.bigEarthquakeApiPath)
        .then(res => {
          this.isLoading = false
          this.bigEarthquakeData = res.data.records.earthquake
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    getSmallEarthquakeData () {
      this.isLoading = true
      this.$http.get(this.smallEarthquakeApiPath)
        .then(res => {
          this.isLoading = false
          this.smallEarthquakeData = res.data.records.earthquake
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    //* 處理日期
    getDate (date) {
      return date.split(' ')[0]
    }
  },

  mounted () {
    this.bigEarthquakeApiPath = process.env.VUE_APP_EARTHQUAKE_BIG_API
    this.smallEarthquakeApiPath = process.env.VUE_APP_EARTHQUAKE_SMALL_API
    this.getBigEarthquakeData()
    this.getSmallEarthquakeData()
  }

}
</script>
