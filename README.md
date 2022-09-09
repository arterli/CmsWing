# 重要说明
基础框架已经开放完成，文档和新官网近期发布。。。
# CmsWing

CmsWing 2.0

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### 启动说明
git clone 到本地后，进入项目根目录
#### 修改数据库
/congfig/sequelize.js
```bash
{
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'cmswing2',
  username: 'root',
  password: 'root123456',
}
```
修改成你自己的数据库，先创建数据库，然后把数据库配置文件的信息修改成你实际的数据库信息。
### 启动项目

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
启动项目后会自动生成表结构，和初始化信息。
### 后台登录

后台地址：http://localhost:7001/admin
账号：admin
密码：123456

### 技术栈
egg https://www.eggjs.org/
amis https://aisuda.bce.baidu.com/amis/zh-CN/docs/index
sequelize https://www.sequelize.cn/
graphql https://graphql.cn/