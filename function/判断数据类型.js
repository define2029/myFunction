/**
 * @description 1 typeof + instanceof
 * @param {*} data 需要判断的数据
 * @return { String } 返回数据类型
 */
function myTypeof(data) {
  const type = typeof data
  if (type === null) {
    return 'null'
  }
  if (type !== 'object') {
    return type
  }
  if (data instanceof Array) {
    return 'array'
  }
  //   if (Array.isArray(data)) {
  //     return 'array'
  //   }
  return 'object'
}
// console.log(myTypeof(['wjl']))
// console.log(myTypeof({ name: 'hxy' }))
// console.log(myTypeof('lyh'))
// console.log(myTypeof(123))

/**
 * @description: 2 Object.prototype.toString.call
 * @param {*} data 需要判断的数据
 * @return {String} 返回数据类型
 */
function myTypeof2(data) {
  const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  if (type === 'object') {
    return data.constructor.name // 如果是对象,返回对象的构造函数名
  }
  return type
}
// console.log(myTypeof2(['wjl']))
// console.log(myTypeof2({ name: 'hxy' }))
// console.log(myTypeof2('lyh'))
// console.log(myTypeof2(123))
// const a = new Date()
// console.log(myTypeof2(a)) // date
// const b = new RegExp('\\w+')
// console.log(myTypeof2(b)) // regexp
// function C() {}
// const c = new C()
// console.log(myTypeof2(c))
