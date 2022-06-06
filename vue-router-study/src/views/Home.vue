<template>
  <div class="home">
     <h3>1.嵌套路由</h3>
     所谓嵌套路由,就是有相同的父路径。如下所示:
     <pre>
       /user/foo/profile                  /user/foo/posts  
      +------------------+                    +-----------------+  
      | User             |                    | User            |  
      | +--------------+ |                    | +-------------+ |  
      | | Profile      | |    +------------>  | | Posts       | |  
      | |              | |                    | |             | |  
      | +--------------+ |                    | +-------------+ |
      +------------------+                    +-----------------+  
     </pre>
     <p>
        路由既然是路径和组件的对应关系那么,组件也有子组件。
        所以一个被渲染的组件同样可以包含自己的嵌套 router-view。
        步骤和正常路由类似,
        第一步:创建子组件,并在父级的路由配置对象中的
        children:[
          {
            path:'子路径',
            component:子组件
          }
        ]
        第二步:同样使用router-view告诉子组件路由出口。
        注意:
          1. children 和routes选项的配置是一样的。
          2. children 中的path属性值不用加反斜杠 '/',会自动拼接到父级路径后面。为空时表示默认显示

     </p>
     <hr>
     <h4>下面是嵌套的子路由的内容:</h4>
     <router-link to="/home/homechild" tag="div">跳转到子路由</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
 
}
</script>
