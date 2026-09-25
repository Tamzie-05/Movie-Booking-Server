require('dotenv').config()
const express = require('express')
const authenticateToken = require('./middleware/authenticatetoken.js')
const isSuperAdmin = require('./middleware/issuperadmin')
const sadminLogin = require('./apis/sadminlogin.js')
const refresh = require('./apis/refreshtoken.js')
const createCinema = require('./apis/createcinema.js')
const createCinemaAdmin = require("./apis/createcinemaadmin.js");


const app = express();
app.use (express.json());

app.use('/login',sadminLogin);
app.use('/refresh',refresh)
app.use('/register-cinema',authenticateToken,isSuperAdmin,createCinema)
app.use('/register-admin',authenticateToken,isSuperAdmin,createCinemaAdmin)


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})

module.exports=app;