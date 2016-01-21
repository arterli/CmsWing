'use strict';

import Base from './base.js';
import nunjucks from 'nunjucks';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  *indexAction(){
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

        if(parser.skipSymbol('error')) {
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
            if(ajax.readyState == 4) {
                if(ajax.status == 200) {
                    document.getElementById(id).innerHTML = ajax.responseText;
                }
                else {
                    document.getElementById(id).innerHTML = errorBody();
                }
            }
        };

        ajax.open('GET', url, true);
        ajax.send();

        return ret;
    };
}
let tplpath = this.config('view.root_path')+think.sep+this.http.module+think.sep+this.http.controller+this.config('view.file_depr')+this.http.action+this.config("view.file_ext")
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
//     let content = yield this.fetch();
//     console.log(envs);
    // this.end(dd);
    this.assign({foo:'bar'})
    return this.display();
  }
}