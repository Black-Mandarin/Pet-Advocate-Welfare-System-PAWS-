const router = require('express').Router();
const sequelize = require('../config/connection');
const { Booking, Staff, Pet } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const staffData = await Staff.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Booking }],
        });

        const staff = staffData.get({ plain: true });
        console.log(staff);
        res.render('personal', {
            ...staff,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;