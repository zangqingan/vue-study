<template>
  <div class="home">
    <h3>1. 前端模块化发展</h3>
    <p>
        随着前端代码的复杂化,js代码越来越多。就把js代码抽离到一个 .js文件中,但是这样会导致全局变量命名冲突等问题。
        解决方法：前端模块化即人为的指定标准规范,前端主要有AMD,CMD,不过现在用的都不多。
        现在主要是使用es6的 export(export default)和import两个关键字实现 .js文件 的导入和导出。
        后端则是Commonjs规范,由nodejs实现。使用module.exports={}导出,使用required('路径')函数引入。
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'

}
</script>
