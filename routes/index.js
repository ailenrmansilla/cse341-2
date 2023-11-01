const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// auth0 router attaches /login, /logout, and /callback routes
router.use(auth(config));
router.get('/checkLoginStatus', (req,res)=>{
  res.send(req.oidc.isAuthenticated() ? 'Logged in': 'Logged out');
});

//routes
router.use('/', require('./swagger'));
router.use('/flavors', require('./flavors')); // app.METHOD(PATH/PATTERN, HANDLER) where PATH is a path on the server
router.use('/toppings', require('./toppings'));


module.exports = router;