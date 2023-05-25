const Product = require('../models/productModel');
const ErrroHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorhandler');

// create product --  Admin

exports.createproduct = catchAsyncErrors( async (req,res)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    await res.status(200).json({
        status:true,
        product
    })
});

// get all products
exports.getAllProducts= catchAsyncErrors( async (req,res)=>{

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    await res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// get product detail
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{


    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrroHandler("Product not found",404))
    }

    await res.status(200).json({
        succes:true,
        product,
    })
});

//update product
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrroHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    await res.status(200).json({
        success:true,
        product
    })
});

// delete product

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrroHandler("Product not found",404));
    }
    
    await product.remove();

    await res.status(200).json({
        success:true,
        message:"Product delete successfully"
    })
});

// Create new Review or update the review
exports.createProductReview = catchAsyncErrors( async(req,res,next)=>{
    const {comment,rating,productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach( (rev) => {
            if(rev.user.toString()===req.user._id.toString()){
                rev.comment = comment;
                rev.rating = rating;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0
    product.reviews.forEach(rev => {
        avg+=rev.rating;
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
    });
});

// Get All reviews of product
exports.getproductReviews = catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next( new ErrroHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})
// delete product review
exports.deleteReview = catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next( new ErrorHandler("Product not found",404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    
    reviews.forEach(rev=>{
        avg += rev.rating; 
    })

    const ratings = avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numOfReviews},{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        message:"Review has deleted successfuly"
    });
});