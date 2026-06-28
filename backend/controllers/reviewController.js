import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if user already reviewed

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user.id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? (
            reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      reviews,
      totalReviews,
      averageRating,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};