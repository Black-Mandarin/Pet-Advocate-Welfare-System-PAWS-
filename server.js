// Imports node modules
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const bodyParser = require('body-parser');

const path = require('path');

//Imports routes
const routes = require('./controllers');

// Helper function
const helpers = require('./utils/helper');

// Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialised app variable by setting it to the value of express
const app = express();

// Create PORT environment variable or 3001
const PORT = process.env.PORT || 3001;

// Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// Create session
const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// View engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session Middleware
app.use(session(sess));

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Route Middleware
app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});