'use strict';
module.exports = {
  dirScanner: './app/controller',
  apiInfo: {
    title: 'cmswing',
    description: 'cmswing',
    version: '1.0.0',
  },
  schemes: [ 'http', 'https' ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  securityDefinitions: {
    // apikey: {
    //   type: 'apiKey',
    //   name: 'clientkey',
    //   in: 'header',
    // },
    // oauth2: {
    //   type: 'oauth2',
    //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
    //   flow: 'password',
    //   scopes: {
    //     'write:access_token': 'write access_token',
    //     'read:access_token': 'read access_token',
    //   },
    // },
  },
  enableSecurity: false,
  // enableValidate: true,
  routerMap: false,
  enable: true,
};
