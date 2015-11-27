'use strict';
/**
 * base adapter
 */
import Fs from 'fs';
export default class extends think.adapter.base {
    /**
     * init
     *  @param {Array}  file   [备份或还原的文件信息]
     *  @param {Array}  config [备份配置信息]
     *  @param {String} type   [执行类型，export - 备份数据， import - 还原数据]
     * @return {[]}         []
     */
    init(file, config, type, http) {
        super.init(http);
        this.file = file;
        this.config = config;
        this.type = type;
    }

    /**
     * 写入初始数据
     * @return boolean true - 写入成功，false - 写入失败
     */
    create() {
        let backuppath = this.config.path + this.file.name;
        let filenmae = backuppath + '/' + this.file.name + '-' + this.file.part + '.sql';
        think.mkdir(backuppath);

        if (!think.isFile(filenmae)) {
            let db = think.config('db');
            let sql = "-- -----------------------------\n";
            sql += "-- Think MySQL Data Transfer \n";
            sql += "-- \n";
            sql += "-- Host     : " + db.host + "\n";
            sql += "-- Port     : " + db.port + "\n";
            sql += "-- Database : " + db.name + "\n";
            sql += "-- \n";
            sql += "-- Part : #" + this.file['part'] + "\n";
            sql += "-- Date : " + times(new Date(), "s") + "\n";
            sql += "-- -----------------------------\n\n";
            sql += "SET FOREIGN_KEY_CHECKS = 0;\n\n";
            let filesql = Fs.appendFileSync(filenmae, sql);
            if (filesql == undefined) {
                return true;
            } else {
                return false;
            }

        }
    }


    /**
     * 写入sql语句
     * @param {String} sql [要写入的SQL语句]
     */
    async write(sql) {

        let size = sql.length;
        //console.log(size)
        let backuppath = this.config.path + this.file.name;
        let filenmae = backuppath + '/' + this.file.name + '-' + this.file.part + '.sql';
        // console.log(filenmae)
        let states = Fs.statSync(filenmae)
        this.size = states.size + size;
        //console.log(this.size+"-"+this.config.part) ;
        if (this.size > this.config.part) {//分卷

            this.file.part++;
            this.create();
            let http = this.http;
            //think.session(http);
            await http.session('backup_file', this.file);
            //await think.session('backup_file', this.file);

        }
        let aa = Fs.appendFileSync(filenmae, sql);

        //console.log(aa);
        //TODO
    }

    /**
     * 备份表结构
     * @param  {String}  table [表名]
     * @param  {Integer} start [起始行数]
     * @return {Boolean}        false - [备份失败]
     */
    async backup(table, start) {
        //数据库对象
        //console.log(think.config('db'))
        let db = think.model('mysql', think.config('db'));
        //备份表结构
        if (0 == start) {
            let result = await db.query("SHOW CREATE TABLE " + table);
            //console.log(result);
            let sql = "\n";
            sql += "-- -----------------------------\n";
            sql += "-- Table structure for `" + table + "`\n";
            sql += "-- -----------------------------\n";
            sql += "DROP TABLE IF EXISTS `" + table + "`;\n";
            sql += trim(result[0]['Create Table']) + ";\n\n";
            //console.log(sql);
            this.write(sql)
            //if(false === this.write(sql)){
            //  return false;
            //}
        }
        //数据总数
        let result = await db.query("SELECT COUNT(*) AS count FROM " + table);
        let count = result[0].count;
        //console.log(count);
        //备份表数据
        if (count) {
            //写入数据注释
            if (0 == start) {
                let sql = "-- -----------------------------\n";
                sql += "-- Records of `" + table + "`\n";
                sql += "-- -----------------------------\n";
                this.write(sql);
                //console.log(sql);
            }


            //备份数据记录
            result = await db.query("SELECT * FROM " + table + " LIMIT " + start + " , 1000");
            result.forEach(row => {
                //console.log(obj_values(row).join("', '"))
                let sql = "INSERT INTO `" + table + "` VALUES ('" + obj_values(row).join("', '") + "');\n";
                this.write(sql);
                //console.log(sql);
                //if(false === this.write(sql)){
                //  return false;
                //}
            });
            //还有更多数据
            if (count > start + 1000) {
                return [start + 1000, count];
            }
        }
        //备份下一表
        return 0;
        //console.log(result);
    }


}