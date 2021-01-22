// const moment = require("./moment")

(function(window,undefined){

    (function(){
        NProgress.set(0.4);
        let interval = setInterval(function(){
            NProgress.inc()
        },200)
        window.onload = function(){
            clearInterval(interval)
            NProgress.done()
        }
    })();

    let util = {
        date_format:function(date,format='YYYY-MM-DD HH:mm:ss'){
            return moment(date).format(format)
        }
    }
    window.util = util;
})(window)

