// 处理时间相关的函数
const Time  = {
  // 获取当前时间戳
  getUnix(){
    const date = new Date()
    return date.getTime()//获取当前距 1970 年 1 月 1 日之间的毫秒数
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix(){
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix(){
    const date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取标准的年月日
  getLastDate(time){
    const date = new  Date(time)
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1):date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month +  '-' + day

  },
  // 转换时间
  getFormaTime(timestamp){
    let now = this.getUnix()//获取当前时间戳
    let today  = this.getTodayUnix()//今天0点时间戳
    let year = this.getYearUnix()//今年0点时间戳
    let timer  = (now - timestamp)/1000//毫秒转换为秒级时间戳
    let tip  = ''//设置一个标志用来标识时间状态
    if(timer <= 0){
      tip = '刚刚'
    }else if(Math.floor(timer/60) <= 0){
      tip = '刚刚'
    }else if (timer < 3600){
      tip =  Math.floor(timer/60) +  '分钟前'
    }else if(timer >=3600 && (timestamp - today >= 0)){
      tip =  Math.floor(timer/3600) +  '小时前'
    }else if (timer/86400 <= 31){
      tip =  Math.ceil(timer/86400) +  '天前'
    }else{
      tip = this.getLastDate(timestamp)
    }
    return tip
  }


}
// 自定义指令v-time
Vue.directive('time', {
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