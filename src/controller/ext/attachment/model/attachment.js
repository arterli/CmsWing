module.exports = class extends think.Model {
  async updates(data) {
    if (think.isEmpty(data.id)) {
      data.status = 1;
      data.create_time = new Date().getTime();
      await this.add(data);
    } else {
      await this.update(data);
    }
    return data;
  }
  async lists(){
      return this.select()
  }
};
