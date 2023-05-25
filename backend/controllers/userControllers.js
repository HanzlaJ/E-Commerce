const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto =  require('crypto');

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "This is sample id",
        url: "profilePicUrl"
      },
    });

    sendToken(user,201,res);
  
  });

// User login
exports.loginUser = catchAsyncError( async (req,res,next)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return next( new ErrorHandler("Please Enter Email or Password",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next( new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next( new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);
})

//logout User
exports.logoutUser = catchAsyncError( async (req,res,next)=>{
    
    await res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"LogOut Successfully"
    })
})

// Forgot Password
exports.forgetPassword = async (req,res,next)=>{
  const user =  await User.findOne({email: req.body.email});

  if(!user){
    return next( new ErrorHandler("User not found",404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;


  const message = `Your Password reset token is \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then please ignore it`;

  try{
    await sendEmail({
      email: user.email,
      subject:"Ecommmerce Password Recovery",
      message
    });

    res.status(200).json({
      success : true,
      message : `Email sent to ${user.email} Successfuly` 
    })
  } catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});

    return next( new ErrorHandler(error.message,500));

  }
};

//reset password
exports.resetPassword = async (req,res,next)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()}
  });

  if(!user){
    return next( new ErrorHandler("Passowrd reset token is invalid or has been Expired",400));
  }

  if(req.body.password !== req.body.confirmPassword){
    return next( new ErrorHandler("Password does not match",400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user,200,res);
};

// user details

exports.getUserDetails = catchAsyncError( async (req,res,next)=>{
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user
  });
});

// update user password
exports.userUpdatePassword = catchAsyncError( async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next( new ErrorHandler("Password is incorrect"));
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next( new ErrorHandler("Password does not match"));
  }

  await user.password == req.body.newPassword;

  await user.save();

  sendToken(user,200,res);
});

// update profile
exports.updateProfile = catchAsyncError( async (req,res,next)=>{

  const updateProfile = {
    name: req.body.name,
    email:req.body.email
  }
  // we will add cloudy later

  const user = await User.findByIdAndUpdate(req.user.id, updateProfile ,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    succces:true,
    user
  });
});
//get all users detail --admin
exports.getAllUser = catchAsyncError( async (req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    users
  });
});
// Single User Deatil --admin
exports.getSingleUser = catchAsyncError( async(req,res,next)=>{
  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with this is id: ${req.params.id}`));
  }

  res.status(200).json({
    success:  true,
    user
  })
})

// update User role --Admin
exports.updateUserRole = catchAsyncError(async (req,res,next)=>{

  const updateProfile ={
    email:req.body.email,
    name:req.body.name,
    role:req.body.rolle
  }

  const user = await User.findByIdAndUpdate(req.params.id,updateProfile,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    succces:true,
    user
  });
});
exports.deleteUser = catchAsyncError( async(req,res,next)=>{

  //We will remove cloudinary remove
  const user = await User.findById(req.params.id);

  if(!user){
    return next( new ErrorHandler(`User does not exist with this is: ${req.params.id},400`))
  }

  await user.remove();

  res.status(200).json({
    success:true,
    message:"User has deleted successfuly"
  });
});
