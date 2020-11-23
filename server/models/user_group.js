const moment = require('moment')
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
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            field: 'role',
            defaultValue: 'admin'
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid', 'lock'],
            field: 'state',
            defaultValue: 'valid'
        },
        update_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        create_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })
}