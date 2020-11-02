// 文章表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('articles',{
        aid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'cid'
            }
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        look_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        like_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        unlike_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
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