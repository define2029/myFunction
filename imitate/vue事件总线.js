class EventEmitter {
    constructor() {
        this.events = {}
    }
    // 发布
    $emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(cb => cb.apply(this, args))
        }
    }

    // 订阅
    $on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    // 订阅一次
    $once(event, callback) {
        const wrapper = (...args) => {
            callback.apply(this, args)
            this.$off(event, wrapper)
        }
        this.$on(event, wrapper)
    }

    // 删除
    $off(event, callback) {
        if (!this.events[event]) return
        if (!callback) {
            this.events[event] = [] // 移除所有监听
        } else {
            this.events[event] = this.events[event].filter(cb => cb !== callback) // 移除指定监听
        }
    }
}

const eventBus = new EventEmitter()
eventBus.$on('test', (msg) => console.log(msg))
eventBus.$emit('test', 'wjl')
eventBus.$off('test')
eventBus.$emit('test', 'hxy')
eventBus.$once('once', (msg) => console.log(msg))
eventBus.$emit('once', 'once')
eventBus.$emit('once', 'once')
eventBus.$emit('once', 'once')