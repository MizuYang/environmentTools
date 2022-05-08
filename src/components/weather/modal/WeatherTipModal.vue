<template>
<!-- Modal -->
<div class="modal fade" id="tipModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">使用教學</h5>
        <button type="button" class="btn-close bg-color-primary m-0 px-2 py-0" data-bs-dismiss="modal" aria-label="Close">x</button>
      </div>
      <div class="modal-body">
        <!-- 天氣教學 -->
        <ul class="px-0" v-if="pages === 'weather'">
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">開啟左側選單</summary>
            <img src="@/assets/image/tip/weather/開啟選單.gif" alt="開啟選單教學圖片" style="width:100%">
            </details>
          </li>
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">查看縣市天氣</summary>
              <p class="mb-2">
                點擊縣市名稱，切換縣市查看天氣。
              </p>
              <img src="@/assets/image/tip/weather/選擇縣市.png" alt="開啟選擇縣市教學圖片" height="300">
            </details>
          </li>
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">查看地區天氣</summary>
              <p class="mb-2">
                點擊地區名稱右邊的 GO ，
                <br>
                就會跳轉到該地區的天氣資訊。
              </p>
              <img src="@/assets/image/tip/weather/選擇地區.gif" alt="查看地區天氣教學圖" height="550" style="width:100%">
            </details>
          </li>
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">透過選單查詢其他國家</summary>
              <img src="@/assets/image/tip/weather/收藏功能.gif" alt="選單查詢教學圖片" style="width:100%">
            </details>
          </li>
        </ul>

        <!-- COVID -->
        <ul class="px-0"  v-if="pages === 'covid'">
          <li>
            <p>此資料以該國家發佈時間來更新</p>
            <p>如果該國家的死亡人數顯示為 0 ，可能代表該國尚未更新資料</p>
          </li>
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">選單查詢</summary>
              <img src="@/assets/image/tip/covid/選單.gif" alt="選單查詢教學影片" style="width:100%">
            </details>
          </li>
          <li class="border ps-2 pt-2 mb-3">
            <details>
              <summary class="h4 mb-2">關鍵字查詢 (不分大小寫)</summary>
              <p class=" mb-2">輸入國家的英文名稱即可搜尋，<br>即使是選單上沒有的國家，只要名稱輸入正確都可以搜尋的到。</p>
              <img src="@/assets/image/tip/covid/關鍵字搜尋.gif" alt="關鍵字查詢教學影片" style="width:100%">
            </details>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary mx-auto w-75" data-bs-dismiss="modal" @click="$emit('tipOpen')"
          v-if="pages === 'weather'">開啟選擇地區</button>
        <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">關閉</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
export default {
  components: {
  },

  inject: ['emitter'],

  emits: ['tipOpen'],

  data () {
    return {
      tipModal: '',
      pages: ''
    }
  },

  mounted () {
    this.tipModal = new Modal(document.getElementById('tipModal'))
    this.emitter.on('openTipModal', (pages) => {
      this.pages = pages
      this.tipModal.show()
    })
  },

  unmounted () {
    this.emitter.off('openTipModal')
  }

}
</script>
