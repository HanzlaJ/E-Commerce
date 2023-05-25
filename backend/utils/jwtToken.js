// Create Token and saving in cookie

const sendToken = async (user,statusCode,res)=>{
    const token = await user.getJWTToken();

    //cookie option

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        suucess:true,
        user,
        token
    })
}
  
module.exports = sendToken;