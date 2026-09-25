const express = require('express')
const jwt = require('jsonwebtoken')

const refresh = express.Router();

refresh.post('/',async(req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:"Refresh token required"});
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({message:'Invalid or expired refresh token'});
        }
        const accessToken = jwt.sign({
            id : user.id,
            email : user.email
        },
    process.env.JWT_SECRET,{expiresIn : '30min'});
    res.json({accessToken});
    });
});
module.exports = refresh;