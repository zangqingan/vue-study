<template>
  <div class="home">
    <h3>我是home下的子路由</h3> 
    <p>
      我是子路由，我当前的路径是：{{ $route.path }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Homechild',
 
}
</script>
