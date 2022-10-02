'use strict';
module.exports = app => {
  app.router.get('路由列表', '/admin/sys/routes/routesList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.routesList');
  app.router.get('删除回复', '/cms/comments/replyDel', app.middleware.mc.authMcToken(), 'cms.comments.replyDel');
  app.router.get('删除评论', '/cms/comments/del', app.middleware.mc.authMcToken(), 'cms.comments.del');
  app.router.get('获取系统配置', '/admin/sys/config/info', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.config.info');
  app.router.get('分组列表', '/admin/sys/user/groupList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.groupList');
  app.router.get('cms首页', '/', 'cms.web.index');
  app.router.post('更新字段', '/admin/sys/models/updateFields', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.updateFields');
  app.router.post('添加回复', '/cms/comments/replyAdd', app.middleware.mc.authMcToken(), 'cms.comments.replyAdd');
  app.router.get('评论列表', '/admin/cms/comments/adminList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.comments.adminList');
  app.router.post('更新会员信息', '/mc/setup/updateInfo', app.middleware.mc.authMcToken(), 'mc.setup.updateInfo');
  app.router.get('路由权限节点', '/admin/sys/role/routingNode', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.routingNode');
  app.router.get('会员中心首页', '/mc/index', app.middleware.mc.authMcToken(), 'mc.index.index');
  app.router.get('模版列表', '/admin/cms/template', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.template.index');
  app.router.post('登录接口', '/mc/loginPost', 'mc.index.lginPost');
  app.router.get('ajax编辑回复', '/cms/comments/modalCommentReplyEdit', app.middleware.mc.authMcToken(), 'cms.comments.modalCommentReplyEdit');
  app.router.get('ajax编辑评论', '/cms/comments/modalCommentEdit', app.middleware.mc.authMcToken(), 'cms.comments.modalCommentEdit');
  app.router.get('回收站列表', '/admin/cms/recycle/index', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.recycle.index');
  app.router.post('更新邮箱', '/mc/setup/upEmail', app.middleware.mc.authMcToken(), 'mc.setup.upEmail');
  app.router.get('全部分类', '/admin/cms/doc/topClassify', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.topClassify');
  app.router.get('ajax获取评论内容', '/cms/comments/ajaxList', 'cms.comments.ajaxList');
  app.router.get('获取对象储存配置', '/admin/sys/objectStorage/objectStorageConfig', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.objectStorage.objectStorageConfig');
  app.router.get('会员设置', '/mc/setup', app.middleware.mc.authMcToken(), 'mc.setup.index');
  app.router.post('添加模版', '/admin/cms/template/add', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.template.add');
  app.router.get('分类列表', '/admin/cms/classify/index', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.index');
  app.router.post('会员注册', '/mc/signup', 'mc.index.signup');
  app.router.get('导航列表', '/admin/sys/navigation/index', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.index');
  app.router.post('编辑回复', '/cms/comments/replyEdit', app.middleware.mc.authMcToken(), 'cms.comments.replyEdit');
  app.router.post('编辑评论', '/cms/comments/edit', app.middleware.mc.authMcToken(), 'cms.comments.edit');
  app.router.post('更新密码', '/mc/setup/upPassword', app.middleware.mc.authMcToken(), 'mc.setup.upPassword');
  app.router.post('添加评论', '/cms/comments/add', app.middleware.mc.authMcToken(), 'cms.comments.add');
  app.router.get('ajax回复评论', '/cms/comments/modalCommentReply', app.middleware.mc.authMcToken(), 'cms.comments.modalCommentReply');
  app.router.post('上传头像', '/mc/setup/avatar', app.middleware.mc.authMcToken(), 'mc.setup.avatar');
  app.router.get('退出登录', '/mc/logout', app.middleware.mc.authMcToken(), 'mc.index.logout');
  app.router.get('登录/注册', '/mc/login', 'mc.index.login');
  app.router.get('会员列表', '/admin/mc/member/list', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'mc.member.list');
  app.router.post('添加会员', '/admin/mc/member/add', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'mc.member.add');
  app.router.post('批量删除', '/admin/cms/comments/adminBulkDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.comments.adminBulkDel');
  app.router.post('修改系统配置', '/admin/sys/config/edit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.config.edit');
  app.router.post('添加分组', '/admin/sys/user/groupAdd', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.groupAdd');
  app.router.get('cms列表', '/cms/list/:id', 'cms.web.list');
  app.router.get('获取索引', '/admin/sys/models/indexes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.indexes');
  app.router.get('graphQL权限节点', '/admin/sys/role/graphQL', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.graphQL');
  app.router.get('删除文档', '/admin/cms/recycle/del', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.recycle.del');
  app.router.post('排序', '/admin/cms/doc/saveOrder', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.saveOrder');
  app.router.post('编辑配置', '/admin/sys/objectStorage/edit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.objectStorage.edit');
  app.router.get('获取上级分类', '/admin/cms/classify/topClassify', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.topClassify');
  app.router.get('获取全部导航节点', '/admin/sys/navigation/topNavigation', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.topNavigation');
  app.router.post('添加分类', '/admin/sys/routes/addClassify', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.addClassify');
  app.router.post('批量删除', '/admin/cms/recycle/bulkDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.recycle.bulkDel');
  app.router.post('批量删除', '/admin/cms/doc/bulkDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.bulkDel');
  app.router.post('添加分类', '/admin/cms/classify/classifyAdd', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.classifyAdd');
  app.router.post('编辑分类', '/admin/sys/routes/editClassify', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.editClassify');
  app.router.post('添加导航', '/admin/sys/navigation/navigationAdd', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.navigationAdd');
  app.router.post('编辑会员', '/admin/mc/member/edit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'mc.member.edit');
  app.router.get('删除单条评论', '/admin/cms/comments/adminDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.comments.adminDel');
  app.router.post('编辑分组', '/admin/sys/user/groupEdit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.groupEdit');
  app.router.post('更新索引', '/admin/sys/models/updateIndexes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.updateIndexes');
  app.router.get('cms详情', '/cms/detail/:id', 'cms.web.detail');
  app.router.post('添加角色', '/admin/sys/role/addRole', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.addRole');
  app.router.get('获取关联模型', '/admin/sys/models/associate', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.associate');
  app.router.get('删除分组', '/admin/sys/user/groupDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.groupDel');
  app.router.get('角色列表', '/admin/sys/role/roleList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.roleList');
  app.router.get('恢复文档', '/admin/cms/recycle/restore', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.recycle.restore');
  app.router.post('添加路由', '/admin/sys/routes/addRoutes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.addRoutes');
  app.router.post('编辑分类', '/admin/cms/classify/classifyEdit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.classifyEdit');
  app.router.post('编辑导航', '/admin/sys/navigation/navigationEdit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.navigationEdit');
  app.router.get('内容列表', '/admin/cms/doc/index', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.index');
  app.router.get('删除会员', '/admin/mc/member/del', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'mc.member.del');
  app.router.get('获取子分类', '/admin/cms/doc/classifySub', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.classifySub');
  app.router.post('更新关联模型', '/admin/sys/models/updateAssociate', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.updateAssociate');
  app.router.get('用户列表', '/admin/sys/user/userList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.userList');
  app.router.post('更新角色', '/admin/sys/role/update', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.update');
  app.router.post('编辑路由', '/admin/sys/routes/editRoutes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.editRoutes');
  app.router.post('批量恢复', '/admin/cms/recycle/bulkRestore', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.recycle.bulkRestore');
  app.router.get('删除分类', '/admin/cms/classify/classifyDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.classifyDel');
  app.router.get('删除导航', '/admin/sys/navigation/navigationDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.navigationDel');
  app.router.post('分类排序', '/admin/cms/classify/saveOrder', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.classify.saveOrder');
  app.router.post('排序', '/admin/sys/navigation/saveOrder', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.navigation.saveOrder');
  app.router.get('子分类表单', '/admin/cms/doc/classifySubFrom', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.classifySubFrom');
  app.router.post('添加用户', '/admin/sys/user/userAdd', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.userAdd');
  app.router.post('添加模型', '/admin/sys/models/addModels', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.models.addModels');
  app.router.get('删除角色', '/admin/sys/role/del', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.role.del');
  app.router.get('删除路由', '/admin/sys/routes/delRoutes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.delRoutes');
  app.router.post('编辑用户', '/admin/sys/user/userEdit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.userEdit');
  app.router.get('获取上级路由', '/admin/sys/routes/topRoutes', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.topRoutes');
  app.router.get('模型表单', '/admin/cms/doc/getContent', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.getContent');
  app.router.post('添加内容', '/admin/cms/doc/docAdd', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.docAdd');
  app.router.get('删除用户', '/admin/sys/user/userDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.userDel');
  app.router.post('视图编辑页面', '/admin/sys/routes/editPages', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.editPages');
  app.router.get('上级文档', '/admin/cms/doc/pdoc', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.pdoc');
  app.router.get('获取角色', '/admin/sys/user/roleList', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.user.roleList');
  app.router.post('路由排序', '/admin/sys/routes/saveOrder', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'sys.routes.saveOrder');
  app.router.post('编辑文档', '/admin/cms/doc/docEdit', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.docEdit');
  app.router.get('删除文档', '/admin/cms/doc/docDel', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.docDel');
  app.router.get('获取所属分类', '/admin/cms/doc/selectClassify', app.middleware.sys.authAdminToken(), app.middleware.sys.rbac(), 'cms.doc.selectClassify');

};
