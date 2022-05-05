<template>
  <header class="header position-sticky top-0 z-index-1 border-primary-m py-2 mb-3">
    <div class="container d-flex">
      <a href="#" class="header-link shadowStyle btnHover d-block p-1" data-menu="menu" @click.prevent="menuShow = !menuShow">
        <img src="@/assets/image/icons/weather-icons/設定.png" data-menu="menu" alt="設定工具的圖示" height="35">
      </a>
      <h2 class="m-auto">
        <a href="#" @click.prevent="$goToPosition('countyCard')">
          <span class="h2 shadowStyle p-1">{{ isClickCountyName }}天氣</span>
        </a>
      </h2>
    </div>
    <aside class="aside text-center bg-color-primary-s d-flex align-items-center" :class="{'menu-county-show': selectCountyBtnShow}" data-menu="selectAreaList">
      <button
        type="button"
        class="border-primary-m btn-style hover-btn active-btn fs-5 m-1"
        :class="{'active-county-color': keys === isClickCountyName}"
        v-for="(county, keys) in countyAPINumData"
        :key="keys"
        :data-api-num="county"
        @click="getSelectCountyWeather($event)"
        data-menu="selectAreaList"
      >
        {{ keys }}
      </button>
    </aside>
  </header>
  <main class="container">
    <section>
      <WeatherCounty :isClickCountyWeatherData="isClickCountyWeatherData" :mixReportData="mixReportData" />
    </section>
    <hr>
    <h2 class=" position-sticky bottom-m text-center bg-color-primary border-primary-m py-2">
      <a href="#" class="d-block p-1" @click.prevent="$goToPosition('areaAccordion')">
        <span class="h2 shadowStyle">{{ isClickCountyName }}各地區天氣</span>
      </a>
    </h2>
    <section class="mb-10">
      <WeatherArea :areaApiNum="areaApiNum" :apiPath="apiPath" :apiKey="apiKey" @getAllAreaName="getAllAreaName" />
    </section>
  </main>
  <!-- 設定工具 -->
  <aside>
    <ul class="menu ps-1 p-2" data-menu="menu" :class="{'show': menuShow}">
      <li class="border-bottom-m mb-2">
        <button type="button" class="menu-link menu-link-hover" :class="{'btnActive': menuCountyShow}" data-menu="selectAreaBtn"
          @click="menuCountyShow = !menuCountyShow; menuAreaShow = !menuAreaShow">
          選擇地區
          <ul class="menu-county px-0" :class="{'menu-county-show': menuCountyShow}" data-menu="selectArea">
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
      </li>
      <li class="border-bottom-m mb-2">
        <button type="button" class="menu-link menu-link-hover" data-menu="collectArea" :class="{'btnActive': menuCollectAreaShow}"
          @click="menuCollectAreaShow =!menuCollectAreaShow">收藏地區</button>
        <ul class="menu-collectArea text-center ps-0" :class="{'menu-collectArea-show': menuCollectAreaShow}" data-menu="collectArea">
          <li class="border-bottom-m" data-menu="collectArea">收藏地區</li>
          <li class="border-bottom-m bg-color-primary" v-for="(countyName, areaName) in renderCollectData" :key="areaName" data-menu="collectArea">
            <button type="button" class="d-flex justify-content-between align-items-center border-primary-m btn-style text-dark w-100 py-2" @click="getSelectCountyWeather($event,countyName,areaName)">
              <span class="mx-auto">{{ countyName }} {{ areaName }}</span>
              <div class="goToAreaImgToggle"></div>
            </button>
          </li>
          <li class="bg-color-primary mt-5" v-if="Object.values(renderCollectData).length > 0">
            <button type="button" class="menu-link menu-link-hover w-100" @click="clearCollectData" data-menu="collectArea">清除收藏</button>
          </li>
          <li data-menu="collectArea" v-if="Object.values(renderCollectData).length === 0">
            <p class="p-2 mb-0" data-menu="collectArea">目前沒有收藏地區</p>
            <button type="button" class="border-bottom-m bg-color-primary " @click="menuCountyShow = true; menuAreaShow = true"
              data-menu="selectArea">點我選擇地區</button>
          </li>
        </ul>
      </li>
      <li class="border-bottom-m mb-2">
        <button type="button" class="menu-link menu-link-hover" data-menu="selectCounty"
        @click="selectCountyBtnShow= !selectCountyBtnShow">更換縣市</button>
      </li>
      <li class="border-bottom-m">
        <button type="button" class="menu-link menu-link-hover" data-menu="menu" @click="closeAccordion">關閉折疊</button>
      </li>
    </ul>
  </aside>
  <IsLoading v-model:active="isLoading">
    <div class="cssload-battery">
      <div class="cssload-liquid"></div>
    </div>
  </IsLoading>
</template>

<script>
import WeatherCounty from '@/components/weather/WeatherCounty.vue'
import WeatherArea from '@/components/weather/WeatherArea.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    WeatherCounty,
    WeatherArea
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
      selectCountyBtnShow: false,
      menuShow: false,
      menuCountyShow: false,
      menuAreaShow: false,
      menuCollectAreaShow: false,
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
        this.selectCountyBtnShow = false
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
        const isShowDescriptionNameIndex = allWeatherData.findIndex(allWeatherData => {
          return allWeatherData.description === descriptionName
        })
        this.isClickCountyWeatherData.push(isClickCountyWeatherData[isShowDescriptionNameIndex])
        //* 只留近兩天的資料
        this.isClickCountyWeatherData.forEach(item => {
          item.time.splice(7, 100)
        })
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
    //* 關閉所有手風琴
    closeAccordion () {
      const allDetails = document.querySelectorAll('.details')
      allDetails.forEach(el => {
        el.removeAttribute('open')
      })
      const allOpenAccordion = document.querySelectorAll('.show')
      allOpenAccordion.forEach(el => {
        el.classList.remove('show')
      })
      const allOpenAccordionColor = document.querySelectorAll('.active-accordion-button-color')
      allOpenAccordionColor.forEach(el => {
        el.classList.remove('active-accordion-button-color')
      })
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
        const tempArr = this.localStorageAreaData.filter(item => {
          return Object.keys(item)[0] !== area
        })
        //* 重新賦予 localStorage 的 data 就可以做到刪除的功能
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
      //* 如果縣市按鈕列表開啟時
      if (this.selectCountyBtnShow === true) {
        if (target === 'menu') { //* 按選單的話，按鈕列表就會自動收合
          this.selectCountyBtnShow = false
        }
        if (target !== 'selectCounty') { //* 不是點列表就自動收合 (點旁邊就自動關閉的意思)
          this.selectCountyBtnShow = false
        }
      }
    })
  }
}
</script>
