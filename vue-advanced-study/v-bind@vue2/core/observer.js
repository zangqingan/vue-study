// 引入订阅器
import Dep from './dep.js';
//定义一个变量判断能否使用隐式原型__proto__
const hasProto = '__proto__' in {};
//最终暴露的接口用来将传入的data变成响应式data
export default class Observer{
  constructor(value){
      this.value = value;
      //初始化保存数组依赖的dep
      this.dep = new Dep();
      //给传入的每个value增加一个不可枚举属性__ob__,这个属性的值就是当前observer实例
      //作用有两点:1是数组可以通过它拿到observer实例,2是用来标记当前value是否已经被Observer转换成响应式数据。
      def(value, '__ob__', this);
      //判断传入的value是对象还是数组
      if(Array.isArray(value)){
          //判断一下是否能使用隐式原型，不能直接写在数组对象上
          if(hasProto){
            protoAugment(value,arrayMethods)
          }else{
            copyAugment(value,arrayMethods,arrayKeys)
          }
          //数组每一项执行一次new Observer()
          this.observeArray(value);
          
      }else{
        //对象数据调用walk方法
        this.walk(value)
      }
  }
  //walk方法是将对象的所有属性都变成getter和setter,只在数据类型是对象时调用
  walk(obj){
      //遍历对象所有属性得到一个数组
      var keys = Object.keys(obj);
      //循环数组调用 defineReactive方法
      for (var i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i]);
      }
  }
  //侦测数组的每一项都变成getter和setter,
  observeArray(items){
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
// 支持隐式原型,直接修改传入数组的原型拦截。
function protoAugment(target,src,keys){
  target.__proto__ = src;
}
//不支持原型直接将方法定义为被侦测数组上的方法
function copyAugment(target,src,keys){
  for(let i =0,l = keys.length; i < l; i++){
      const key = keys[i]
      //def是一个给对象条件属性的方法
      def(target,key,src[key]);
  }
}
//定义一个属性
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
  });
}

/**
 * 把一个数据变成响应式observer实例
 * @param {object} value 
 * @param {*} asRootData 
 * @returns object
 */
function observe(value,asRootData){
    //判断value 是不是一个对象,源码中还判断是不是一个vnode。不是直接返回。
    if(!isObject(value)){return}
    //定义一个变量接收observer实例
    let ob;
    //如果value对象是否自己是否有__ob__属性并且原型是Observer的实例。
    //判断有没有不可枚举的__ob__属性,有说明已经是响应式数据了直接返回。
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else{
        //不是说明直接返回
        ob = new Observer(value);
    }
    return ob
}
//一个判断是不是对象的函数
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
//检查一个对象是否具有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
 function defineReactive(data,key,value){
  //尝试将一个值变成observer的实例
  let childop  = observe(value);

  //初始化dep对象,用来存储收集的对象依赖
  let dep = new Dep();
  Object.defineProperty(data,key,{
      enumerable:true,
      configurable:true,
      get:function(){
          //如果依赖存在收集依赖
          if(Dep.target){
            dep.depend()
            //如果数组的Observer实例存在,收集数组的依赖
            if(childop){
              childop.dep.depend()
            }
          }
          return value
      },
      set:function(newValue){
          if(value === newValue){return}
          value = newValue
          //通知所有的订阅者更新
          dep.notify()
      }
  })
}

//对数组对象的拦截
const  arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
//定义一个字符串数组保存这其中方法
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
//数组拦截器触发依赖更新
methodsToPatch.forEach(function (method){
  //缓存原始的方法
  const original =  arrayProto[method];
  //这里使用抽象方法 def将每个方法变成响应式的
  def(arrayMethods,method,function mutator(...args){
      //本质还是使用底层的方法对求值
      const result =  original.apply(this,args);
      //获取监听器实例,触发更新
      const ob  = this.__ob__;
      //新增元素变化的侦测
      //获取新增的元素
      let inserted;
      switch (method) {
          case 'push':
          case 'unshift':
              inserted = args;
              break
          case 'splice':
              inserted = args.slice(2);
              break
      }
      //有新增调用 observeArray即可
      if (inserted) { ob.observeArray(inserted); }
      //通知watcher
      ob.dep.notify();
      return result;
  })
})








