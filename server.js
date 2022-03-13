// Imports node modules
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const nodemailer = require('nodemailer');
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

// Body-parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session Middleware
app.use(session(sess));

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route Middleware
app.use(routes);

// Initialise connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});


// app.get('/', (req, res) => {
//     res.render('booking');
// });


// const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
// ];
// app.get(`/api/bookings/${id}`, (req, res) => {
//     res.render('edit-booking');
// });


app.post('/send', (req, res) => {
    const output = `
  
      <p>You are assigned as a carer staff for the following booking:</p>
        <h5>Pet Name: ${req.body.pet_name} | Type: ${req.body.pet_type} | Breed:
            ${req.body.pet_breed}</h5>
            <p class="card-text">Note: ${req.body.pet_notes}}</p>
        <p> Owner: ${req.body.owner_name}</p>
        <p>Drop off: ${format_date(req.body.date_dropoff)} | Pick up: ${format_date(req.body.date_pickup)}</p>
        <p>Staff assigned: ${req.body.staff}</p>
        <p class="card-text">Fee: ${req.body.fee}</p>`;
    let transporter = nodemailer.createTransport({
        host: 'mail.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: DB_EMAIL, // generated ethereal user
            pass: DB_EMAIL_PASSWORD  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Pet Advocate Welfare System" <petadvocatewelfaresystem@gmail.com>', // sender address
        to: "petadvocatewelfaresystem@gmail.com", // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'PAWS', // plain text body
        html: output // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // res.render('contact', { msg: 'Email has been sent' });
    });
})