<!-- 离线数据源上传组件 -->
<template>
<div>
     <el-upload drag
     class="upload-demo"
            :multiple="true"
            ref="upload"
	       :limit="limitNum"
            :http-request="requestFile"
	      
	       accept=".csv"
	       :action="uploadURL"
	       :before-upload="beforeUploadFile"
	       :on-change="fileChange"
	       :on-exceed="exceedFile"
	       :on-success="handleSuccess"
	       :on-error="handleError"
	       :file-list="fileList"
         :on-remove="handleRemove"
          :on-progress="progressA"
         >
	    <i class="el-icon-upload"></i>
	    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	    <div class="el-upload__tip" slot="tip">只能上传CSV文件，且不超过10M</div>
  	</el-upload>
    <!-- //上传显示进度条 -->
			<!-- <div v-show="progressFlag">
			    <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" status="success"></el-progress>
			</div> -->
  <br/>
  <!-- <el-link :href='"http://192.168.1.113:1008/api/LoopInfo/templateDownload?type=offLine"'> -->
  <!-- <el-link :href='"http://192.168.1.180:6001/api/LoopInfo/templateDownload?type=offLine"'> -->
   <!--现场服务器 -->
  <el-link :href='"http://10.0.1.213:6001/api/LoopInfo/templateDownload?type=quota"'> 
    <el-button size="small" type="primary">下载模板<i class="el-icon-download el-icon--right"></i></el-button>

  </el-link>
  <!-- 服务器 -->
  <!-- <el-link :href='"http:// 192.168.1.180:2001/api/LoopInfo/templateDownload?type=offLine"'>
    <el-button size="small" type="primary">下载模板<i class="el-icon-download el-icon--right"></i></el-button>

  </el-link> -->
  <!-- 增减间隙 -->
  <el-button type="text"></el-button>
   <!-- <el-button size="small" type="primary" @click="uploadFile">上传文件<i class="el-icon-upload el-icon--right"></i></el-button> -->
<div class="tableStyle">
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="LoopName"
      label="回路名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Description"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Template"
      label="模板">
    </el-table-column>
    <el-table-column
      prop="LoopType"
      label="回路类型">
    </el-table-column>
    <el-table-column
      prop="PV"
      label="PV">
    </el-table-column>
    <el-table-column
      prop="SP"
      label="SP">
    </el-table-column>
    <el-table-column
      prop="OP"
      label="OP">
    </el-table-column>
    <el-table-column
      prop="Mode"
      label="Mode">
    </el-table-column>

  </el-table>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {uproad} from '../../../request/uproad'
import {download} from '../../../request/download'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    limitNum: 10000,  // 上传csv时，同时允许上传的最大数
    fileList: [], 
    fileData:'' , // csv文件列表
    progressFlag: true,//进度条初始值隐藏
		progressPercent: 0,//进度条初始值
     tableData: [{
          LoopName: 'FIC100',
          Description: 'BLOWDOWN CO',
          Template: '',
          LoopType:'',
          PV:'FIC100.PV',
          SP:'FIC100.SP',
          OP:'FIC100.OP',
          Mode:'FIC100.MODE'
        }, {
          LoopName: 'FIC200',
          Description: 'BLOWDOWN RATE',
          Template: '',
          LoopType:'',
          PV:'FIC100.PV',
          SP:'FIC100.SP',
          OP:'FIC100.OP',
          Mode:'FIC100.MODE'
        }, {
           LoopName: '3B0F003',
          Description: 'SECONDRY AIR F',
          Template: 'StandAlone',
          LoopType:'Flow',
          PV:'3B0F003.PV',
          SP:'3B0F003.SP',
          OP:'3B0F003.OP',
          Mode:'3B0F003.MODE'
        }, {
          LoopName: 'FIC100',
          Description: 'BLOWDOWN CO',
          Template: '',
          LoopType:'',
          PV:'FIC100.PV',
          SP:'FIC100.SP',
          OP:'FIC100.OP',
          Mode:'FIC100.MODE'
        },{
          LoopName: 'FIC100',
          Description: 'BLOWDOWN CO',
          Template: '',
          LoopType:'',
          PV:'FIC100.PV',
          SP:'FIC100.SP',
          OP:'FIC100.OP',
          Mode:'FIC100.MODE'
        },{
          LoopName: 'FIC100',
          Description: 'BLOWDOWN CO',
          Template: '',
          LoopType:'',
          PV:'FIC100.PV',
          SP:'FIC100.SP',
          OP:'FIC100.OP',
          Mode:'FIC100.MODE'
        }]
};
},
//监听属性 类似于data概念
computed: {
       //上传的文件路径
            uploadURL:function() {
              //  debugger;
               return "http://192.168.1.113:1008/api/LoopInfo/offLineLoop";
            }
},
//监控data中的数据变化d
watch: {},
//方法集合
methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
      },
      // 文件状态改变时的钩子
      fileChange(file, fileList) {
        
        // console.log(file.raw);
        // this.fileList.push(file.raw) ;
        // console.log(this.fileList);
      },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        console.log('before upload');
        console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== 'csv') {
          this.$message.warning('只能上传后缀是.csv的文件');
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M');
        }
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功');
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      },
      //文件上传时的钩子
       progressA(event, file) {
         
       },
    //   /** 模板下载 */
    //   downloadFile(){
    //       let offLine="offLine"
    //       download(offLine).then(res=>{
    //          console.log(res)
    //       },err =>{
    //         console.log(err)
    //         }).catch( error=>{

    //       })
    //   },
    //   UploadUrl:function(){
    //    // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
    //     return ""
    //   },
      uploadFile() {
        // if (this.fileList.length === 0){
        //   this.$message.warning('请上传文件');
        // } else {
           
            
           // this.fileData = new FormData();
           // this.$refs.upload.submit()
            //let file=this.$refs.upload.fileList
           
         
          //let a=form.get(file)
          //form.append('file', this.fileList);
        
        // this.fileData.append('deviceID',1)
         //修改progressFlag值
         // this.progressFlag = true;
          //进度条配置
      //     let config ={
      //       onUploadProgress:ProgressEvent =>{
      //         let progressPercent =(ProgressEvent.loaded / ProgressEvent.total *100 | 0)
      //         this.progressPercent=progressPercent
      //       }
      //     }
      //  uproad(this.fileData,config).then(
      //       res=>{
      //         debugger
      //         console.log(res)
      //         if(res.data.success){
      //             file.onSuccess(); //上传成功(打钩的小图标)
      //           //this.$message.success(res.data.msg);
      //         }else{
      //           this.$message.error(res.data.msg);
      //         }
             
      //       },err =>{
      //       this.$message.error("连接失败");
      //       console.log(err)
      //       });
       // }
      },
      requestFile(file){
          
           let token = window.localStorage.getItem("token") 
            this.fileData = new FormData();
          this.fileData.append('files',file.file)
            let config ={
            onUploadProgress:ProgressEvent =>{
              let progressPercent =(ProgressEvent.loaded / ProgressEvent.total *100 | 0)
              //this.progressPercent=progressPercent
              
               file.onProgress({percent: progressPercent})     //进度条
            }
          }
 uproad(this.fileData,config).then(
            res=>{
              
              console.log(res)
              if(res.data.success){
                  file.onSuccess(); //上传成功(打钩的小图标)
                //this.$message.success(res.data.msg);
              }else{
               // this.$message.error(res.data.msg);
               file.onError();
               
              }
             
            },err =>{
            this.$message.error("连接失败");
            console.log(err)
            });
       


//  this.$axios({
//                     url: "http://192.168.1.113:1008/api/LoopInfo/offLineLoop",
//                     method: 'post',
//                     data: this.fileData,
//                      headers: { 'Content-Type': 'multipart/form-data','Authorization':token },
//                     //上传进度
//                      onUploadProgress:(ProgressEvent) =>{
//               let progressPercent =ProgressEvent.loaded / ProgressEvent.total *100 | 0
//               //this.progressPercent=progressPercent
//               debugger
//                file.onProgress({percent: progressPercent})     //进度条
//             }
//                 }).then(data => {
//                     file.onSuccess(); //上传成功(打钩的小图标)
//                 }).catch(err=>{
//                   file.onError();
//                 })


      //  uproad(this.fileData,config).then(
      //       res=>{
      //         debugger
      //         console.log(res)
      //         if(res.data.success){
      //             file.onSuccess(); //上传成功(打钩的小图标)
      //           //this.$message.success(res.data.msg);
      //         }else{
      //           this.$message.error(res.data.msg);
      //         }
             
      //       },err =>{
      //       this.$message.error("连接失败");
      //       console.log(err)
      //       });
      },
      handleRemove(file){
         this.$refs.upload.abort(); //取消上传
                this.$message({message: '成功移除' + file.name, type: 'success'});
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
}
</script>
<style scoped>
.tableStyle{
  padding: 2px;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>