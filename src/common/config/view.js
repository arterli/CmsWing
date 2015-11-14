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
  options: {},
  prerender: function(nunjucks, env){
    //Ê±¼ä×ª»»
    env.addFilter("time", function(d){
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
      var time = y + "-" + M + "-" + d + " " + h + ":" + m;
      return time;
    })

  }
};