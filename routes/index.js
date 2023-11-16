const express = require('express');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  
};


const router = express.Router();

// auth0 router attaches /login, /logout, and /callback routes
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// router.get('/checkLoginStatus', (req,res)=>{
//   res.send(req.oidc.isAuthenticated() ? 'Logged in': 'Logged out');
// });


// Secured route
// router.get('/profile', auth(config), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

router.get('/profile', (req, res) => {
  // Requires authentication
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send('Not logged in');
  }
  res.send(JSON.stringify(req.oidc.user));
});



//routes
router.use('/', require('./swagger'));
router.use('/flavors', require('./flavors')); // app.METHOD(PATH/PATTERN, HANDLER) where PATH is a path on the server
router.use('/toppings', require('./toppings'));


module.exports = router;