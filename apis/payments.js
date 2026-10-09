const express = require('express')
const Payment = require('../models/payments.js')
const MoviePrice = require('../models/movieprices.js')
const Movie = require('../models/movies.js')
const customerAuth = require("../middleware/customerauth.js");

const { sendSTKPush } = require("../util/daraja.js");
const pay = express.Router()
pay.post('/',customerAuth,async(req,res)=>{
    let payment;
    try{
        const{movieId,priceId,phone}=req.body
        if (!movieId || !priceId || !phone) {
            return res.status(400).json({
                message: "movieId, priceId and phone are required"
            });
        }
        const phoneNumber = String(phone).replace(/[\s+-]/g, "");

        if (!/^254[17]\d{8}$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Enter a valid Kenyan phone number"
            });
        }
        const moviePrice = await MoviePrice.findOne({
    where: {
        id: priceId,
        movieId: movieId
    }
});

if (!moviePrice) {
    return res.status(404).json({message: "Movie price not found"});
}
const amount = Number(moviePrice.price);

        if (!Number.isSafeInteger(amount) || amount < 1) {
            return res.status(400).json({
                message: "The ticket price must be a positive whole number"
            });
        }

 payment = await Payment.create({
    movieId,
    customerId: req.user.id,
    priceId,
    phoneNumber: phoneNumber,
    mpesaReceiptNumber:null,
    amount: moviePrice.price,
    status: "pending"
});

const stkResponse = await sendSTKPush(phoneNumber,amount,payment.id);

await payment.update({
    merchantRequestId: stkResponse.MerchantRequestID,
    checkoutRequestId: stkResponse.CheckoutRequestID
    });

        return res.status(200).json({
            message: stkResponse.CustomerMessage ||
                "STK Push request submitted",
            paymentId: payment.id,
            amount: amount,
            status: "pending",
            checkoutRequestId: stkResponse.CheckoutRequestID
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed"})
    }
})
module.exports=pay;