const {DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const superAdmin = sequelize.define('superAdmin',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'superadmin'
    },

    status: {
        type: DataTypes.ENUM('active', 'revoked'),
        allowNull: false,
        defaultValue: 'active'
    }
},{ 
    timestamps: false

});

module.exports = superAdmin;
