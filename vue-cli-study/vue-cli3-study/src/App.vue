<template>
  <div id="app">
    <div id="nav">
      <ul class="nav-ul">
        <li><router-link to="/">前端模块化和npm的使用</router-link></li>
        <li><router-link to="/packtool">webpack基础学习</router-link></li>
        <li><router-link to="/scaffolding">vue-cli学习</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.nav-ul{
  display:flex;
  justify-content: space-around;
  list-style: none;
}
.nav-ul li{
  width: 200px;
  height: 30px;
  line-height: 30px;
    text-align: center;
}
.nav-ul a{

  text-decoration: none;
}
.nav-ul li:hover{
  background:powderblue;
}
</style>
