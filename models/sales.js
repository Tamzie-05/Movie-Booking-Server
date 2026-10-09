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
    ticketId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
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
    },
    status: {
        type: DataTypes.ENUM('booked', 'cancelled'),
        allowNull: false,
        defaultValue: 'booked'
    },
    bookedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = sales;