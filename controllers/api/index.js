const router = require('express').Router();

const bookingRoutes = require('./bookingRoute');
const staffRoutes = require('./staffRoute');

router.use('/bookings', bookingRoutes);
router.use('/staffs', staffRoutes);


module.exports = router;