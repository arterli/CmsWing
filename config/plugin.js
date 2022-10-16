'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-docs',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  downloader: {
    enable: true,
    package: 'egg-downloader',
  },
  remoteConfig: {
    enable: true,
    package: 'egg-remote-config',
  },
};
