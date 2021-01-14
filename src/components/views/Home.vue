<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!-- <v-tags></v-tags> -->
            <!--<el-scrollbar class="scrobarStyle">-->
            <div class="content" style="height: 100%;">
                <!--<el-scrollbar style="height: 100%">-->
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                 <el-backtop target=".content"></el-backtop>

            </div>
            <!--</el-scrollbar>-->
        </div>
    </div>
</template>

<script>
import vHead from '../common/Header';
import vSidebar from '../common/Sidebar.vue';
import vTags from '../common/Tags.vue';
import bus from '../common/bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        // vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
<style>
    /*.el-scrollbar__wrap {*/
        /*overflow-x: hidden;*/
    /*}*/
    /*.el-scrollbar__view{*/
        /*width:100%;*/
        /*height: 100%;*/
    /*}*/

    /*.scrobarStyle {*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*overflow: hidden;*/
        /*position: relative;*/

    /*}*/
    .content-box{
        background:url('../../assets/img/backgroundimg.png') no-repeat;
        background-size: cover;
    }
    .content{
        overflow: auto;
        padding: 0;
      
    }

    .el-table__header tr,
    .el-table__header th {
        padding: 0;
        height: 30px;
    }
    .el-table__body tr,
    .el-table__body td {
        padding: 0;
        height: 30px;
    }
</style>
