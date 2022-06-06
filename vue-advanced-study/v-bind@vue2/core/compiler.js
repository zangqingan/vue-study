//引入订阅者
import Watcher from './watcher.js'
//编译器
export default class Compiler {
  // vm 指 Vue 实例
  constructor(vm) {
    // console.log('vm is',vm)
    console.log('compile')
    // 拿到 vm
    this.vm = vm
    // 拿到 el
    this.el = vm.$el
    // 编译模板
    this.compile(this.el)
  }
  // 编译模板
  compile(el) {
    // 获取挂载点的所有子节点 如果使用 forEach遍历就把伪数组转为真的数组
    let childNodes = [...el.childNodes]
    childNodes.forEach((node) => {
      // 根据不同的节点类型进行编译
      // 文本类型的节点
      if (this.isTextNode(node)) {
        // 编译文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        //元素节点
        this.compileElement(node)
      }
      // 判断是否还存在子节点考虑递归调用
      if (node.childNodes && node.childNodes.length) {
        // 继续递归编译模板
        this.compile(node)
      }
    })
  }
  // 编译文本节点的简单的实现也就是插值表达式 {{}}
  compileText(node) {
    // 核心思想是利用正则表达式把插值表达式去掉取得里面的变量
    // 再去Vue的数据选项如data中找这个变量赋值给 node.textContent
    let reg = /\{\{(.+?)\}\}/
    // 获取节点的文本内容
    let val = node.textContent
    // 判断是否有 插值表达式
    if (reg.test(val)) {
          // 获取分组一  也就是 插值表达式 里面的内容 去除前后空格
          let key = RegExp.$1.trim()
          // 进行替换再赋值给node
          node.textContent = val.replace(reg, this.vm[key])
          // 编译完文本节点后创建观察者,实现对数据的变化侦测(响应式)
          new Watcher(this.vm, key, newValue => {
              node.textContent = newValue
          })
      }
  }
  // 编译元素节点这里只处理指令 v-text、v-model
  compileElement(node) {
    // 获取到元素节点上面的所有属性进行遍历
    ![...node.attributes].forEach((attr) => {
      // 获取属性名
      let attrName = attr.name
      // console.log('attrName is',attrName)//v-text
      // 判断是否是 v- 开头的指令
      if (this.isDirective(attrName)) {
        // 除去 v- 方便操作
        attrName = attrName.substr(2)
        // console.log('attrName is',attrName)//text
        // 获取 指令的值就是  v-text = "msg"  中msg
        // msg 作为 key 去 Vue 找这个变量
        let key = attr.value
        // console.log('key is',key)//msg
        // console.log(node)<div v-text="msg">
        // console.log(key)//msg
        // console.log(attrName)//text
        // 指令操作 执行指令方法
        // vue指令很多为了避免大量个 if判断这里就写个 update 方法
        this.update(node, key, attrName)
      }
    })
  }
  // 添加指令方法并且执行
  update(node, key, attrName) {
    // 比如添加 textUpdater 就是用来处理 v-text 方法
    // 我们应该就内置一个 textUpdater 方法进行调用
    // 加个后缀加什么无所谓但是要定义相应的方法
    let updateFn = this[attrName + 'Updater']
    console.log('update',this.vm)
    // 如果存在这个内置方法 就可以调用了
    updateFn && updateFn(node, key, this.vm[key])
  }
  // 提前写好 相应的指定方法比如这个 v-text
  // v-text 
  textUpdater(node, key, value) {
      node.textContent = value
      // 创建观察者2
      // console.log('v-text',this.vm)
      new Watcher(this.vm, key, (newValue) => {
          node.textContent = newValue
      })
  }
  // v-model
  modelUpdater(node, key, value) {
      node.value = value
      // 创建观察者
      new Watcher(this.vm, key, (newValue) => {
          node.value = newValue
      })
      // 这里实现双向绑定 监听input 事件修改 data中的属性
      node.addEventListener('input', () => {
          this.vm[key] = node.value
      })
  }
  // 判断元素的属性是否是 vue 指令
  isDirective(attr) {
    return attr.startsWith('v-')
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
  // 判断是否是 文本 节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  

}