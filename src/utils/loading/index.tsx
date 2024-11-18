let count = 0
export const showLoading = () => {
  if (count === 0) {
    document.getElementById('iframe')?.style.setProperty('display', 'block')
    // document.getElementById("loading")?.style.setProperty("display", "flex");
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count < 0) return
  if (count === 0) {
    document.getElementById('iframe')?.style.setProperty('display', 'none')
    // document.getElementById("loading")?.style.setProperty("display", "none");
  }
}
