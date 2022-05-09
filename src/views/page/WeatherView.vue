<template>
  <header class="header position-sticky top-0 z-index-2 mb-3">
  <WeatherWarning />
    <div class="container d-flex justify-content-between align-items-center border-primary-m py-2">
      <button type="button" class="position-absolute d-block" @click="openTipModal" data-menu="menu" :disabled="tipDisAbled">
        <img src="@/assets/image/icons/weather-icons/燈泡.png" alt="功能提示的燈泡圖片" height="35" data-menu="menu">
      </button>
      <h2 class="m-auto w-100">
        <a href="#" class="d-block text-center" @click.prevent="$goToPosition('countyCard')">
          <span class="h2">{{ isClickCountyName }}天氣</span>
        </a>
      </h2>
    </div>
  </header>
  <main class="container">
    <section>
      <WeatherCounty :isClickCountyWeatherData="isClickCountyWeatherData" :mixReportData="mixReportData" />
    </section>
    <hr>
    <h2 class="position-sticky z-index-1 bottom-m text-center bg-color-primary border-primary-m py-2">
      <a href="#" class="d-block p-1" @click.prevent="$goToPosition('areaAccordion')">
        <span class="h2">{{ isClickCountyName }}各地區天氣</span>
      </a>
    </h2>
    <section>
      <WeatherArea :areaApiNum="areaApiNum" :apiPath="apiPath" :apiKey="apiKey" @getAllAreaName="getAllAreaName" />
    </section>
    <hr class="my-5">
    <h2 class=" position-sticky z-index bottom-m text-center bg-color-primary border-primary-m py-2 mb-3">
      <a href="#" class="d-block p-1" @click.prevent="$goToPosition('air')">
        <span class="h2">{{ isClickCountyName }}空氣汙染檢測</span>
      </a>
    </h2>

    <section class="mb-10">
      <WeatherAir :isClickCountyName="isClickCountyName" />
    </section>
  </main>
  <!-- 設定工具 -->
  <aside>
    <ul class="menu ps-1 p-2" data-menu="menu" :class="{'show': menuShow}">
      <!-- 選擇地區 -->
      <li class="border-bottom-m mb-2">
        <button type="button" class="menu-link menu-link-hover tipClickMeColorBtn py-1" :class="{'btnActive': menuCountyShow}" data-menu="selectAreaBtn"
                @click="menuCountyShow = !menuCountyShow; menuAreaShow = !menuAreaShow">選擇地區
          <a href="#" class="btnHover d-block" data-menu="menu" @click.prevent="menuShow = !menuShow">
            <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/weather-icons/456.png?raw=true"
              class="mouseClickImg" data-menu="menu" :class="{'menu-item-show': clickIconShow}">
          </a>
          <ul class="menu-county px-0" :class="{'menu-item-show': menuCountyShow}" data-menu="selectArea">
            <li class="border-bottom-m" data-menu="selectArea">縣市</li>
            <li class="border-bottom-m bg-color-primary p-1" v-for="(county, keys) in countyAPINumData" :key="keys" data-menu="selectArea">
              <a href="#" class="d-block text-dark fs-5 py-1" data-menu="selectArea" :data-api-num="county"
                :class="{'btnActive': keys === isClickCountyName}"
                @click.prevent="getSelectCountyWeather">{{ keys }}</a>
            </li>
          </ul>
          <ul class="menu-area px-0" :class="{'menu-area-show': menuAreaShow}" data-menu="selectArea">
            <li class="border-bottom-m" data-menu="selectArea">地區</li>
            <li class="border-bottom-m d-flex justify-content-between align-items-center p-1 bg-color-primary"
                v-for="(area, areaIndex) in allAreaName" :key="area" data-menu="selectArea">
              <label :for="`area${area}${areaIndex}`" class="d-block mx-auto text-dark fs-5 py-1" data-menu="selectArea"
                    :class="{'btnActive': true === collectArea[area]}">
                {{ area }}
              </label>
              <input :id="`area${area}${areaIndex}`" type="checkbox" class="collectAreaCheckbox me-2" data-menu="selectArea"
                    v-model="collectArea[area]" @click="addCollectArea(area)">
              <a href="#">
                <div class="goToAreaImgToggle" @click.prevent="getSelectCountyWeather($event,isClickCountyName,area)"></div>
              </a>
            </li>
          </ul>
        </button>
        <!-- 開啟選單的箭頭 -->
        <a href="#" class="openMenuArrow d-block d-bigScreen-none" data-menu="menu" v-if="!menuShow" @click.prevent="menuShow = !menuShow">
          <div data-menu="menu" class="openMenuArrowImg"></div>
        </a>
      </li>
      <!-- 收藏地區 -->
      <li class="border-bottom-m pb-3 mb-3" data-menu="menu">
        <button type="button" class="menu-link menu-link-hover py-1" data-menu="collectArea" :class="{'btnActive': menuCollectAreaShow}"
          @click="menuCollectAreaShow =!menuCollectAreaShow">收藏地區</button>
        <ul class="menu-collectArea text-center ps-0" :class="{'menu-collectArea-show': menuCollectAreaShow}" data-menu="collectArea">
          <li class="border-bottom-m" data-menu="collectArea">已收藏地區</li>
          <li class="border-bottom-m bg-color-primary" v-for="(countyName, areaName) in renderCollectData" :key="areaName" data-menu="collectArea">
            <button type="button" class="d-flex justify-content-between align-items-center border-primary-m btn-style text-dark w-100 py-2"
                  @click="getSelectCountyWeather($event,countyName,areaName)">
              <span class="mx-auto">{{ countyName }} {{ areaName }}</span>
              <div class="goToAreaImgToggle"></div>
            </button>
          </li>
          <!-- 清除收藏 -->
          <li class="bg-color-primary mt-5" v-if="Object.values(renderCollectData).length > 0">
            <button type="button" class="menu-link menu-link-hover w-100" @click="clearCollectData" data-menu="collectArea">清除收藏</button>
          </li>
          <!-- 沒有收藏時的提示 -->
          <li data-menu="collectArea" v-if="Object.values(renderCollectData).length === 0">
            <p class="p-2 mb-0" data-menu="collectArea">目前沒有收藏地區</p>
            <button type="button" class="border-bottom-m bg-color-primary " @click="menuCountyShow = true; menuAreaShow = true"
              data-menu="selectArea">點我選擇地區</button>
          </li>
        </ul>
      </li>
      <!-- 錨點 -->
      <li class="border-bottom-m mb-2" data-menu="menu"><button type="button" class="menu-link menu-link-hover py-1" @click="$goToPosition('countyCard')">縣市天氣</button></li>
      <li class="border-bottom-m mb-2" data-menu="menu"><button type="button" class="menu-link menu-link-hover py-1" @click="$goToPosition('areaAccordion')">地區天氣</button></li>
      <li class="border-bottom-m mb-3 pb-3 border-bottom" data-menu="menu"><button type="button" class="menu-link menu-link-hover py-1" @click="$goToPosition('air')">空氣品質</button></li>
      <li class="border-bottom-m mb-2 d-bigScreen-none"><button type="button" class="menu-link bg-secondary w-100">X</button></li>
    </ul>
  </aside>
  <WeatherTipModal @tipOpen="tipOpen" />
  <IsLoading v-model:active="isLoading">
    <div class="cssload-battery">
      <div class="cssload-liquid"></div>
    </div>
  </IsLoading>
</template>

<script>
import WeatherCounty from '@/components/weather/WeatherCounty.vue'
import WeatherArea from '@/components/weather/WeatherArea.vue'
import WeatherAir from '@/components/weather/WeatherAir.vue'
import WeatherTipModal from '@/components/weather/modal/WeatherTipModal.vue'
import WeatherWarning from '@/components/weatherWarning/WeatherWarning.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    WeatherCounty,
    WeatherArea,
    WeatherAir,
    WeatherWarning,
    WeatherTipModal
  },

  provide () {
    return {
      emitter
    }
  },

  data () {
    return {
      allCountyWeatherData: [],
      allAreaName: [],
      isClickCountyName: '新北市', //* 使用者選擇縣市
      isClickCountyWeatherData: [], //* 選擇縣市的data
      isShowDescriptionName: ['12小時降雨機率', '最低溫度', '最高溫度', '天氣現象', '紫外線指數'],
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
      isLoading: false,
      collectArea: {},
      menuShow: false,
      menuCountyShow: false,
      menuAreaShow: false,
      menuCollectAreaShow: false,
      clickIconShow: false,
      tipDisAbled: false,
      localStorageAreaData: JSON.parse(localStorage.getItem('collectArea')) || [],
      renderCollectData: {}

    }
  },

  methods: {
    //* 取得選取的縣市天氣
    getSelectCountyWeather (e, countyName, areaName) {
      if (countyName) {
        this.isClickCountyName = countyName
        this.areaApiNum = this.countyAPINumData[countyName]
        this.menuShow = false
        this.menuCollectAreaShow = false
        this.menuCountyShow = false
        this.menuAreaShow = false
        setTimeout(() => {
          const elData = document.querySelectorAll(`#area${areaName}`)
          elData.forEach((el) => el.classList.add('show')) //* 展開內容
          const areaNameEl = document.querySelector(`#${areaName}`)
          areaNameEl.classList.add('btnActive')//* 背景色高亮
          this.$goToPosition(areaName)
        }, 1000)
      } else {
        this.isClickCountyName = e.target.textContent
        this.areaApiNum = e.target.dataset.apiNum
      }
      const isClickCountyWeatherData = this.allCountyWeatherData.filter(county => {
        return county.locationName === this.isClickCountyName
      })
      this.isClickCountyWeatherData = []
      this.isShowDescription(isClickCountyWeatherData[0].weatherElement)
    },
    //* 只取出自己要的氣象資訊
    isShowDescription (isClickCountyWeatherData) {
      this.isShowDescriptionName.forEach(descriptionName => {
        const allWeatherData = isClickCountyWeatherData
        const isShowDescriptionNameIndex = allWeatherData.findIndex(allWeatherData => allWeatherData.description === descriptionName)
        this.isClickCountyWeatherData.push(isClickCountyWeatherData[isShowDescriptionNameIndex])
        //* 只留近兩天的資料
        this.isClickCountyWeatherData.forEach(item => item.time.splice(7, 100))
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
    },
    getAllAreaName (allAreaName) {
      this.allAreaName = allAreaName
    },
    //* 新增收藏地區 打勾盒子綁定 地名:true
    addCollectArea (area) {
      //* 如果收藏 data 是 地名:true，就變成false
      //! 刪除 localStorage
      if (this.collectArea[area] === true) {
        this.collectArea[area] = false
        //* 把 false 的地名做篩選 取出所有不是變成 false 地名的資料
        //* 重新賦予 localStorage 的 data 就可以做到刪除的功能
        const tempArr = this.localStorageAreaData.filter(item => Object.keys(item)[0] !== area)
        this.localStorageAreaData = tempArr
        localStorage.setItem('collectArea', JSON.stringify(this.localStorageAreaData))
      } else { //! 新增 localStorage
        //* 如果不是 地名:true ，就新增為 true 再推到 localStorage (新增功能)
        const obj = {}
        obj[area] = this.isClickCountyName
        this.collectArea[area] = true
        this.localStorageAreaData.push(obj)
        localStorage.setItem('collectArea', JSON.stringify(this.localStorageAreaData))
      }
      this.getRenderCollectData()
    },
    //* 渲染 localStorage 的收藏的地區，打勾狀態
    getCollectAreaCheckbox () {
      this.collectArea = {} //* 初始化
      this.localStorageAreaData.forEach(el => {
        this.collectArea[Object.keys(el)[0]] = true
      })
    },
    //* 渲染收藏的地點
    getRenderCollectData () {
      this.renderCollectData = {} //* 要先初始化，不然刪除地名，就得不會被刪掉
      this.localStorageAreaData.forEach(el => {
        this.renderCollectData[Object.keys(el)[0]] = Object.values(el)[0]
      })
    },
    clearCollectData () {
      this.localStorageAreaData = []
      localStorage.setItem('collectArea', JSON.stringify(this.localStorageAreaData))
      this.getRenderCollectData()
      this.getCollectAreaCheckbox()
    },
    openTipModal () {
      emitter.emit('openTipModal', 'weather')
    },
    tipOpen () {
      setTimeout(() => {
        this.tipDisAbled = true
        this.menuCollectAreaShow = false
        this.menuCountyShow = false
        this.menuAreaShow = false
        this.menuShow = true
        setTimeout(() => {
          document.querySelector('.tipClickMeColorBtn').classList.add('tipClickMeColor')
        }, 500)
        setTimeout(() => {
          this.clickIconShow = true
          this.$nextTick(() => {
            document.querySelector('.mouseClickImg').classList.add('mouseClick')
          })
        }, 2000)
        setTimeout(() => {
          this.menuCollectAreaShow = false
          this.menuCountyShow = true
          this.menuAreaShow = true
          this.clickIconShow = false
          this.tipDisAbled = false
        }, 2500)
      }, 1000)
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_WEATHER_API
    this.apiKey = process.env.VUE_APP_WEATHER_KEY
    this.getAllCountyWeather()
    this.getCollectAreaCheckbox()
    this.getRenderCollectData()

    window.addEventListener('click', (e) => {
      const target = e.target.dataset.menu
      //* 不是點 menu 的話就自動收合
      if (e.target.dataset.menu !== 'menu') {
        this.menuShow = false
        this.menuCountyShow = false
        this.menuAreaShow = false
        this.menuCollectAreaShow = false
        //* 點 menu 、收藏地區、選擇地區 選單不會消失
        if (target === 'menu' || target === 'collectArea' || target === 'selectArea' || target === 'selectAreaBtn') {
          this.menuShow = true
          this.menuAreaShow = true
          this.menuCountyShow = true
          //* 如果點收藏地區，縣市、地區視窗消失
          if (target === 'collectArea') {
            this.menuAreaShow = false
            this.menuCountyShow = false
            this.menuCollectAreaShow = true
          } else if (target === 'selectAreaBtn') {
            this.menuAreaShow = true
            this.menuCountyShow = true
            this.menuCollectAreaShow = false
          }
        }
      }
    })
  }
}
</script>
