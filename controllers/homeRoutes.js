const router = require('express').Router();
const { Staff, Booking, Pet } = require('../models');
const withAuth = require('../utils/auth');

// Displays the homepage with bookings
router.get("/", withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.findAll({
            include: [
                {
                    model: Staff,
                    attributes: ['name', 'id'],
                },
                {
                    model: Pet,
                },
            ],
        });

        // Serialize data so the template can read it
        const bookings = bookingData.map((booking) => booking.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            bookings,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Displays the login page, if logged in displays the homepage
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }

        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;