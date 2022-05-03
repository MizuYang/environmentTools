//* 紫外線危險程度
export function $uvDangerLv (dangerNum, classNameUvLv) {
  if (dangerNum <= 2) {
    this.$uvLvColor(classNameUvLv, 1)
    return '低量級'
  } else if (dangerNum >= 3 && dangerNum <= 5) {
    this.$uvLvColor(classNameUvLv, 2)
    return '中量級'
  } else if (dangerNum >= 6 && dangerNum <= 7) {
    this.$uvLvColor(classNameUvLv, 3)
    return '高量級'
  } else if (dangerNum >= 8 && dangerNum <= 10) {
    this.$uvLvColor(classNameUvLv, 4)
    return '過量級'
  } else if (dangerNum >= 11) {
    this.$uvLvColor(classNameUvLv, 5)
    return '危險級'
  }
}
//* 紫外線強度顏色
export function $uvLvColor (classNameUvLv, lv) {
  this.$nextTick(() => {
    const el = document.querySelectorAll(`.uv${classNameUvLv}`)
    el.forEach(el => el.classList.add(`uv-lv${lv}`))
  })
}
//* 天氣 icons 轉換
export function $weatherIconsStatus (weather) {
  let src = ''
  if (weather === '多雲時晴' || weather === '晴時多雲') {
    src = '多雲時晴'
  } else if (weather === '多雲') {
    src = '多雲'
  } else if (weather.indexOf('雷雨') !== -1) {
    src = '雷雨'
  } else if (weather.indexOf('雨') !== -1) {
    src = '雨天'
  } else if (weather.indexOf('晴') !== -1) {
    src = '晴天'
  } else if (weather.indexOf('陰') !== -1) {
    src = '陰天'
  }
  return this.weatherIconsData[src]
}
//* 單位轉換
export function $unitChange (unit) {
  return this.symbol[unit]
}
//* 取得日期
export function $getDate (day) {
  const date = new Date()
  //* 取得明天的日期
  if (day === 'tomorrow') date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
  return `${date.getMonth() + 1}/${date.getDate()} (${this.date[date.getDay()]})`
}
//* 打開的手風琴顏色
export function $openAccordionColor (description) {
  if (this.accordionButtonClickColor[description]) {
    this.accordionButtonClickColor[description] = ''
  } else {
    this.accordionButtonClickColor[description] = description
  }
}
