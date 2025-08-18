const obj = {
    a: 'wjl',
    b: 'hxy',
    [Symbol.iterator]() {
        let index = 0
        const keys = Object.keys(this)
        return {
            next() {
                if (index < keys.length) {
                    return {
                        done: false,
                        // obj[keys[index++]] 等价于 obj.a, obj.b
                        value: obj[keys[index++]]
                    }
                }
                return {
                    done: true,
                    value: undefined
                }
            }
        }
    }
}
const [a, b] = obj
console.log(a, b)
for (let v of obj) {
    console.log(v)
}
