// 创建vnode
// tag,标签名-string
//props,属性对象-object
// children,子元素-string或array
export function h(tag,props,children){
  return {
    tag,
    props,
    children,
  };
}