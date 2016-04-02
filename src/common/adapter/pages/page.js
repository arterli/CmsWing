// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * base adapter
 */
    /*
    let data = await this.model('user').where(map).page(this.get('page')).countSelect();//查询数据库
    let Pages = think.adapter("pages", "page"); //加载名为 page 的 pages Adapter
    let pages = new Pages(); //实例化 Adapter
    let page = pages.pages(data);//传入数据库查询返回的数据集
    this.assign('list', data.data);//输出到模板
*/
export default class extends think.adapter.base {
  /**
   * init
   * @return {[]}         []
   */
  init(http){
    super.init(http);
  }

  /**
   *
   * @param pagerData
   * @returns {*}
   */
  pages(pagerData){
    let http = think.http;
    let pagerHtml;
    if(pagerData.totalPages > 1){

      var pageUrl = pagerData.url;
      if(!pageUrl){
        var htmlMaps = {
          '<': '<',
          '>': '>',
          '"': '"e;',
          "'": "'"
        }
        var escape_html = function (str) {
          return (str + "").replace(/[<>'"]/g, function(a){
            return htmlMaps[a];
          })
        }
        //var prefix = "?";
        var prefix = "?";
        var querys = [];
        for(var name in http.query){
          if(name == 'page') continue;
          querys.push(escape_html(name) + '=' + escape_html(http.query[name]));
        }
        prefix += querys.join("&");
        if(querys.length){
          prefix += "&";
        }
        pageUrl = prefix + "page=${page}";
      }

      pagerHtml='<div class="btn-group m-t-none m-b-none">';
      if(!pagerData.hideDesc){
        pagerHtml += `<a class="disabled btn btn-default"><span>共有${pagerData.count}条记录，共${pagerData.totalPages}页</span></a>`
      }
      if(pagerData.currentPage > 1){
        pagerHtml += `<a class="prev btn btn-default" href="${pageUrl.replace('${page}', pagerData.currentPage - 1)}">上一页</a>`
      }

      var num = pagerData.numsPerPage || 3;
      var pageIndex = [];
      var page = pagerData.currentPage | 0 || 1;
      for (var i = page - num; i <= page + num; i++) {
        if (i >= 1 && i <= pagerData.totalPages) {
          pageIndex.push(i);
        };
      }

      if(pageIndex[0] > 1){
        pagerHtml += `<a  class="btn btn-default"  href="${pageUrl.replace('${page}', 1)}">1</a>`
      }
      if(pageIndex[0] > 2){
        pagerHtml += `<a class="disabled btn btn-default"><span>...</span></a>`
      }

      for (var i = 0, length = pageIndex.length; i < length; i++) {
        var p = pageIndex[i];
        if (p == page) {
          pagerHtml += `<a class="active btn btn-default" href="${pageUrl.replace('${page}', p)}"> ${p} </a>`
        } else {
          pagerHtml += `<a class="btn btn-default" href="${pageUrl.replace('${page}', p)}">${p}</a>`
        }
      }


      if (pageIndex.length > 1) {
        var last = pageIndex[pageIndex.length - 1];
        if (last < (pagerData.totalPages - 1)) {
          pagerHtml += `<a class="disabled btn btn-default"><span>...</span></a>`
        };
        if (last < pagerData.totalPages) {
          pagerHtml += `<a class="btn btn-default" href="${pageUrl.replace('${page}', pagerData.totalPages)}">${pagerData.totalPages}</a>`
        };
      };

      if (page < pagerData.totalPages) {
        pagerHtml += `<a  class="next btn btn-default" href="${pageUrl.replace('${page}', pagerData.currentPage + 1)}">下一页</a>`
      };
      pagerHtml +=`</div>`
      return pagerHtml
    }

  }
}