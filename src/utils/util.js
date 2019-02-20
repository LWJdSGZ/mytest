export default {
  /**
   * 判断字符串或者对象是否为空
   * @param data {String | Object} 判断的对象
   */
  isNull(data) {
    if (data === undefined || data === '' || data === ' ' || data === null || data.length === 0) {
      return true
    }
    return false
  }
}
