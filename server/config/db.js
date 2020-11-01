const {Op,Sequelize} = require('sequelize')
const { dbName,name,password,host,port } = require('./config')

// 数据库名字 数据库账号 数据库密码 参数配置
const sequelize = new Sequelize(dbName,name,password,{
    host: host,
    port: port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: "+08:00"
})

const users = sequelize.import('../models/users');
const user_group = sequelize.import('../models/user_group');
const articles = sequelize.import('../models/articles');
const categories = sequelize.import('../models/categories');

// 关联
user_group.hasOne(users,{
  foreignKey: 'gid'
});
users.belongsTo(user_group, {
  foreignKey: 'gid'
});

users.hasMany(articles,{
  foreignKey: 'uid'
});
// 文章跟用户表管理
articles.belongsTo(users, {
  foreignKey: 'uid'
})

// 文章跟类型表管理
categories.hasMany(articles,{
  foreignKey: 'cid'
})
articles.belongsTo(categories,{
  foreignKey: 'cid'
})

sequelize.sync({ force: false });






module.exports = { sequelize,Op,users,user_group, articles, categories }