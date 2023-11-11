//数量格式化
export function formatNum(num){
    return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num
}
//日期格式化
export function formatDate(data, type = 0){
    let time = new Date(data)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDay()
    let hour = time.getHours()
    let min = time.getMinutes()
    let secont = time.getSeconds()
    month = month < 10 ? "0" + month : month
    day = day < 10 ? "0" + day : day
    hour = hour < 10 ? "0" + hour : hour
    min = min < 10 ? "0" + min : min
    secont = secont < 10 ? "0" + secont : secont
    const arr = [
        year + "-" + month + "-" + day,
        year + "-" + month + "-" + day + " " + hour  + ":"  + min + ":"  + secont ,
        year + "年" + month + "月" + day,
        year + "年" + month + "月" + day + " " + hour  + ":"  + min + ":"  + secont ,
        hour  + ":" + min + ":" + secont ,
        month + "-" + day,
    ]
    return arr[type]
}