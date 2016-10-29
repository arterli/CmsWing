
# 使用 docker 镜像部署 cmswing 教程:

- 部署综述:
    - 1. 使用 docker 部署.
    - 2. 项目依赖2个容器:
        - 容器1: MySQL 数据库
        - 容器2: 项目源码
    - 3. 容器启动顺序:
        - 先启动 MySQL 数据库容器
        - 再启动 cmswing server 容器
    - 4. cmswing 源码需要修改的地方:
        - /CmsWing/src/common/config/db.js
            - 数据库的连接, 要改 `127.0.0.1` 为 `真实主机 IP`.
    - 5. 其他细节, 参考本文档具体步骤.
   
- 核心启动命令:
     
```

# 启动 cmswing 依赖的 mysql 容器:
docker run --name cms-db -p 33060:3306 -v /iDockerShare/www/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=your_password -d daocloud.io/library/mysql:5.7

# 启动 cmswing server 容器:
docker run --name cms_server -v /iDockerShare/www:/web   -p 6080:80  -d cmswing_base:0.4


# 查看启动状态:
docker ps

# 第一次启动 cmswing server 容器, 大概有10s 左右延迟, 服务才可正常访问.
# 服务生效前访问, 出现 nginx 404错误.

```     
        
   
        


## 0. Docker 简介 & 安装:

- [docker 官网](https://www.docker.com/)
- 针对对 docker 不熟悉的用户, 熟悉者, 可跳过此部分.
- docker 是一种容器技术, 方便实践 devops, 实现高效开发, 测试, 部署.


### 0.1 docker 参考文档:

- 推荐主机环境:
    - Linux 内核 3.11.0 以上版本
    - Ubuntu Trusty 14.04 (LTS)
    - 不建议使用 centos 主机.
- docker 安装攻略:
    - 国外用户: 参考 docker 官方文档安装.
        - [安装文档 - 官方](https://docs.docker.com/engine/installation/)
            - [ubuntu 主机安装 docker](https://docs.docker.com/engine/installation/linux/ubuntulinux/)
            - [debian 主机安装 docker](https://docs.docker.com/engine/installation/linux/debian/)
            - [centos 主机安装 docker](https://docs.docker.com/engine/installation/linux/centos/)
    - 国内用户: 使用 daocloud 提供的一键安装脚本.
        - [daocloud 加速器](https://get.daocloud.io/)
- 查看内核版本:
```
# 查看内核版本:
$ uname -r
3.11.0-15-generic

```


        
### 0.2 安装步骤(Linux):

- 国内用户, 执行如下命令一键安装 docker:

```
curl -sSL https://get.daocloud.io/docker | sh

```

- 国外用户, 请参考上述 docker 官方文档.




## 1. MysQL 容器部署教程:

### 1.1 准备工作:

- 拉取镜像:

```
docker pull daocloud.io/library/mysql:5.7  

```

### 1.2 启动镜像:

```
# 后台方式:
#   - 端口映射: -p 33060:3306
#   - 目录挂载: -v /iDockerShare/www/db:/var/lib/mysql
#   - 数据库 root 密码: -e MYSQL_ROOT_PASSWORD=your_password
#       - 此密码, 可自行设定
#       - 此密码, 要与 /CmsWing/src/common/config/db.js 里保持一致
#   - 后台运行: -d
docker run --name cms-db -p 33060:3306 -v /iDockerShare/www/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=your_password -d daocloud.io/library/mysql:5.7

```

### 1.3 数据导入:

- 将项目/CmsWing/cmswing.sql 文件拷贝到 /iDockerShare/www/db 下.
- 然后终端方式进入容器里: 切换到 /var/lib/mysql 目录, 可以找到 cmswing.sql 文件.
- 然后在容器中, 执行数据导入操作.

```


# 终端进入容器:
docker exec -it cms-db bash


############### 容器中 start ###############
# 后续操作, 都在容器中:
###########################################

# 容器中操作:
cd /var/lib/mysql

# 先创建数据库:
mysql -u root -p
输入数据库密码: (启动容器设定的)

# 创建数据库:
mysql > CREATE DATABASE cmswing;

# 查看数据库:
mysql > show databases;
mysql > quit;


# 再次连接数据库,并导入数据:
mysql -u root -p  -D cmswing < /var/lib/mysql/cmswing.sql
输入数据库密码: (启动容器设定的)

############### 容器中 end ###############

# 退出容器:
exit


```

### 1.4 针对 cmswing 需要修改的地方:
- 主机 IP: 120.76.134.101
- 修改文件: /CmsWing/src/common/config/db.js
- 数据库连接 host 要改为真实 IP.

```

'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '120.76.134.101',    // [docker 运行注意] 此处修改为真实主机 IP
      port: '33060',             // [docker 运行注意] 端口映射
      database: 'cmswing',
      user: 'root',
      password: 'your_password',    // [数据库 root 密码]
      prefix: 'cmswing_',
      encoding: 'UTF8MB4_GENERAL_CI'
    },
    mongo: {

    }
  }
};



```


- 待补充




## 2. Cmswing 容器部署教程:


### 2.1 准备工作:


#### 2.1.1 初始化部署目录:

- 执行脚本: docker/prepare.sh 

#### 2.1.2 拉取基镜像(依赖):


```
# docker 镜像:
# 拉取:
docker pull daocloud.io/library/node:6.8.1

# 可不拉取:
docker pull daocloud.io/library/node:4.6.1


```


### 2.2 构建 Docker 镜像:

- 执行脚本: /CmsWing/docker/base/build_docker_image.sh

- 查看镜像构建成功:

```

-> % docker images 
REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
cmswing_base                0.4                 087db98d77c3        8 minutes ago       765.3 MB
cmswing_base                0.1                 9e559c325c5a        2 hours ago         765.3 MB


```


### 2.3 由 docker 镜像, 启动容器:

```

docker run --name cms_server -v /iDockerShare/www:/web   -p 6080:80  -d cmswing_base:0.4


```

### 2.4 查看容器启动成功:

```
-> % docker ps                                                                           
CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                                                          NAMES
7f350f021f06        cmswing_base:0.4                "sh /run.sh"             10 minutes ago      Up 10 minutes       443/tcp, 3306/tcp, 8360/tcp, 33060/tcp, 0.0.0.0:6080->80/tcp   cms-ng


```

### 2.5 网站访问测试:

1. 初次启动 cmswing 容器, 需等待约10s 后, 网站服务才可用. 否则,访问出现 nginx 404错误.
2. 正常访问: `0.0.0.0:6080` (替换为自有主机 IP)
3. 启动容器时的端口映射, 可以自行修改. 容器里的进程 和 宿主机, 是隔离开的, 互补影响.


### 2.6 容器调试方法:


```
# 交互模式运行容器:
docker run -it --name cms_server1 -v /iDockerShare/www:/web   -p 6080:80   cmswing_base:0.3 bash



```


