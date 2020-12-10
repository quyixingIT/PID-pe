<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
  created(){
    //   在页面加载时读取sessionStorage里的状态信息

// if ( sessionStorage.getItem('menu') ) {
//   this.$store.replaceState( Object.assign( {}, this.$store.state,
//   JSON.parse(sessionStorage.getItem('menu') ) ) )
// }

//   页面刷新时将state数据存储到sessionStorage中

// window.addEventListener('beforeunload',()=>{
//   debugger
//   const aa=sessionStorage.getItem('menu')
//   //sessionStorage.setItem('menu',JSON.stringify(this.$store.state) )
// })

  }
}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css"; /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
