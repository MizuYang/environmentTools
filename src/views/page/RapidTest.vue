<template>
<h2 class="position-sticky z-index-1 top-0 bottom-m text-center bg-color-primary border-primary-m mb-0">
  <div class="container d-flex align-items-center">
    <a href="#" class="position-absolute d-block" @click.prevent="$openTipModal('rapidTest')">
      <img src="@/assets/image/icons/weather-icons/燈泡.png" alt="功能提示的燈泡圖片" height="35">
    </a>
    <a href="#" class="d-block mx-auto w-100 p-2" @click.prevent="$goToPosition('rapidTest')">
      <span class="h2">快篩剩餘數量查詢</span>
    </a>
  </div>
</h2>
<header class="border-bottom text-center py-3 px-2 mb-3" id="rapidTest">
  <h4 class="bg-gary mb-4 p-2">可購買的身份證尾數：<span class="text-danger fs-3 fw-bold">{{canBuyRapidTestId}}</span></h4>
  <label for="countySelector" class="h3">選擇縣市：</label>
  <select name="" id="countySelector" class="bg-color-primary mb-4" @change="getRapidTestData('county',$event)" ref="countySelector">
    <option value="請選擇縣市" disabled selected>請選擇縣市</option>
    <option :value="county" v-for="(area, county) in countyPharmacyNameData" :key="county">{{ county }}</option>
  </select>
  <br />
  <label for="areaSelector" class="h3">選擇地區：</label>
  <select name="" id="areaSelector" class="areaSelect bg-color-primary mb-4" @change="getRapidTestData('area',$event)" ref="areaSelector">
    <option value="請選擇地區" disabled selected>請選擇地區</option>
    <option :value="areaName" v-for="(areaName,index) in areaName" :key="index">{{ areaName }}</option>
  </select>
  <br />
  <label for="search" class="h4">輸入片段地址或藥局名稱</label>
  <br>
  <input type="search" class="bg-color-primary mb-3" id="search" placeholder="例：台北、板橋、五股" v-model.trim="searchText">
  <button type="button" class="bg-color-primary-m text-color-primary" @click="getRapidTestData('search',$event)" v-if="searchText">查詢</button>
  <div class="mb-2">
    <a type="button" class="btn btn-color-primary border" @click.prevent="getRapidTestData('collect')">
      <img src="@/assets/image/icons/rapidTest-icons/搜尋藥局.png" alt="搜尋藥局" height="35">
      查詢已收藏藥局
    </a>
  </div>
  <small class="d-block mb-2">更新頻率: 每1~2分鐘更新一次</small>
  <i class="d-block text-danger mb-2">注意！請查看更新時間是否為最新！</i>
</header>
<div class="mb-10 container-lg">
  <h2 class="text-center text-danger fw-bold" v-if="countyName && rapidTestData.length === 0">查無資料或已全部售完</h2>
  <section class="card mb-3 border shadowStyle" v-for="(pharmacyInfo, index) in rapidTestData" :key="pharmacyInfo" :class="{'bg-color-primary': index%2 ===0}">
    <div class="card-body">
      <h5 class="card-title d-flex">{{ pharmacyInfo[1] }} <span class="text-danger fw-bold ms-3">[ 剩餘: {{ pharmacyInfo[7] }} ]</span></h5>
      <p class="text-muted ms-auto">更新時間：<time class="text-muted">{{ pharmacyInfo[8] }}</time></p>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <address class="card-subtitle text-muted">
          <a :href="`tel:+${pharmacyInfo[5]}`">{{ pharmacyInfo[5] }}</a>
        </address>
        <div class="d-flex align-items-center">
          <label :for="`collectCheckBox${index}`" class="fs-5 me-2">加入收藏</label>
          <input type="checkbox" class="collectAreaCheckbox" :id="`collectCheckBox${index}`" v-model="collectCheckboxData[pharmacyInfo[2]]" @click="toggleCollectPharmacy(pharmacyInfo[2])">
        </div>
      </div>
      <address>
        <a class="card-text" :href="`https://www.google.com.tw/maps/search/${pharmacyInfo[1]}`" target="_blank">
          {{ pharmacyInfo[2] }}
          <img src="@/assets/image/icons/rapidTest-icons/地圖.png" alt="小地圖的圖片" height="35">
        </a>
      </address>
      <p class="card-text">{{ pharmacyInfo[6] }}
        <br />
        <span class="text-danger fw-bold">剩餘：{{ pharmacyInfo[7] }}</span>
      </p>
      <p class="card-text">備註：{{ pharmacyInfo[9] }}</p>
    </div>
  </section>
  <div class="text-center" :class="{'d-none': collectTipHide}">
    <h3 class="mb-3">您目前沒有收藏的藥局！</h3>
    <button type="button" class="btn btn-color-primary-m" @click="$openTipModal('rapidTest')">收藏藥局教學</button>
  </div>
</div>
<a href="#" class="position-sticky z-index-2 left-1 bottom-1" @click.prevent="$goToPosition('rapidTest')" :class="{'d-none': topScrollBtnHide}">
  <img src="@/assets/image/icons/rapidTest-icons/向上.png" alt="箭頭向上的圖片" height="50">
</a>

<TipModal :localStoragePharmacyData="localStoragePharmacyData" @deleteCollect="deleteCollect" />
<IsLoading v-model:active="isLoading">
  <div class="cssload-battery">
    <div class="cssload-liquid"></div>
  </div>
</IsLoading>
</template>

<script>
import TipModal from '@/components/modal/TipModal.vue'
import RapidTestMixins from '@/components/rapidTest/mixins/RapidTestMixins.vue'
import emitter from '@/methods/emitter.js'
export default {
  components: {
    TipModal
  },

  mixins: [RapidTestMixins],

  provide () {
    return {
      emitter
    }
  },

  data () {
    return {
      apiPath: '',
      rapidTestData: [],
      rapidTestTempData: [],
      localStoragePharmacyData: JSON.parse(localStorage.getItem('pharmacyName')) || [],
      collectCheckboxData: {},
      countyName: '',
      areaName: [],
      canBuyRapidTestId: '',
      searchText: '',
      topScrollBtnHide: true,
      isLoading: false,
      collectTipHide: true,
      countyPharmacyNameData: {}
    }
  },

  methods: {
    getPharmacyName () {
      let countyName = []
      this.countyPharmacyNameNoSortData.forEach(allCounty => {
        countyName = Object.keys(allCounty)
        if (this.countyPharmacyNameData[countyName[0]] === undefined) {
          this.countyPharmacyNameData[countyName[0]] = []
        }
        if (this.countyPharmacyNameData[countyName[0]] !== allCounty[countyName]) {
          this.countyPharmacyNameData[countyName[0]].push(allCounty[countyName])
        }
        //* 將重複的地區名稱篩選
        this.countyPharmacyNameData[countyName[0]] = this.countyPharmacyNameData[countyName[0]].filter(function (element, index, arr) {
          return arr.indexOf(element) === index //* indexOf 只會找第一個相符的，所以就能做到重複的被篩選的效果
        })
      })
    },
    searchAreaPharmacy (active, e) {
      this.isLoading = true
      this.rapidTestData = []
      const target = e.target.value
      let searchArea = ''
      if (active === 'county') {
        searchArea = target
        this.countyName = target
        this.areaName = this.countyPharmacyNameData[target]
        document.querySelector('.areaSelect').value = '請選擇地區'
        this.searchText = ''
      } else if (active === 'area') {
        searchArea = `${this.countyName}${target}`
        this.searchText = ''
      } else if (active === 'search') {
        //* 如果使用者輸入"台"，例：台北、台中、台南 就轉成"臺"
        if (this.searchText.indexOf('台') >= 0) {
          const changeTextIndex = this.searchText.indexOf('台')
          const text = [...this.searchText.split('')]
          text.splice(changeTextIndex, 1, '臺')
          this.searchText = text.join('')
        }
        searchArea = this.searchText
        this.$refs.countySelector.value = '請選擇縣市'
        this.$refs.areaSelector.value = '請選擇地區'
        this.areaName = []
      }
      this.rapidTestTempData.forEach(item => { //* 如果關鍵字搜尋 藥局名稱和地址都可以
        if (item[2]?.includes(searchArea) || item[1]?.includes(searchArea)) {
          this.rapidTestData.push(item)
        }
      })
      this.isLoading = false
    },
    getRapidTestData (active, e) { //* 每次搜尋都戳 API ，確保是最新資訊
      this.isLoading = true
      this.$http.get(this.apiPath)
        .then(res => {
          this.isLoading = false
          this.rapidTestTempData = [] //* 初始化 不然 push 會一直疊加
          const data = res.data.split('\r\n')
          data.forEach(item => {
            this.rapidTestTempData.push(item.split(','))
          })
          if (this.areaName.length === 0) { this.getPharmacyName() } //* 只有第一次會處理地區名稱的資料
          if (active === 'collect') { this.renderCollectPharmacy() }
          this.searchAreaPharmacy(active, e)
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    getToday () {
      const date = new Date()
      if (date.getDay() % 2 === 0) {
        this.canBuyRapidTestId = '雙數'
      } else {
        this.canBuyRapidTestId = '單數'
      }
      if (date.getDay() === 0) {
        this.canBuyRapidTestId = '單、雙數'
      }
    },
    renderCollectPharmacy (status) {
      this.$refs.countySelector.value = '請選擇縣市'
      this.$refs.areaSelector.value = '請選擇地區'
      const collectPharmacy = []
      this.$nextTick(() => {
        this.collectTipHide = false //* 沒收藏藥局就顯示提示
        //* 有收藏資料才跑資料處理 或 點收藏清空，已渲染收藏藥局也會重新清空
        if (this.localStoragePharmacyData.length > 0 || status === '收藏清空重新渲染') {
          this.collectTipHide = true
          this.localStoragePharmacyData.forEach(pharmacyAddress => {
            this.rapidTestTempData.forEach(allPharmacyItem => {
              if (pharmacyAddress === allPharmacyItem[2]) {
                collectPharmacy.push(allPharmacyItem)
              }
            })
          })
          this.rapidTestData = collectPharmacy
          if (status === '收藏清空重新渲染') this.collectTipHide = false //* 如果是清空收藏，就提示目前沒收藏
        }
      })
    },
    toggleCollectPharmacy (pharmacyAddress) {
      //* 收藏 data 如果地址的值是 false(取消勾選)就刪除，true就增加
      setTimeout(() => {
        if (!this.collectCheckboxData[pharmacyAddress]) {
          const deleteIndex = this.localStoragePharmacyData.findIndex(pharmacyAddr => {
            return pharmacyAddress === pharmacyAddr
          })
          if (deleteIndex !== -1) {
            this.localStoragePharmacyData.splice(deleteIndex, 1)
          }
        }
        if (this.collectCheckboxData[pharmacyAddress]) {
          this.localStoragePharmacyData.push(pharmacyAddress)
        }
        localStorage.setItem('pharmacyName', JSON.stringify(this.localStoragePharmacyData))
      }, 0)
    },
    getCollectPharmacyCheckbox (status) {
      this.localStoragePharmacyData.forEach(pharmacyName => {
        this.collectCheckboxData[pharmacyName] = true
      })
      if (status === '收藏清空重新渲染') {
        this.collectCheckboxData = {} //* 如果點收藏清空，checkbox 全部都會取消
      }
    },
    deleteCollect () {
      this.localStoragePharmacyData = []
      localStorage.setItem('pharmacyName', JSON.stringify(this.localStoragePharmacyData))
      this.getCollectPharmacyCheckbox('收藏清空重新渲染')
      this.renderCollectPharmacy('收藏清空重新渲染')
      emitter.emit('closeTipModal')
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_RAPIDTEST_API
    this.getToday()
    this.getRapidTestData()
    this.getCollectPharmacyCheckbox()

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY
      if (scrollY >= 1000) {
        this.topScrollBtnHide = false
      } else if (scrollY <= 300) {
        this.topScrollBtnHide = true
      }
    })
  }

}
</script>
