// 用户表数据模型
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('codes',{
        code_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
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