/**
 * Created by arter on 2015/11/16.
 */
'use strict';

import Base from './base.js';
import fs  from 'fs';
import path from 'path';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http){
        super.init(http);
    }
    __before(){
        this.assign({
            "tactive":"sysm",
            "bg":"bg-black"
        });
    }

    /**
     * 数据库列表
     * @returns {*}
     */
    async indexAction(){
        //auto render template file index_index.html
        this.assign({
            "active":"/admin/database/index",
        })
        //let DB = think.adapter('db', this.config.type || 'mysql');
        //this._db = new DB(this.config);
        let list = await this.model().query('SHOW TABLE STATUS');
       // console.log(list)
        this.assign("list",list);
        return this.display();
    }

    /**
     * 优化表
     */
    async optimizeAction(){
        let list;
        if(this.isPost()){
            let tables = this.post('tables');
            if(tables){
                list = await this.model().query("OPTIMIZE TABLE "+tables);
                return this.json(list);
            }else{
                return this.fail(88,"请指定要修复的表！")
            }
        }else{
            return this.fail(88,"错误请求")
        }
//TODO 细节优化待续
    }

    /**
     * 修复表
     * @returns {*}
     */
    async repairAction(){
        let list;
        if(this.isPost()){
            let tables = this.post("tables");
            if(tables){
                list = await this.model().query('REPAIR TABLE ' +tables)
                return this.json(list);
            }else{
                return this.fail(88,"请指定要修复的表！")
            }

        }else{
            return this.fail(88,"请求错误")
        }
        //TODO 细节优化待续
    }
    /**
     * 备份数据库
     * @param  String  tables 表名
     * @param  Integer id     表ID
     * @param  Integer start  起始行数
     * @author
     */
    async exportAction(){
          let paths = think.ROOT_PATH +"/data";
          think.mkdir(paths);
        //检查是否有正在执行的任务
        let lock = paths+"/backup.lock";

        if(think.isFile(lock)){
               return this.fail(20,'检测到有一个备份任务正在执行，请稍后再试！');
        } else {
            //创建锁文件
            fs.writeFileSync(lock, new Date())
        }
        //fs.unlinkSync(lock)
      //paths=path.basename(path)
        //console.log(paths);
        this.end(paths);
    }
    aabbAction(){
        console.log(1)
    }
}