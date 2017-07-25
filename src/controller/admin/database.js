// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
const fs  = require('fs');
const path = require('path');
const targz = require('tar.gz');
const http = require('http');
module.exports = class extends Base {
    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        // 其他额外的操作
        this.tactive = "setup";
        
    }
    /**
     * 数据库列表
     * @returns {*}
     */
    async indexAction() {
        //auto render template file index_index.html
        //let DB = think.adapter('db', this.config.type || 'mysql');
        //this._db = new DB(this.config);
        let list = await this.model().query('SHOW TABLE STATUS');
        // console.log(list)
        this.meta_title='备份数据库';
        this.assign("list", list);
        //let mysql = this.service("mysql");
       // console.log(think.config("model.mysql").host);
        return this.display();
    }

    /**
     * 优化表
     */
    async optimizeAction() {
        let list;
        
        if (this.isPost) {
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
        if (this.isPost) {
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
        let tables = this.para('tables')?this.para('tables').split(','):null;
        let id = Number(this.para('id'))
        let start = Number(this.para('start'))
        if (this.isPost && !think.isEmpty(tables) && think.isArray(tables)) {
            //console.log(tables)
            let paths = think.resource + "/backup/";
            think.mkdir(paths);
            //备份配置
            let config = {
                'path': paths,
                'part': 20 * 1024 * 1024,
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
            //return this.fail("ddd")
            //检查备份目录是否可写
            //think.isWritable(config.path) || this.fail('备份目录不存在或不可写，请检查后重试！');
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
            let mysql = require("../../service/mysql");
            let db = new mysql(file,config,"export",this.ctx);
            if (false !== db.create()) {
                let tab = {'id': 0, 'start': 0};
                return this.json({
                    'info': '初始化成功！',
                    'tables': tables,
                    'tab': tab,
                    'status': 1
                })
            } else {
                return this.json({
                    'info': "初始化失败，备份文件创建失败！",
                    'status': 0
                })
            }
        } else if (this.isGet && think.isNumber(id) && think.isNumber(start)) {
            let table = await this.session('backup_tables');
            //备份指定表
            let backup_file = await this.session('backup_file');
            //console.log(backup_file);
            let backup_config = await this.session('backup_config');
            let mysql = require("../../service/mysql");
            let db = new mysql(backup_file,backup_config,"export",this.ctx);
            start = await db.backup(table[id], start);
            if (false === start) {
                return this.fail("备份出错！")
            } else if (0 === start) {//下一表
                if (table[++id]) {
                    let tab = {'id': id, 'start': 0};
                    return this.json({
                        'info': '备份完成！',
                        'tab': tab,
                        'status': 1
                    })
                } else {
                    let lock = await this.session('backup_config');

                    if (think.isFile(lock.path + 'backup.lock')) {
                        fs.unlinkSync(lock.path + 'backup.lock')
                    }
                    await this.session('backup_tables', null);
                    await this.session('backup_file', null);
                    await this.session('backup_config', null);
                    return this.json({
                        'info': '备份完成！',
                        'status': 1
                    })
                }
            } else {
                let tab = {'id': id, 'start': start[0]};
                let rate = Math.floor(100 * (start[0] / start[1]));
                return this.json({
                    'info': "正在备份..." + rate + "%",
                    'tab': tab,
                    'status': 1
                })
            }
        } else {
            return this.fail("参数错误！")
        }

    }

    importsAction() {

        /**
         * 遍历文件夹，获取所有文件夹里面的文件信息
         * @param path
         * @returns {Array}
         */

        function geFileList(path) {
            var filesList = [];
            readFile(path, filesList);
            return filesList;
        }

        /**
         * 遍历读取文件
         * @param path
         * @param filesList
         */
        function readFile(path, filesList) {
            let files = fs.readdirSync(path);//需要用到同步读取
            //console.log(files);
            files.forEach(walk);
            function walk(file) {
                let states = fs.statSync(path + '/' + file);
                if (states.isDirectory()) {
                    var dir = {};
                    dir.dir = file;

                    let files = fs.readdirSync(path + '/' + file);
                    let size = 0;
                    files.forEach(v=> {
                        let states = fs.statSync(path + '/' + file + '/' + v);
                        size = size + states.size;
                    })
                    dir.size = size;
                    dir.part = files.length;
                    dir.ctime = states.ctime;
                    filesList.push(dir);

                }
            }
        }

        let paths = think.resource + "/backup/";
        let filesList = geFileList(paths)
        this.assign({
            "fileslist": filesList
        })
        this.active = "admin/database/index"
        this.meta_title='还原数据库';
        return this.display();
    }

    /**
     *删除备份
     * @returns {Promise.<void>}
     */
    async rmdirAction() {
        let dir = this.get("path");
        let paths = think.resource + "/backup/" + dir;
        //删除目录
        await think.rmdir(paths);
        //删除对应压缩包
        if (think.isFile(paths + ".tar.gz")) {
            fs.unlinkSync(paths + ".tar.gz");
        }
        return this.json({
            'info': "删除成功",
            'dir': dir,
            'status': 1
        })
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
        if (this.isGet) {
            let paths = think.resource;
            let path = "/backup/";
            let dir = paths + path + this.get("dir");
            let tar = paths + path + this.get("dir") + ".tar.gz"
            if (!think.isFile(tar)) {
                //var read = targz().createReadStream(dir);
                //var parse = fs.createWriteStream(tar);
                //read.pipe(parse);
                let self = this;
                targz().compress(dir, tar)
                    .then(function () {
                        self.success({'name': "tar", 'url': self.get("dir")})
                    })
                    .catch(function (err) {
                        console.log('Something is wrong ', err.stack);
                    });

            } else {
             return this.success({'name': "download", 'url': this.get("dir")})
            }
        } else if (this.isPost) {
            let paths = think.resource;
            let path = "/backup/";
            let tar = paths + path + this.post("name") + ".tar.gz";
            console.log(tar);
            //return  this.download(tar);
        }
    }

    httpedAction() {
       
        http.get("http://www.kancloud.cn/tag/JavaScript", function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
            res.on('end', function () {
                console.log('No more data in response.')
            })
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    }
    /**
  * 解锁
  */
    unlockAction(){
           let paths = think.resource + "/backup/";
       let lock = paths + "backup.lock";
       //检查是否有正在执行的任务
          if (think.isFile(lock)) {
              fs.unlinkSync(lock)
              return this.success({name:"解锁成功!"});
          } else {
              //创建锁文件
              return this.success({name:"无需解锁!"});
          }
    }
}
