// const ROLES = require ("../utils/constants");
// const Review = require("../models/Review");
// const Product = require("../models/Product");


// const createReview = async(req, res)=>{
//     if(req.role !== ROLES.user)
//         return res.status(401).json({success: false, message: "Access denied"});

//     const userId = req.id;
//     try{
//         const {productId, review, rating} = req.body;

//         const newReview = await Review.create({
//             productId, review, userId, rating
//         });

//         newReview.populate({
//             path: "userId",
//             select: "name"
//         });

//         let product = await Product.findByIdAndUpdate(productId, {
//             $push: {reviews: newReview._id},
//         });

//         await product.calculateRating();

//         return res.status(201).json({success: true, message: "Thanks for review", data: newReview });
//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});
//     }
// };



// const updateReview = async(req, res)=>{
//     if(req.role !== ROLES.user) 
//         return res.status(401).json({success: false, message: "Access Denied"});

//     try{
//         const {id} = req.params;
//         const {updatedReview} = req.body;

//         let review = await Review.findByIdAndUpdate(id,
//             {review: updatedReview},
//             {new: true}
//         );
//         await review.populate("userid", "name");

//         if(!review)
//             return res.status(404).json({success: false, message: "Review npot found"});

//         return res.status(200).json({success: true, messags: "Review updated", data: review})
//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});
//     }
// };



// const replyReview = async(req, res)=>{
//     if(req.role !== ROLES.user)
//         return res.status(401).json({success: false, message: "Access Denied"});

//     const userId = req.id;
//     const {id} = req.params;
//     try{
//         const {review} = req.body;

//         let foundReview = await Review.findByIdAndUpdate(
//             {_id: id},
//             {$push: {replies:{userId, review}}},
//             {new: true}
//         ).populate("replies.userId", "name").populate("userId", "name");

//         if(!foundReview)
//             return res.status(404).json({success: false, message: "review not found"});

//         return res.status(200).json({success: true, message: "reply added successfully", data: foundReview});
//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});

//     }
// };



// const deleteReview = async(req, res)=>{
//     if(req.role !== ROLES.user)
//         return res.status(201).json({success: false, message: "Access Denied"});

//     try{
//         const {id} = req.params;

//         let review = await Review.findByIdAndDelete(id);
//         if(!review)
//             return res.status(404).json({success: false, message: "review not found"});

//         let product = await Product.findByIdAndUpdate(review,productId,
//             {$pull: {reviews: review._id},}
//         );
//         await product.calculateRating();

//         if(!review)
//             return res.status(404).json({success: false, message: "review not found"});

//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});
//     }
// };


// const getReviews = async(req, res)=>{
//     if(req.role !== ROLES.user)
//         return res.status(201).json({success: false, message: "Access denied"});

//     try{
//         const {id} = req.params;

//         let reviews = await Review.find({productId: id}).populate({path: "replied.userId", select: "name"});

//         if(!reviews)
//             return res.status(404).json({success: false, message: "review not found"});

//         return res.status(201).json({success: false, message: "review found", data: true});

//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});

//     }
// };



// module.exports={createReview, updateReview, replyReview, deleteReview, getReviews};
























const ROLES = require ("../utils/constants");
const Review = require("../models/Review");
const Product = require("../models/Product");

// const createReview = async (req, res) => {

        
//     if (req.role !== ROLES.user)
//       return res.status(401).json({ success: false, message: "Access denied" });
  
//     const userId = req.id;
  
//     try {
//       const { productId, review, rating } = req.body;
  
//       const newReview = await Review.create({
//         productId,
//         review,
//         userId,
//         rating,
//       });
  
//       await newReview.populate({
//         path: "userId",
//         select: "name",
//       });
  
//       const product = await Product.findByIdAndUpdate(productId, {
//         $push: { reviews: newReview._id },
        
//       });
  
//       await product.calculateRating();
  
//       return res.status(201).json({
//         success: true,
//         message: "Thanks for review",
//         data: newReview,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
  




const createReview = async (req, res) => {
  if (req.role !== ROLES.user)
    return res.status(401).json({ success: false, message: "Access denied" });

  const userId = req.id;

  try {
    const { productId, review, rating } = req.body;

    const newReview = await Review.create({
      productId,
      review,
      userId,
      rating,
    });

    await newReview.populate({
      path: "userId",
      select: "name",
    });

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview._id } },
      { new: true } // ✅ important
    );

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    await product.calculateRating(); // ✅ safe now

    return res.status(201).json({
      success: true,
      message: "Thanks for review",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// const updateReview = async(req, res)=>{
//     if(req.role !== ROLES.user) 
//         return res.status(401).json({success: false, message: "Access Denied"});

//     try{
//         const {id} = req.params;
//         const {updatedReview} = req.body;

//         let review = await Review.findByIdAndUpdate(id,
//             {review: updatedReview},
//             {new: true}
//         );
//         await review.populate("userId", "name");

//         if(!review)
//             return res.status(404).json({success: false, message: "Review npot found"});

//         return res.status(200).json({success: true, message: "Review updated", data: review})
//     } catch(error){
//         return res.status(500).json({success: false, message: error.message});
//     }
// };


const updateReview = async (req, res) => {
  if (req.role !== ROLES.user)
    return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    const { id } = req.params;
    const { updatedReview, rating } = req.body;

    // Prepare update object
    const updateData = {};
    if (updatedReview !== undefined) updateData.review = updatedReview;
    if (rating !== undefined) updateData.rating = rating;

    const review = await Review.findByIdAndUpdate(id, updateData, { new: true });

    await review.populate("userId", "name");

    if (!review)
      return res.status(404).json({ success: false, message: "Review not found" });

    return res.status(200).json({
      success: true,
      message: "Review updated",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const replyReview = async(req, res)=>{
    if(req.role !== ROLES.user)
        return res.status(401).json({success: false, message: "Access Denied"});

    const userId = req.id;
    const {id} = req.params;
    try{
        const {review} = req.body;

        let foundReview = await Review.findByIdAndUpdate(
            {_id: id},
            {$push: {replies:{userId, review}}},
            {new: true}
        ).populate("replies.userId", "name").populate("userId", "name");

        if(!foundReview)
            return res.status(404).json({success: false, message: "review not found"});

        return res.status(200).json({success: true, message: "reply added successfully", data: foundReview});
    } catch(error){
        return res.status(500).json({success: false, message: error.message});

    }
};



const deleteReview = async (req, res) => {
    if (req.role !== ROLES.user)
      return res.status(403).json({ success: false, message: "Access Denied" });
  
    try {
      const { id } = req.params;
  
      // Find and delete the review
      const review = await Review.findByIdAndDelete(id);
      if (!review)
        return res.status(404).json({ success: false, message: "Review not found" });
  
      // Get productId from review
      const productId = review.productId;
  
      // Remove review reference from the product
      const product = await Product.findByIdAndUpdate(productId, {
        $pull: { reviews: review._id },
      });
  
      // Recalculate product rating
      if (product) await product.calculateRating();
  
      return res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  

const getReviews = async(req, res)=>{
    // if(req.role !== ROLES.user)
    //     return res.status(201).json({success: false, message: "Access denied"});

    try{
        const {id} = req.params;

        let reviews = await Review.find({productId: id}).populate({path: "replies.userId", select: "name"});

        if(!reviews)
            return res.status(404).json({success: false, message: "review not found"});

        return res.status(201).json({success: true, message: "review found", data: reviews});

    } catch(error){
        return res.status(500).json({success: false, message: error.message});

    }
};



module.exports={createReview, updateReview, replyReview, deleteReview, getReviews};