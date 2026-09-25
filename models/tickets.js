const {DataTypes} = require('sequelize');
const sequelize = require('../util/database')


const ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        }
    },

    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'movies',
            key: 'id'
        }
    },

    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    status: {
        type: DataTypes.ENUM('valid', 'used', 'cancelled'),
        allowNull: false,
        defaultValue: 'valid'
    }
});

module.exports=ticket;