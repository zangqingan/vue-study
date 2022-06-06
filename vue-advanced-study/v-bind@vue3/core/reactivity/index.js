//订阅器用来收集依赖
// 定义一个中间变量
let currentEffect;
class Dep {
  constructor(val){
    this.subs = []
    // 用一个集合
    this.effects = new Set()
    this._val = val;
  }
  get value(){
    // 获取值时触发收集依赖
    this.depend()
    return this._val;
  }
  set value(newVal){
    this._val = newVal;
    // 依赖更新完后通知
    this.notify();
  }
  //增加订阅者
  addSub(sub){
    this.subs.push(sub);
  }
  //判断是否增加订阅者,收集依赖
  depend () {
      if (Dep.target) {
         this.addSub(Dep.target)
      }
      // 收集依赖
      if(currentEffect){
        this.effects.add(currentEffect)
      }
  }

  //通知订阅者更新，触发依赖
  notify(){
    this.subs.forEach((sub) =>{
      sub.update()
    })
    this.effects.forEach(effect => {
      effect()
    })
  }
  
}
Dep.target = null;


// 最终导出
export function effectWatch(effect){
  currentEffect = effect;
  // 初始化时就会先执行一次
  effect();
  // 收集依赖,优化时把它放到get获取值触发时即可
  // dep.depend();
  currentEffect = null;
}
// 初始化Dep
// const dep = new Dep(10)
// let b;
// effectWatch(() => {
//   console.log('hi收集依赖了');
//   b = dep.value + 10;
//   console.log('b=',b);
// })


// 值发生变化时再执行一次 set里执行dep.notify()
// dep.value = 20;
// dep.notify();

// 到这里基本就完成了对简单值的响应式了
// 如果是对象就比较复杂了
// vue2 是 Object.defineProperty()
// vue3 是proxy代理对象

// 定义一个Map用来存储对象每一个key对应的dep
const targetMap = new Map();
// 依赖存储抽离
function getDep(target,key){
  let depsMap = targetMap.get(target);
  if(!depsMap){
    // 如果首次不存在初始化一个
    depsMap = new Map();
    targetMap.set(target,depsMap)
  }
  // 获取key对应的dep
  let dep = depsMap.get(key);
  if(!dep){
    // dep没有也初始化
    dep = new Dep();
    depsMap.set(key,dep)
  }
  return dep;
}

export function reactive(raw){
  // vue3是返回一个proxy实例
  return new Proxy(raw,{
    get(target,key){
      // 使用反射api,类似 return target[key]
      // 一个key要对应一个dep,同时dep存在哪里这里使用Map
      const dep = getDep(target,key);
      // 收集依赖
      dep.depend();
      return Reflect.get(target,key);
    },
    set(target,key,value){
      // 触发依赖
      const dep = getDep(target,key);
      // 更新值
      const result = Reflect.set(target,key,value);
      // 通知更新
      dep.notify();
      return result;
    }
  })
}

// const user = reactive({
//   age:20
// })
// // 触发get
// let double;
// effectWatch(() => {
//   double = user.age;
//   console.log(double)
// });

// user.age = 30;


