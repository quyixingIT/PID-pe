// 防抖
export const debounce= (func, wait) => {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
};

// 节流
export const throttle = (fn, wait) => {
    let canRun = true; // 通过闭包保存一个标记
    //debugger
    return function () {
      if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
      canRun = false; // 立即设置为false
      setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
        fn.apply(this, arguments);
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
        canRun = true;
      }, wait);
    };
  }
  //获取指定天数之前日期（返回一个时间区间）
  export function getTimeInterval(date,days) { //time为减去的指定天数
    
      var d=new Date(date); 
      d.setDate(d.getDate()+days); 
      var month=d.getMonth()+1; 
      var day = d.getDate(); 
      var hour=d.getHours();
      var menu=d.getMinutes();
      var s= d.getSeconds()
      if(month<10){ 
         month = "0"+month; 
       } 
      if(day<10){ 
        day = "0"+day; 
       } 
       if(hour<10){
        hour = "0"+hour;
       }
       if(menu<10){
        menu = "0"+menu;
       }
       if(s<10){
        s = "0"+s;
       }
      var val = d.getFullYear()+""+month+""+day+""+hour+""+menu+""+s; 
      return val; 
   
  }


