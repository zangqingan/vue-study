export function mountElement(vnode,container){
  // 从js对象中解构出来
  const {tag,props,children} = vnode;
  // tag,标签名
  const el = (vnode.el = document.createElement("div"));
  //props,属性
  if(props){
    for(const key in props){
      const val = props[key]
      // 设置属性
      el.setAttribute(key,val);

    }
  }
  // children,子元素,字符串或数组
  if(typeof children === 'string'){
    // 没有子元素,创建文本节点并加入元素里
    const textNode = document.createTextNode(children);
    el.append(textNode)
    
  }else if(Array.isArray(children)){
    children.forEach((v) => {
      mountElement(v,el)
    })
  }
  // 最终插入
  container.append(el);
}
// diff算法
// n1 旧节点oldVnode
// n2新节点 newVnode
export function diff(n1,n2){
  console.log(n1)
  console.log(n2)
  // tag
  // 如果标签名不一样替换
  if(n1.tag !== n2.tag){
    n1.el.replaceWith(document.createElement(n2.tag))
  }else{
    // 旧节点的el交给新节点.
    n2.el = n1.el;
    // props
    //解构
    const {props:newProps} = n2;
    const {props:oldProps} = n1;
    if(newProps && oldProps){
      Object.keys(newProps).forEach(key => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if(newVal !== oldVal){
          // 修改
          n1.el.setAttribute(key,newVal)
        }
      })
    }
    if(oldProps){
      Object.keys(oldProps).forEach(key => {
        if(!newProps[key]){
          // 新的没有旧的移除
          n1.el.removeAttribute(key)
        }
      })
    }
    // children
    const {children:newChildren} = n2;
    const {children:oldChildren} = n1;
  }
}