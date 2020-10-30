const { formatTime } = require('../public/javascripts/utils/index')

// 用户组数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_group',{
        gid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid', 'lock'],
            field: 'state',
            defaultValue: 'valid'
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