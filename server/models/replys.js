// 回复表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('replys',{
        rid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        commid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comments',
                key: 'commid'
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
        pid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imgs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid','lock'],
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