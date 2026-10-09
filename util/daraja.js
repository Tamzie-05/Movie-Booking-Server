require('dotenv').config()
const axios = require('axios')

function createBasicAuth(username, password) {
  return Buffer.from(`${username}:${password}`).toString("base64");
}

function getTimestamp() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts.map(part => [part.type, part.value])
    );

    return values.year + values.month + values.day +
        values.hour + values.minute + values.second;
}

function generatePassword(businessShortCode, passkey,timestamp) {
  return Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString("base64");
}

async function getAccessToken(){
    
        const basicAuth = createBasicAuth(process.env.CONSUMER_KEY,process.env.CONSUMER_SECRET); 
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
         {
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        });
        return response.data.access_token
        
}
async function sendSTKPush(phoneNumber,amount,paymentId){
       const token = await getAccessToken()
       const shortCode = process.env.SHORT_CODE;
       const timestamp = getTimestamp();
       const password=generatePassword(shortCode,process.env.PASSKEY,timestamp);

       const payload = {
        Password:password,
        BusinessShortCode:process.env.SHORT_CODE,
        Timestamp: timestamp,
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        TransactionType: "CustomerPayBillOnline",
        PhoneNumber: phoneNumber,
        TransactionDesc: "Movie Ticket Payment",
        AccountReference: `MOVIE - ${paymentId}`,
        CallBackURL: process.env.CALLBACKURL
       }
       console.log(payload)
        const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",payload,{
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });
        console.log("STK RESPONSE:", response.data);
        return response.data;
    
    }

module.exports={sendSTKPush}