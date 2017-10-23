/**
 * 插件配置
 *
 * @type {{}}
 */

module.exports = {
  ext: 'demo',
  name: '插件实例',
  description: '插件说明',
  isadm: 1,
  version: 1.0,
  setting: [
    {
      'demo插件设置': [
        {// 配置在表单中的键名 ,这个会是config[title]
          'name': 'title',
          'label': '显示标题:', // 表单的文字
          'type': 'text', // 表单的类型：text、textarea、checkbox、radio、select等
          'value': 'cmswing开发团队', // 表单的默认值
          'html': `说明支持<code>html</code>`
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
};
