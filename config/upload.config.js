'use strict';
// eslint-disable-next-line eol-last, object-curly-spacing, quotes, quote-props, key-spacing, comma-spacing
module.exports = {
  upload: {
    type: 'qiniu',
    local: { domain: 'http://127.0.0.1:7001', path: 'upload' },
    qiniu: {
      AccessKey: 'zU-y5Bwaxj3wNZoybG8qxj6TLZfvvtk1oZW9VFDO',
      SecretKey: 'aAsTGsJ9qW-ysvcGkB8FOBF4wUI_8IOqZczaJovn',
      Bucket: 'cmswing',
      domain: 'https://data.cmswing.com',
    },
    huawei: {
      access_key_id: '5F1DVWXM5UG8QIW9PHGN',
      secret_access_key: 'spNBJUgVdlthTZ1jm4jkwEgCKAwsihW5tA2rfLmN',
      Bucket: 'ronghaoteng',
      server: 'https://obs.cn-south-1.myhuaweicloud.com',
      domain: 'https://data.ronghaoteng.com',
    },
  },
};
