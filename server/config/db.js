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
sequelize.sync({ force: false });

// 关联
user_group.hasOne(users);
users.belongsTo(user_group, {
  foreignKey: 'gid'
});

users.hasMany(users);
articles.belongsTo(users,{
  foreignKey: 'uid'
})





module.exports = { sequelize,Op,users,user_group, articles }