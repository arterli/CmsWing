#!/usr/bin/env bash

#################################################################
#          使用 docker 部署 cmswing 之前的准备工作
#################################################################
# 说明:
#   1. 使用 volume 挂载目录到 docker 方式来部署
#   2. 宿主机创建挂载目录: /iDockerShare/www
#        /iDockerShare
#             └── www
#                 ├── cmswing       项目源码目录
#                 ├── db            数据库 MySQL 目录
#                 └── nginx_conf    nginx 配置文件目录
#
#   3. 本脚本作用: 把源码拷贝到 /iDockerShare/www/cmswing 下
#
#
#################################################################


#################################################################
#                  docker volume 共享目录创建:
#################################################################


# docker 部署项目共享目录:
base_dir="/iDockerShare/www"
project_dir="${base_dir}/cmswing"
db_dir="${base_dir}/db"
nginx_conf_dir="${base_dir}/nginx_conf"


sudo mkdir -p ${project_dir}
sudo mkdir -p ${db_dir}
sudo mkdir -p ${nginx_conf_dir}

# 防止出现权限问题:
sudo chmod 777 /iDockerShare


#################################################################
#                       项目源码拷贝:
#################################################################

cd ..

# 复制项目:
cp -r . ${project_dir}

cd ${project_dir}
sudo rm -rf .git/

# 查看实际的项目目录:
tree . -L 2





















