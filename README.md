# 重要说明
cmswing2.0 基础框架+CMS模块已经开发完成,可以正式使用，文档正在编写中。。。

官方网站 https://www.cmswing.com/
# CmsWing


### 启动说明
git clone 到本地后，进入项目根目录
#### 修改数据库
/config/sequelize.js
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

### 预览
![输入图片说明](https://data.cmswing.com/gitee/iShot_2022-09-09_13.26.23.png)
![输入图片说明](https://data.cmswing.com/gitee/BE7BB4FF53BB4011E2DFB8686C61B8BD.jpg)
![输入图片说明](https://data.cmswing.com/gitee/C3798F02C41884147C6791148935F746.jpg)
![输入图片说明](https://data.cmswing.com/gitee/C3798F02C41884147C6791148935F746.jpg)
![输入图片说明](https://data.cmswing.com/gitee/6EAB0DA1CE6D743FC6D5D8270C5DA924.jpg)
![输入图片说明](https://data.cmswing.com/gitee/0BE3FE2BD732C373611A5BC90C881CB6.jpg)
![输入图片说明](https://data.cmswing.com/gitee/63CCF1DA0C6BE8D68E23F0D8EDB59863.jpg)
![输入图片说明](https://data.cmswing.com/gitee/BC1186A10175E13EFAAD54A05B7D602B.jpg)
