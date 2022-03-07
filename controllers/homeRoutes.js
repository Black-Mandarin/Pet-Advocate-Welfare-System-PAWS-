const router = require('express').Router();
const { Staff, Booking, Pet } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", async (res, req) => {
    try {
        const bookingData = await Booking.findAll({
            include: [
                {
                    model: Staff,
                    attributes: ['name'],
                },
                {
                    model: Pet,
                    attributes: ['name'],
                },
            ],
        });

        console.log(bookingData);
        // Serialize data so the template can read it
        const bookings = bookingData.map((booking) => booking.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            bookings,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.statusCode(500).json(err);
    }
});

// Displays the login page, if logged in displays the homepage
router.get('/login', async (res, req) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }

        res.render('login');
    } catch (err) {
        res.statusCode(500).json(err);
    }
});