module.exports = class extends think.cmswing.rest {
  /**
   * 获取分类信息
   * /api/category 获取全部栏目（树结构）
   * /api/category/1 获取栏目id为1的栏目信息
   * @returns {Promise.<*>}
   */
  async getAction() {
    let data;
    const model = this.model('cmswing/category');
    if (this.id) {

      data = await model.where({id: this.id}).find();
      return this.success(data);
    }
    data = await model.get_all_category();
    return this.success(arr_to_tree(data, 0));
  }
  async postAction() {
    return this.success(this.post());
  }
};
