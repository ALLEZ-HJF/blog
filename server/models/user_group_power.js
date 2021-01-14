const moment = require('moment')
// 用户组数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_group_power',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_group',
                key: 'gid'
            }
        },
        rid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'routers',
                key: 'rid'
            }
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