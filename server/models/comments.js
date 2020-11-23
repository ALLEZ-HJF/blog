// 评论数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comments',{
        commid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        aid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'articles',
                key: 'aid'
            }
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'uid',
            references: {
                model: 'users',
                key: 'uid'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'content'
        },
        imgs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid', 'lock'],
            field: 'state',
            defaultValue: 'valid'
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