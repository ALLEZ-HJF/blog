const moment = require('moment')
// 文章表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('articles',{
        aid: {
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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sub_title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        look_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        is_master: {    // 是否博主文章
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        comment_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        imgs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid','invalid','lock'],
            field: 'state',
            defaultValue: 'invalid'
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