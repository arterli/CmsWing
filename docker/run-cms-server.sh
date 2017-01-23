#!/usr/bin/env bash

#############################################################
#              cmswing 容器启动核心命令
# 说明:
#   1. 部署分2个 docker 容器, 这样方便后续 MySQL 作主备, 高可用配置.
#   2. 为简化部署, 把 nginx 和 cmswing 源码合并一起, 更优实践应分开.
#
#############################################################



# 启动 cmswing 依赖的 mysql 容器:
docker run --name cms-db -p 33060:3306 -v /iDockerShare/www/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=your_password -d daocloud.io/library/mysql:5.7

# 启动 cmswing server 容器:
docker run --name cms_server -v /iDockerShare/www:/web   -p 6080:80  -d cmswing_base:0.4


# 查看容器启动状态:
docker ps

# 第一次启动 cmswing server 容器, 大概有10s 左右延迟, 服务才可正常访问.
# 服务生效前访问, 出现 nginx 404错误.


