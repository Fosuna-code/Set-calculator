export const getRandomHex = ()=>{
    let r = Math.round(Math.random()*255).toString(16)
    let g = Math.round(Math.random()*255).toString(16)
    let b = Math.round(Math.random()*255).toString(16)
    let hex = r+g+b
    return `#${hex}`
}