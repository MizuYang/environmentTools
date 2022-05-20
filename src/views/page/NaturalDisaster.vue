<template>
<TyphoonView />
<hr class="my-4">
<EarthquakeView />
</template>

<script>
import TyphoonView from '@/components/naturalDisaster/TyphoonView.vue'
import EarthquakeView from '@/components/naturalDisaster/EarthquakeView.vue'

export default {
  components: {
    TyphoonView,
    EarthquakeView
  }

}
</script>
