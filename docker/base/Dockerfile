FROM daocloud.io/library/node:6.8.1

MAINTAINER hhstore

#############################################################
#              config  base env:
#############################################################

# 参考: https://npm.taobao.org/
# use taobao-npm-source:
# install taobao-cnpm:
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# install pm2:
RUN cnpm install -g pm2


#
# use 163 source:
#
COPY ./sources.list.jessie /etc/apt/sources.list
RUN apt-get update -yq

# install nginx1.6
# 默认配置路径:
#
#        include /etc/nginx/conf.d/*.conf;
#        include /etc/nginx/sites-enabled/*;
RUN apt-get install nginx -yq
RUN apt-get install vim -yq


# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log


# nginx 配置目录:
RUN mkdir -p /web/nginx_conf/

# 共享配置文件目录:
VOLUME ["/web/nginx_conf/"]

EXPOSE 80 443

# 因为本机有 node 执行, 所以可以后台运行nginx
#CMD ["nginx", "-g", "daemon off;"]


#############################################################
#              config  cmswing env:
#############################################################

# project-dir:
RUN mkdir -p /web/cmswing

# 项目启动脚本, 拷贝到容器根目录:
COPY ./run.sh /
RUN chmod +x /run.sh


# copy project src:
#COPY . /web/cmswing
#WORKDIR /web/cmswing/

EXPOSE 8360 33060 3306


#RUN sh /run.sh

# run:
#CMD [ "node", "./www/development.js" ]
#CMD [ "sh", "/run.sh" ]


# 前台运行:
#CMD ["nginx", "-g", "daemon off;"]
CMD [ "sh", "/run.sh" ]

