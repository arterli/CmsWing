/**
 * Created by arter on 2015/11/16.
 */
'use strict';

import Base from './base.js';
import fs  from 'fs';
import path from 'path';
import targz from 'tar.gz';
import http from 'http';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http) {
        super.init(http);
    }


    /**
     * 数据库列表
     * @returns {*}
     */
    async indexAction() {
        //auto render template file index_index.html
        this.assign({
            "tactive": "sysm",
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
            //console.log(tables)
            let paths = think.RESOURCE_PATH + "/backup/";
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
                    'status': 1
                })
            } else {
                return this.json({
                    'info': "初始化失败，备份文件创建失败！",
                    'status': 0
                })
            }
        } else if (this.isGet() && think.isNumber(id) && think.isNumber(start)) {
            let table = await this.session('backup_tables');
            //备份指定表
            let backup_file = await this.session('backup_file');
            //console.log(backup_file);
            let backup_config = await this.session('backup_config');
            let Database = think.adapter("database", "mysql");
            let db = new Database(backup_file, backup_config, 'export');
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
        //fs.unlinkSync(lock)
        //think.isWritable 判断目录是否可写
        //paths=path.basename(path)
        //console.log(paths);
        //let v = await this.session('backup_file');
        //this.end(v);
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

        let paths = think.RESOURCE_PATH + "/backup/";
        let filesList = geFileList(paths)
        this.assign({
            "tactive": "sysm",
            "active": "/admin/database/index",
            "fileslist": filesList
        })

        this.display();
    }

    async rmdirAction() {
        let dir = this.get("path");
        let paths = think.RESOURCE_PATH + "/backup/" + dir;
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
        if (this.isGet()) {
            let paths = think.RESOURCE_PATH;
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
                this.success({'name': "download", 'url': this.get("dir")})
            }
        } else if (this.isPost()) {
            let paths = think.RESOURCE_PATH;
            let path = "/backup/";
            let tar = paths + path + this.post("name") + ".tar.gz"
            this.download(tar);
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
}
