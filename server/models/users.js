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
            type: DataTypes.INTEGER(1),
            allowNull: true,
            field: 'sex',
            defaultValue: 1     // 0 女 1 男
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
            defaultValue: 'valid'
        },
        gid: {
            type: DataTypes.INTEGER,
            allowNull: true,
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