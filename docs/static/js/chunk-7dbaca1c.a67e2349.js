(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dbaca1c"],{"0290":function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"login-wrap"},[s("div",{staticClass:"ms-login"},[s("div",{staticClass:"ms-title"},[e._v("华理自动化控制资产管理平台V1.0")]),s("el-form",{ref:"login",staticClass:"ms-content",attrs:{model:e.param,rules:e.rules,"label-width":"0px"}},[s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{attrs:{placeholder:"username"},model:{value:e.param.username,callback:function(r){e.$set(e.param,"username",r)},expression:"param.username"}},[s("el-button",{attrs:{slot:"prepend",icon:"el-icon-user-solid"},slot:"prepend"})],1)],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{type:"password",placeholder:"password"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.submitForm()}},model:{value:e.param.password,callback:function(r){e.$set(e.param,"password",r)},expression:"param.password"}},[s("el-button",{attrs:{slot:"prepend",icon:"el-icon-key"},slot:"prepend"})],1)],1),s("div",{staticClass:"login-btn"},[s("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm()}}},[e._v("登录")])],1)],1)],1),s("el-dialog",{attrs:{title:"注册",visible:e.dialogFormVisible},on:{"update:visible":function(r){e.dialogFormVisible=r}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules1,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"UserName"}},[s("el-input",{model:{value:e.ruleForm.UserName,callback:function(r){e.$set(e.ruleForm,"UserName",r)},expression:"ruleForm.UserName"}})],1),s("el-form-item",{attrs:{label:"单位名称",prop:"CompanyName"}},[s("el-input",{model:{value:e.ruleForm.CompanyName,callback:function(r){e.$set(e.ruleForm,"CompanyName",r)},expression:"ruleForm.CompanyName"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"Password"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.Password,callback:function(r){e.$set(e.ruleForm,"Password",r)},expression:"ruleForm.Password"}})],1),s("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.ZCSubmit("ruleForm")}}},[e._v("提交")]),s("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1)},o=[],a=(s("a18c"),s("4328"),s("284b"));function l(e,r){return Object(a["a"])({url:"/api/Login/login",params:{userName:e,password:r}})}function n(e){return Object(a["a"])({url:"/api/Login/register",params:{registerInfo:e}})}var i={data:function(){var e=this,r=function(e,r,s){if(!r)return s(new Error("用户名不能为空！"));s()},s=function(e,r,s){if(!r)return s(new Error("单位名称不能为空！"));s()},t=function(r,s,t){""===s?(t(new Error("请输入密码")),t()):(""!==e.ruleForm.checkPass&&(e.$refs.ruleForm.validateField("checkPass"),t()),t())},o=function(r,s,t){""===s?t(new Error("请再次输入密码")):s!==e.ruleForm.Password?t(new Error("两次输入密码不一致!")):t()};return{param:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},LocationProvince:"正在定位所在省",LocationCity:"正在定位所在市",dialogFormVisible:!1,ruleForm:{Password:"",checkPass:"",UserName:"",CompanyName:""},rules1:{Password:[{validator:t,trigger:"blur"}],checkPass:[{validator:o,trigger:"blur"}],UserName:[{validator:r,trigger:"blur"}],CompanyName:[{validator:s,trigger:"blur"}]}}},methods:{submitForm:function(){var e=this,r=this;this.$refs.login.validate((function(s){if(!s)return e.$message.error("请输入账号和密码"),console.log("error submit!!"),!1;l(r.param.username,r.param.password).then((function(s){console.log(s);var t=new Date,o=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();localStorage.setItem("loginTime",o),s.success?(r.$store.commit("SET_ROUTES",s.routerInfoList),localStorage.setItem("ms_username",r.param.username),localStorage.setItem("token",s.token),e.$router.push("/"),e.$message.success(s.msg)):e.$message.error(s.msg)})).catch((function(e){r.$message.error("登录失败"),console.log(e)}))}))},ZCSubmit:function(e){var r=this,s=JSON.stringify(r.ruleForm);console.log(s),this.$refs[e].validate((function(e){if(!e)return console.log("error submit!"),!1;n(s).then((function(e){e.success?(r.$message({message:e.msg,type:"success"}),r.dialogFormVisible=!1):r.$message({message:e.msg,type:"error"})}))}))},resetForm:function(e){this.$refs[e].resetFields()},ZCmethods:function(){this.dialogFormVisible=!0}}},u=i,m=(s("58ff"),s("2877")),c=Object(m["a"])(u,t,o,!1,null,"02c85f0e",null);r["default"]=c.exports},"383a":function(e,r,s){},"58ff":function(e,r,s){"use strict";var t=s("383a"),o=s.n(t);o.a}}]);