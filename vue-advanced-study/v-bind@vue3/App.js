// 这里引入我们自己定义的响应式
import {effectWatch,reactive} from './core/reactivity/index.js';
// 引入虚拟dom
import { h } from './core/h.js';
// let a = reactive({
//   value:1
// })
// // 触发get
// let b;//b可以换成一个视图
// effectWatch(() => {
//   b = a.value + 10;
//   console.log("b is",b)
// });

// a.value = 30;


// vue3
export default {
  render(context){
    // 它包裹起来实现视图变化数据更新,数据更新视图变化
    // effectWatch(() => {
      // 清空div
      // document.body.innerHTML = ``;
      // 构建视图 view = b
      // const div = document.createElement("div");
      // div 的内容依赖state
      // div.innerText = context.state.count;
      // root
      // document.body.appendChild(div);
    // })
     // 构建视图 view = b
    //  const div = document.createElement("div");
    //  div.innerText = context.state.count;
    //  return div
    
    // 使用虚拟dom
    return h(
      "div",
      {
        id:"app-"+context.state.count,
        class:"showTime"
      },
      // String(context.state.count)
      [h("p",{id:"newP"},"你好"),h("span",{id:"newSpan"},"hello")]
    );

  },
  setup(){
    // 就是在这里声明响应式数据和 a 没什么区别
    const state = reactive({
      count:0,
    });
    window.state = state;
    return {state};
  }
}
