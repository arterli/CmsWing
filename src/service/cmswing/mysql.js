// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Fs = require('fs');
module.exports = class extends think.Service {
  /**
     * init
     *  @param {Array}  file   [备份或还原的文件信息]
     *  @param {Array}  config [备份配置信息]
     *  @param {String} type   [执行类型，export - 备份数据， import - 还原数据]
     * @return {[]}         []
     */
  constructor(file, config, type, ctx) {
    super(ctx);
    this.file = file;
    this.config = config;
    this.type = type;
    this.ctx = ctx;
  }

  /**
     * 写入初始数据
     * @return boolean true - 写入成功，false - 写入失败
     */
  create() {
    const backuppath = this.config.path + this.file.name;
    const filenmae = backuppath + '/' + this.file.name + '-' + this.file.part + '.sql';
    think.mkdir(backuppath);

    if (!think.isFile(filenmae)) {
      const db = think.config('model.mysql');
      console.log(db);
      let sql = '-- -----------------------------\n';
      sql += '-- CmsWing MySQL Data Transfer \n';
      sql += '-- \n';
      sql += '-- Host     : ' + db.host + '\n';
      sql += '-- Port     : ' + db.port + '\n';
      sql += '-- Database : ' + db.database + '\n';
      sql += '-- \n';
      sql += '-- Part : #' + this['part'] + '\n';
      sql += '-- Date : ' + times(new Date(), 's') + '\n';
      sql += '-- -----------------------------\n\n';
      sql += 'SET FOREIGN_KEY_CHECKS = 0;\n\n';
      const filesql = Fs.appendFileSync(filenmae, sql);
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
    const size = sql.length;
    // console.log(size)
    const backuppath = this.config.path + this.file.name;
    const filenmae = backuppath + '/' + this.file.name + '-' + this.file.part + '.sql';
    // console.log(filenmae)
    const states = Fs.statSync(filenmae);
    this.size = states.size + size;
    // console.log(this.size+"-"+this.config.part) ;
    if (this.size > this.config.part) { // 分卷
      this.file.part++;
      this.create();
      await this.ctx.session('backup_file', this.file);
      // await think.session('backup_file', this.file);
    }
    const aa = Fs.appendFileSync(filenmae, sql);

    // console.log(aa);
    // TODO
  }

  /**
     * 备份表结构
     * @param  {String}  table [表名]
     * @param  {Integer} start [起始行数]
     * @return {Boolean}        false - [备份失败]
     */
  async backup(table, start) {
    // 数据库对象
    // console.log(think.config('db'))
    const db = think.model('mysql');
    // 备份表结构
    if (start == 0) {
      const result = await db.query('SHOW CREATE TABLE ' + table);
      // console.log(result);
      let sql = '\n';
      sql += '-- -----------------------------\n';
      sql += '-- Table structure for `' + table + '`\n';
      sql += '-- -----------------------------\n';
      sql += 'DROP TABLE IF EXISTS `' + table + '`;\n';
      sql += trim(result[0]['Create Table']) + ';\n\n';
      // console.log(sql);
      this.write(sql);
      // if(false === this.write(sql)){
      //  return false;
      // }
    }
    // 数据总数
    let result = await db.query('SELECT COUNT(*) AS count FROM ' + table);
    const count = result[0].count;
    // console.log(count);
    // 备份表数据
    if (count) {
      // 写入数据注释
      if (start == 0) {
        let sql = '-- -----------------------------\n';
        sql += '-- Records of `' + table + '`\n';
        sql += '-- -----------------------------\n';
        this.write(sql);
        // console.log(sql);
      }

      // 备份数据记录
      result = await db.query('SELECT * FROM ' + table + ' LIMIT ' + start + ' , 1000');
      result.forEach(row => {
        // console.log(obj_values(row).join("', '"))
        const sql = 'INSERT INTO `' + table + "` VALUES ('" + obj_values(row).join("', '") + "');\n";
        this.write(sql);
        // console.log(sql);
        // if(false === this.write(sql)){
        //  return false;
        // }
      });
      // 还有更多数据
      if (count > start + 1000) {
        return [start + 1000, count];
      }
    }
    // 备份下一表
    return 0;
    // console.log(result);
  }
};
