const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");
const middleware = require("../middleware/authenticateUser");
const storiesModel = require("../model/travelStories")

router.post("/book_hotel",middleware.authenticateToken,bookingController.make_booking);
router.post("/add_itinerary_plans",bookingController.add_itinerary_plans)
router.post("/itinerary_plans",bookingController.get_Itinerary_plans )
router.post("/update_booking",bookingController.edit_booking);
router.post("/update_booking_payment",bookingController.update_booking_payment)
router.post("/add_booking_query",middleware.authenticateToken,bookingController.customer_sport)
router.get("/get_user_booking", middleware.authenticateToken, bookingController.get_customer_booking)
router.post("/get_booking", bookingController.get_booking)

router.post("/add_stories",async(req,res)=>{
    try{
    const data = await storiesModel.create({
        title:req.body.title,
        image:req.body.image
    })
    return res.status(200).send({
        status: true,
        data: { stories: data },
        message: "packages fetch successfully",
      }); 
    }catch(err){
        return res.status(500).send({
            status: false,
            data: { errorMessage: err.message },
            message: "server error",
          });
    }
})

router.get("/get_stories",async (req,res)=>{
    try{
        const data = await storiesModel.find({},{title:1,image:1})
        return res.status(200).send({
            status: true,
            data: { stories: data },
            message: "Stories fetch successfully",
          }); 
    }catch(err){
        return res.status(500).send({
            status: false,
            data: { errorMessage: err.message },
            message: "server error",
          });
    }
})

module.exports = router;
