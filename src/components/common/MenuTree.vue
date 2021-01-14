<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.index" :index="menu.index" v-if="menu.subs" >
                <template slot="title">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{menu.title}}</span>
                </template>

                <MenuTree  :menuData="menu.subs" ></MenuTree>
            </el-submenu>
            <el-menu-item :key="menu.index" :index="menu.index"   v-else>
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>
 
<script>
    //import {reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted} from '@vue/composition-api';
    export default {
        name: "MenuTree",
        props:['menuData'],
        data(){
            return{
                cdata:[]
            }
        },
       // props: ['menuData'],
        components:{
        },
        created(){
            
        },
//          watch: {
//            menuData:{
//     handler(newVal,oldVal){
//       //debugger
//       //let value=newVal
//       //arry.push(newVal[0],[newVal[1]])
//      // let arry=value.splice(2)
//       if(newVal){
//           debugger
//         this.menuData=newVal
//       }else{
//         //this.showloading=true
//          this.menuData=oldVal
//       }
//     }
//   }
//         },
        // setup({root}, props) {
        //     return {
        //         props,
        //     }
        // }
    }
</script>
 
<style  scoped>
    /* // .bgc{
    //     background-color: #f56c6c;
    // }
 
    // .bgcChild{
    //     background-color: #f56c6c;
    // } */
 
 
</style>