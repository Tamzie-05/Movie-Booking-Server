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
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
        model: "superadmins",
        key: "id"
    }
    }
});
module.exports = cinema;