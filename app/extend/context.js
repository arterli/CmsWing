const GRAPHQLQUERY = Symbol('Context#graphqlQuery');

module.exports = {
  graphqlQuery(query) {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[GRAPHQLQUERY]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      this[GRAPHQLQUERY] = this.graphql.query(query);
    }
    return this[GRAPHQLQUERY];
  },
};
