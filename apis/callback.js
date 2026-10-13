const Payment = require('../models/payments.js')
const Sales = require('../models/sales.js')
const Tickets = require('../models/tickets.js');

async function callBack(req,res){
    try{
    const mpesaResponse = req.body;
    const stkCallback = mpesaResponse?.Body?.stkCallback;
    if(!stkCallback){
        return res.status(400).json({message:"Invalid M-Pesa callback"});
    }
    const merchantRequestId = mpesaResponse.Body.stkCallback.MerchantRequestID;
    const checkoutRequestId = mpesaResponse.Body.stkCallback.CheckoutRequestID;
    const resultCode = mpesaResponse.Body.stkCallback.ResultCode;

    const payment = await Payment.findOne({
        where:{
            merchantRequestId : merchantRequestId
        }
    })
    if(!payment){
        return res.status(404).json({message:"Payment Not Found"})
    }

    if (payment.status === 'completed') {
           const sale = await Sales.findOrCreate({
               where: { paymentId: payment.id },
               defaults: {
                    paymentId: payment.id,
                    customerId: payment.customerId,
                    movieId: payment.movieId,
                    amount: payment.amount,
                    priceId: payment.priceId
        }
    });

            return res.status(200).json({
                message: 'Payment already completed',
                ticketId: sale?.ticketId
            });
        }


    if(resultCode === 0){
        const metadata = stkCallback.CallbackMetadata?.Item || [];
        const receiptItem = metadata.find(item => item.Name === 'MpesaReceiptNumber');
        const mpesaReceiptNumber = receiptItem?.Value;
        if (!mpesaReceiptNumber) {
            console.error('Successful callback has no M-Pesa receipt number');
              return res.status(400).json({message: 'M-Pesa receipt number missing'});
            }
       //update payment status
        await payment.update({
        status : "completed",
        mpesaReceiptNumber : mpesaReceiptNumber,
        callbackData: JSON.stringify(mpesaResponse)
        });

        const [sale, created] = await Sales.findOrCreate({
                where: {
                    paymentId: payment.id
                },
                defaults: {
                    paymentId: payment.id,
                    customerId: payment.customerId,
                    movieId: payment.movieId,
                    amount : payment.amount,
                    priceId: payment.priceId
                }
            });    
        console.log(created? 'Sale created successfully': 'Sale already exists',sale.ticketId);

        const [ticket, ticketCreated] = await Tickets.findOrCreate({
                where: {
                   saleId: sale.id
               },
                defaults: {
                   saleId: sale.id,
                   customerId: sale.customerId,
                   movieId: sale.movieId
    }
            });

        console.log(ticketCreated ? 'Ticket created successfully' : 'Ticket already exists',ticket.id);

        return res.status(200).json({
            message:"Payment Completed",
            ticketId: sale.ticketId
        });
    }
    //payment failed
    await payment.update({
     status :"failed",
    callbackData: JSON.stringify(mpesaResponse)
    });
    return res.status(200).json({message:"Payment Failed"});
}catch(err){
    console.log("M-Pesa callback error:",err)
    return res.status(500).json({message:"Error processing payment callback"});
}
}

module.exports=callBack