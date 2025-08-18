// Least Recently Used Cache
// 选择Map: Map遍历是有序的，遍历顺序即插入顺序，因此可以实现LRU缓存策略
class LRUCache {
    constructor(n) {
        this.size = n //初始化最大缓存数据条数
        this.data = new Map()
    }
    put(key, value) {
        if (this.data.has(key)) {
            this.data.delete(key)
            this.data.set(key, value)
            return
        }
        if (this.data.size >= this.size) {
            // this.data.keys() 返回一个迭代器，可以遍历所有缓存数据的key
            this.data.delete(this.data.keys().next().value) // 删除最早的缓存数据
            this.data.set(key, value)
            return
        }
        this.data.set(key, value)
    }
    get(key) {
        if (!this.data.has(key)) {
            return null
        }
        // 先删除再添加，保证最新缓存数据在最前面,且严格遵循最大数量不超过n
        const res = this.data.get(key)
        this.data.delete(key)
        this.data.set(key, res)
        return res // 返回缓存数据
    }
}

const cache = new LRUCache(3)
cache.put('a', 1)
cache.put('b', 2)
cache.put('c', 3)
cache.put('d', 4)
console.log(cache.data)
console.log(cache.get('c'))
console.log(cache.data)
