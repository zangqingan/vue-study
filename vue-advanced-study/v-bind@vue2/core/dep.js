
//订阅器
export default class Dep{
  constructor(){
    //定义一个数组保存收集的依赖
    this.subs = [];
  }
  //定义一个添加依赖到数组的函数
  addSub(sub){
    this.subs.push(sub)
  }
  //定义一个删除依赖的函数
  removeSub(sub){
    if (this.subs.length) {
      let index = this.subs.indexOf(sub);
      if (index > -1) {
        return this.subs.splice(sub, 1)
      }
    }
  }
  //定义一个收集依赖函数
  depend(){
    //如果依赖存在收集存到数组subs里
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }
  //定义一个通知函数,改变是通知订阅者
  notify(){
    //创建一个依赖存储副本,防止死循环。也就是稳固订阅者列表
    const subs = this.subs.slice();
    //循环通知watcher依赖更新
    for(let i = 0,l = subs.length;i < l;i++){
      subs[i].update()
    }
  }
}
//依赖初始为空
Dep.target = null;