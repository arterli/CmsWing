module.exports = class extends think.cmswing.rest {
  /**
     * 获取分类信息
     * /api/category 获取全部栏目（树结构）
     * /api/category/1 获取栏目id为1的栏目信息
     * @returns {Promise.<*>}
     */
  async getAction() {
    let data;
    if (this.id) {
      const pk = await this.modelInstance.pk;
      data = await this.modelInstance.where({[pk]: this.id}).find();
      return this.success(data);
    }
    data = await this.modelInstance.get_all_category();
    return this.success(arr_to_tree(data, 0));
  }
  async postAction() {
    return this.success(this.post());
  }
};
