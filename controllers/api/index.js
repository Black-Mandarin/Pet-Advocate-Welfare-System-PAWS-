const router = require('express').Router();

const bookingRoutes = require('./bookingRoutes');

router.use('/user', bookingRoutes);

module.exports = router;