const {DataTypes}  = require("sequelize")

const sequelize = require('../util/database')

const cinemaAdmin = sequelize.define("cinemaAdmin",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cinemaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique: true,
    },
     status: {
        type: DataTypes.ENUM('active', 'revoked'),
        allowNull: false,
        defaultValue: 'active'
    }
});
module.exports = cinemaAdmin;