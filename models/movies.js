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
        unique:false
    },
    cinemaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"cinemas",
            key:"id"
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
    cancellationDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    capacity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});
module.exports=movies;