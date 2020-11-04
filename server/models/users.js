// 用户表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users',{
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username'
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nickname'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avatar'
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: true,
            field: 'phone'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'email'
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'sex'
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'age'
        },
        introduction: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'introduction'
        },
        state: {
            type: DataTypes.ENUM,
            values: ['valid','invalid','lock'],
            field: 'state',
            defaultValue: 'invalid'
        },
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_group',
                key: 'gid'
            }
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