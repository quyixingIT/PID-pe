<template>

</template>

<script>
    import pdf from 'vue-pdf'
    export default {
        components: {pdf},
        name: 'VuePDF',
        data(){
            return{
                //PDF预览
                viewVisible: false,
                // src: null,
                pdfPage : 1,
                pageCount: 0,
                src: '',
            }
        },
        methods: {
            //预览pdf
            previewPDF(url){
                this.src = pdf.createLoadingTask(url)
            },
            //下载PDF
            downloadPDF(url,fileName){
               // debugger
                var that=this
                that.$axios({
                    method: 'get',
                    responseType: 'arraybuffer',
                    url: url
                }).then(function(res) {
                    //debugger
                        //调用下载方法，把后端传过来的流传给fileDownload方法
                    that.fileDownload(res, fileName);
                    }.bind(that)
                )
                    .catch(
                        function(error) {
                            that.$message.error('网络请求出错');
                            //debugger
                            //调试阶段可以看看报的什么错
                            console.log("error",error)
                        }.bind(that)
                    );
            },
            fileDownload:function (data, fileName) {
                //debugger
                let blob = new Blob([data], {
                    //type类型后端返回来的数据中会有，根据自己实际进行修改
                    type: "application/octet-stream"
                });
                let filename = fileName || "PID整定理论与实践.pdf";
                if (typeof window.navigator.msSaveBlob !== "undefined") {
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    var blobURL = window.URL.createObjectURL(blob);
                    // 创建隐藏<a>标签进行下载
                    var tempLink = document.createElement("a");
                    tempLink.style.display = "none";
                    tempLink.href = blobURL;
                    tempLink.setAttribute("download", filename);
                    if (typeof tempLink.download === "undefined") {
                        tempLink.setAttribute("target", "_blank");
                    }
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }
            }
        }

    };
</script>

<style scoped>

</style>
