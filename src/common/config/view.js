'use strict';
/**
 * template config
 */
export default {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter:{
    nunjucks: {
      prerender: function(nunjucks, env){
        /**
         * 格式化字节大小
         * @param  number size      字节数
         * @param  string delimiter 数字和单位分隔符
         * @return string            格式化后的带单位的大小
         */
        env.addFilter("format_bytes", function(size, delimiter = ''){
          let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
          for (var i = 0; size >= 1024 && i < 5; i++) size /= 1024;
          return Math.round(size*100)/100 + delimiter + units[i];
        });

        /**
         * 格式化时间
         */
        env.addFilter("format_time",function(d,sec){
          var time;
          var date = new Date(d);
          var y = date.getFullYear();
          var M = date.getMonth() + 1;
          M = M < 10 ? "0" + M : M;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          var h = date.getHours();
          h = h < 10 ? "0" + h : h;
          var m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          var s = date.getSeconds();
          s = s < 10 ? "0" + s : s;
          if(sec){
            time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
          }else{
            time = y + "-" + M + "-" + d + " " + h + ":" + m;
          }
          return time;
        })

        /**
         *分析枚举类型配置值 格式 a:名称1,b:名称2
         */
        env.addFilter("parse_config_attr",function(str){
          return parse_config_attr(str)
        })
      }
    }
  }
};