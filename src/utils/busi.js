import http from '@/utils/http'

export default {
  async fetchList(url) {
    const params = {
      pageIndex: 1,
      pageSize: 1000
    }
    const res = await http.get(url, params)
    if (res.data && res.data.data) {
      return res.data.data.content;
    }
    return {}
  },
  async fetchArray(url) {
    const res = await http.get(url)
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return []
  },
  setJsonValueFromJson(toJson, fromJson) {
    for (const item in toJson) {
      if (Object.prototype.hasOwnProperty.call(fromJson, item)) {
        let fromItemValue = fromJson[item];
        if (typeof (fromItemValue) === 'object') {
          if (fromItemValue instanceof Array) {
            toJson[item] = fromItemValue;
          } else {
            this.setJsonValueFromJson(toJson[item], fromJson[item]);
          }
        } else {
          if (typeof (fromItemValue) === 'boolean') { //boolean类型的值绑定到radio组件时只能是string、number类型
            fromItemValue = fromItemValue ? 'true' : 'false'
          }
          toJson[item] = fromItemValue;
        }
      }
    }
    return toJson;
  }
}
