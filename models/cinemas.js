const {DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const cinema = sequelize.define('cinema',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
module.exports = cinema;