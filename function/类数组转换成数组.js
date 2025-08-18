// 1 Array.prototype.slice()
const toArray1 = function () {
    let arr = Array.prototype.slice.call(arguments)
    return arr
}
const res1 = toArray1(1, 2, 3, 4, 5)
console.log('res1:', res1)

// 2 Array.from()
const toArray2 = function () {
    let arr = Array.from(arguments)
    return arr
}
const res2 = toArray2(1, 2, 3, 4, 5)
console.log('res2:', res2)

// 3 for循环
const toArray3 = function () {
    let arr = []
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(arguments[i])
    }
    return arr
}
const res3 = toArray3(1, 2, 3, 4, 5)
console.log('res3:', res3)

// 4 展开运算符
const toArray4 = function () {
    let arr = [...arguments]
    return arr
}
const res4 = toArray4(1, 2, 3, 4, 5)
console.log('res4:', res4)