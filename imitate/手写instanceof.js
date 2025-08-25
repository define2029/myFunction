/**
 * @description 原理：instanceof判断L的原型链上是否有R的prototype(只能判断引用类型)
 * @param {*} l 需要判断的数据
 * @param {*} r 需要判断的类型
 * @return {boolean} 返回是否是r类型
 */
function myInstanceof(L, R) {
  while (L !== null) {
    if (L.__proto__ === R.prototype) {
      return true
    }
    L = L.__proto__
  }
  return false
}
console.log(myInstanceof([], Array))
console.log(myInstanceof([], Object))
