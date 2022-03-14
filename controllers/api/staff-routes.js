const router = require('express').Router();
const { Staff } = require('../../models');
const nodemailer = require('nodemailer');
require('dotenv').config();
const withAuth = require('../../utils/auth');

// Creates a new staff profile
router.post("/", async (req, res) => {
    try {
        const staffData = await Staff.create(req.body);
        
        req.session.save(() => {
            req.session.user_id = staffData.id;
            req.session.logged_in = true;
            req.session.email = staffData.email;

            res.status(200).json(staffData);
        })

        const output = `
        <p>The following user has been created:</p>
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email} </p>
        <p>Staff ID:${staffData.id}</p>
        Kind regards,
        PAWS Team`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.DB_EMAIL, // generated ethereal user
                pass: process.env.DB_EMAIL_PASSWORD  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });



        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Pet Advocate Welfare System" <petadvocatewelfaresystem@gmail.com>', // sender address
            to: req.body.email, //  receivers
            bcc: '"Pet Advocate Welfare System" <petadvocatewelfaresystem@gmail.com>',
            subject: 'New User Created.', // Subject line
            text: '', // plain text body
            html: output // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Signs a user in
router.post("/login", async (req, res) => {
    try {

        const staffData = await Staff.findOne({ where: { email: req.body.email } });

        if (!staffData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await staffData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }


        req.session.save(() => {
            req.session.user_id = staffData.id;
            req.session.logged_in = true;


            res.json({ user: staffData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Logs a user out
router.post("/logout", async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Sends a list of staff names to be used as a dropdown selection
router.get("/list", withAuth, async (req, res) => {
    try {
        const staffData = await Staff.findAll();
        const staff = staffData.map((staff) => staff.get({ plain: true }));
        res.status(200).json(staff);

    } catch (err) {
        res.status(500).json(err);
    }

})
module.exports = router;