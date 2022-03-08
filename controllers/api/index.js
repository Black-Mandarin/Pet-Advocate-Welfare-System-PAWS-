const router = require('express').Router();

// const bookingRoutes = require('./bookingRoute');
const staffRoutes = require('./staffRoute');

router.use('/staff', staffRoutes);
// router.use('/booking', bookingRoutes);


module.exports = router;