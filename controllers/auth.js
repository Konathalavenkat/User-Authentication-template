
const {user} = require('../models');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const generateCode = require('../utils/generateCode');
const sendEmail = require('../utils/sendEmail');

const signup = async (req,res,next) => {
 try{
   const {name,email,password,role} = req.body;
   
   const isEmailExist = await user.findOne({email: email});
   
   if(isEmailExist) {
     res.code=400;
     throw new Error("Email already exists");
   }
   const hashedPassword= await hashPassword(password);
   const newuser = new user({name,email,password:hashedPassword,role});
   await newuser.save();
   res.status(201).json({code:201, status:true, message: 'User registered successfully.'});
 }catch(e){
   next(e);
 }
};

const signin = async (req,res, next)=>{
  try{
    const {email,password} = req.body;
    const User = await user.findOne({email:email});
    if(!User){
      res.code=401;
      throw new Error("User does not exist");
    }
    const match = await comparePassword(password,User.password);
    if(!match){
      res.code=401;
      throw new Error("Invalid credentials");
    }
    const token = generateToken(User);
    res.status(200).json({code:200,status:true,message:"User signed in successfully",token:token});

  }
  catch(e){
    next(e);
  }
};

const getVerificationCode = async (req,res,next) => {
  const {email} = req.body;
  const User = await user.findOne({email: email});
  if(!User) {
    res.code=404;
    throw new Error("User not found");
  }
  const verificationCode = generateCode(6);
  if(User.isVerified) {
    res.code=400;
    throw new Error("User is already verified");
  }
  User.verificationCode=verificationCode;
  await User.save();
  //email verification code
  await sendEmail({
    emailTo : email,
    subject : "Email Verification Code",
    code: verificationCode,
    content: "Verify your account"
  });
  //Send email verification code to user
  res.status(200).json({code:200, status:true, message: "Verification code sent successfully"});
}

const verifyEmail = async ( req,res,next) =>{
  try {
    const {email,code} = req.body;
    const User = await user.findOne({email: email});
    if(!User) {
      res.code=404;
      throw new Error("User not found");
    };
    if(User.verificationCode != code){
      res.code=400;
      throw new Error("Invalid verification code");
    }
    User.isVerified = true;
    User.verificationCode = null;
    await User.save();

    res.status(200).json({code:200, status:true, message: "Email verified successfully"});

  }catch(err){
    next(err);
  }
}

const sendForgotPasswordCode = async (req,res,next)=>{
  try{
    const {email} = req.body;
    const User = await user.findOne({email: email});
    if(!User) {
      res.code=404;
      throw new Error("User not found");
    }
    const forgotPasswordCode = generateCode(6);
    User.forgotPasswordCode=forgotPasswordCode;
    await User.save();
    //Send forgot password code to user
    await sendEmail({
      emailTo : email,
      subject : "Forgot Password Code",
      code: forgotPasswordCode,
      content: "Reset your password"
    });
    res.status(200).json({code:200, status:true, message: "Forgot password code sent successfully"});
  }
  catch(e){
    next(e);
  }
}

const RecoverPassword = async (req,res,next) => {
  try {
    const {email,code,password} = req.body; 
    const User = await user.findOne({email: email});
    if(!User){
      res.code=404;
      throw new Error("User not found");
    }
    if(!User.forgotPasswordCode){
      res.code=400;
      throw new Error("Forgot password code is expired");
    }
    if(User.forgotPasswordCode!= code){
      res.code=400;
      throw new Error("Invalid forgot password code");
    }
    const hashedPassword= await hashPassword(password);
    User.password=hashedPassword;
    User.forgotPasswordCode=null;
    await User.save();
    res.status(200).json({code:200, status:true, message: "Password reset successfully"});
    
    
  }catch(e){
    next(e);
  }
}

const ChangePassword = async (req,res,next) => {
  try{
    const {oldPassword,newPassword} = req.body;
    const {_id} = req.user;
    const User = await user.findById(_id);
    if(!User){
      res.code=404;
      throw new Error("User not found");
    }
    const match = await comparePassword(oldPassword,User.password);
    if(!match){
      res.code=400;
      throw new Error("Invalid old password");
    }
    if(oldPassword === newPassword) {
      res.code=400;
      throw new Error("New password should not be same as old password");
    }
    const hashedPassword = await hashPassword(newPassword);
    User.password = hashedPassword;
    await User.save();
    res.status(200).json({code:200, status:true, message: "Password changed successfully"});
  }
  catch(e){
    next(e);
  }
}

const updateProfile = async (req,res,next) => {
  try{
    const {name,email} = req.body;
    const {_id} = req.user;
    const User = await user.findById(_id).select("-password -verificationCode -forgotPasswordCode");
    if(!User){
      res.code=404;
      throw new Error("User not found");
    }
    
    User.email = email ? email : User.email;
    User.name = name ? name : User.name;
    if(email){
      const isExistUser = await user.findOne({email:email});
      if(isExistUser && isExistUser.email === email){
        res.code=400;
        throw new Error("Email already exists");
      }
    }
    await User.save();
    res.status(200).json({code:200, status:true, message: "Profile updated successfully", user: User});

  }
  catch(e){
    next(e);
  }
}

module.exports = {signup,signin,getVerificationCode,verifyEmail,sendForgotPasswordCode,RecoverPassword,ChangePassword,updateProfile};