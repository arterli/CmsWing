module.exports = class extends think.Model {
  async demo() {
    const list = await this.select();
    return list;
  }
};
