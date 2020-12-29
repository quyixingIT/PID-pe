<template>
    <div class="header">
        <!-- <PDF ref="pdf" style="display: none;"></PDF> -->
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">华理自动化控制资产管理平台</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 下载 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?``:`白皮书下载`"
                        placement="bottom"
                    > -->
                        <!--<a href="../../../static/PID.pdf" download="PID.pdf">xiazia</a>-->
                        <!--<el-link icon="el-icon-download" ></el-link>-->

                        <!-- <el-button type="primary" icon="el-icon-download" circle @click="downloadWeekly('DownLoad/PIDTuningFile','PID整定理论与实践.pdf')"></el-button>
                    </el-tooltip> -->
                    <!--<span class="btn-bell-badge" v-if="message"></span>-->
                <!-- </div> -->
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--<a href="https://github.com/lin-xin/vue-manage-system" target="_blank">-->
                            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                        <!--</a>-->
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog  title="修改密码" :visible.sync="dialogFormVisible">
            <!--<el-form :model="form">-->
                <!--<el-form-item label="原始密码" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="新密码" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="确认密码" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPwd" :label-width="formLabelWidth">
                    <el-input type="password" autocomplete="off" v-model="ruleForm.oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
import bus from '../common/bus';
//import PDF from '../common/VuePDF'
export default {
    // components: {PDF},
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            callback();
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: false,
            dialogFormVisible: false,
            // form: {
            //     name: '',
            //     region: '',
            //     date1: '',
            //     date2: '',
            //     delivery: false,
            //     type: [],
            //     resource: '',
            //     desc: ''
            // },
            // formLabelWidth: '120px',
            // dialogFlag:false,
            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
                oldPwd:''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                // age: [
                //     { validator: checkAge, trigger: 'blur' }
                // ]
            },
            formLabelWidth:""




        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        //预览
        previewWeekly(id){
            //调用子组件的预览方法
            //完整的地址应该是发布到服务器的地址，不应该是localhost:8080这样的
            //Vue.prototype.ApiUrl 用来读取服务器地址 比如:
            //http://192.168.8.152:8080/MixShowView-Web/reports/preview/1
            this.$refs.pdf.previewPDF(Vue.prototype.ApiUrl+'/reports/preview/'+id)
        },
        //下载
        // downloadWeekly(id,fileName){
        //     debugger
        //     console.log(this)
        //     //调用子组件的下载方法
        //     this.$refs.pdf.downloadPDF(id,fileName)
        // },

        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                localStorage.removeItem('token');
                sessionStorage.removeItem('index')
                this.$router.push('/login');
            }else {

                this.dialogFormVisible=true

            }
        },
        submitForm(formName) {
            var userName= localStorage.getItem('ms_username')
            var that=this;
           debugger
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        debugger
                        // alert('submit!');
                        that.$axios.get('UserInfo/updatePassword',{
                            params: {
                                userName:userName,
                                oldPwd:that.ruleForm.oldPwd,
                                newPwd:that.ruleForm.pass
                            }
                        }).then(res=> {
                            debugger
                            //console.log(res)
                            if (res.success) {
                                that.$message.success('修改成功');
                                that.dialogFormVisible = false
                                localStorage.removeItem('ms_username');
                                that.$router.push('/login');
                            }else {
                                that.$message.error('修改失败');
                            }



                        }).catch(function (error) {
                            debugger
                            that.$message.error('修改失败');
                            //console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });







                    // var userName= localStorage.getItem('ms_username')
                    // this.$axios.get('UserInfo/updatePassword',{
                    //     params: {
                    //         userName:userName,
                    //         oldPwd:formName.oldPwd,
                    //         newPwd:formName.pass
                    //     }
                    // }).then(res=> {
                    //      //console.log(res)
                    //     if (res.success) {
                    //         this.$message.success('修改成功');
                    //         this.dialogFormVisible = false
                    //         localStorage.removeItem('ms_username');
                    //         this.$router.push('/login');
                    //     }else {
                    //         this.$message.error('修改失败');
                    //     }
                    //
                    //
                    //
                    // }).catch(function (error) {
                    //     this.$message.error('修改失败');
                    //     //console.log(error);
                    // });


        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 350px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
