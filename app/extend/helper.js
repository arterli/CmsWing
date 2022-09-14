/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-returns-description */
'use strict';
const crypto = require('crypto');
// eslint-disable-next-line node/prefer-global/buffer
const { Buffer } = require('buffer');
const jwt = require('jsonwebtoken');
const password = 'www.cmswing.com';
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);
const algorithm = 'aes-192-cbc';
const _ = require('lodash');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const moment = require('moment');
module.exports = {
  _,
  moment,
  /**
   * 加密助手函数
   * @param {string} str 明文数据
   * @return {string}
   */
  cipher(str) {
    // console.log(key.length, iv.length);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let src = cipher.update(str, 'utf8', 'hex');
    src += cipher.final('hex');
    return src;
  },
  /**
   * 解密助手函数
   * @param {*} str 加密的数据
   * @return {string}
   */
  decipher(str) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let src = decipher.update(str, 'hex', 'utf8');
    src += decipher.final('utf8');
    return src;
  },
  /**
   * 生成 jwt
   * @param {*} data 需要加密的用户信息
   */
  generateToken(data) {
    return jwt.sign({ data }, password);
  },
  deToken(token) {
    try {
      const decoded = jwt.verify(token, password);
      return decoded.data;
    } catch (err) {
      // err
      return false;
    }
  },
  /**
   * 驼峰转下划线
   * @param str
   * @param sp
   * @return {string}
   */
  dasherize(str, sp = '_') {
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, sp).toLowerCase();
  },
  /**
   * 下划线转驼峰
   * @param str
   * @return {*}
   */
  camelize(str) {
    return str.replace(/[-_\s]+(.)?/g, function(match, c) {
      return c ? c.toUpperCase() : '';
    });
  },
  /**
   * 递归获取文件
   * @param dir
   * @param prefix
   * @param filesList
   * @return {Promise<*[]>}
   */
  async getFiles(dir, prefix = '', filesList = []) {
    const dirs = await fs.readdir(dir);
    for (const file of dirs) {
      const stat = await fs.stat(path.join(dir, file));
      if (stat.isDirectory()) {
        const fi = this.camelize(file);
        const pr = this.camelize(prefix);
        await this.getFiles(path.join(dir, file), prefix ? `${pr}.${fi}` : fi, filesList);
      } else if (stat.isFile()) {
        const fn = path.basename(file, '.js');
        const p = this.camelize(fn);
        filesList.push({ name: prefix ? `${prefix}.${p}` : p, path: path.join(dir, file) });
      }
    }
    return filesList;
  },
  // 数组转换成树
  arr_to_tree(data, pid, _id = 'id', _pid = 'pid') {
    const result = [];
    let temp;
    const length = data.length;
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line eqeqeq
      if (data[i][_pid] == pid) {
        result.push(data[i]);
        temp = this.arr_to_tree(data, data[i][_id], _id, _pid);
        if (temp.length > 0) {
          if (data[i].dataValues) {
            data[i].dataValues.children = temp;
          } else {
            data[i].children = temp;
          }
        }
      }
    }
    return result;
  },
  sub_ids(data, pid) {
    const result = [];
    let temp;
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].pid === pid) {
        // console.log(data[i]);
        result.push(data[i].id);
        temp = this.sub_ids(data, data[i].id);
        if (temp.length > 0) {
          result.push(temp.join(','));
        }
      }
    }
    return result;
  },
  isStringNumber(val) {
    const regPos = /^\d+(\.\d+)?$/;
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    }
    return false;
  },
  waitTime(time = 1000) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  },
  // 格式化where
  formatWhere(where) {
    if (!where) return {};
    const res = {};
    for (const key in where) {
      if (Object.hasOwnProperty.call(where, key)) {
        const arr1 = [];
        for (const v of where[key]) {
          const obj1 = {};
          const obj2 = {};
          for (const key2 in v[Object.keys(v)[0]]) {
            if (Object.hasOwnProperty.call(v[Object.keys(v)[0]], key2)) {
              if (v[Object.keys(v)[0]][key2]) {
                obj2[`$${key2}`] = v[Object.keys(v)[0]][key2];
              }

            }
          }
          if (!this._.isEmpty(obj2)) {
            obj1[Object.keys(v)[0]] = obj2;
          }

          arr1.push(obj1);
        }
        res[`$${key}`] = arr1;
      }
    }
    return res;
  },
  // 递归创建目录 同步方法
  mkdirsSync(dirname) {
    if (fsSync.existsSync(dirname)) {
      return true;
    }
    if (this.mkdirsSync(path.dirname(dirname))) {
      fsSync.mkdirSync(dirname);
      return true;
    }
  },
};
