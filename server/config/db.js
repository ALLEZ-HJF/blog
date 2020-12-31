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
const categories = sequelize.import('../models/categories');
const articles = sequelize.import('../models/articles');
const comments = sequelize.import('../models/comments');
const replys = sequelize.import('../models/replys');
const codes = sequelize.import('../models/codes');
const article_category = sequelize.import('../models/article_category');
const stat_day = sequelize.import('../models/stat_day');

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
// 文章跟用户表关联
articles.belongsTo(users, {
  foreignKey: 'uid'
})

// 文章跟类型表关联 创建中间表 多对多

categories.belongsToMany(articles,{
  through: article_category,
  foreignKey: 'cid'
})
articles.belongsToMany(categories,{
  through: article_category,
  foreignKey: 'aid'
})

// 文章跟评论表关联
articles.hasMany(comments,{
  foreignKey: 'aid'
})
comments.belongsTo(articles,{
  foreignKey: 'aid'
})

// 评论与回复关系 1个评论有多个回复
users.hasMany(comments,{
  foreignKey: 'uid'
})
comments.belongsTo(users,{
  foreignKey: 'uid'
})

// 评论与回复关系 1个评论有多个回复
comments.hasMany(replys,{
  foreignKey: 'commid'
})
replys.belongsTo(comments,{
  foreignKey: 'commid'
})

replys.belongsTo(users,{
  foreignKey: 'uid'
})


sequelize.sync({ force: false });






module.exports = { sequelize,Op,users,user_group, articles, categories, comments,replys, codes,article_category,stat_day }