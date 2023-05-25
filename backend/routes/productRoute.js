const express = require("express");
const router = express.Router();

// import product controller
const {
  getAllProducts,
  createproduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getproductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeroles } = require("../middleware/auth");

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeroles("admin"), createproduct);

router.route("/products").get(getAllProducts);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeroles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeroles("admin"), deleteProduct)
  .get(getProductDetails);

router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getproductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports = router;
