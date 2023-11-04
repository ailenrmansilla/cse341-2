let express = require('express'); //Express provides methods to specify what function is called for a
// particular HTTP verb (GET, POST, SET, etc.) and URL pattern ("Route"),
// and methods to specify what template ("view") engine is used
let app = express(); // instance of express
const cors = require('cors');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(bodyParser.json()) //middleware,responsible for parsing the incoming request bodies before you handle it
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // what type of data the client, user, or request server wants in the response
        next(); // Pass control to the next matching route/handler/middleware
        // Do not expect the second middleware function to get invoked automatically.
    })
    .use('/', require('./routes')); // app.METHOD(PATH, HANDLER/middleware function) where PATH is a path on the server


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
