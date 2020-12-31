const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('stat_day',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: { // 记录某天 YYYY-MM-DD
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('YYYY-MM-DD')
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
        timestamps: false,
    })
}