const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const sales = sequelize.define('sales',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'payments',
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
    movieId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'movies',
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
    }
});

module.exports = sales;