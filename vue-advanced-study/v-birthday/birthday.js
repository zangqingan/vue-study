// 处理时间相关的函数
const Time  = {

  // 转换时间
  getFormaTime(timestamp){
    let now = new Date()//获取当前时间戳
    let birth = new Date(timestamp)//获取出生时间
    // 当前年月日
    let currentDay = now.getDay()
    let currentMonth  = now.getMonth()
    let currentYear = now.getFullYear()
    // 获取出生年月日
    let birthday = birth.getDay() 
    let birthMonth  = now.getMonth()
    let birthYear = now.getFullYear()
    // 计算插值
    let year = currentYear - birthYear
    let month = currentMonth - birthMonth
    let day = currentDay - birthday
    // 判断
    if(month < 0 || month == 0 && day < 0){
      // 如果月份是负数或者为0，说明不满这一年，年份减去1
      year -= 1
      month = 12 + currentMonth - birthMonth
    }
    if(day < 0){
      month -= 1
      let value  = this.getDaysInMonth(currentYear,currentMonth)
      day = value + currentDay - birthday
    }
    return `${year}岁${month}个月${day}天`
  },
  // 获取某年某月有多少天
  getDaysInMonth(year,month){
    month = parseInt(month,10)
    let temp = new Date(year,month,'0')
    return temp.getDate()
  }


}
// 自定义指令v-time
Vue.directive('birthday', {
  bind(el,binding){
    el.innerHTML = Time.getFormaTime(binding.value)
    // 定时器每分钟刷新一次
    el.__timeout__ = setInterval(() => {
      el.innerHTML = Time.getFormaTime(binding.value)
    }, (60000));
  },
  unbind(el){
    // 清除定时器
    clearInterval(el.__timeout__)
    delete el.__timeout__
  }
})