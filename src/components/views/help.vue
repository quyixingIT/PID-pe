<template>

<div class="allcontent" >
    <div class="messageStyle">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>资料下载</span>

                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <!--<div v-for="o in Arr" :key="o" class="text item">-->
                            <!--{{o}}-->
                            <!--<el-button type="text" size="small" style="float: right; " icon="el-icon-view"  @click="previewPDF('DownLoad/PIDTuningFile')">预览</el-button>-->
                            <!--<el-button type="text" size="small" style="float: right;"  icon="el-icon-download"  @click="downloadWeekly('DownLoad/PIDTuningFile','PID整定理论与实践.pdf')">下载</el-button>-->
                        <!--</div>-->
                        <!-- <div class="text item">
                            PID整定指导白皮书
                            <el-button type="text" size="small" style="float: right; " icon="el-icon-view"  @click="previewPDF('api/Help/HelpDoc')">预览</el-button>
                            <el-button type="text" size="small" style="float: right;"  icon="el-icon-download"  @click="downloadWeekly('api/Help/HelpDoc',' PID整定指导白皮书.pdf')">下载</el-button>
                        </div> -->
                        <div class="text item">
                            操作手册
                            <el-button type="text" size="small" style="float: right;" icon="el-icon-view"  @click="previewPDF('/api/Help/HelpDoc')">预览</el-button>
                            <el-button type="text" size="small" style="float: right;"  icon="el-icon-download"  @click="downloadWeekly('api/Help/HelpDoc','控制资产管理软件操作手册.pdf')">下载</el-button>
                        </div>
                    </el-card>
            <div>
                <PDF ref="pdf" style="display: none;"></PDF>
                <!--<el-button type="primary" icon="el-icon-view" circle @click="previewPDF('DownLoad/PIDTuningFile')">预览《PID整定指导》白皮书</el-button>-->
                <!--<el-button type="primary" icon="el-icon-download" circle @click="downloadWeekly('DownLoad/PID                <div style="width: 100%;height: 100%;overflow: hidden">
TuningFile','PID整定理论与实践.pdf')">下载《PID整定指导》白皮书</el-button>-->
                <!--PDF 预览-->
                <el-dialog
                           :visible.sync="viewVisible" width="60%" center
                           @close='closeDialog'>
                    

                    <div >
                        <pdf
                                :src="src"
                                :page="pdfPage"
                                @num-pages="pageCount = $event"
                                @page-loaded="pdfPage = $event"
                                style="width: 100%"
                        ></pdf>
                    </div>
<div style="margin-bottom: 15px; text-align: right">
                        <el-button type="primary" size="small" @click.stop="previousPage">
                            上一页
                        </el-button>
                        <el-button type="primary" size="small" @click.stop="nextPage">
                            下一页
                        </el-button>
                        <span>当前第{{pdfPage}}页 / 共{{pageCount}}页</span>
                    </div>
                </el-dialog>

            </div>

        </div>
  
</div>
</template>

<script>

    import pdf from 'vue-pdf';
    import PDF from '../common/VuePDF'
    export default {
        components: {
            pdf,
            PDF
        },
        data(){
            return{
                name: 'help',
                //PDF预览
                viewVisible: false,
                // src: null,
                pdfPage : 1,
                pageCount: 0,
                src: '',
                text: '',
                textarea: '',
                Arr:['PID整定白皮书','操作手册'],
                issueInfoStr:{
                    Title:'',
                    Details:'',
                   // UserName:localStorage.getItem('ms_username')
                },
            }

        },
        methods:{
            submit(){
                var that=this
                if(that.issueInfoStr.Title=='' ||that.issueInfoStr.Details=='' ){
                    this.$message.error('描述内容不能为空！')

                }else {

                    that.$axios.get('ContactUs/addIssueInfo', {
                        params: {
                            issueInfoStr: that.issueInfoStr
                        }
                    })
                        .then(function(response) {
                                //debugger;
                                if (response.success) {
                                    that.$message({
                                        type: 'success',
                                        message: response.msg
                                    });

                                }
                                else {
                                    that.$message({
                                        type: 'error',
                                        message: response.msg
                                    });
                                }
                            }
                        )
                        .catch(function(error) {
                            console.log(error);
                        });

                }

            },
            //PDF预览
            previewPDF(row){
               //本机
                //this.src = pdf.createLoadingTask("http://192.168.1.180:6001/"+row);
                //服务器
                let interAdd=process.env.VUE_APP_URL
                debugger
              // this.src = pdf.createLoadingTask("http://127.0.0.1:6001/"+row);
              this.src = pdf.createLoadingTask(interAdd+row);
                let cc=this.src
                cc.promise.then(pdf => {
                    this.viewVisible = true;
                });
            },
            //下载
            downloadWeekly(id,fileName){

                console.log(this)
                //调用子组件的下载方法
                this.$refs.pdf.downloadPDF(id,fileName)
            },
            //关闭窗口初始化PDF页码
            closeDialog(){
                this.pdfPage = 1;
            },

            //PDF改变页数
            previousPage(){
                var p = this.pdfPage
                p = p>1?p-1:this.pageCount
                this.pdfPage = p
            },
            nextPage(){
                var p = this.pdfPage
                p = p<this.pageCount?p+1:1
                this.pdfPage = p
            }
        }

    };
</script>

<style scoped>
.allcontent{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
    .messageStyle{
        width: 100%;
        height: 100%;
        /* border-right: 1px slateblue solid ; */
    }
.questionStyle{
    text-align: center;
    width: 50%;
    height: 100%;
}
/*资料下载*/
.text {
    font-size: 14px;

}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color:white;
}
</style>
