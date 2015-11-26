/**
 * Created by arter on 2015/11/16.
 */
'use strict';

import Base from './base.js';
import fs  from 'fs';
import path from 'path';
import request from 'request';
import targz from 'tar.gz';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http) {
        super.init(http);
    }

    __before() {
        this.assign({
            "tactive": "sysm",
            "bg": "bg-black"
        });
    }

    /**
     * 数据库列表
     * @returns {*}
     */
    async indexAction() {
        //auto render template file index_index.html
        this.assign({
            "active": "/admin/database/index",
        })
        //let DB = think.adapter('db', this.config.type || 'mysql');
        //this._db = new DB(this.config);
        let list = await this.model().query('SHOW TABLE STATUS');
        // console.log(list)
        this.assign("list", list);
        return this.display();
    }

    /**
     * 优化表
     */
    async optimizeAction() {
        let list;
        if (this.isPost()) {
            let tables = this.post('tables');
            if (tables) {
                list = await this.model().query("OPTIMIZE TABLE " + tables);
                return this.json(list);
            } else {
                return this.fail(88, "请指定要修复的表！")
            }
        } else {
            return this.fail(88, "错误请求")
        }
//TODO 细节优化待续
    }

    /**
     * 修复表
     * @returns {*}
     */
    async repairAction() {
        let list;
        if (this.isPost()) {
            let tables = this.post("tables");
            if (tables) {
                list = await this.model().query('REPAIR TABLE ' + tables)
                return this.json(list);
            } else {
                return this.fail(88, "请指定要修复的表！")
            }

        } else {
            return this.fail(88, "请求错误")
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
    async exportAction() {
        let tables = this.param('tables').split(',');
        let id = Number(this.param('id'))
        let start = Number(this.param('start'))
        if (this.isPost() && !think.isEmpty(tables) && think.isArray(tables)) {
            console.log(tables)
            let paths = think.ROOT_PATH + "/data/";
            think.mkdir(paths);
            //备份配置
            let config = {
                'path': paths,
                'part': 20971520,
                'compress': 1,
                'level': 9
            }

            //检查是否有正在执行的任务
            let lock = config.path + "backup.lock";
            if (think.isFile(lock)) {
                return this.fail(20, '检测到有一个备份任务正在执行，请稍后再试！');
            } else {
                //创建锁文件
                fs.writeFileSync(lock, new Date())
            }
            //检查备份目录是否可写
            think.isWritable(config.path) || this.fail('备份目录不存在或不可写，请检查后重试！');
            await this.session('backup_config', config);

            //生成备份文件信息
            let file = {
                'name': new Date().valueOf(),
                'part': 1,
            };
            await this.session('backup_file', file);

            //缓存要备份的表
            await this.session('backup_tables', tables);

            //创建备份文件
            let Database = think.adapter("database", "mysql");
            let db = new Database(file, config, "export");
            if (false !== db.create()) {
                let tab = {'id': 0, 'start': 0};
                return this.json({
                    'info': '初始化成功！',
                    'tables': tables,
                    'tab': tab,
                    'status':1
                })
            } else {
                return this.json({
                    'info': "初始化失败，备份文件创建失败！",
                    'status':0
                })
            }
        } else if (this.isGet() && think.isNumber(id) && think.isNumber(start)) {
            let table = await this.session('backup_tables');
            console.log(table)
            if(table[++id]){

                let tab = {'id': id, 'start': 0};
                return this.json({
                    'info': '备份完成！',
                    'tab': tab,
                    'status':1
                })
            }else{
                let lock = await this.session('backup_config');

                if(think.isFile(lock.path+'backup.lock')){
                fs.unlinkSync(lock.path+'backup.lock')
                }
                await this.session('backup_tables', null);
                await this.session('backup_file', null);
                await this.session('backup_config', null);
                return this.json({
                    'info': '备份完成！',
                    'status':1
                })
            }
        }
        //fs.unlinkSync(lock)
        //think.isWritable 判断目录是否可写
        //paths=path.basename(path)
        //console.log(paths);
        //let v = await this.session('backup_file');
        //this.end(v);
    }

    async aabbAction() {
        let Database = think.adapter("database", "mysql");
        let db = new Database("1", "2", "3");
        await db.backup("vkj_member", 0);
        //let dbs = new Database("111","222","333");
        //dbs.backup("aaa","bbb");
        this.end();
    }

    targzAction() {
        // Streams
        let paths = think.ROOT_PATH + "/data";
        var read = targz().createReadStream(paths + "/sql");
        var parse = fs.createWriteStream(paths + '/ss.tar.gz');

        //targz().extract(paths+"/ss.tar.gz", paths+'/sql')
        //    .then(function(){
        //        console.log('Job done!');
        //    })
        //    .catch(function(err){
        //        console.log('Something is wrong ', err.stack);
        //    });
        read.pipe(parse);
        this.end(1);
    }
}