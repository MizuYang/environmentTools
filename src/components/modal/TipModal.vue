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
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">開啟左側選單</summary>
            <img src="@/assets/image/tip/weather/開啟選單.gif" alt="開啟選單教學圖片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">查看縣市天氣</summary>
              <p class="mb-2">
                點擊縣市名稱，切換縣市查看天氣。
              </p>
              <img src="@/assets/image/tip/weather/選擇縣市.png" alt="開啟選擇縣市教學圖片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">查看地區天氣</summary>
              <p class="mb-2">
                點擊地區名稱右邊的 GO ，
                <br />
                就會跳轉到該地區的天氣資訊。
              </p>
              <img src="@/assets/image/tip/weather/選擇地區.gif" alt="查看地區天氣教學圖" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">收藏地區</summary>
              <ul>
                <li class="fw-bold">加入收藏</li>
                <li class="mb-2">在選擇地區中，將常搜尋的地區勾選，即加入收藏</li>
                <li class="fw-bold">使用方法</li>
                <li>點收藏地區按鈕，即可查看已收藏的地區，點擊後等待一秒，即可跳轉到該地區天氣</li>
                <li class="fw-bold">移除收藏</li>
                <li>可在選擇地區中取消勾選即可</li>
                <li class="mb-3">在收藏地區中點擊清除收藏，刪除"所有"收藏地區</li>
                <img src="@/assets/image/tip/weather/收藏功能.gif" alt="選單查詢教學圖片" style="width:100%">
              </ul>
            </details>
          </li>
        </ul>

        <!-- COVID -->
        <ul class="px-0" v-if="pages === 'covid'">
          <li>
            <p>此資料以該國家發佈時間來更新
              <br />
              若該國家的今日確診數顯示為 0
              <br />
              可能代表該國尚未更新資料</p>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">查看近日疫情</summary>
              <img src="@/assets/image/tip/covid/查看近日疫情.gif" alt="查看近日疫情教學影片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">選單查詢</summary>
              <img src="@/assets/image/tip/covid/選單.gif" alt="選單查詢教學影片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4 mb-2">關鍵字查詢 (不分大小寫)</summary>
              <p class=" mb-2">輸入國家的英文名稱即可搜尋，<br />即使是選單上沒有的國家，只要名稱輸入正確都可以搜尋的到。</p>
              <img src="@/assets/image/tip/covid/關鍵字搜尋.gif" alt="關鍵字查詢教學影片" style="width:100%">
            </details>
          </li>
        </ul>

        <!-- 快篩 -->
        <ul class="px-0" v-if="pages === 'rapidTest'">
          <li><i class="d-block text-danger mb-2">注意！請查看更新時間是否為最新！</i></li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">選單查詢</summary>
              <p>點選縣市，預設顯示該縣市所有藥局
                <br />
                選擇地區，能篩選出更接近的結果
              </p>
              <img src="@/assets/image/tip/rapidTest/選單查詢.gif" alt="選單查詢教學影片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4">文字查詢</summary>
              <p>可以輸入地址相關資訊 <br />例：地名、縣市</p>
              <img src="@/assets/image/tip/rapidTest/文字查詢.gif" alt="文字查詢教學影片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4 mb-2">回到最上方</summary>
              <p class=" mb-2">在捲動到一定位置後，點選左側向上圖示，就會將畫面捲動至最上方。</p>
              <img src="@/assets/image/tip/rapidTest/回到最上方.gif" alt="回到最上方教學影片" style="width:100%">
            </details>
          </li>
          <li class="ps-2 pt-2 mb-3">
            <details>
              <summary class="h4 mb-2">收藏藥局功能
                <button type="button" class="bg-primary text-light ms-3" v-if="localStoragePharmacyData.length > 0" @click="$emit('deleteCollect')">清空收藏</button>
              </summary>
              <ul>
                <li class="fw-bold">加入收藏</li>
                <li  class="mb-2">搜尋地區後按下右邊的加入收藏</li>
                <li class="fw-bold">移除收藏</li>
                <li  class="mb-2">將加入收藏勾選取消即可</li>
                <li class="fw-bold">查詢收藏藥局</li>
                <li  class="mb-2">如果您有已收藏藥局，按下查詢已收藏藥局按鈕即可</li>
                <li class="fw-bold">額外補充</li>
                <li  class="mb-2">1. 即使是不同的地區也可以收藏</li>
                <li  class="mb-2">2. 只要您是使用相同的裝置，下一次重開，收藏的藥局依然會存在。</li>
              </ul>
              <img src="@/assets/image/tip/rapidTest/收藏藥局.gif" alt="收藏藥局教學影片" style="width:100%">
            </details>
          </li>
        </ul>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary mx-auto w-75" data-bs-dismiss="modal" @click="$emit('tipOpen')"
          v-if="pages === 'weather'">開啟選擇地區</button>
        <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal" v-if="pages === 'weather'">關閉</button>
        <button type="button" class="btn btn-secondary mx-auto w-100" data-bs-dismiss="modal" v-if="pages === 'covid' || pages === 'rapidTest'">關閉</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
export default {

  props: ['localStoragePharmacyData'],

  inject: ['emitter'],

  emits: ['tipOpen', 'deleteCollect'],

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
