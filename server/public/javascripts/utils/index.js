function formatTime(time) {
    let date = time || new Date()
    let seperator = '-'
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
    }
    let currentdate = year + seperator + month + seperator + strDate + ' '  + hours + ':' + minutes + ':' + seconds   
    return currentdate
}
module.exports = {
    formatTime
}