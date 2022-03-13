const router = require('express').Router();
const { Staff, Booking, Pet } = require('../models');
const withAuth = require('../utils/auth');

// Displays the booking page where you can create a new booking
router.get('/', withAuth, async (req, res) => {
    try {
        res.render('booking', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Displays a single booking
router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.findByPk(req.params.id, {
            include: [
                {
                    model: Staff,
                    attributes: ['name'],
                },
                {
                    model: Pet,
                },
            ],
        });

        const booking = bookingData.get({ plain: true });

        res.render('edit-booking', {
            ...booking,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;