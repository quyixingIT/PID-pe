<template>
    <div class="sidebar">
         
        <el-menu
            class="sidebar-el-menu"
           :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
             @select="handleSelect"
        >
          <!-- 引入组件 -->
            <MenuTree :menu-data="items"></MenuTree>
         <!-- <template v-for="item in items">
                <template v-if="item.subs!== undefined && item.subs.length>0">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template> -->
        </el-menu>
    </div>
</template>

<script>
 import MenuTree from "../common/MenuTree.vue"
import bus from '../common/bus';
import {getMenu} from '../../request/menumanage'
//import { set } from 'vue/types/umd';
export default {
     components: {
            MenuTree: MenuTree
        },
    data() {
        return {
            collapse: false,
            //items: []
        };
    },
    computed: {
        onRoutes() {
           // debugger
            return this.$route.path.replace('/', '');
            //return this.$store.state.routes[1].children[0].path;
        },
        items:{
            set(v){
               this.$store.commit({
                type:'getmenu',
                payload:v
            })
            },
            get(){
                return this.$store.state.menu
            }
        }
    },
    mounted(){
this.readMenu();
    },
    created() {
         const a=this.$store.state
        // debugger
        const menu = JSON.parse(localStorage.getItem('menu'));
      if(menu) this.$store.commit('SET_ROUTES', menu);
        // 通过 Event Bus 进行兄弟组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
       // debugger
        //const a=this.$store.state
        //const b=this.$store.state.routes[0].children[0].path
         // 页面刷新后，store 中的数据会丢失不见，这个时候需要从 session 中获取
     
    },
    methods:{
        /** 点击菜单项的回调 */
        handleSelect(key, keyPath){
           // debugger
           sessionStorage.setItem('index',key)
            console.log(key)
            console.log(keyPath)
        },
    readMenu:function() {
        var that=this;
        var user=localStorage.getItem('ms_username')
    getMenu().then(function (response) {
      // debugger
            console.log(response);
            that.$store.commit({
                type:'getmenu',
                payload:response.viewMenuList
            })
            //that.items=response.viewMenuList;
            that.items=that.$store.state.menu;
             console.log(that.$store.state.menu)
             //console.log(that.items instanceof Object);
            // console.log(that.items[0].subs.length);
        })
        .catch(function (error) {
          
            console.log(error);
        });
      }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
