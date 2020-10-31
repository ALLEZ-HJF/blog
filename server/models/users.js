const { formatTime } = require('../public/javascripts/utils/index')
// 用户表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users',{
        uid: {
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
            type: DataTypes.STRING(11),
            allowNull: true,
            field: 'phone'
        },
        introduction: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'introduction'
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid', 'lock'],
            field: 'state',
            defaultValue: 'valid'
        },
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_group',
                key: 'gid'
            }
        },
        update_time: {
            type: DataTypes.DATE
        },
        create_time: {
            type: DataTypes.DATE
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })
}