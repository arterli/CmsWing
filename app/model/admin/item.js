module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN } = app.Sequelize;

  const Item = app.model.define('item', {
    user_id: INTEGER,
    content: STRING(64),
    expire: DATE,
    priority: { type: INTEGER, defaultValue: 0 },
    done: { type: BOOLEAN, defaultValue: false },
  });
  Item.sync({ alter: true });
  return Item;
};
