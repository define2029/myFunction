// 方案一
// 在promise.all 队列中，使用map过滤每一个promise任务，其中任意一个报错后，return一个返回值，确保promise能正常执行走到.then中
const p1 = new Promise((res, rej) => res('p1'))
const p2 = new Promise((res, rej) => rej('p2'))
const p3 = new Promise((res, rej) => res('p3'))
Promise.all([p1, p2, p3].map(v => v.catch(e => '出现异常'))).then(values => console.log(values)).catch(err => console.log('Error:', err))

// 方案二(使用promise.allSettled)
// Promise.allSettled([p1, p2, p3]).then(values => console.log(values)
// )
