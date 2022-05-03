<script>
export default {

  data () {
    return {
      accordionButtonClickColor: {},
      date: ['日', '一', '二', '三', '四', '五', '六'],
      symbol: {
        百分比: '%',
        攝氏度: '℃',
        紫外線: ''
      },
      weatherIconsData: {
        雨天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%9B%A8%E5%A4%A9.png?raw=true',
        雷雨: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%9B%B7%E9%9B%A8.png?raw=true',
        晴天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E6%99%B4%E5%A4%A9.png?raw=true',
        陰天: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%99%B0%E5%A4%A9.png?raw=true',
        多雲: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E5%A4%9A%E9%9B%B2.png?raw=true',
        多雲時晴: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E5%A4%9A%E9%9B%B2%E6%99%82%E6%99%B4.png?raw=true',
        高溫: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E9%AB%98%E6%BA%AB.png?raw=true',
        低溫: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E4%BD%8E%E6%BA%AB.png?raw=true',
        溫度適中: 'https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/icons/%E6%BA%AB%E5%BA%A6%E9%81%A9%E4%B8%AD.png?raw=true'
      }
    }
  }
}
</script>
