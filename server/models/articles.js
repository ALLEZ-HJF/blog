const { formatTime } = require('../public/javascripts/utils/index')
// 文章表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('articles',{
        aid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        look_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        like_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        unlike_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        comment_num: {
             type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid','invalid','lock'],
            field: 'state',
            defaultValue: 'invalid'
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