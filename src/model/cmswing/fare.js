// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  /**
   * 获取运费
   * @param {obj} cart_godds 购物车内的宝贝列表
   * @param {number} addr_id null-默认地址，number-配送地址id
   * @param {int} uid 用户id
   * 运费计算
   * 1、如果店铺只使用统一运费，那么顾客下单计算时按最低运费收取。
   * 2、如果店铺只使用一种运费模板规则，那么顾客下单计算时均按此规则收取运费。
   * 3、如果店铺使用了不同的运费模板规则，那么顾客下单时各运费模板规则先单独计算运费再叠加。
   * 4、如果店铺同时使用统一运费和不同的运费模板规则，那么顾客下单时统一运费单独计算运费，不同的运费模板
   *TODO
   * @returns {*}
   */
  async getfare(cart_godds, addr_id, uid,fid) {
    let real_freight;
    let fare;
    let address;
    if (!think.isEmpty(addr_id)) {
      address = await this.model('address').find(addr_id);
    } else {
      address = await this.model('address').where({is_default: 1, user_id: uid}).find();
    }
    // console.log(address);
    const warr = [];
    for (const val of cart_godds) {
      warr.push(val.weight * val.qty);
    }
    const goods_weight = eval(warr.join('+'));
    // console.log(goods_weight);
    const area = address.province + '_' + address.city + '_' + address.county;
    if(Number(fid) !==0){
      fare = await this.find(fid);
    }else {
      fare = await this.where({is_default: 1}).find();
    }
    console.log(fare);
    const zoning = JSON.parse(fare.zoning);
    if (think.isEmpty(zoning) || think.isEmpty(address)) {
      real_freight = fare.first_price + Math.max(Math.ceil((goods_weight - fare.first_weight) / fare.second_weight), 0) * fare.second_price;
    } else {
      for (const val of zoning) {
        // console.log(area)
        // console.log(val.area);
        if (in_array(area, JSON.parse(val.area))) {
          // console.log(Number(val.f_weight)+Number(val.s_weight));
          real_freight = Number(val.f_price) + Math.max(Math.ceil((goods_weight - Number(val.f_weight)) / Number(val.s_weight)), 0) * Number(val.s_price);
        } else {
          real_freight = fare.first_price + Math.max(Math.ceil((goods_weight - fare.first_weight) / fare.second_weight), 0) * fare.second_price;
        }
      }
      // real_freight = 8;
    }
    return real_freight;
  }
};
