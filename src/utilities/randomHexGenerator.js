export const getRandomHex = ()=>{
    let r = Math.floor(Math.random()*(223 - 128 + 1) + 128).toString(16)
    let g = Math.floor(Math.random()*(223 - 128 + 1) + 128).toString(16)
    let b = Math.floor(Math.random()*(223 - 128 + 1) + 128).toString(16)
    let hex = r+g+b
    return `#${hex}`
}