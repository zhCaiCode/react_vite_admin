export default {
  /*
   *  读取
   *  @param key {string} storage key
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (e) {
      console.log('storage get error...', e)
      return value
    }
  },
  /*
   * 写入
   * @param key {string} 键
   * @param value {unkonwn} storage的值
   */
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /*
   * 移除
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
