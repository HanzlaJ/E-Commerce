const ErrorHandler = require('../utils/errorhandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internel server error";

    //Wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,404); 
    }

    // Json WebToken Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message,404); 
    }

    //Json Web Token Expire
    if(err.name === "TokenExpireError"){
        const message = `Json Web Token is Expire, try again`;
        err = new ErrorHandler(message,404); 
    }

    if(err === 1100){
        const message = `Email ${Object.keys(err.keyValue)} is already registerd`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}