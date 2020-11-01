// 分类数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('categories',{
        cid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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