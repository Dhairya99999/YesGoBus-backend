const feedbackModel = require("../model/feedback");

exports.add_feedback = async (req, res) => {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    const feedback = await feedbackModel.create({
      userId: req.user,
      rating: req.body.rating,
      feedback: req.body.feedback,
      feedbackDate: formattedDate,
    });
    return res.status(201).send({
      status: true,
      data: { feedback },
      message: "Feedback added successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.get_feedback = async (req, res) => {
  try {
    const feedback = await feedbackModel
      .find(
        {},
        {
          _id: 1,
          userId: 1,
          rating: 1,
          feedback: 1,
          feedbackDate: 1,
        }
      )
      .populate({
        path: "userId",
        select: "_id firstName lastName",
      });
    return res.status(200).send({
      status: true,
      data: { feedback },
      message: "Feedback fetch successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};
