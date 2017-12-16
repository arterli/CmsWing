// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const path = require('path');
const fs = require('fs');
module.exports = class extends think.cmswing.admin {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('cmswing/ext');
    this.tactive = 'ext';
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const data = await this.db.page(this.get('page'), 20).order('sort DESC, installtime DESC').countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    this.meta_title = '已安装的插件';
    return this.display();
  }

  /**
     * 已安装插件后台管理
     */
  async adminAction() {
    const extadminleftlist = await this.db.where({status: 1, isadm: 1}).order('sort DESC, installtime DESC').select();
    this.assign('extadminleftlist', extadminleftlist);
    this.tactive = 'article';
    this.assign({'navxs': true});
    this.meta_title = '已安装插件后台';
    return this.display();
  }
  /**
   *  未安装的插件
   */
  async uninstallAction() {
    // 列出文件
    const dir = think.getdirFiles(`${think.ROOT_PATH}/src/controller/ext`);
    const extarr = [];
    for (const v of dir) {
      extarr.push(think._.head(think._.split(v, path.sep, 1)));
    }

    // 找出未安装的插件
    const uniarr = [];
    for (const d of think._.uniq(extarr)) {
      const isi = await this.model('ext').where({ext: d}).find();
      if (think.isEmpty(isi)) {
        uniarr.push(d);
      }
    }

    // 找出未安装插件的配置
    const unilist = [];
    for (const extName of uniarr) {
      unilist.push(think.app.controllers[`ext/${extName}/config`]);
    }
    console.log(unilist);
    this.assign('list', unilist);
    this.meta_title = '未安装的插件';
    this.active = 'admin/ext/index';
    return this.display();
  }
  /**
     * 添加插件
     * @returns {*}
     */
  async addAction() {
    if (this.isPost) {
      const data = this.post();
      data.installtime = new Date().getTime();
      console.log(data);
      // 生成插件目录
      const extdir = `${think.ROOT_PATH}/src/controller/ext`;
      const extpath = `${extdir}/${data.ext}`;
      if (think.isDirectory(extpath)) {
        return this.fail(`${data.ext} 插件目录已经存在`);
      };
      // 创建插件目录
      think.mkdir(extpath);
      let shooks = '';
      if (think.isEmpty(data.hooks)) {
        shooks = `[]`;
      } else {
        if (!think.isArray(data.hooks)) {
          data.hooks = data.hooks.split(',');
        }
        const strhooks = [];
        for (const v of data.hooks) {
          strhooks.push(`'${v}'`);
        }
        const ss = strhooks.join(',');
        shooks = `[${ss}]`;
      }

      // 创建插件配置
      const strConfig = `module.exports = {
  ext: '${data.ext}', // 插件目录，必须为英文
  name: '${data.name}', // 插件名称
  description: '${data.description}', // 插件描述
  isadm: ${data.isadm}, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/${data.ext}/admin/index'
  isindex: ${data.isindex}, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/${data.ext}/index/index'
  version: '${data.version}', // 版本号
  author: '${data.author}', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ${shooks}, // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '${data.name}设置': [
        {
          'name': 'title', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '显示标题:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'cmswing开发团队', // 表单的默认值
          'html': '说明支持<code>html</code>'
        },
        {
          'name': 'width',
          'label': '显示宽度:',
          'type': 'select',
          'options': {'1': '1格', '2': '2格', '4': '4格'},
          'value': '2'
        },
        {
          'name': 'display',
          'label': '是否显示:',
          'type': 'radio',
          'options': {'1': '显示', '0': '不显示'},
          'value': '1'
        }
      ]
    },
    {
      '配置项二': [
        {
          'name': 'p2',
          'label': '1111',
          'type': 'text',
          'value': '1111'
        }
      ]
    }
  ]
};`;
      fs.writeFileSync(`${extpath}/config.js`, strConfig);

      // 创建钩子控制器
      const hookaction = [];
      if (!think.isEmpty(data.hooks)) {
        if (!think.isArray(data.hooks)) {
          data.hooks = data.hooks.split(',');
        }
        for (const v of data.hooks) {
          const type = await this.model('hooks').where({name: v}).getField('type', true);
          console.log(type);
          if (Number(type) === 1) {
            hookaction.push(`/**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async ${v}(...val) {
    // 钩子业务处理
    const html = await this.hookRender('${v}', '${data.ext}');
    return html;
  }`);
            const mvp = `${extpath}/view`;
            think.mkdir(`${mvp}/pc`);
            fs.writeFileSync(`${mvp}/pc/hooks_${v}.html`, `${data.ext}`);
            think.mkdir(`${mvp}/mobile`);
            fs.writeFileSync(`${mvp}/mobile/hooks_${v}.html`, `${data.ext}`);
          } else {
            hookaction.push(` // 实现的${v}钩子方法
  ${v}() {
    // 钩子业务处理
  }`);
          }
        }
        const hookhtml = hookaction.join(';\n  ');
        const hooksstr = `// hooks
module.exports = class extends think.cmswing.extIndex {
  ${hookhtml}
}`;
        fs.writeFileSync(`${extpath}/hooks.js`, hooksstr);
      }
      // 创建插件view 目录
      this.copy(`${extdir}/demo/view`, `${extpath}/view`, this.copy);
      // 创建插件model 目录
      this.copy(`${extdir}/demo/model`, `${extpath}/model`, this.copy);
      // 创建插件service 目录
      this.copy(`${extdir}/demo/service`, `${extpath}/service`, this.copy);
      // 创建插件service 目录
      this.copy(`${extdir}/demo/logic`, `${extpath}/logic`, this.copy);
      // 创建插件后台管理控制器
      this.copy(`${extdir}/demo/admin.js`, `${extpath}/admin.js`);
      // 创建插件前台访问控制器
      this.copy(`${extdir}/demo/index.js`, `${extpath}/index.js`);
      // return this.fail('ddd');
      // data.setting = '{}';
      // const res = await this.model('ext').add(data);
      // if (res === 0) {
      //   // 将插件添加到钩子
      //   for (const h of data.hooks) {
      //     const hooks = await this.model('hooks').where({name: h}).find();
      //     const extarr = hooks.ext ? hooks.ext.split(',') : [];
      //     // console.log(extarr);
      //     // console.log(think.isEmpty(extarr));
      //     extarr.push(data.ext);
      //     // console.log(extarr);
      //     // 更新钩子
      //     await this.model('hooks').where({name: h}).update({ext: extarr.join(',')});
      //   }
      //   return this.success({name: '添加插件成功！', url: '/admin/ext/index'});
      // } else {
      //   return this.fail('添加失败！');
      // }
      return this.success({name: '插件已经生成，请到 [未安装的插件] 进行安装！', url: '/admin/ext/uninstall'});
    } else {
      this.active = 'admin/ext/index';
      this.meta_title = '创建插件向导';
      const hooks = await this.model('hooks').select();
      this.assign('hooks', hooks);
      return this.display();
    }
  }

  /**
     * 更新插件
     * @returns {*}
     */
  async editAction() {
    if (this.isPost) {
      const data = this.post();
      data.setting = '{}';
      if (think.isEmpty(data.updatetime)) {
        data.updatetime = new Date().getTime();
      } else {
        data.updatetime = new Date(data.updatetime).getTime();
      }
      const res = await this.model('ext').where({ext: data.ext}).update(data);
      if (res) {
        return this.success({name: '更新插件成功！'});
      } else {
        return this.fail('更新失败！');
      }
    } else {
      const ids = this.get('ids');
      const info = await this.model('ext').where({ext: ids}).find();
      this.assign('info', info);
      this.meta_title = '更新插件';
      return this.display();
    }
  }
  /**
     * 验证同一张表是否存在相同的子段值
     * @returns {*}
     */
  async checkextAction() {
    const get = this.get();
    // let key = think._.keys(get)[0];
    // let val = get[key];
    const res = await this.model('ext').where(get).count('ext');
    if (res) {
      return this.json(0);
    } else {
      return this.json(1);
    }
  }
  /**
   * 排序
   */
  async sortAction() {
    await super.sortAction('cmswing/ext', 'ext');
  }
  /*
   * 复制目录中的所有文件包括子目录
   * @param{ String } 需要复制的目录
   * @param{ String } 复制到指定的目录
   */
  copy(src, dst, copy) {
    if (think.isFile(src) && !think.isFunction(copy)) {
      // 创建读取流
      const readable = fs.createReadStream(src);
      // 创建写入流
      const writable = fs.createWriteStream(dst);
      // 通过管道来传输流
      readable.pipe(writable);
    } else {
      think.mkdir(dst);
      // 读取目录中的所有文件/目录
      fs.readdir(src, function(err, paths) {
        if (err) {
          throw err;
        }
        for (const path of paths) {
          let _src = src + '/' + path, _dst = dst + '/' + path;
          if (think.isFile(_src)) {
            // 创建读取流
            const readable = fs.createReadStream(_src);
            // 创建写入流
            const writable = fs.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
          } else if (think.isDirectory(_src)) {
            think.mkdir(_dst);
            // 如果是目录则递归调用自身
            copy(_src, _dst, copy);
          }
        }
      });
    }
  };
};
