import {
  initiatePayment,
  checkPaymentStatus,
  refundPayment,
} from "../service/payment.service.js";

export const initiatePaymentController = async (req, res) => {
  try {
    const response = await initiatePayment(req.body);
    console.log(response)
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while initiating payment"
    })
  }
};

export const checkPaymentStatusController = async (req, res) => {
  try {
    const response = await checkPaymentStatus(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while checking payment status"
    })
  }
};

export const refundPaymentController = async (req, res) => {
  try {
    const response = await refundPayment(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while refunding payment"
    })
  }
};

export const paymentCashfreeStatus = async(req,res) =>{
  try{


    const { data } = req.body; // Destructure the data object from the request body
    const paymentStatus = data.payment.payment_status; // Extract payment status
    const orderId = data.order.order_id; // Extract order ID

    // Handle the payment status
    if (paymentStatus === "SUCCESS") {
      // Payment was successful, perform your logic here (e.g., update order status in database)
      console.log(`Payment successful for order ID: ${orderId}`);
      
      // Example: Update order status in your database
      // await Order.update({ status: 'COMPLETED' }, { where: { id: orderId } });

    } else if (paymentStatus === "FAILED") {
      // Handle failed payment
      console.log(`Payment failed for order ID: ${orderId}`);
      
      // Example: Update order status in your database
      // await Order.update({ status: 'FAILED' }, { where: { id: orderId } });

    } else {
      console.log(`Received unexpected payment status: ${paymentStatus} for order ID: ${orderId}`);
    }

    // Respond to Cashfree
    return res.status(200).send({ message: "Webhook processed successfully." });



  }catch(error){
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred"
    })
  }
}