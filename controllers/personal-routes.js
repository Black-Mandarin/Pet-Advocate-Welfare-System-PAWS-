const router = require('express').Router();
const { Booking, Staff, Pet } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.findAll({
            include: [
                {
                    model: Staff,
                    attribute: { exclude: 'password' },
                },
                {
                    model: Pet,
                }
            ],
            where: {
                staff_id: req.session.user_id
            },
        },
        );

        const bookings = bookingData.map((booking) => booking.get({ plain: true }));

        res.render('personal', {
            bookings,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;