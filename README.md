## 特别提示

#### 项目依赖

```
本项目已升级到ThinkJS 3.0 ,项目运行的 Node > 7.6.0（推荐使用 8.x.x 版本）;
```
## 项目源代码地址
> **github地址**：[https://github.com/arterli/CmsWing](https://github.com/arterli/CmsWing)

> **码云地址**：[http://git.oschina.net/arterli/CmsWing](http://git.oschina.net/arterli/CmsWing)

> #### **简介:**
>
> - 模块化：全新的架构和模块化的开发机制，便于灵活扩展和二次开发。
>
> - 模型/栏目/分类信息体系：通过栏目和模型绑定，以及不同的模型类型，不同栏目可以实现差异化的功能，轻松实现诸如资讯、下载、讨论和图片等功能。通过分类信息和栏目绑定，可以自动建立索引表，轻松实现复杂的信息检索。
>
> - 用户行为：支持自定义用户行为，可以对单个用户或者群体用户的行为进行记录及分享，为您的运营决策提供有效参考数据。
>
> - 云服务支持：支持云存储、云安全、云过滤和云统计等服务，更多贴心的服务让您的网站更安心。
>
> - 安全稳健：提供稳健的安全策略，包括备份恢复、容错、防止恶意攻击登录，网页防篡改等多项安全管理功能，保证系统安全，可靠、稳定的运行。

#### 快速入门

本项目依赖,nodejs >7.6.5  推荐使用 8.x.x 版本 mysql > 5.X 

**git clone源代码,或者下载指定版本;**

```git
git clone https://gitee.com/arterli/CmsWing.git
```

**发行版本选择**,建议最新版本

https://gitee.com/arterli/CmsWing/releases

进入命令行模式 cd 到CMSWing目录下

**安装项目依赖**

```js
npm install
```

**创建项目需要的数据库,登录MySQL 创建数据库**,

数据库名字可以随意,

```
create database cmswing;
```

**查看数据库,是否创建成功,看到有 cmswing的数据库,就创建成功了**

```
show databases;
```

**登录数据库,使用数据库,**

```
use cmswing;
```

返回 Database changed 说明成功,下一步

**导入SQL文件,生成数据库表,SQL文件在CMSWing根目录,**

目录改成,自己的 cmswing.sql 文件目录

```
source D:\ProjectList\NodeJS\CmsWing\cmswing.sql
```

导入完成后,配置数据库

**配置项目使用的数据库账号密码端口**

在CmsWing\src\config目录下的model.js文件中配置你的数据库

改数据库用户名,密码,数据库,端口一般默认

```
mysql: {
    handle: mysql, // Adapter handle
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'cmswing', // 数据库
    host: '127.0.0.1', // host
    port: 3306, // 端口
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: 'cmswing_', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
    cache: { // 额外的缓存配置
      type: 'file',
      handle: fileCache,
      cachePath: path.join(think.ROOT_PATH, 'runtime/cache') // absoulte path is necessarily required
    }
```

**配置完,运行项目**

```
npm start
```

查看有没有报错,没有直接访问,http://127.0.0.1:8360

**前端登录**

账号密码

```
user: admin
password: 123456
```

愉快的玩耍吧,里面有默认的数据

**管理后台登录账号密码一样**

http://127.0.0.1:8360/admin

![PC](http://www.cmswing.com/static/dome/macbookpro.png)
![IPAD](http://www.cmswing.com/static/dome/ipad.png)
![iphone](http://www.cmswing.com/static/dome/iphone.png)

## QQ 交流群: 49757468

有问题可以到QQ群 进行交流.

## install dependencies



```
npm install
```
## start server
```
npm start
```

## deploy with pm2

use pm2 to deploy app on production envrioment.

```
可以在项目根目录下执行 pm2 start pm2.json 来启动项目
```

## 后台账号密码1
```
账号:admin
密码:123456
```
## 演示网站
#####PC端直接输入下面网址:
>CmsWing.com [www.cmswing.com](http://www.cmswing.com/ "Title") CMSWing 官网.
>CmsWing.net [www.cmswing.net](http://www.cmswing.net/ "Title") CMSWing 演示网站.
>LVOO[www.lvoo.net](http://www.lvoo.net) 分类信息应用案例展示。
#####手机端,用手机浏览器或者微信客户端扫下面二维码:
![二维码](http://data.cmswing.com/1C30EFE7-A0DD-474B-88B5-4AD2270C422E.png)
## 内置模型 - 同时支持PC端与手机端【微信公众平台】
##### 新闻系统模型 
##### 下载系统模型 
##### 视频系统模型
##### 图库系统模型
##### 商城系统模型
##### 问答社区模型

##后台部分截图

![内容管理](http://data.cmswing.com/%E5%86%85%E5%AE%B9%E7%AE%A1%E7%90%86%20%20%20CmsWing%E5%86%85%E5%AE%B9%E7%AE%A1%E7%90%86%E6%A1%86%E6%9E%B6.png?imageView2/2/w/973)
![微信](http://data.cmswing.com/%E7%81%AB%E7%8B%90%E6%88%AA%E5%9B%BE_2016-05-20T09-51-31.869Z.png?imageView2/2/w/973)

##手机端(微信)前台模版截图

![新闻详情](http://data.cmswing.com/D8738B846D03D0854FA7FBB6C0CE189B.png)

