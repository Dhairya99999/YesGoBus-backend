const axios = require("axios");
const crypto = require('crypto');

const sendRequest = async (url, method, headers, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

function generateId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.initiatePayment = async (args) => {
  const merchantTransactionId = generateId(18);
  const merchantUserId = generateId(10);
  const { amount, redirectUrl } = args;

  const payload = {
    "merchantId": process.env.MERCHANT_ID,
    "merchantTransactionId": merchantTransactionId,
    "merchantUserId": merchantUserId,
    "amount": amount * 100,
    "redirectUrl": redirectUrl,
    "redirectMode": "GET",
    "callbackUrl": "https://webhook.site/callback-url",
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString('base64');
  const requestData = {
    request: base64Payload
  }

  const apiEndpoint = "/pg/v1/pay";
  const saltKey = process.env.SALT_KEY;
  const saltIndex = process.env.SALT_INDEX;

  const concatenatedData = base64Payload + apiEndpoint + saltKey;
  const sha256Hash = crypto.createHash('sha256');
  const checksum = sha256Hash.update(concatenatedData).digest('hex');
  const xVerify = checksum.toString() + "###" + saltIndex;

  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': xVerify,
  };
  // const url = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";
  const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  return sendRequest(url, "POST", headers, requestData);
};

exports.checkPaymentStatus = async (args) => {
  const merchantId = process.env.MERCHANT_ID;
  const { merchantTransactionId } = args;
  const requestData = {}

  const apiEndpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const saltKey = process.env.SALT_KEY;
  const saltIndex = process.env.SALT_INDEX;

  const concatenatedData = apiEndpoint + saltKey;
  const sha256Hash = crypto.createHash('sha256');
  const checksum = sha256Hash.update(concatenatedData).digest('hex');
  const xVerify = checksum.toString() + "###" + saltIndex;
  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': xVerify,
    'X-MERCHANT-ID': process.env.MERCHANT_ID,
  };
  // const url = `https://api-preprod.phonepe.com/apis/hermes${apiEndpoint}`;
  const url = `https://api.phonepe.com/apis/hermes${apiEndpoint}`;

  return sendRequest(url, "GET", headers, requestData);
};

//payment refund
exports.refundPayment = async (args) => {
  const { amount, merchantTransactionId } = args;
  const newMerchantId = `R${merchantTransactionId}`;
  const payload = {
    "merchantId": process.env.MERCHANT_ID,
    "originalTransactionId": merchantTransactionId,
    "merchantTransactionId": newMerchantId,
    "amount": amount * 100,
    "callbackUrl": "https://webhook.site/callback-url",
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString('base64');
  const requestData = {
    request: base64Payload
  }

  const apiEndpoint = "/pg/v1/refund";
  const saltKey = process.env.SALT_KEY;
  const saltIndex = process.env.SALT_INDEX;

  const concatenatedData = base64Payload + apiEndpoint + saltKey;
  const sha256Hash = crypto.createHash('sha256');
  const checksum = sha256Hash.update(concatenatedData).digest('hex');
  const xVerify = checksum.toString() + "###" + saltIndex;

  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': xVerify,
  };
  // const url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/refund";
  const url = "https://api.phonepe.com/apis/hermes/pg/v1/refund";

  return sendRequest(url, "POST", headers, requestData);
};

exports.cashfree = async (args) => {
  try{
    const options = {
      method: "POST",
      url:"https://sandbox.cashfree.com/pg/orders",
      headers:{
        accept:"application/json",
        "x-api-version":"2023-08-01",
        "content-type":"application/json",
        "x-client-id": process.env.CASHFREE_ID,
        "x-client-secret": process.env.CASHFREE_SECKRET
      },
      data:{
        customer_details:{
          customer_id:args.userId,
          customer_email: args.email,
          customer_phone: args.phoneNumber? `${args.phoneNumber}`: `${args.mobileNumber}`,
          customer_name: args.fullName?args.fullName: `${args.firstName} ${args.lastName}`,
        },
        order_meta:{
          notify_url:"https://webhook.site/",
          payment_methods:"cc,dc,ppc,ccc,emi,paypal,upi,nb,app,paylater",
        },
        order_amount:args.totalFare,
        order_id:args.bookingId,
        order_currency:"INR",
        order_note:"This is my testing order"
      }
    }
    const paymentRes = await axios.request(options)
    return {payment_session:paymentRes.data.payment_session_id,order_id:bookingId}; 
  }catch(err){

  }
}
