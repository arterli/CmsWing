/**
 * Created by arter on 2017/7/9.
 */
const moment = require('moment');
moment.locale('zh-cn');
module.exports = {
     get isMobile(){
        return this.ctx.isMobile;
    },
    moment:moment,
    /**
     * execute action
     * @param {String} controller
     * @param {String} actionName
     * @param {String} m
     */
    action(controller, actionName, m) {
        const instance = this.controller(controller, m);
        let promise = Promise.resolve();
        if (instance.__before) {
            promise = Promise.resolve(instance.__before());
        }
        return promise.then(data => {
            if (data === false) return false;
            let method = `${actionName}Action`;
            if (!instance[method]) {
                method = '__call';
            }
            if (instance[method]) {
                return instance[method]();
            }
        }).then(data => {
            if (data === false) return false;
            if (instance.__after) {
                instance.__after();
            }
            return data;
        });
    }
}