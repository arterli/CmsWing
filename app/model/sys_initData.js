
'use strict';
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
module.exports = async app => {
  return app.model.sync({ alter: true }).then(async () => {
    const dirs = await fs.readdir(path.join(app.baseDir, 'app', '/core/initData'));
    for (const v of dirs) {
      const name = path.basename(v, '.json');
      const modename = _.upperFirst(_.camelCase(name));
      const ext = path.extname(v);
      try {
        if (ext === '.json') {
          const count = await app.model[modename].count();
          if (count === 0) {
            const data = await fs.readJson(path.join(app.baseDir, 'app', `/core/initData/${v}`));
            await app.model[modename].bulkCreate(data.RECORDS);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
};
