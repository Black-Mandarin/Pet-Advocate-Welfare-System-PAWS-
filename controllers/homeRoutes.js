const router = require('express').Router();
const { Staff, Booking, Pet } = require('../models');

router.get("/", async (res, req) => {
    try {
        res.status(200).json({ message: 'This is the homepage' });
    } catch (err) {
        res.statusCode(500).json(err);
    }
});

router.get("/login", async (res, req) => {
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