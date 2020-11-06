// 文章表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('article_category',{
        acid: {
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
        aid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'articles',
                key: 'aid'
            }
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