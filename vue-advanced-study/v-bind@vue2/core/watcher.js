import Dep from "./dep.js";

export default class Watcher{
  constructor(vm,expOrFn,cb,){
      // vm 是 Vue 实例
      this.vm = vm;
      // cb 回调函数 更新视图的具体方法
      this.cb = cb;
      //执行getter就可以读取data.a.b.c的内容
      this.getter = parsePath(expOrFn);
      // 将自己添加到订阅器的操作
      this.value = this.get()

  }
  get(){
      //用全局的window.target缓存下当前订阅者watcher实例
      Dep.target = this;
      //读取值触发getter收集window.target,也就是收集当前watcher实例
      let value = this.getter.call(this.vm,this.vm);
      //获取值之后window.target重新设置为空
      Dep.target = null;
      //返回值
      return value;
  }
  //更新视图
  update(){
      const oldValue = this.value;
      //// 获取新值
      this.value = this.get();
      // 比较旧值和新值
      if (this.value === oldValue) return
      //调用具体的更新方法
      this.cb.call(this.vm,this.value,oldValue)
  }
}

//parsePath就是一个解析路径的函数
const bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) { return}
  var segments = path.split('.');
  return function (obj) {
      for (var i = 0; i < segments.length; i++) {
          if (!obj) { return }
          obj = obj[segments[i]];
      }
      return obj
  }
}