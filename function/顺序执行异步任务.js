// 1 for + await
// (async () => {
//     const sleep = delay => new Promise(res => setTimeout(_ => res(), delay))
//     const task = i => new Promise(async res => {
//         await sleep(500)
//         console.log(`now is ${i}`)
//         ++i
//         res(i)
//     })
//     let param = 0
//     for (let i = 0; i < 5; i++) {
//         param = await task(param)
//     }
// })()

// Array.prototype.reduce()
const sleep = delay => new Promise(res => setTimeout(_ => res(), delay))
const task = i => new Promise(async res => {
    await sleep(500)
    console.log(`now is ${i}`)
    ++i
    res(i)
})
[task, task, task, task, task].reduce(async (prev, task) => {
    const res = await prev
    return task(res)
}, 0)