'use strict';

import Base from './base.js';
import WechatAPI from 'wechat-api';
import nunjucks from 'nunjucks';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //fdsfsdfs
    //auto render template file index_index.html
    //当前模板路径
    function RemoteExtension() {
      this.tags = ['remote'];

      this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // parse the body and possibly the error block, which is optional
        var body = parser.parseUntilBlocks('error', 'endtruncate');
        var errorBody = null;

        if (parser.skipSymbol('error')) {
          parser.skip(lexer.TOKEN_BLOCK_END);
          errorBody = parser.parseUntilBlocks('endremote');
        }

        parser.advanceAfterBlockEnd();

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
      };

      this.run = function(context, url, body, errorBody) {
        var id = 'el' + Math.floor(Math.random() * 10000);
        var ret = new nunjucks.runtime.SafeString('<div id="' + id + '">' + body() + '</div>');
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
          if (ajax.readyState == 4) {
            if (ajax.status == 200) {
              document.getElementById(id).innerHTML = ajax.responseText;
            } else {
              document.getElementById(id).innerHTML = errorBody();
            }
          }
        };

        ajax.open('GET', url, true);
        ajax.send();

        return ret;
      };
    }
    let tplpath = this.config('view.root_path') + think.sep + this.http.module + think.sep + this.http.controller + this.config('view.file_depr') + this.http.action + this.config("view.file_ext")
      //var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(this.config('view.root_path')+think.sep+this.http.module));
      //env.addExtension('remote', new RemoteExtension());
      //nunjucks.precompile(this.config('view.root_path'), {env: env })
      //console.log(new nunjucks.FileSystemLoader(think.config('view.root_path')));

    //     let envs = nunjucks.configure(this.config('view.root_path')+think.sep+this.http.module, { autoescape: true });
    //     envs.addExtension('RemoteExtension', new RemoteExtension());
    //     envs.addFilter('tsetfun', function(val) {
    //   return val+"333333333333";
    //        });
    // let dd=nunjucks.render('test_index.html', { foo: 'bar' });
    //     let content = await this.fetch();
    //     console.log(envs);
    // this.end(dd);
    this.assign({
      foo: 'bar'
    })
    return this.display();
  }
  weixinAction(){
      let self = this;
      var api = new WechatAPI("wxadce60f0c68b9b58", "41318d0bc30d292f278a720758d14833");
      api.getUser("on47Ms4t43aQfpsPAQHL5VC2iDaU", function(err,res){
         // self.assign('url',res.headimgurl);
          console.log(res.headimgurl);
      });
     this.assign('url',"http://wx.qlogo.cn/mmopen/CjI64f6iblexHK4xia2Sf5KepCRL3geeUZa5FalTA0lvIEf6pzfAMasrVJKYiaMDJB3cnVMcFMSIWFaNIwQKAw2XosEg6qtF7Mc/0");
     this.display();
      //this.end("我是鞠焕尧"); 
  }
}
