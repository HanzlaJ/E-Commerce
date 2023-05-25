const express = require('express');
const { reset } = require('nodemon');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, userUpdatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require('../controllers/userControllers');
const { isAuthenticatedUser, authorizeroles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forget').post(forgetPassword);

router.route('/logout').get(logoutUser);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/password/update').put(isAuthenticatedUser, userUpdatePassword);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizeroles('admin'), getAllUser);

router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeroles('admin'), getSingleUser).delete(isAuthenticatedUser, authorizeroles("admin"), deleteUser).put(isAuthenticatedUser, authorizeroles("admin"), updateUserRole);

module.exports = router;