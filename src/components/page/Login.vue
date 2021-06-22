<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">马钢化工苯加氢PID评估软件V1.0</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item  prop="username" >
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips"  style="cursor: pointer" @click="ZCmethods">注册</p> -->
            </el-form>
        </div>
        <el-dialog title="注册" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="UserName">
                    <el-input v-model="ruleForm.UserName"></el-input>
                </el-form-item>
                 <el-form-item label="单位名称" prop="CompanyName">
                    <el-input v-model="ruleForm.CompanyName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="Password">
                    <el-input type="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="ZCSubmit('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
            <!--</div>-->
        </el-dialog>
    </div>
</template>

<script>
    import router from '../../router/index'
    import qs from 'qs'
    import {login,register} from'../../request/login.js'
export default {
    data: function() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空！'));
                callback();
            }
            callback();
            // setTimeout(() => {
            //     if (!Number.isInteger(value)) {
            //         callback(new Error('请输入数字值'));
            //     } else {
            //         if (value < 18) {
            //             callback(new Error('必须年满18岁'));
            //         } else {
            //             callback();
            //         }
            //     }
            // }, 1000);
        };
         var checkCompanyName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('单位名称不能为空！'));
                callback();
            }
            callback();
            // setTimeout(() => {
            //     if (!Number.isInteger(value)) {
            //         callback(new Error('请输入数字值'));
            //     } else {
            //         if (value < 18) {
            //             callback(new Error('必须年满18岁'));
            //         } else {
            //             callback();
            //         }
            //     }
            // }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
                callback();
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                    callback();
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.Password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
           
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            LocationProvince:"正在定位所在省",    //给渲染层定义一个初始值
            LocationCity:"正在定位所在市" ,    //给渲染层定义一个初始值
            dialogFormVisible: false,//注册界面
            ruleForm: {
                Password: '',
                checkPass: '',
                UserName: '',
                CompanyName:'',
            },
                      rules1: {
                Password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                UserName: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                 CompanyName: [
                    { validator: checkCompanyName, trigger: 'blur' }
                ]
            }
        };
    },
  
    methods: {
      




        submitForm() {
           //模拟后台返回数据
            const menu = [
//                 {
//     path: '/',
//    redirect:'/summarize'
//   },
//   {
//     path: '/',
//     //name: 'Home',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '@/components/views/Home.vue'),
//     meta: { title: '首页' },
//     children: [
//       {
//         path: '/summarize',
//         component: () => import(/* webpackChunkName: "403" */ '@/components/views/summarize.vue'),
//         meta: { title: '总览' }
//     },
//     {
//       path: '/category',
//       component: () => import(/* webpackChunkName: "403" */ '@/components/views/category.vue'),
//       meta: { title: '分类总览' }
//   },
//         {
//         path: '/appraise',
//         component: () => import(/* webpackChunkName: "403" */ '@/components/views/appraise.vue'),
//         meta: { title: '评估' }
//     },
//     {
//       path: '/datasource',
//       component: () => import(/* webpackChunkName: "403" */ '@/components/views/datasource.vue'),
//       meta: { title: '数据源管理' }
//   },
//   {
//     path: '/userinfo',
//     component: () => import(/* webpackChunkName: "403" */ '@/components/views/companyinfo.vue'),
//     meta: { title: '系统管理' }
// },
//       {
//           path: '/roleinfo',
//           component: () => import(/* webpackChunkName: "403" */ '@/components/page/roleinfo.vue'),
//           meta: { title: '角色管理' }
//       },
//       {
//           path: '/userinfo',
//           component: () => import(/* webpackChunkName: "403" */ '@/components/page/userinfo.vue'),
//           meta: { title: '用户管理' }
//       },
//       {
//           path: '/navigation',
//           component: () => import(/* webpackChunkName: "403" */ '@/components/page/navigation.vue'),
//           meta: { title: '菜单管理' }
//       },
//       {
//         path: '/companyinfo',
//         component: () => import(/* webpackChunkName: "403" */ '@/components/views/companyinfo.vue'),
//         meta: { title: '企业管理' }
//     },
   
//        ]
//   },
  {
    "id": 1,
    "name": "Home",
    "code": null,
    "description": null,
    "path": "/",
    "component": "Home",
    "generatemenu": 1,
    "sort": 0,
    "parentId": null,
    "permName": null,
    "redirect": "/example/table",
    "title": "首页",
    "icon": "example",
    "children": [
      {
        "id": 2,
        "name": "summarize",
        "code": null,
        "description": null,
        "path": "/summarize",
        "component": "summarize",
        "generatemenu": 1,
        "sort": 0,
        "parentId": 1,
        "permName": null,
        "redirect": "",
        "title": "Table",
        "icon": "table",
        "children": null
      },
      {
        "id": 3,
        "name": "datasource",
        "code": null,
        "description": null,
        "path": "/datasource",
        "component": "datasource",
        "generatemenu": 1,
        "sort": 0,
        "parentId": 1,
        "permName": null,
        "redirect": "",
        "title": "datasource",
        "icon": "tree",
        "children": null
      }
   ]
 }
]
    
            var that=this;
            this.$refs.login.validate(valid => {
                if (valid) {
                   login(that.param.username,that.param.password).then(res=> {
                   console.log(res)
                  var aData = new Date();
                  // console.log(aData) //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)

                  var loginTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
                  localStorage.setItem('loginTime',loginTime)
        if(res.success){
            //debugger
            //  登录接口调用后，调用路由接口，后端返回相应用户的路由res.router，我们需要存储到store中，方便其他地方拿取
           // that.$store.commit('SET_ROUTES', menu);
            that.$store.commit('SET_ROUTES', res.routerInfoList);
                //debugger
                //const b= router.options.routes
                 //sessionStorage.setItem('menu', JSON.stringify(menu));
    //that.$store.dispatch("addRoutes", routerList);
     localStorage.setItem('ms_username', that.param.username);
     localStorage.setItem('token', res.token);
     //debugger
                 this.$router.push('/');
    // var username=localStorage.getItem('ms_username')
    // this.$store.commit('saveuserName',username)
    // that.city()
                 this.$message.success(res.msg);
        }else {
     this.$message.error(res.msg);
        }

                    }).catch(function (error) {
                         //console.log(this)
                        that.$message.error('登录失败');
                        console.log(error);
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // city:function() {    //定义获取城市方法
        //     const geolocation = new BMap.Geolocation();
        //                var _this = this
        //     geolocation.getCurrentPosition(function getinfo(position){

        //         let city = position.address.city;             //获取城市信息
        //         let province = position.address.province;     //获取省份信息
        //         _this.LocationProvince = province
        //         _this.LocationCity = city
        //         localStorage.setItem('city', _this.LocationCity);
        //     }, function(e) {
        //         _this.LocationCity = "定位失败"
        //     }, {provider: 'baidu'});
        // },

        //注册提交
        ZCSubmit:function(formName){
            var that=this
            //console.log(this.$refs[formName])
            const userInfoStr=JSON.stringify(that.ruleForm)
              console.log(userInfoStr);
            this.$refs[formName].validate((valid) => {
                //debugger
                if (valid) {
                              
                  register(userInfoStr).then(res=>{
                        if(res.success){
                           // debugger
                            that.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            that.dialogFormVisible=false
                        }else{
                            //that.dialogFormVisible=false
                            that.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                   // alert('submit!');
                } else {
                    console.log('error submit!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ZCmethods:function() {
            this.dialogFormVisible=true
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(64,158,255);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
