const Payment = require('../models/payments.js')

async function callBack(req,res){
    const mpesaResponse = req.body;
    const merchantRequestId = mpesaResponse.Body.stkCallback.MerchantRequestID;
    const checkoutRequestId = mpesaResponse.Body.stkCallback.CheckoutRequestID;
    const resultCode = mpesaResponse.Body.stkCallback.ResultCode;
    const mpesaReceiptNumber = mpesaResponse.Body.stkCallback.CallbackMetadata.Item[1].Value;

    const payment = await Payment.findOne({
        where:{
            merchantRequestId : merchantRequestId
        }
    })
    if(!payment){
        return res.status(404).json({message:"Payment Not Found"})
    }
    if(resultCode === 0){
 n        //update payment status
        await payment.update({
        status : "completed",
        mpesaReceiptNumber : mpesaReceiptNumber,
        callbackData: JSON.stringify(mpesaResponse)
        })

        return res.status(200).json({message:"Payment Completed"})
    }
    //payment failed
    await payment.update({
     status :"failed",
    callbackData: JSON.stringify(mpesaResponse)
    })

    return res.status(200).json({message:"Payment Failed"})
}
module.exports=callBack