const express = require('express');
const router = express.Router();
const {authController} = require('../controllers');
const {SignUpValidator,SignInValidator,EmailValidator,EmailCodeValidator,RecoverPasswordValidator,changePasswordValidator,updateProfileValidator}= require('../validators/auth')
const validate = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');

router.post('/signup',SignUpValidator,validate, authController.signup);

router.post('/signin',SignInValidator,validate, authController.signin);

router.get('/get-verification-code', EmailValidator,validate, authController.getVerificationCode);

router.post('/verify-email',EmailCodeValidator,validate, authController.verifyEmail);

router.post('/send-forgot-password-code',EmailValidator,validate, authController.sendForgotPasswordCode);

router.post('/recover-password', RecoverPasswordValidator,validate, authController.RecoverPassword);

router.put('/change-password',changePasswordValidator,validate, isAuth,authController.ChangePassword);

router.put('/update-profile', isAuth, updateProfileValidator,validate, authController.updateProfile)

module.exports = router;