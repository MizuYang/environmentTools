<template>
  <aside class="weatherWarn-aside w-100" v-if="weatherWarningText">
    <div class="weatherWarn-body py-1">
      <p class="weatherWarn-text ps-5">
        天氣特報：{{ weatherWarningText }}
      </p>
      <p class="weatherWarn-text ps-3">
        天氣特報：{{ weatherWarningText }}
      </p>
    </div>
  </aside>
</template>

<script>
export default {

  data () {
    return {
      apiPath: '',
      weatherWarningText: ''
    }
  },

  methods: {
    getWeatherWarningData () {
      this.$http
        .get(this.apiPath)
        .then((res) => {
          this.weatherWarningText = res.data.records.record[0]?.contents.content.contentText
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  mounted () {
    this.apiPath = process.env.VUE_APP_WEATHER_WARNING_API
    this.getWeatherWarningData()
  }
}
</script>
