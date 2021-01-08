const moment = require('moment')
// 权限表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('routers',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        component: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        redirect_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        api: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            field: 'role',
            defaultValue: 'user'
        },
        is_page: {
            type: DataTypes.ENUM,
            values: ['yes', 'no'],
            field: 'is_menu',
            defaultValue: 'yes'
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
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
        timestamps: false
    })
}