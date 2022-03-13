const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const helpers = require('./utils/helper');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

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

app.use(session(sess));

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route middleware
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});


app.get('/', (req, res) => {
    res.render('booking');
});


// const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
// ];
// app.get(`/api/bookings/${id}`, (req, res) => {
//     res.render('edit-booking');
// });


app.post('/booking/send', (req, res) => {
    const output = `
        <p>Pet Name: ${req.body.pet_name}</p>
       
        <p>Type: ${req.body.pet_type} </p>
        <p> Breed:
        ${req.body.pet_breed}</p>
        <p>Note: ${req.body.pet_notes}</p>
     
        <p>Type: ${req.body.pet_type}</p>
        <p>Type: ${req.body.pet_type} </p>
        <p>Type: ${req.body.pet_type}</p>
        <p>Breed: ${req.body.pet_breed}</p>
        <p>Owner: ${req.body.owner_name}</p>
        <p>Note: ${req.body.pet_notes}}</p>
        <p> Owner: ${req.body.owner_name}</p>
        <p>Drop off: ${format_date(req.body.date_dropoff)}
        <p> Pick up: ${format_date(req.body.date_pickup)}</p>
        <p>Staff assigned: ${req.body.staff}</p>
        <p>Fee: ${req.body.fee}</p>`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
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
        text: 'You are assigned as a carer staff for the following booking:', // plain text body
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