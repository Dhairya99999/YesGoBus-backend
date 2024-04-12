exports.get_packages = async (req, res) => {
  try {
    const packages = [
      {
        destination: "Goa",
        from: "Mumbai",
        image: "https://example.com/Goa.jpg",
        title: "Package 1",
        description: "(3N/4D)",
        price: "₹7,500",
        points: [
          "Luxurious accommodation",
          "Complimentary breakfast",
          "Guided tours to famous landmarks",
          "Exciting water sports activities",
          "Evening entertainment events",
        ],
        priceComparison: "This price is lower than the average price in April.",
        totalPrice: "₹7,500",
        perPersonPrice: "₹3,750",
        discountOffer: "Extra Rs 5,898 off. Use Code CAPITALHUB",
      },
      // Add more packages as needed
    ];
    return res.status(200).send({status:true,data:{packages},message:"destination fetch successfully"});
  } catch (err) {
    return res.status(500).send({status:false,data:{errorMessage:err.message},message:"server error"});
  }
};

exports.popular_destinations = async (req, res) => {
  try {
    const popularDestinations = [
      {
        destination:"Goa",
        name: "Goa, India",
        image: "https://example.com/Goa.jpg",
        price: "₹4,800",
        starRating: "4.8",
        description:
          "Experience the pristine beaches and vibrant culture of Goa!",
      },
      {
        destination:"Manali",
        name: "Great Wall of China",
        image: "https://example.com/great_wall.jpg",
        price: "Starting from ₹5,500",
        starRating: "5.0",
        description:
          "Discover one of the most iconic wonders of the world, the Great Wall of China!",
      },
      {
        destination:"Manali",
        name: "Manali, India",
        image: "https://example.com/manali.jpg",
        price: "Starting from ₹6,000",
        starRating: "4.5",
        description:
          "Escape to the serene beauty of Manali, nestled in the Himalayas!",
      },
    ];
    console.log(req.body.destination)
    const destination_data = popularDestinations.filter(
      (item) => {return item.destination === req.body.destination}
    );
    return res.status(200).send({status:true,data:{destination_data},message:"packages fetch successfully"});
  } catch (err) {
    return res.status(500).send({status:false,data:{errorMessage:err.message},message:"server error"});
  }
};
