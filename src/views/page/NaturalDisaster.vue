<template>
<TyphoonView />
<hr class="mb-5">
<EarthquakeView />
</template>

<script>
import TyphoonView from '@/components/naturalDisaster/TyphoonView.vue'
import EarthquakeView from '@/components/naturalDisaster/EarthquakeView.vue'

export default {
  components: {
    TyphoonView,
    EarthquakeView
  },

  data () {
    return {
    }
  },

  watch: {
  },

  methods: {

  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
