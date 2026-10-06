require('dotenv').config()
const express = require('express')
const authenticateToken = require('./middleware/authenticatetoken.js')
const isSuperAdmin = require('./middleware/issuperadmin')
const sadminLogin = require('./apis/sadminlogin.js')
const refresh = require('./apis/refreshtoken.js')
const createCinema = require('./apis/createcinema.js')
const createCinemaAdmin = require("./apis/createcinemaadmin.js");
const registerCustomer = require('./apis/registercustomers.js')
const customerLogin = require('./apis/logincustomer.js')

const cinemaAdminLogin = require('./apis/cinemaadminlogin.js')
const validate = require('./middleware/validate.js');
const movieSchema = require('./validations/movievalid.js')
const priceSchema = require('./validations/pricesvalid.js')
const addMovie = require('./apis/addmovies.js')
const isCinemaAdmin = require('./middleware/iscinemaadmin')
const addMoviePrice = require('./apis/movieprices.js') 
const customerSchema = require('./validations/customervalid.js')

const app = express();
app.use (express.json());

app.use('/login',sadminLogin);
app.use('/refresh',refresh)
app.use('/register-cinema',authenticateToken,isSuperAdmin,createCinema)
app.use('/register-admin',authenticateToken,isSuperAdmin,createCinemaAdmin)
app.use('/login-cinadmin',cinemaAdminLogin)
app.use('/add-movie',authenticateToken,isCinemaAdmin,validate(movieSchema),addMovie)
app.use('/movie-price',authenticateToken,isCinemaAdmin,validate(priceSchema),addMoviePrice)
app.use('/register-customer',validate(customerSchema),registerCustomer)
app.use('/login-customer',customerLogin)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})

module.exports=app;