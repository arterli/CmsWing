module.exports = class extends think.Service {
  // 构造函数
  constructor(...para) {
    super(para);

    this.transport = {
      host: think.config('ext.email.host'),
      port: Number(think.config('ext.email.port')),
      secure: false,
      auth: {
        user: think.config('ext.email.user'),
        pass: think.config('ext.email.pass')
      }
    };
  }

  // 发送邮件
  async send(options) {
    // 检查
    think.extend(options, {
      from: think.config('ext.email.user')
    })
    // 发送
    const deferred = think.defer();
    console.log('-----email', this.transport, options);
    think.sendEmail(this.transport, options).then(info => {
      deferred.resolve(info);
    }, err => {
      console.log(err);
    });
    return deferred.promise;
  }
};
