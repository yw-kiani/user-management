<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const logger = require('../../logger');

// Controllers and Middleware
const authController = require('../controller/authController');
const { isAdminLoggedOut, isLoggedOut } = require('../middleware/authMiddleware');
const apiKeyAuth = require('../middleware/apiKeyAuth');
const rateLimit = require('express-rate-limit');

// -------- Rate Limiter --------
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 4, // limit each IP to 7 requests per windowMs
  message: 'Too many login attempts. Please try again after a minute.',
});

// -------- USER ROUTES --------
router
  .route('/login')
  .get(isLoggedOut, authController.getUserLogin)
  .post(isLoggedOut, loginLimiter, authController.userLogin);

router
  .route('/register')
  .get(isLoggedOut, authController.getUserRegister)
  .post(isLoggedOut, authController.userRegister); // Optional: add limiter here too

// -------- ADMIN ROUTES --------
router
  .route('/admin/login')
  .get(isAdminLoggedOut, authController.getAdminLogin)
  .post(isAdminLoggedOut, loginLimiter, authController.adminLogin);

router
  .route('/admin/register')
  .get(isAdminLoggedOut, authController.getAdminRegister)
  .post(authController.adminRegister); // Optional: Add limiter and admin check

// -------- PROTECTED ROUTES --------
router.get('/secure-data', apiKeyAuth, (req, res) => {
  res.send('This is protected data!');
});

// -------- LOGOUT ROUTES --------
router.get('/logout', authController.logout);
router.get('/admin/logout', authController.adminLogout);

module.exports = router;

=======
const express = require('express')
const router = express.Router()
const logger = require('../../logger');

// authController
const authController = require('../controller/authController')
const { isAdminLoggedOut, isLoggedOut } = require('../middleware/authMiddleware')

/**
 * User
 */

router
    .get('/login',  isLoggedOut, authController.getUserLogin)
    .post('/login', isLoggedOut, authController.userLogin)
router
    .get('/register', isLoggedOut, authController.getUserRegister)
    .post('/register', isLoggedOut, authController.userRegister)

/**
 * Admin
*/

router.route('/admin/login')
    .get(isAdminLoggedOut, authController.getAdminLogin)
    .post( authController.adminLogin)

router.route('/admin/register')
    .get(isAdminLoggedOut, authController.getAdminRegister)
    .post(authController.adminRegister)

// Logout
router.get('/logout', authController.logout)
router.get('/admin/logout', authController.adminLogout)

module.exports = router
>>>>>>> 3b4aa5cdae276595da8907889ecc433635ccc98d
