const{DataTypes}=require('sequelize')
const sequelize = require('../util/database')
const moviePrices = sequelize.define('movieprices',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    movieId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"movies",
            key:"id"
        }
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = moviePrices;