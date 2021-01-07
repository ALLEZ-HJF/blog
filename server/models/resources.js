const moment = require('moment')
// 用户组数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('resources',{
        rid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uid'
            }
        },
        resource_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resource_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resource_type: {
            type: DataTypes.ENUM,
            values: ['img'],    // 后面扩展
            field: 'resource_type',
            defaultValue: 'img'
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