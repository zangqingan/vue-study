import { effectWatch } from "./reactivity/index.js";
import { mountElement,diff } from "./render/index.js";
// 这里定义一个核心出口
export function createApp(rootComponent){
  // 返回一个app对象
  return {
    mount(rootContainer){
      const context = rootComponent.setup();
      // 定义一个变量标识是否是初次渲染
      let isMount = false;
      //定义一个变量保存更新前的vnode
      let prevSubTree;
      // 响应式包裹
      effectWatch(() => {
        if(!isMount){
          isMount = true;
          rootContainer.innerHTML = ``;
          // 渲染的元素view
          // const element = rootComponent.render(context);
          // 使用虚拟dom后得到的就不是一个元素element了而是一个jstree对象了
          const subTree = rootComponent.render(context);
          console.log(subTree)
          // 虚拟dom挂载到真实dom上
          mountElement(subTree,rootContainer);
          // 加到根上
          // rootContainer.append(element);
          prevSubTree = subTree;
        }else{
          // 更新
          const subTree = rootComponent.render(context);
          // diff算法 比较newVnode 和 oldVnode
          diff(prevSubTree,subTree);
          prevSubTree = subTree;
        }
        

      });
    }
  }

}