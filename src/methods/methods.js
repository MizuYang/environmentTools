import emitter from '@/methods/emitter.js'

export function $goToPosition (id) {
  const el = document.getElementById(`${id}`)
  //* chrome
  document.body.scrollTop = el.offsetTop
  //* firefox
  document.documentElement.scrollTop = el.offsetTop
  //* safari
  window.pageYOffset = el.offsetTop
}
export function $openTipModal (pages) {
  emitter.emit('openTipModal', pages)
}
