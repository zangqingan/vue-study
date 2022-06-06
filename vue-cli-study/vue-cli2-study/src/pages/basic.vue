<template>
  <div class="basic">
      <h3>1. vue实际开发中组件的使用</h3>
      <p>
          实际开发中一个 .vue 文件就是一个组件，所以是不用自己生成组件构造器对象的，
          组件之间要互相使用步骤如下：
          1. 使用es6模块语法引入已经定义好的组件
          2. 在components选项中注册成局部组件
          3. 在当前组件控制的页面区域使用 &lt;组件名&gt; &lt;/组件名&gt;，使用注册的组件。
      </p>
      <h3>2. 父子组件之间的通信</h3>
      <p>

      </p>
      <h3>3. 组件插槽</h3>
      <p>
          
      </p>

  </div>
</template>

<script>


export default {
  name: 'basic',
  data() { 
    return {

    }
  },
  components:{

  }
 }
</script>

<style lang="" scoped>
  .basic{
      font-size: 18px;
  }
</style>