const {DataTypes}  = require("sequelize")

const sequelize = require('../util/database')

const payments = sequelize.define('payments',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    movieId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'movies',
            key:'id'
        }
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'customers',
            key:'id'
        }
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    priceId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'movieprices',
            key:'id'
        }
    },
    status:{
        type:DataTypes.ENUM('completed','pending','failed'),
        allowNull:false,
        defaultValue:'pending'
    },
    callbackData:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    checkoutRequestId: {
        type: DataTypes.STRING,
        allowNull: true
    },

    mpesaReceiptNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    },
    merchantRequestId: {
    type: DataTypes.STRING,
    allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
module.exports= payments;
