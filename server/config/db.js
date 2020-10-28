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
    timezone: "+08:00"
})

const user = sequelize.import('../schema/users');
const user_group = sequelize.import('../schema/user_group');
user.sync({force:false})
user_group.sync({force:false})

// 关联
user_group.hasOne(user);
user.belongsTo(user_group, {
  foreignKey: 'gid'
});


module.exports = { sequelize,Op,user,user_group }