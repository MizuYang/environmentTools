<template>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div
      class="accordion-item mb-1"
      v-for="(weatherData, index) in isClickCountyWeatherData"
      :key="index"
    >
      <h2 class="accordion-header" :id="`weatherItem${index}`">
        <button
          class="accordion-button btnHover text-dark fs-5"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#weatherItemId${index}`"
          aria-expanded="true"
          :aria-controls="`weatherItemId${index}`"
          :class="{
            'active-accordion-button-color':
              accordionButtonClickColor[weatherData.description] === weatherData.description }"
          @click="openAccordionColor(weatherData.description)"
        >
          {{ weatherData.description }}
        </button>
      </h2>
      <div
        :id="`weatherItemId${index}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`weatherItem${index}`"
      >
        <div
          class="accordion-body d-flex justify-content-between justify-content-lg-evenly border-bottom hover-color"
          v-for="(weatherTimeInfo, infoIndex) in weatherData?.time"
          :key="infoIndex"
        >
          <time class="my-auto" :class="{'d-none': weatherTimeInfo.elementValue[0].value === ' '}">
            {{ sortDate(weatherTimeInfo.startTime) }} ~
            {{ sortDate(weatherTimeInfo.endTime) }}
          </time>
          <mark class="text-center" :class="{'d-none': weatherTimeInfo.elementValue[0].value === ' '}">
            {{ weatherTimeInfo.elementValue[0].value }}
            {{ unitChange(weatherTimeInfo.elementValue[0].measures) }}
            <br>
            <span
              :class="`uv${infoIndex}`"
              v-if="weatherData.description === '紫外線指數'"
            >
              {{
                uvDangerLv(weatherTimeInfo.elementValue[0].value, infoIndex)
              }}</span
            >
          </mark>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: ['isClickCountyWeatherData'],

  data () {
    return {
      accordionButtonClickColor: {},
      symbol: {
        百分比: '%',
        攝氏度: '℃',
        紫外線指數: ''
      }
    }
  },

  watch: {},

  methods: {
    //* 打開的手風琴顏色
    openAccordionColor (description) {
      if (this.accordionButtonClickColor[description]) {
        this.accordionButtonClickColor[description] = ''
      } else {
        this.accordionButtonClickColor[description] = description
      }
    },
    sortDate (date) {
      const splitDate = date.split('')
      return `${splitDate[5]}${splitDate[6]}/${splitDate[8]}${splitDate[9]} - ${splitDate[11]}${splitDate[12]}${splitDate[13]}${splitDate[14]}${splitDate[15]}`
    },
    //* 單位轉換符號
    unitChange (unit) {
      return this.symbol[unit]
    },
    //* 紫外線危險程度
    uvDangerLv (dangerNum, infoIndex) {
      if (dangerNum <= 2) {
        this.uvLvColor(infoIndex, 1)
        return '低量級'
      } else if (dangerNum >= 3 && dangerNum <= 5) {
        this.uvLvColor(infoIndex, 2)
        return '中量級'
      } else if (dangerNum >= 6 && dangerNum <= 7) {
        this.uvLvColor(infoIndex, 3)
        return '高量級'
      } else if (dangerNum >= 8 && dangerNum <= 10) {
        this.uvLvColor(infoIndex, 4)
        return '過量級'
      } else if (dangerNum >= 11) {
        this.uvLvColor(infoIndex, 5)
        return '危險級'
      }
    },
    //* 紫外線強度顏色
    uvLvColor (infoIndex, lv) {
      this.$nextTick(() => {
        document.querySelector(`.uv${infoIndex}`).classList.add(`uv-lv${lv}`)
      })
    }
  }

}
</script>
