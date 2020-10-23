const { formatTime } = require('../public/javascripts/utils/index')
// 用户表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username'
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nickname'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        avater: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avater'
        },
        phone: {
            type: DataTypes.STRING(12),
            allowNull: true,
            field: 'phone'
        },
        createTime: {
            type: DataTypes.DATE,
            get() {
                return formatTime()
            }
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })
}