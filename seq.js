const Sequelize = require('sequelize')
const sequelize = require('./util/database')

const superAdmin = require('./models/superadmins.js') 
const cinemaAdmin = require('./models/cinemadmin.js')
const cinema = require('./models/cinemas.js')
const payments = require('./models/payments.js')
const customers = require('./models/customers.js')
const movies = require('./models/movies.js')
const moviePrices = require('./models/movieprices.js')
const sales = require('./models/sales.js')
const tickets = require('./models/tickets.js')



superAdmin.hasMany(cinemaAdmin,{
    foreignKey:"createdBy"
});

cinemaAdmin.belongsTo(superAdmin,{
    foreignKey:"createdBy"
});

cinema.belongsTo(superAdmin,{
    foreignKey:"createdBy"
});

superAdmin.hasMany(cinema,{
    foreignKey:"createdBy"
});

cinema.hasOne(cinemaAdmin,{
    foreignKey:"cinemaId"
});
cinemaAdmin.belongsTo(cinema,{
    foreignKey:"cinemaId"
});

customers.hasMany(payments, {
    foreignKey: "customerId"
});

cinema.hasMany(movies, {
    foreignKey: "cinemaId"
});

movies.belongsTo(cinema, {
    foreignKey: "cinemaId"
});

movies.hasMany(moviePrices, {
    foreignKey: "movieId"
});

moviePrices.belongsTo(movies, {
    foreignKey: "movieId"
});

payments.belongsTo(customers, {
    foreignKey: "customerId"
});

movies.hasMany(payments, {
    foreignKey: "movieId"
});

payments.belongsTo(movies, {
    foreignKey: "movieId"
});

moviePrices.hasMany(payments, {
    foreignKey: "priceId"
});

payments.belongsTo(moviePrices, {
    foreignKey: "priceId"
});

payments.hasMany(sales, {
    foreignKey: "paymentId"
});
sales.belongsTo(payments,{
    foreignKey: "paymentId"
});

customers.hasMany(sales, {
    foreignKey: "customerId"
});

sales.belongsTo(customers, {
    foreignKey: "customerId"
});

movies.hasMany(sales, {
    foreignKey: "movieId"
});

sales.belongsTo(movies, {
    foreignKey: "movieId"
});

moviePrices.hasMany(sales, {
    foreignKey: "priceId"
});

sales.belongsTo(moviePrices, {
    foreignKey: "priceId"
});
sales.hasMany(tickets, {
    foreignKey: "saleId"
});

tickets.belongsTo(sales, {
    foreignKey: "saleId"
});
//sequelize.sync({ alter : true })

