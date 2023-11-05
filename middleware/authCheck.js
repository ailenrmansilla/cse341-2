// const { expressjwt: jwt } = require("express-jwt");
// const jwksRsa = require('jwks-rsa');
// Auth0 configuration
// const jwtMiddleware = jwt({
//     secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://dev-hi15wy7wyw0317gp.us.auth0.com/.well-known/jwks.json',
//   }),
//   audience: 'http://localhost:8080', // My API Audience
//   issuer: 'https://dev-hi15wy7wyw0317gp.us.auth0.com/', // Auth0 Domain
//   algorithms: ['RS256'],
// });

//module.exports = jwtMiddleware;

// Option 2
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:8080',
  issuerBaseURL: `https://dev-hi15wy7wyw0317gp.us.auth0.com`,
});
module.exports = checkJwt;