#!/usr/bin/env bash

# 替换默认的配置:
cp /web/cmswing/nginx.conf  /etc/nginx/nginx.conf

# 添加 项目相关的 nginx 配置文件:
cp /web/nginx_conf/*.conf /etc/nginx/conf.d/

# run:
service nginx start


##################################
#        run cmswing:
# bugfix:
#   - pm2 会后台运行, 不符合 docker 设计
#   - 用 node 直接前台运行
##################################

# run:
#cd /web/cmswing/
#pm2 start pm2.json
#pm2 startOrReload ./pm2.json
node /web/cmswing/www/production.js


##################################
#        run nginx:
##################################
#
# nginx 配置参数选项:
# Usage:
#   nginx {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}
#
# 启动:
# service nginx start
# 退出:
# service nginx stop
#

# 前台运行 nginx:
#nginx -g "daemon off;"











