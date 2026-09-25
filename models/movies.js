const {DataTypes}  = require("sequelize")

const sequelize = require('../util/database')

const movies = sequelize.define('movies',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    cinemaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"cinemas",
            id:"key"
        }
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    maxCancellationDays:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    capacity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports=movies;